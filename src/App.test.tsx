import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import styles from "./App.module.css";
import Schedule from "./models/schedule";

const now = new Date(2000, 0, 1);
const getScheduleMock = vi.fn();
vi.mock("./integrations/ipanemaboxapi", async () => {
  const mod = await vi.importActual("./integrations/ipanemaboxapi");
  return {
    ...mod,
    getSchedule: () => getScheduleMock(),
  };
});

describe("App", () => {
  beforeEach(() => {
    vi.setSystemTime(now);
    getScheduleMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should render", () => {
    getScheduleMock.mockReturnValueOnce({
      "01/01/2000": [
        {
          id: "1",
          datetime: now,
          description: "Testing",
          type: "servico",
        },
      ],
    } as Schedule);

    render(<App />);

    expect(screen.getByText("Agenda")).toBeDefined();
    expect(screen.getByText("00:00 - Serviço")).toBeDefined();
  });

  test("should render modal and close it when new event is clicked", async () => {
    getScheduleMock.mockReturnValueOnce({} as Schedule);
    const { container } = render(<App />);

    let modalTitle = screen.getAllByText("Novo evento");
    let modal = modalTitle[1].parentElement?.parentElement
      ?.parentElement as HTMLElement;
    let classNames = Array.from(modal?.classList).join(" ");
    expect(classNames).not.contains("show");

    const btn = container.querySelector(
      `.${styles.header} > button`
    ) as HTMLElement;
    fireEvent.click(btn);

    await waitFor(async () => {
      modalTitle = screen.getAllByText("Novo evento");
      modal = modalTitle[1].parentElement?.parentElement
        ?.parentElement as HTMLElement;
      classNames = Array.from(modal?.classList).join(" ");

      expect(classNames).contains("show");

      const closeIcon = screen.getByTestId("CloseIcon");
      fireEvent.click(closeIcon);

      await waitFor(() => {
        modalTitle = screen.getAllByText("Novo evento");
        modal = modalTitle[1].parentElement?.parentElement
          ?.parentElement as HTMLElement;
        classNames = Array.from(modal?.classList).join(" ");

        expect(classNames).not.contains("show");
      });
    });
  });

  test("should add new schedule", async () => {
    getScheduleMock.mockReturnValueOnce({"01/01/2020": []} as Schedule);
    const { container } = render(<App />);

    const datetimeInput = container.querySelector(
      "article > div > form > div > input"
    ) as Element;
    const typeSelect = container.querySelector(
      "article > div > form > div > select"
    ) as Element;
    const descriptionTextarea = container.querySelector(
      "article > div > form > div > textarea"
    ) as Element;

    fireEvent.change(datetimeInput, { target: { value: "01/01/2020 23:59" } });
    fireEvent.change(typeSelect, { target: { value: "orcamento" } });
    fireEvent.change(descriptionTextarea, { target: { value: "Testing" } });

    await waitFor(async () => {
      const btnSalvar = screen.getByText("Salvar");
      fireEvent.click(btnSalvar);

      await waitFor(() => {
        expect(screen.getByText("23:59 - Orçamento")).toBeDefined();
      });
    });
  });
});
