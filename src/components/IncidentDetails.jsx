import React from "react";

const IncidentDetails = React.memo(({ data }) => {
  if (!data || !data.lastRecordableDate || !data.lastNonOshaDate) {
    return null;
  }
  return (
    <footer className="incident-details">
      <p>
        <span className="detail-label">Recordable</span>
        {formatDate(data.lastRecordableDate)}
      </p>
      <p>
        <span className="detail-label">Non-recordable</span>
        {formatDate(data.lastNonOshaDate)}
      </p>
    </footer>
  );
});

function formatDate(datestr) {
  const d = new Date(datestr);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default IncidentDetails;
