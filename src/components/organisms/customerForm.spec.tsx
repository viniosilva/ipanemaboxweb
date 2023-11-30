import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import styles from "./customerForm.module.css";
import CustomerForm from "./CustomerForm";
import Customer from "../../models/customer";

describe("components", () => {
  describe("organisms", () => {
    describe("CustomerForm", () => {
      test("should render when is create customer flow", () => {
        const { container } = render(
          <CustomerForm
            customer={{} as Customer}
            setCustomer={vi.fn()}
            onSubmit={vi.fn()}
          />
        );

        expect(container).toBeDefined();
        expect(screen.getByText("Nome")).toBeDefined();
        expect(screen.getByText("Email")).toBeDefined();
      });

      test("should update fields when input new values", async () => {
        const { container } = render(
          <CustomerForm
            customer={{} as Customer}
            setCustomer={vi.fn()}
            onSubmit={vi.fn()}
          />
        );

        const inputName = container.querySelector(
          `form.${styles.form} > div > input[name="name"]`
        ) as HTMLInputElement;
        fireEvent.change(inputName, { target: { value: "Testing" } });

        const inputEmail = container.querySelector(
          `form.${styles.form} > div > input[name="email"]`
        ) as HTMLInputElement;
        fireEvent.change(inputEmail, { target: { value: "unit@test.com" } });

        await waitFor(() => {
          expect(inputName.value).toEqual("Testing");
          expect(inputEmail.value).toEqual("unit@test.com");
        });
      });

      test("should call formOnSubmit when click on submit form", async () => {
        const onSubmitMock = vi.fn();
        const { container } = render(
          <CustomerForm
            customer={{} as Customer}
            setCustomer={vi.fn()}
            onSubmit={onSubmitMock}
          />
        );

        const submit = container.querySelector(
          `form.${styles.form}`
        ) as HTMLElement;

        fireEvent.submit(submit);
        await waitFor(() => {
          expect(onSubmitMock).toHaveBeenCalledOnce();
        });
      });
    });
  });
});
