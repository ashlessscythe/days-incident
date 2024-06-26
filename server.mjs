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

const INTERVAL = process.env.VITE_SCREENSHOT_INTERVAL_MINUTES || 5 * 60 * 1000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const siteInfoPath = path.join(__dirname, "siteInfo.json");
const fallbackImagePath = path.join(__dirname, "src", "images", "no-url.png");

const readSiteInfo = () => {
  try {
    const data = fs.readFileSync(siteInfoPath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading site info:", e);
    return null;
  }
};

// const updateSiteInfo = (siteInfo) => {
//   try {
//     fs.writeFileSync(siteInfoPath, JSON.stringify(siteInfo, null, 2));
//     console.log("Site info update:", siteInfo);
//   } catch (e) {
//     console.error("Error updating site info:", e);
//   }
// };

const fetchAndSaveScreenshot = async (site) => {
  if (!site.targetScreenShotURL) {
    console.log(
      `No targetScreenShotURL specified for ${site.siteName}, using fallback image`
    );
    fs.copyFileSync(
      fallbackImagePath,
      path.join(distDir, `${site.siteRoute}.png`)
    );
    console.log(
      "Fallback image copied to",
      path.join(distDir, `${site.siteRoute}.png`)
    );
    return;
  }

  try {
    const { status, data } = await mql(site.targetScreenShotURL, {
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
      fs.writeFileSync(
        path.join(distDir, `${site.siteRoute}.png`),
        response.data
      );
      console.log(
        "Screenshot saved to",
        path.join(distDir, `${site.siteRoute}.png`)
      );
    } else {
      console.error("Failed to fetch screenshot: invalid response data", data);
    }
  } catch (error) {
    console.error(
      `Error generating screenshot for site ${site.siteName} :`,
      error
    );
  }
};

const fetchAndSaveAllScreenshots = () => {
  const siteInfo = readSiteInfo();
  if (!siteInfo || !siteInfo.sites) {
    console.error("No sites found in siteInfo.json");
    return;
  }

  siteInfo.sites.forEach(fetchAndSaveScreenshot);
  // updateSiteInfo(siteInfo);
};

const siteInfo = readSiteInfo();
const interval = INTERVAL;

// Fetch and save the screenshot every 5 minutes
console.log(`fetching screenshot every ${interval} minutes`);
setInterval(fetchAndSaveAllScreenshots, interval * 60 * 1000);

// Serve static files from the public directory
app.use(express.static(distDir));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // Fetch and save the screenshot immediately on server start
  fetchAndSaveAllScreenshots();
});
