import React from "react";

const IncidentDetails = React.memo(({ apiDataJson }) => {
  const subtitle = `Last Incident Status: ${apiDataJson.status}`;

  return (
    <div className="incident-details">
      {/* <p className="body-subtitle">{subtitle}</p>
      <p className="body-text">Details: {apiDataJson.detail}</p> */}
      <p className="body-text">
        Last Incident date: {GetFormattedDate(apiDataJson.lastIncidentDate)}
      </p>
    </div>
  );
});

function GetFormattedDate(date) {
  const dateTime = new Date(date);

  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = dateTime.getDate().toString().padStart(2, "0");
  // const hours = dateTime.getHours().toString().padStart(2, "0");
  // const minutes = dateTime.getMinutes().toString().padStart(2, "0");

  // return `${year}-${month}-${day} @ ${hours}:${minutes}`;
  return `${year}-${month}-${day}`;
}

export default IncidentDetails;
