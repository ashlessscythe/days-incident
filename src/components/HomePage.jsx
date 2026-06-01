import { useDemoCalendar } from "../hooks/useDemoCalendar";
import CurrentMonth from "./CurrentMonth";
import IncidentCross from "./IncidentCross";
import IncidentDetails from "./IncidentDetails";
import IncidentsDaysAgo from "./IncidentsDaysAgo";

const HomePage = () => {
  const demoData = useDemoCalendar();

  return (
    <main className="site-page home-demo">
      <h1 className="site-title">Incident Tracker</h1>
      <p className="home-tagline">Sample dashboard</p>

      <IncidentsDaysAgo data={demoData} />
      <div className="home-cross-wrap">
        <IncidentCross data={demoData} />
      </div>
      <CurrentMonth data={demoData} />
      <IncidentDetails data={demoData} />
    </main>
  );
};

export default HomePage;
