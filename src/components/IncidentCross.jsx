import React from "react";

const IncidentCross = React.memo(({ data }) => {
  const lastRecordableDate = new Date(data.lastRecordableDate);
  const lastNonOshaDate = new Date(data.lastNonOshaDate);
  const today = new Date(data.todaysDate);

  // boolean fill before today's date if incident date is previous month
  const fillBeforeToday =
    lastRecordableDate.getFullYear() < today.getFullYear() ||
    (lastRecordableDate.getFullYear() === today.getFullYear() &&
      lastRecordableDate.getMonth() < today.getMonth());

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
          const isRecordable =
            (fillBeforeToday && dayCounter <= today.getDate()) ||
            (!fillBeforeToday &&
              dayCounter >= lastRecordableDate.getDate() &&
              dayCounter <= today.getDate());
              
          const isNonOsha =
            (fillBeforeToday && dayCounter <= today.getDate()) ||
            (!fillBeforeToday &&
              dayCounter >= lastNonOshaDate.getDate() &&
              dayCounter <= today.getDate());

          let squareClass = "cross-square";
          if (isRecordable) {
            squareClass += " green";
          } else if (isNonOsha) {
            squareClass += " blue";
          }

          squares.push(
            <div
              key={`${rowIndex}-${colIndex}`}
              className={squareClass}
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
