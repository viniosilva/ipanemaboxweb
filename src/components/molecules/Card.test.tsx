import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("should render", () => {
    render(<Card>Testing</Card>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
});
