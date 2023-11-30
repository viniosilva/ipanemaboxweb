import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import InputBox from "./InputBox";

describe("components", () => {
  describe("atoms", () => {
    describe("InputBox", () => {
      test("should render when has a classname", () => {
        const { container } = render(
          <InputBox classname="extraclass"><p>Testing</p></InputBox>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(classNames).contains("extraclass");
        expect(screen.getByText("Testing")).toBeDefined();
      });
    });
  });
});
