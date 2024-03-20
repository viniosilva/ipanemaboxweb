import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  test("should render", () => {
    render(<Layout />);

    const itemMenu = screen.getByText("Início");

    expect(itemMenu).toBeDefined();
  });

  test("should toggle menu when menu icon is clicked", async () => {
    const { container } = render(<Layout />);

    let menu = container.querySelector("nav") as HTMLElement;
    let classNames = Array.from(menu?.classList).join(" ");

    expect(classNames).contains("hiddenMenu");

    const menuIcon = container.querySelector("header > svg") as HTMLElement;
    fireEvent.click(menuIcon);

    await waitFor(() => {
      menu = container.querySelector("nav") as HTMLElement;
      classNames = Array.from(menu?.classList).join(" ");
      
      expect(classNames).not.contains("hiddenMenu");
    });
  });
});
