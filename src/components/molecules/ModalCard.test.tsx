import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ModalCard from "./ModalCard";

describe("ModalCard", () => {
  test("should render", () => {
    render(<ModalCard show={true}>Testing</ModalCard>);

    expect(screen.getByText("Testing")).toBeDefined();
  });
});
