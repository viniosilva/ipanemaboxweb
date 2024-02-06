import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should render", () => {
    render(<App />);

    const p = screen.getByText("Olá mundo! (:");

    expect(p).toBeDefined();
  });
});
