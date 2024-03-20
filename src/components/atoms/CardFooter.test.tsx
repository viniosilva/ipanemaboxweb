import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CardFooter from "./CardFooter";

describe("CardFooter", () => {
  test("should render", () => {
    const { container } = render(
      <CardFooter className="cls">Testing</CardFooter>
    );

    expect(container.children[0]?.classList.contains("cls")).toBeTruthy();
    expect(screen.getByText("Testing")).toBeDefined();
  });
});
