import React from "react";

const CurrentMonth = React.memo(({ data }) => {
  if (!data || !data.todaysDate) {
    return <div>Loading incident data</div>;
  }
  const currentDate = new Date(data.todaysDate) || new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const text = `${currentMonth} ${currentYear}`;
  return (
    <div className="current-month">
      <p className="body-month">{text}</p>
    </div>
  );
});

export default CurrentMonth;
