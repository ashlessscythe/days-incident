import React from "react";
import { Badge } from "@/components/ui/badge";

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
    <div className="current-month shrink-0" aria-label="Current month">
      <Badge
        variant="secondary"
        className="body-month border-border/50 px-4 py-1.5 text-base font-semibold tracking-wide sm:text-lg"
      >
        {text}
      </Badge>
    </div>
  );
});

export default CurrentMonth;
