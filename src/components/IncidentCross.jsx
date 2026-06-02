import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const IncidentCross = React.memo(({ data }) => {
  const lastRecordableDate = new Date(data.lastRecordableDate);
  const lastNonOshaDate = new Date(data.lastNonOshaDate);
  const today = new Date(data.todaysDate);

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

          let tone = "empty";
          if (isRecordable) tone = "recordable";
          else if (isNonOsha) tone = "non-recordable";

          squares.push(
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn("cross-square", tone !== "empty" && tone)}
              data-tone={tone}
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
            />
          );
        }
      });
    });

    return squares;
  };

  return (
    <Card className="incident-chart-card border-border/50 bg-card/70 py-0 shadow-[0_12px_48px_oklch(0_0_0/30%)] backdrop-blur-md">
      <CardContent className="incident-chart-wrap px-3 py-3 sm:px-4 sm:py-4">
        <div className="incident-chart">{renderSquares()}</div>
      </CardContent>
    </Card>
  );
});

export default IncidentCross;
