import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("should render when tipe is primary", () => {
    render(<Button type="primary" onClick={vi.fn}>Testing</Button>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
  
  test("should render when tipe is neutral", () => {
    render(<Button type="neutral" onClick={vi.fn}>Testing</Button>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
});
