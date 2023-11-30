import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import Input from "./Input";

describe("components", () => {
  describe("atoms", () => {
    describe("Input", () => {
      test("should render when has a classname", () => {
        const { container } = render(
          <Input classname="extraclass" name="testing" type="text" placeholder="example text" />
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(classNames).contains("extraclass");
        expect(e.getAttribute("name")).toBe("testing")
        expect(e.getAttribute("placeholder")).toBe("example text")
      });
    });
  });
});
