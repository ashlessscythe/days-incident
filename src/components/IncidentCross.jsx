import React from "react";

const IncidentCross = React.memo(({ data }) => {
  const lastIncidentDate = new Date(data.lastIncidentDate);
  const today = new Date(data.todaysDate);

  // boolean fill before today's date if incident date is previous month
  const fillBeforeToday =
    lastIncidentDate.getFullYear() < today.getFullYear() ||
    (lastIncidentDate.getFullYear() === today.getFullYear() &&
      lastIncidentDate.getMonth() < today.getMonth());

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
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    layout.forEach((row, rowIndex) => {
      row.forEach((isVisible, colIndex) => {
        if (isVisible) {
          const isGreen =
            (fillBeforeToday && dayCounter <= today.getDate()) ||
            (!fillBeforeToday &&
              dayCounter >= lastIncidentDate.getDate() &&
              dayCounter <= today.getDate());
          squares.push(
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cross-square ${isGreen ? "green" : ""}`}
            >
              {dayCounter <= daysInMonth ? dayCounter : ""}
            </div>
          );
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
