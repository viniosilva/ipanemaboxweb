import { describe, expect, test } from "vitest";
import Schedule from "./schedule";

describe("schedule", () => {
  test("should be successful", () => {
    const schedule: Schedule = {
      "2000-01-01 23:59": [
        {
          id: "1",
          datetime: new Date("2000-01-01T23:59:59Z"),
          type: "servico",
          description: "Testing",
        },
      ],
    };
    expect(schedule).toBeDefined();
  });
});
