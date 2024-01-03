import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import Curtain from "./Curtain";

describe("components", () => {
  describe("atoms", () => {
    describe("Curtain", () => {
      test("should render", () => {
        const { container } = render(<Curtain />);

        expect(container).toBeDefined();
      });
    });
  });
});
