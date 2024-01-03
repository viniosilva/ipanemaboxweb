import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Confirm from "./Confirm";

describe("components", () => {
  describe("molecules", () => {
    describe("Confirm", () => {
      test("should render", () => {
        const { container } = render(
          <Confirm onConfirm={vi.fn()} onReject={vi.fn()} text="Testing" />
        );

        expect(container).toBeDefined();
        expect(screen.getByText("Testing")).toBeDefined();
      });

      test("should render when is invisible", () => {
        const { container } = render(
          <Confirm
            onConfirm={vi.fn()}
            onReject={vi.fn()}
            hidden={true}
            text="Testing"
          />
        );

        expect(container.classList.contains("invisible")).toBeDefined();
      });

      test("should call onConfirm when click on Sim", async () => {
        const onConfirmMock = vi.fn();
        const onRejectMock = vi.fn();

        render(
          <Confirm
            onConfirm={onConfirmMock}
            onReject={onRejectMock}
            text="Testing"
          />
        );

        fireEvent.click(screen.getByText("Sim"));
        await waitFor(() => {
          expect(onConfirmMock).toHaveBeenCalledOnce();
          expect(onRejectMock).toHaveBeenCalledOnce();
        });
      });

      test("should call onReject when click on Não", async () => {
        const onRejectMock = vi.fn();

        render(
          <Confirm
            onConfirm={vi.fn()}
            onReject={onRejectMock}
            text="Testing"
          />
        );

        fireEvent.click(screen.getByText("Não"));
        await waitFor(() => {
          expect(onRejectMock).toHaveBeenCalledOnce();
        });
      });
    });
  });
});
