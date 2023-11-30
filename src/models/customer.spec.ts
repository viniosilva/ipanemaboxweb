import { describe, expect, test } from "vitest";
import Customer from "./customer";

describe("models", () => {
  describe("customer", () => {
    test("should be defined", () => {
      const customer = new Customer();

      expect(customer).toBeDefined();
    });
  });
});
