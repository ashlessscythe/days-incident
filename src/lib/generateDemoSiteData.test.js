import { afterEach, describe, expect, it, vi } from "vitest";
import { generateDemoSiteData } from "./generateDemoSiteData";

describe("generateDemoSiteData", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns site-shaped payload with ISO date fields", () => {
    const today = new Date(2026, 5, 15, 9, 0, 0);
    vi.spyOn(Math, "random").mockReturnValue(0);

    const data = generateDemoSiteData(today);

    expect(data).toMatchObject({
      name: "Demo",
      status: "resolved",
      detail: expect.stringContaining("Sample data"),
    });
    expect(data.todaysDate).toBe(today.toISOString());
    expect(() => new Date(data.lastRecordableDate)).not.toThrow();
    expect(() => new Date(data.lastNonOshaDate)).not.toThrow();
  });

  it("places both incidents in the current month when day >= 4", () => {
    const today = new Date(2026, 5, 15, 9, 0, 0);
    vi.spyOn(Math, "random").mockReturnValue(0);

    const data = generateDemoSiteData(today);
    const recordable = new Date(data.lastRecordableDate);
    const nonOsha = new Date(data.lastNonOshaDate);

    expect(recordable.getMonth()).toBe(5);
    expect(nonOsha.getMonth()).toBe(5);
    expect(recordable.getDate()).toBeLessThan(nonOsha.getDate());
    expect(nonOsha.getDate()).toBeLessThanOrEqual(15);
  });

  it("uses previous month for recordable when early in the month", () => {
    const today = new Date(2026, 5, 2, 9, 0, 0);
    vi.spyOn(Math, "random").mockReturnValue(0);

    const data = generateDemoSiteData(today);
    const recordable = new Date(data.lastRecordableDate);
    const nonOsha = new Date(data.lastNonOshaDate);

    expect(recordable.getMonth()).toBe(4);
    expect(nonOsha.getMonth()).toBe(5);
  });
});
