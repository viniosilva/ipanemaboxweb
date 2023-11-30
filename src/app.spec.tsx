import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  test("should render", () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(container).toBeDefined();
    expect(screen.getByText("Olá mundo!")).toBeDefined();
  });
});
