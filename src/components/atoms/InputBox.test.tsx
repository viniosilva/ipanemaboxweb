import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import InputBox from "./InputBox";

describe("InputBox", () => {
  test("should render", () => {
    render(<InputBox><p>Testing</p></InputBox>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
});
