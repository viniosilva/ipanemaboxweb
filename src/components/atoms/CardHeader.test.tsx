import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CardHeader from "./CardHeader";

describe("CardHeader", () => {
  test("should render", () => {
    const { container } = render(
      <CardHeader className="cls">Testing</CardHeader>
    );

    expect(screen.getByText("Testing")).toBeDefined();
    expect(container.children[0]?.classList.contains("cls")).toBeTruthy();
  });
});
