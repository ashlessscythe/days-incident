import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const siteInfoPath = path.join(__dirname, "siteInfo.json");

const readSiteInfo = () => {
  try {
    const data = fs.readFileSync(siteInfoPath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading site info:", e);
    return null;
  }
};

const getSiteConfigurations = () => {
  const envSiteCount = parseInt(process.env.VITE_SITE_COUNT, 10);
  const sites = [];

  if (envSiteCount) {
    for (let i = 1; i <= envSiteCount; i++) {
      const site = {
        siteName: process.env[`VITE_SITE_${i}_NAME`],
        siteRoute: process.env[`VITE_SITE_${i}_NAME`]
          .toLowerCase()
          .replace(/\s+/g, "_"),
        lastIncidentDate: process.env[`VITE_SITE_${i}_DATE`],
      };
      sites.push(site);
    }
    return sites;
  }

  const siteInfo = readSiteInfo();
  return siteInfo && siteInfo.sites ? siteInfo.sites : [];
};

// Serve static files from the dist directory
app.use(express.static(distDir));

// Disable caching for dynamic content
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

const setupRoutes = () => {
  const sites = getSiteConfigurations();

  // Log the routes being set up
  console.log(
    "Routes set up for:",
    sites.map((site) => site.siteRoute)
  );

  // Serve index.html for all routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
};

// Set up the routes
setupRoutes();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
