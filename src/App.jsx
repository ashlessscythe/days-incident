import { useState, useEffect } from "react";
import "./App.css";
import CurrentMonth from "./components/CurrentMonth";
import IncidentCross from "./components/IncidentCross";
import IncidentDetails from "./components/IncidentDetails";
import IncidentsDaysAgo from "./components/IncidentsDaysAgo";
import { server } from "./config";

function App() {
  const [apiDataJson, setApiDataJson] = useState(null);

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const data = await getIncidentData();
        setApiDataJson(data);
      } catch {
        setApiDataJson(null);
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
            {/* <IncidentCross apiDataJson={apiDataJson} />
            <IncidentsDaysAgo apiDataJson={apiDataJson} />
            <IncidentDetails apiDataJson={apiDataJson} /> */}
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

  // Fetch from API if any environment variables are missing
  let apiData = {};
  try {
    console.log("server is: ", server);
    const res = await fetch(`${server}/api/incidents/latest`);
    if (res.ok) {
      apiData = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch from API:", error);
  }

  // Combine environment variables, API data, and default values
  const today = todaysDateOverride
    ? new Date(todaysDateOverride)
    : apiData.todaysDateOverride
    ? new Date(apiData.todaysDateOverride)
    : new Date();

  const lastIncidentDate = lastIncidentDateOverride
    ? new Date(lastIncidentDateOverride)
    : new Date(apiData.lastIncidentDate || 0); // Default to epoch if not provided

  const status = statusOverride || apiData.status || "resolved";
  const detail =
    lastIncidentDetailOverride ||
    apiData.lastIncidentDetail ||
    "No detail provided";

  const payload = {
    detail: detail,
    lastIncidentDate: lastIncidentDate.toISOString(),
    todaysDate: today,
    status: status,
  };

  console.log("payload is: ", payload);

  return payload;
};

export default App;
