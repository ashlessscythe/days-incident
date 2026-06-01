import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the demo dashboard", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /incident tracker/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/sample dashboard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/days since last incident/i)).toBeInTheDocument();
  });
});
