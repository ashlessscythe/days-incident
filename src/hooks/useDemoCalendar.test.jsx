import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDemoCalendar } from "./useDemoCalendar";

describe("useDemoCalendar", () => {
  it("returns demo data stable across rerenders", () => {
    const { result, rerender } = renderHook(() => useDemoCalendar());
    const first = result.current;

    rerender();

    expect(result.current).toBe(first);
    expect(result.current.name).toBe("Demo");
    expect(result.current.todaysDate).toBeTruthy();
  });
});
