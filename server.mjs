import express from "express";
import mql from "@microlink/mql";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const TARGET_URL = process.env.VITE_SCREENSHOT_URL || null;
const INTERVAL = process.env.VITE_SCREENSHOT_INTERVAL_MINUTES || 5 * 60 * 1000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const screenshotPath = path.join(distDir, "screenshot.png");
const fallbackImagePath = path.join(__dirname, "src", "images", "no-url.png");

const fetchAndSaveScreenshot = async () => {
  if (!TARGET_URL) {
    console.log("No screenshot url provided, using fallback image");
    fs.copyFileSync(fallbackImagePath, screenshotPath);
    console.log("Fallback image saved to", screenshotPath);
    return;
  }

  try {
    const { status, data } = await mql(TARGET_URL, {
      screenshot: {
        overlay: {
          background:
            "linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
          browser: "dark",
        },
      },
      force: true, // careful to not set interval too high
    });

    if (status === "success" && data.screenshot && data.screenshot.url) {
      console.log("status ======== success");
      const response = await axios.get(data.screenshot.url, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(screenshotPath, response.data);
      console.log("Screenshot saved to", screenshotPath);
    } else {
      console.error("Failed to fetch screenshot: invalid response data", data);
    }
  } catch (error) {
    console.error("Error generating screenshot:", error);
  }
};

// Fetch and save the screenshot every 5 minutes
console.log(`fetching screenshot every ${INTERVAL} minutes`);
setInterval(fetchAndSaveScreenshot, INTERVAL * 60 * 1000);

// Serve static files from the public directory
app.use(express.static(distDir));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // Fetch and save the screenshot immediately on server start
  fetchAndSaveScreenshot();
});
