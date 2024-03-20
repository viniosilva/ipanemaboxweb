import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EventForm from "./EventForm";

describe("EventForm", () => {
  test("should render", () => {
    render(<EventForm modalCloseOnClick={vi.fn} saveOnClick={vi.fn} show={false} />);

    const title = screen.getByText("Novo evento");

    expect(title).toBeDefined();
  });

  test("should set inputs and save", async () => {
    const { container } = render(
      <EventForm modalCloseOnClick={vi.fn} saveOnClick={vi.fn} show={true} />
    );

    const datetimeInput = container.querySelector(
      "article > div > form > div > input"
    ) as Element;
    const typeSelect = container.querySelector(
      "article > div > form > div > select"
    ) as Element;
    const descriptionTextarea = container.querySelector(
      "article > div > form > div > textarea"
    ) as Element;

    fireEvent.change(datetimeInput, { target: { value: "31/12/2020 23:59" } });
    fireEvent.change(typeSelect, { target: { value: "orcamento" } });
    fireEvent.change(descriptionTextarea, { target: { value: "Testing" } });

    await waitFor(() => {
      const datetimeInput = container.querySelector(
        "article > div > form > div > input"
      ) as HTMLInputElement;
      const typeSelect = container.querySelector(
        "article > div > form > div > select"
      ) as HTMLSelectElement;
      const descriptionTextarea = container.querySelector(
        "article > div > form > div > textarea"
      ) as HTMLTextAreaElement;

      expect(datetimeInput.value).toEqual("31/12/2020 23:59");
      expect(typeSelect.value).toEqual("orcamento");
      expect(descriptionTextarea.value).toEqual("Testing");
    });
  });
});
