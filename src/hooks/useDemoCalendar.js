import { useState } from "react";
import { generateDemoSiteData } from "../lib/generateDemoSiteData";

/** One random demo calendar per page load. */
export function useDemoCalendar() {
  const [data] = useState(() => generateDemoSiteData());
  return data;
}
