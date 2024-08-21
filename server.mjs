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
        siteRoute: `/${process.env[`VITE_SITE_${i}_NAME`]
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
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

// Set up routes for each site
const setupRoutes = () => {
  const sites = getSiteConfigurations();

  if (sites.length === 0) {
    console.error("No sites found in .env or siteInfo.json");
    return;
  }

  sites.forEach((site) => {
    app.get(site.siteRoute, (req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  });

  console.log(
    "Routes set up for:",
    sites.map((site) => site.siteRoute)
  );
};

// Set up the routes
setupRoutes();

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
