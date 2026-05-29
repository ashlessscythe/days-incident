import React from "react";

const IncidentsDaysAgo = React.memo(({ data }) => {
  if (!data || !data.todaysDate || !data.lastRecordableDate || !data.lastNonOshaDate) {
    return <div className="loading">Loading…</div>;
  }
  const recordableDays = getDaysAgo(data.lastRecordableDate, data.todaysDate);
  const nonOshaDays = getDaysAgo(data.lastNonOshaDate, data.todaysDate);

  return (
    <section className="days-hero" aria-label="Days since last incident">
      <div className="days-stat">
        <span className="days-label">Recordable</span>
        <span className="days-value">{recordableDays.toLocaleString()}</span>
        <span className="days-unit">days</span>
      </div>
      <div className="days-stat">
        <span className="days-label">Non-recordable</span>
        <span className="days-value">{nonOshaDays.toLocaleString()}</span>
        <span className="days-unit">days</span>
      </div>
    </section>
  );
});

function getDaysAgo(dateString, todaysDate) {
  const dateFrom = new Date(dateString);
  const today = new Date(todaysDate);
  const timeDiff = today - dateFrom;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

export default IncidentsDaysAgo;
