import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import CurrentMonth from "./components/CurrentMonth";
import IncidentCross from "./components/IncidentCross";
import IncidentDetails from "./components/IncidentDetails";
import IncidentsDaysAgo from "./components/IncidentsDaysAgo";

function App() {
  const [apiDataJson, setApiDataJson] = useState(null);

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const data = await getIncidentData();
        console.log("data is: ", data);
        setApiDataJson(data);
      } catch (e) {
        console.error("Failed to fetch incident data:", e);
        setApiDataJson(getDefaultIncidentData());
      }
    };

    fetchIncidentData();
    const interval = setInterval(fetchIncidentData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/screenshot">Screenshot</Link>
          </nav> */}
          <Routes>
            <Route path="/" element={<HomePage apiDataJson={apiDataJson} />} />
            <Route path="/screenshot" element={<ScreenshotPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

const HomePage = ({ apiDataJson }) => {
  return apiDataJson ? (
    <>
      <CurrentMonth apiDataJson={apiDataJson} />
      <IncidentCross apiDataJson={apiDataJson} />
      <IncidentsDaysAgo apiDataJson={apiDataJson} />
      <IncidentDetails apiDataJson={apiDataJson} />
    </>
  ) : (
    <>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

const ScreenshotPage = () => {
  const [screenshotUrl, setScreenshotUrl] = useState(null);

  useEffect(() => {
    fetch("/screenshot.png")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setScreenshotUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching screenshot:", error);
      });
  }, []);

  return (
    <div>
      {screenshotUrl ? (
        <img src={screenshotUrl} alt="Screenshot" />
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

const getIncidentData = async () => {
  const todaysDateOverride = import.meta.env.VITE_TODAYS_DATE_OVERRIDE;
  const statusOverride = import.meta.env.VITE_STATUS;
  const lastIncidentDetailOverride = import.meta.env.VITE_LAST_INCIDENT_DETAIL;
  const lastIncidentDateOverride = import.meta.env.VITE_LAST_INCIDENT_DATE;

  // console.log("process.env is:", process.env);

  // Combine environment variables, API data, and default values
  const today = todaysDateOverride ? new Date(todaysDateOverride) : new Date();

  const lastIncidentDate = lastIncidentDateOverride
    ? new Date(lastIncidentDateOverride)
    : new Date(0); // Default to epoch if not provided

  const status = statusOverride || "resolved";
  const detail = lastIncidentDetailOverride || "No detail provided";

  const payload = {
    detail: detail,
    lastIncidentDate: lastIncidentDate.toISOString(),
    todaysDate: today,
    status: status,
  };

  console.log("payload is: ", payload);

  return payload;
};

const getDefaultIncidentData = () => {
  return {
    detail: "No detail provided",
    lastIncidentDate: new Date(0).toISOString(),
    todaysDate: new Date(),
    status: "resolved",
  };
};

export default App;
