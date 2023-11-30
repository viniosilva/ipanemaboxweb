import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Toast, { ToastBox, setToast, Props as ToastProps, getToast } from "./Toast";
import styles from "./toast.module.css";
import { act } from "react-dom/test-utils";

describe("components", () => {
  describe("atoms", () => {
    describe("Toast", () => {
      test("should render for 6 seconds", async () => {
        vi.useFakeTimers();
        const { container } = render(<Toast type="info" message="Testing" />);

        expect(container).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();

        await act(() => vi.advanceTimersByTime(1000 * 6000));

        expect(screen.queryByText("Testing")).toBeNull();
      });

      test("should close toast when click on close", async () => {
        vi.useFakeTimers();
        const { container } = render(<Toast type="info" message="Testing" />);

        expect(container).toBeDefined();
        const e = container.querySelector(
          `div > svg.${styles.close}`
        ) as HTMLElement;

        fireEvent.click(e);
        await act(() => vi.advanceTimersByTime(1000));

        expect(screen.queryByText("Testing")).toBeNull();
      });
    });

    describe("ToastBox", () => {
      test("should render", () => {
        const toasts = [<Toast type="info" message="Testing" />];
        const { container } = render(<ToastBox toasts={toasts} />);

        expect(container).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
      });
    });

    describe("setToast", () => {
      test("should be successful", () => {
        const setItemMock = vi.fn();
        setItemMock.mockReturnThis();

        vi.spyOn(Storage.prototype, "setItem").mockReturnValueOnce(setItemMock());

        setToast({ type: "warning", message: "Testing" });

        expect(setItemMock).toHaveBeenCalledOnce();
      });
    });

    describe("getToast", () => {
      test("should be successful", () => {
        const toast = { type: "info", message: "Testing" } as ToastProps;
        
        const setToastsMock = vi.fn();
        setToastsMock.mockReturnThis();
        
        vi.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(toast));
        vi.spyOn(Storage.prototype, "removeItem").mockReturnValueOnce();

        getToast(setToastsMock);

        expect(setToastsMock).toHaveBeenCalledOnce();
      });

      test("should do nothing when localStorage is empty", () => {
        const setToastsMock = vi.fn();
        setToastsMock.mockReturnThis();
        
        vi.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(null);
        
        getToast(setToastsMock);
        expect(setToastsMock).not.toHaveBeenCalledOnce();
      });
    });
  });
});
