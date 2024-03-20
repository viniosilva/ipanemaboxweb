import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("should render", () => {
    const { container } = render(<Header menuIconOnClick={vi.fn}/>);

    expect(container).toBeDefined();
  });
});
