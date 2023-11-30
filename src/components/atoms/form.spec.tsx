import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./Form";

describe("components", () => {
  describe("atoms", () => {
    describe("Form", () => {
      test("should render when has a classname", () => {
        const { container } = render(
          <Form classname="extraclass" onSubmit={vi.fn()}><p>Testing</p></Form>
        );

        const e = container.firstChild as HTMLElement;
        const classNames = Array.from(e?.classList).join(" ");

        expect(container).toBeDefined();
        expect(classNames).contains("extraclass");
        expect(screen.getByText("Testing")).toBeDefined();
      });

      test("should submit when submit form", async () => {
        const onSubmitMock = vi.fn();
        const { container } = render(<Form onSubmit={onSubmitMock} />);

        const e = container.firstChild as HTMLElement;

        fireEvent.submit(e)

        await waitFor(() => {
          expect(onSubmitMock).toHaveBeenCalledOnce();
        })
      });
    });
  });
});
