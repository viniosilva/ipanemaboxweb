export type EventType = "orcamento" | "servico" | "manutencao";

export default class Event {
  id!: string;
  datetime!: Date;
  type!: EventType;
  description!: string;
}

export function eventTypeToString(type: EventType): string {
  switch (type) {
    case "orcamento":
      return "Orçamento";
    case "servico":
      return "Serviço";
    case "manutencao":
      return "Manutenção";
    default:
      throw new Error(`invalid event type: ${type}`);
  }
}
