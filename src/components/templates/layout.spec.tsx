import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Layout from "./Layout";
import styles from "./layout.module.css";
import { MemoryRouter } from "react-router-dom";

describe("components", () => {
  describe("templates", () => {
    describe("Layout", () => {
      test("should render with breadcrumbs", () => {
        const { container } = render(
          <MemoryRouter>
            <Layout title="Title" breadcrumbItems={[{name:"Item 1"}]}>
              <p>Testing</p>
            </Layout>
          </MemoryRouter>
        );

        expect(container).toBeDefined();
        expect(screen.getByText("Title")).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
        expect(screen.getByText("Item 1")).toBeDefined();
      });

      test("should show menu when click on bars", async () => {
        const { container } = render(
          <MemoryRouter>
            <Layout title="Title"></Layout>
          </MemoryRouter>
        );

        global.window.innerWidth = 699;
        global.window.dispatchEvent(new Event("resize"));

        await waitFor(async () => {
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
      });

      test("should hidden menu when click two timer on bars", async () => {
        const { container } = render(
          <MemoryRouter>
            <Layout title="Title"></Layout>
          </MemoryRouter>
        );

        global.window.innerWidth = 699;
        global.window.dispatchEvent(new Event("resize"));

        await waitFor(async () => {
          const bars = container.querySelector(
            `div.${styles.layout} > header > .${styles.bars}`
          ) as HTMLElement;

          fireEvent.click(bars);

          await waitFor(async () => {
            const menu = container.querySelector(
              `div.${styles.layout} > nav`
            ) as HTMLElement;
            const menuBars = container.querySelector(
              `div.${styles.layout} > nav > .${styles.bars}`
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
});
