import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditCustomer from "./EditCustomer";
import Customer from "../../models/customer";

const useParamsMock = vi.fn();
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: () => useParamsMock(),
    useNavigate: () => navigateMock,
  };
});

const getCustomerByIDMock = vi.fn();
const updateCustomerMock = vi.fn();
const deleteCustomerMock = vi.fn();
vi.mock("../../integrations/customers", async () => {
  const mod = await vi.importActual("../../integrations/customers");
  return {
    ...mod,
    getCustomerByID: () => getCustomerByIDMock(),
    updateCustomer: () => updateCustomerMock(),
    deleteCustomer: () => deleteCustomerMock(),
  };
});

describe("pages", () => {
  beforeEach(() => {
    useParamsMock.mockClear();
    navigateMock.mockClear();

    getCustomerByIDMock.mockClear();
    updateCustomerMock.mockClear();
    deleteCustomerMock.mockClear();
  })

  describe("customers", () => {
    describe("EditCustomer", () => {
      test("should render", () => {
        useParamsMock.mockReturnValue({ id: "1" });
        getCustomerByIDMock.mockReturnValueOnce({
          id: 1,
          name: "Testing",
          email: "unit@test.com",
        } as Customer);

        render(
          <MemoryRouter>
            <EditCustomer />
          </MemoryRouter>
        );

        expect(screen.getAllByText("Cliente Testing")).toHaveLength(2);
      });

      test("should render Carregando when customer is not found", () => {
        useParamsMock.mockReturnValue({ id: "1" });
        getCustomerByIDMock.mockReturnValueOnce(null);

        render(
          <MemoryRouter>
            <EditCustomer />
          </MemoryRouter>
        );

        expect(screen.getByText("Carregando...")).toBeDefined();
      });

      test("should call formOnSubmit when click on Salvar", async () => {
        useParamsMock.mockReturnValue({ id: "1" });
        getCustomerByIDMock.mockReturnValueOnce({
          id: 1,
          name: "Testing",
          email: "unit@test.com",
        } as Customer);

        const { container } = render(
          <MemoryRouter>
            <EditCustomer />
          </MemoryRouter>
        );

        const submit = container.querySelector(
          `section > form > div:last-child > input[type="submit"]`
        ) as HTMLElement;

        fireEvent.click(submit);
        await waitFor(() => {
          expect(updateCustomerMock).toHaveBeenCalledOnce();
          expect(navigateMock).toHaveBeenCalledOnce();
        });
      });

      test("should call deleteOnClick when click on Remover and confirm", async () => {
        useParamsMock.mockReturnValue({ id: "1" });
        getCustomerByIDMock.mockReturnValueOnce({
          id: 1,
          name: "Testing",
          email: "unit@test.com",
        } as Customer);
        vi.spyOn(window, "confirm").mockReturnValueOnce(true);

        const { container } = render(
          <MemoryRouter>
            <EditCustomer />
          </MemoryRouter>
        );

        const button = container.querySelector(
          `section > form > div:last-child > button`
        ) as HTMLElement;

        fireEvent.click(button);
        await waitFor(() => {
          expect(deleteCustomerMock).toHaveBeenCalledOnce();
          expect(navigateMock).toHaveBeenCalledOnce();
        });
      });

      test("should call deleteOnClick when click on Remover and no confirm", async () => {
        useParamsMock.mockReturnValue({ id: "1" });
        getCustomerByIDMock.mockReturnValueOnce({
          id: 1,
          name: "Testing",
          email: "unit@test.com",
        } as Customer);
        vi.spyOn(window, "confirm").mockReturnValueOnce(false);

        const { container } = render(
          <MemoryRouter>
            <EditCustomer />
          </MemoryRouter>
        );

        const button = container.querySelector(
          `section > form > div:last-child > button`
        ) as HTMLElement;

        fireEvent.click(button);
        await waitFor(() => {
          expect(deleteCustomerMock).not.toHaveBeenCalledOnce();
          expect(navigateMock).not.toHaveBeenCalledOnce();
        });
      });
    });
  });
});
