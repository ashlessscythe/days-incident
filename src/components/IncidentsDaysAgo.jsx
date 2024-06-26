import React from "react";

const IncidentsDaysAgo = React.memo(({ apiDataJson }) => {
  const daysAgo = getDaysAgo(
    apiDataJson.lastIncidentDate,
    apiDataJson.todaysDate
  );
  const formattedDaysAgo = daysAgo.toLocaleString();
  let text = `Days without safety incidents: ${formattedDaysAgo}`;

  return (
    <div className="incidents-days-ago">
      <p className="body-title">{text}</p>
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
