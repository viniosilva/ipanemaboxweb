import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddCustomer from "./AddCustomer";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => navigateMock,
  };
});

const createCustomerMock = vi.fn();
vi.mock("../../integrations/customers", async () => {
  const mod = await vi.importActual("../../integrations/customers");
  return {
    ...mod,
    createCustomer: () => createCustomerMock(),
  };
});

describe("pages", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    createCustomerMock.mockClear();
  });

  describe("customers", () => {
    describe("AddCustomer", () => {
      test("should render", () => {
        render(
          <MemoryRouter>
            <AddCustomer />
          </MemoryRouter>
        );

        expect(screen.getByText("Novo cliente")).toBeDefined();
      });

      test("should call formOnSubmit when click on Salvar", async () => {
        const { container } = render(
          <MemoryRouter>
            <AddCustomer />
          </MemoryRouter>
        );

        const submit = container.querySelector(
          "section > form"
        ) as HTMLElement;

        fireEvent.submit(submit);
        await waitFor(() => {
          expect(createCustomerMock).toHaveBeenCalledOnce();
          expect(navigateMock).toHaveBeenCalledOnce();
        });
      });
    });
  });
});
