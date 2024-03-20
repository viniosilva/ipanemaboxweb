import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import Curtain from "./Curtain";
import styles from "./Curtain.module.css"

describe("Curtain", () => {
  test("should render invisible when show is not setted", () => {
    const { container } = render(<Curtain />);

    expect(container.children[0].classList.contains(styles.show)).toBeFalsy();
  });

  test("should render visible when show is true", () => {
    const { container } = render(<Curtain show={true} />);

    expect(container.children[0].classList.contains(styles.show)).toBeTruthy();
  });
});
