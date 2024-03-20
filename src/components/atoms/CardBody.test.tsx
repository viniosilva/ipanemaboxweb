import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CardBody from "./CardBody";

describe("CardBody", () => {
  test("should render", () => {
    render(<CardBody>Testing</CardBody>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
});
