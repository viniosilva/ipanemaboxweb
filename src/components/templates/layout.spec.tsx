import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Layout from "./Layout";
import styles from "./layout.module.css";

describe("components", () => {
  describe("templates", () => {
    describe("Layout", () => {
      test("should render", () => {
        const { container } = render(
          <Layout title="Title">
            <p>Testing</p>
          </Layout>
        );

        expect(container).toBeDefined();
        expect(screen.getByText("Title")).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
      });

      test("should show menu when click on bars", async () => {
        const { container } = render(<Layout title="Title"></Layout>);

        global.window.innerWidth = 599;
        global.window.dispatchEvent(new Event("resize"));

        const bars = container.querySelector(
          `div.${styles.layout} > header > .${styles.bars}`
        ) as HTMLElement;

        fireEvent.click(bars);

        await waitFor(() => {
          const menu = container.querySelector(
            `div.${styles.layout} > nav`
          ) as HTMLElement;
          const classNames = Array.from(menu?.classList).join(" ");
          expect(classNames).not.contains("hidden");
        });
      });

      test("should hidden menu when click two timer on bars", async () => {
        const { container } = render(<Layout title="Title"></Layout>);

        global.window.innerWidth = 599;
        global.window.dispatchEvent(new Event("resize"));

        const bars = container.querySelector(
          `div.${styles.layout} > header > .${styles.bars}`
        ) as HTMLElement;

        fireEvent.click(bars);

        await waitFor(async () => {
          const menu = container.querySelector(
            `div.${styles.layout} > nav.${styles.mobileMenu}`
          ) as HTMLElement;
          const menuBars = container.querySelector(
            `div.${styles.layout} > nav.${styles.mobileMenu} > .${styles.bars}`
          ) as HTMLElement;

          fireEvent.click(menuBars);

          await waitFor(() => {
            const classNames = Array.from(menu?.classList).join(" ");
            expect(classNames).contains("hidden");
          });
        });
      });
    });
  });
});
