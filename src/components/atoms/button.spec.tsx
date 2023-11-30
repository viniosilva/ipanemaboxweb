import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { MemoryRouter } from "react-router-dom";

describe("components", () => {
  describe("atoms", () => {
    describe("Button", () => {
      test("should render button when type is primary and has a classname", () => {
        const { container } = render(
          <Button classname="extraclass" category="primary">
            Testing
          </Button>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
        expect(classNames).contains("primary");
        expect(classNames).contains("extraclass");
      });

      test("should render button link when type is info", () => {
        const { container } = render(
          <MemoryRouter>
            <Button category="info" to="/">
              Testing
            </Button>
          </MemoryRouter>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(e.tagName.toLowerCase()).toBe("a");
        expect(screen.getByText("Testing")).toBeDefined();
        expect(classNames).contains("info");
      });

      test("should render button submit when type is success", () => {
        const { container } = render(
          <Button category="success" type="submit">
            Testing
          </Button>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(e.tagName.toLowerCase()).toBe("input");
        expect(screen.getByText("Testing")).toBeDefined();
        expect(classNames).contains("success");
      });
    });
  });
});
