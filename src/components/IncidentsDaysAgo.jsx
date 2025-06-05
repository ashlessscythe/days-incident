import React from "react";

const IncidentsDaysAgo = React.memo(({ data }) => {
  if (!data || !data.todaysDate || !data.lastRecordableDate || !data.lastNonOshaDate) {
    return <div>Loading incident data...</div>;
  }
  const recordableDaysAgo = getDaysAgo(data.lastRecordableDate, data.todaysDate);
  const nonOshaDaysAgo = getDaysAgo(data.lastNonOshaDate, data.todaysDate);
  
  return (
    <div className="incidents-days-ago">
      <table className="days-table">
        <thead>
          <tr>
            <th>Recordable</th>
            <th>Non-Recordable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{recordableDaysAgo.toLocaleString()}</td>
            <td>{nonOshaDaysAgo.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

function getDaysAgo(dateString, todaysDate) {
  const dateFrom = new Date(dateString);
  const today = new Date(todaysDate);
  const timeDiff = today - dateFrom; // Milliseconds difference
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days and round up
  return diffDays;
}

export default IncidentsDaysAgo;
