import React from "react";

const IncidentCross = React.memo(({ data }) => {
  if (!data || !data.lastIncidentDate) {
    return <div>Loading incident data</div>;
  }
  const lastIncidentDate = new Date(data.lastIncidentDate);
  const today = new Date(data.todaysDate);

  // flag if highlight all days of current month up to today
  const highlightAllDays =
    lastIncidentDate.getFullYear() < today.getFullYear() ||
    lastIncidentDate.getMonth() < today.getMonth() ||
    (lastIncidentDate.getFullYear() === today.getFullYear() &&
      lastIncidentDate.getMonth() < today.getMonth);

  const renderSquares = () => {
    const squares = [];
    const layout = [
      [false, false, false, true, true, false, false, false],
      [false, false, false, true, true, false, false, false],
      [false, false, false, true, true, false, false, false],
      [false, false, false, true, true, false, false, false],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [false, false, false, true, true, false, false, false],
      [false, false, false, true, true, false, false, false],
      [false, false, false, true, true, false, false, false],
      [false, false, false, true, true, false, false, false],
    ];

    let dayCounter = 1;
    let stopLoop = false;

    layout.forEach((row, rowIndex) => {
      if (stopLoop) return;
      row.forEach((isVisible, colIndex) => {
        if (stopLoop) return;
        if (isVisible) {
          const isGreen =
            highlightAllDays ||
            (dayCounter > lastIncidentDate.getDate() &&
              dayCounter <= today.getDate());
          squares.push(
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cross-square ${isGreen ? "green" : ""}`}
            >
              {dayCounter}
            </div>
          );
          if (dayCounter === today.getDate()) {
            stopLoop = true;
          }
          dayCounter++;
        } else {
          squares.push(
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cross-square hidden"
            ></div>
          );
        }
      });
    });

    return squares;
  };

  return <div className="incident-chart">{renderSquares()}</div>;
});

export default IncidentCross;
