import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionBox from "./SectionBox";

describe("components", () => {
  describe("atoms", () => {
    describe("SectionBox", () => {
      test("should render", () => {
        const { container } = render(
          <SectionBox classname="extraclass">
            <p>Testing</p>
          </SectionBox>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
        expect(classNames).contains("extraclass");
      });
    });
  });
});
