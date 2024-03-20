import { describe, expect, test } from "vitest";
import { applyMask } from "./mask";

describe("applyMask", () => {
  test('should return complete masked value', () => {
    expect(applyMask("xx/xx/xxxx xx:xx", "31/12/2000 23:59")).toBe("31/12/2000 23:59");
  });

  test('should return almost complete masked value', () => {
    expect(applyMask("xx/xx/xxxx xx:xx", "31/12/2000 23:5")).toBe("31/12/2000 23:5");
  });

  test('should return incomplete masked value', () => {
    expect(applyMask("xx/xx/xxxx xx:xx", "31/12/2000 ")).toBe("31/12/2000");
  });

  test('should return short incomplete masked value', () => {
    expect(applyMask("xx/xx/xxxx xx:xx", "31/1 ")).toBe("31/1");
  });

  test('should return empty when value is empty', () => {
    expect(applyMask("xx/xx/xxxx xx:xx", "")).toBe("");
  });
});
