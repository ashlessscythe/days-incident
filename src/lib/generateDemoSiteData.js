const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Builds site-shaped demo data with incident dates in the current month
 * so the cross shows a mix of green, blue, and neutral cells.
 */
export function generateDemoSiteData(today = new Date()) {
  const year = today.getFullYear();
  const month = today.getMonth();
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let recordableDay;
  let nonOshaDay;

  if (dayOfMonth >= 4) {
    recordableDay = randomInt(1, dayOfMonth - 3);
    nonOshaDay = randomInt(recordableDay + 1, dayOfMonth);
  } else {
    // Early in the month: anchor incidents in the previous month for variety
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    recordableDay = randomInt(Math.max(1, prevDays - 10), prevDays);
    nonOshaDay = randomInt(1, Math.min(dayOfMonth, daysInMonth));

    const lastRecordableDate = new Date(prevYear, prevMonth, recordableDay, 12, 0, 0);
    const lastNonOshaDate = new Date(year, month, nonOshaDay, 12, 0, 0);

    return buildPayload(today, lastRecordableDate, lastNonOshaDate);
  }

  const lastRecordableDate = new Date(year, month, recordableDay, 12, 0, 0);
  const lastNonOshaDate = new Date(year, month, nonOshaDay, 12, 0, 0);

  return buildPayload(today, lastRecordableDate, lastNonOshaDate);
}

function buildPayload(today, lastRecordableDate, lastNonOshaDate) {
  return {
    name: "Demo",
    lastRecordableDate: lastRecordableDate.toISOString(),
    lastNonOshaDate: lastNonOshaDate.toISOString(),
    todaysDate: today.toISOString(),
    status: "resolved",
    detail: "Sample data — refreshes on reload",
  };
}
