import { describe, expect, test } from "vitest";
import {
  formatDateToPtBr,
  formatDatetimeToPtBr,
  getPtBrWeekDay,
  parseDatetimeFromPtBR,
} from "./date";

describe("getPtBrWeekDay", () => {
  test('should return "Domingo" for day 0', () => {
    expect(getPtBrWeekDay(0)).toBe("Domingo");
  });

  test('should return "Segunda-feira" for day 1', () => {
    expect(getPtBrWeekDay(1)).toBe("Segunda-feira");
  });

  test('should return "Terça-feira" for day 2', () => {
    expect(getPtBrWeekDay(2)).toBe("Terça-feira");
  });

  test('should return "Quarta-feira" for day 3', () => {
    expect(getPtBrWeekDay(3)).toBe("Quarta-feira");
  });

  test('should return "Quinta-feira" for day 4', () => {
    expect(getPtBrWeekDay(4)).toBe("Quinta-feira");
  });

  test('should return "Sexta-feira" for day 5', () => {
    expect(getPtBrWeekDay(5)).toBe("Sexta-feira");
  });

  test('should return "Sábado" for day 6', () => {
    expect(getPtBrWeekDay(6)).toBe("Sábado");
  });

  test("should return empty string for day greater then 6", () => {
    expect(getPtBrWeekDay(7)).toBe("");
  });
});

describe("formatDateToPtBr", () => {
  test("should format a date to the pt-br format", () => {
    expect(formatDateToPtBr(new Date("2020-12-31T23:59:59"))).toEqual("31/12/2020");
  });
});

describe("formatDatetimeToPtBr", () => {
  test("should format a date to the pt-br format", () => {
    expect(formatDatetimeToPtBr(new Date("2020-12-31T23:59:59"))).toEqual("31/12/2020 23:59");
  });
});

describe("parseDatetimeFromPtBR", () => {
  test("should return date from pt-br format", () => {
    expect(parseDatetimeFromPtBR("31/12/2020 23:59").toString()).toMatch(
      "Thu Dec 31 2020 23:59:00"
    );
  });
});
