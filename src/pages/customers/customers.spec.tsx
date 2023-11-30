import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Customers from "./Customers";
import styles from "./customers.module.css";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => navigateMock,
  };
});

describe("pages", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  describe("Customers", () => {
    test("should render", () => {
      const { container } = render(
        <MemoryRouter>
          <Customers />
        </MemoryRouter>
      );
      
      expect(container).toBeDefined();
      expect(screen.getByText("#")).toBeDefined();
      expect(screen.getByText("Nome")).toBeDefined();
      expect(screen.getByText("Email")).toBeDefined();
    });

    test("should navigate to customer details on click", async () => {
      const { container } = render(
        <MemoryRouter>
          <Customers />
        </MemoryRouter>
      );

      const tr = container.querySelector(`section.${styles.customers} > table > tbody > tr`) as HTMLElement;
      fireEvent.click(tr)

      await waitFor(() => {
        expect(navigateMock).toHaveBeenCalledOnce();
      });      
    });
  });
});
