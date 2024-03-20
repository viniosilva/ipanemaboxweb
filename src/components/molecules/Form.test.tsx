import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
  test("should render", () => {
    render(<Form><p>Testing</p></Form>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
});
