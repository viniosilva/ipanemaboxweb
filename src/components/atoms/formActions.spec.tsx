import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import FormActions from "./FormActions";

describe("components", () => {
  describe("atoms", () => {
    describe("FormActions", () => {
      test("should render when has a classname", () => {
        const { container } = render(
          <FormActions classname="extraclass"><p>Testing</p></FormActions>
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
