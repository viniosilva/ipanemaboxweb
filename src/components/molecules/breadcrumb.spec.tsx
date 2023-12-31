import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";
import { MemoryRouter } from "react-router-dom";

describe("components", () => {
  describe("molecules", () => {
    describe("Breadcrumb", () => {
      test("should render when has a classname", () => {
        const { container } = render(
          <MemoryRouter>
            <Breadcrumb
              classname="extraclass"
              items={[{ name: "Testing" }, { name: "TestingTo", to: "to" }]}
            />
          </MemoryRouter>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
        expect(screen.getByText("Testing").nodeName.toLowerCase()).toBe("li");
        expect(screen.getByText("TestingTo")).toBeDefined();
        expect(screen.getByText("TestingTo").nodeName.toLowerCase()).toBe("a");
        expect(classNames).contains("extraclass");
      });
    });
  });
});
