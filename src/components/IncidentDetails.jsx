import React from "react";

const IncidentDetails = React.memo(({ data }) => {
  if (!data || !data.lastIncidentDate) {
    return <div>Loading incident data....</div>;
  }
  return (
    <div className="incident-details">
      <p className="body-text">
        Last Incident date: {GetFormattedDate(data.lastIncidentDate)}
      </p>
    </div>
  );
});

function GetFormattedDate(datestr) {
  const dateTime = new Date(datestr);

  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = dateTime.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default IncidentDetails;
