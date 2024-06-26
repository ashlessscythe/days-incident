import React, { useState, useEffect } from "react";
import "./App.css";
import CurrentMonth from "./components/CurrentMonth";
import IncidentCross from "./components/IncidentCross";
import IncidentDetails from "./components/IncidentDetails";
import IncidentsDaysAgo from "./components/IncidentsDaysAgo";

function App() {
  const [apiDataJson, setApiDataJson] = useState(0);

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
    <div className="App">
      <header className="App-header">
        {apiDataJson ? (
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
        )}
      </header>
    </div>
  );
}

const getIncidentData = async () => {
  const todaysDateOverride = process.env.REACT_APP_TODAYS_DATE_OVERRIDE;
  const statusOverride = process.env.REACT_APP_STATUS;
  const lastIncidentDetailOverride = process.env.REACT_APP_LAST_INCIDENT_DETAIL;
  const lastIncidentDateOverride = process.env.REACT_APP_LAST_INCIDENT_DATE;

  console.log("process.env is:", process.env);

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
