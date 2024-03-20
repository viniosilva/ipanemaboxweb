import { describe, expect, test } from "vitest";
import Event, { eventTypeToString } from "./event";

describe("event", () => {
  test('should be successful', () => {
    expect(new Event()).toBeDefined();
  });
});

describe("eventTypeToString", () => {
  test('should return Orçamento', () => {
    expect(eventTypeToString("orcamento")).toEqual("Orçamento");
  });
  test('should return Serviço', () => {
    expect(eventTypeToString("servico")).toEqual("Serviço");
  });
  test('should return Manutenção', () => {
    expect(eventTypeToString("manutencao")).toEqual("Manutenção");
  });
  test('should throw error when type is invalid', () => {
    expect(() => eventTypeToString("INVALID" as any)).toThrow("invalid event type: INVALID");
  });
});