import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CurrentMonth from "./components/CurrentMonth";
import IncidentCross from "./components/IncidentCross";
import IncidentDetails from "./components/IncidentDetails";
import IncidentsDaysAgo from "./components/IncidentsDaysAgo";

function App() {
  const [sitesData, setSitesData] = useState({});

  useEffect(() => {
    const fetchSitesData = () => {
      const data = getSitesData();
      setSitesData(data);
    };

    fetchSitesData();
    const interval = setInterval(fetchSitesData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {Object.entries(sitesData).map(([route, site]) => (
              <Route
                key={route}
                path={route.substring(1)} // Remove leading slash
                element={<SitePage data={site} />}
              />
            ))}
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

const HomePage = () => {
  return (
    <div>
      <h1>Incident Tracker</h1>
      <p>Please select a site from the navigation menu.</p>
    </div>
  );
};

const SitePage = ({ data }) => {
  return (
    <main className="site-page">
      <h1 className="site-title">{data.name}</h1>
      <IncidentsDaysAgo data={data} />
      <IncidentCross data={data} />
      <CurrentMonth data={data} />
      <IncidentDetails data={data} />
    </main>
  );
};

const getSitesData = () => {
  const siteCount = parseInt(import.meta.env.VITE_SITE_COUNT, 10) || 0;
  const sites = {};
  const today = new Date(); // Use the current date as today's date

  for (let i = 1; i <= siteCount; i++) {
    const name = import.meta.env[`VITE_SITE_${i}_NAME`] || `Site ${i}`;
    const recordableDateStr = import.meta.env[`VITE_SITE_${i}_RECORDABLE_DATE`] || "2024-01-01T00:00";
    const nonOshaDateStr = import.meta.env[`VITE_SITE_${i}_NON_OSHA_DATE`] || "2024-01-01T00:00";
    const route = `/${name.toLowerCase().replace(/\s+/g, "_")}`;

    // Ensure the date strings are valid
    const lastRecordableDate = new Date(recordableDateStr);
    const lastNonOshaDate = new Date(nonOshaDateStr);
    
    const validLastRecordableDate = !isNaN(lastRecordableDate.getTime())
      ? lastRecordableDate.toISOString()
      : new Date("2024-01-01T00:00:00Z").toISOString();
      
    const validLastNonOshaDate = !isNaN(lastNonOshaDate.getTime())
      ? lastNonOshaDate.toISOString()
      : new Date("2024-01-01T00:00:00Z").toISOString();

    sites[route] = {
      name: name,
      lastRecordableDate: validLastRecordableDate,
      lastNonOshaDate: validLastNonOshaDate,
      todaysDate: today.toISOString(),
      status: "resolved",
      detail: "No details provided",
    };
  }

  return sites;
};

export default App;
