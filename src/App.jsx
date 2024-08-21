import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {Object.entries(sitesData).map(([route, site]) => (
              <Route
                key={route}
                path={route}
                element={<SitePage data={site} />}
              />
            ))}
          </Routes>
        </header>
      </div>
    </Router>
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
    <>
      <h1>{data.name}</h1>
      <CurrentMonth data={data} />
      <IncidentCross data={data} />
      <IncidentsDaysAgo data={data} />
      <IncidentDetails data={data} />
    </>
  );
};

const getSitesData = () => {
  const siteCount = parseInt(import.meta.env.VITE_SITE_COUNT, 10) || 0;
  const sites = {};
  const today = new Date(); // Use the current date as today's date

  for (let i = 1; i <= siteCount; i++) {
    const name = import.meta.env[`VITE_SITE_${i}_NAME`] || `Site ${i}`;
    const dateStr =
      import.meta.env[`VITE_SITE_${i}_DATE`] || "2024-01-01T00:00";
    const route = `/${name.toLowerCase().replace(/\s+/g, "-")}`;

    // Ensure the date string is valid
    const lastIncidentDate = new Date(dateStr);
    const validLastIncidentDate = !isNaN(lastIncidentDate.getTime())
      ? lastIncidentDate.toISOString()
      : new Date("2024-01-01T00:00:00Z").toISOString();

    sites[route] = {
      name: name,
      lastIncidentDate: validLastIncidentDate, // str
      todaysDate: today.toISOString(), // Add today's date
      status: "resolved", // Add a default status
      detail: "No details provided", // Add a default detail
    };
  }

  return sites;
};

export default App;
