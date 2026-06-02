import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CurrentMonth from "./components/CurrentMonth";
import IncidentCross from "./components/IncidentCross";
import IncidentDetails from "./components/IncidentDetails";
import IncidentsDaysAgo from "./components/IncidentsDaysAgo";
import HomePage from "./components/HomePage";

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
        <div className="app-backdrop" aria-hidden>
          <div className="app-orb app-orb-green" />
          <div className="app-orb app-orb-blue" />
          <div className="app-orb app-orb-violet" />
          <div className="app-grid" />
        </div>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {Object.entries(sitesData).map(([route, site]) => (
              <Route
                key={route}
                path={route.substring(1)}
                element={<SitePage data={site} />}
              />
            ))}
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

const SitePage = ({ data }) => {
  return (
    <main className="site-page">
      <header className="site-header shrink-0 text-center">
        <h1 className="site-title">{data.name}</h1>
      </header>
      <IncidentsDaysAgo data={data} />
      <div className="home-cross-wrap">
        <IncidentCross data={data} />
      </div>
      <CurrentMonth data={data} />
      <IncidentDetails data={data} />
    </main>
  );
};

const getSitesData = () => {
  const siteCount = parseInt(import.meta.env.VITE_SITE_COUNT, 10) || 0;
  const sites = {};
  const today = new Date();

  for (let i = 1; i <= siteCount; i++) {
    const name = import.meta.env[`VITE_SITE_${i}_NAME`] || `Site ${i}`;
    const recordableDateStr = import.meta.env[`VITE_SITE_${i}_RECORDABLE_DATE`] || "2024-01-01T00:00";
    const nonOshaDateStr = import.meta.env[`VITE_SITE_${i}_NON_OSHA_DATE`] || "2024-01-01T00:00";
    const route = `/${name.toLowerCase().replace(/\s+/g, "_")}`;

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
