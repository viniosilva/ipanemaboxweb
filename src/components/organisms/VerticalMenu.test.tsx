import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import VerticalMenu from "./VerticalMenu";
import styles from "./VerticalMenu.module.css";

describe("VerticalMenu", () => {
  test("should render showing menu when should be visible", () => {
    const { container } = render(<VerticalMenu showMenu={true} />);

    const nav = container.firstChild as HTMLElement;
    
    expect(nav.classList.contains(styles.hiddenMenu)).toBeFalsy();
  });

  test("should render hiddening menu when should be invisible", () => {
    const { container } = render(<VerticalMenu showMenu={false} />);

    const nav = container.children[1];

    expect(nav.classList.contains(styles.hiddenMenu)).toBeTruthy();
  });
});
