export function getPtBrWeekDay(day: number): string {
  switch (day) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda-feira";
    case 2:
      return "Terça-feira";
    case 3:
      return "Quarta-feira";
    case 4:
      return "Quinta-feira";
    case 5:
      return "Sexta-feira";
    case 6:
      return "Sábado";
    default:
      return "";
  }
}

export function formatDateToPtBr(datetime: Date): string {
  const dd = datetime.getDate().toString().padStart(2, "0");
  const MM = (datetime.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = datetime.getFullYear();

  return `${dd}/${MM}/${yyyy}`;
}

export function formatDatetimeToPtBr(datetime: Date): string {
  const dd = datetime.getDate().toString().padStart(2, "0");
  const MM = (datetime.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = datetime.getFullYear();
  const hh = datetime.getHours().toString().padStart(2, "0");
  const mm = datetime.getMinutes().toString().padStart(2, "0");

  return `${dd}/${MM}/${yyyy} ${hh}:${mm}`;
}

export function parseDatetimeFromPtBR(datetime: string): Date {
  const dd = Number(datetime.substring(0, 2));
  const MM = Number(datetime.substring(3, 5)) - 1;
  const yyyy = Number(datetime.substring(6, 10));
  const hh = Number(datetime.substring(11, 13));
  const mm = Number(datetime.substring(14, 16));

  return new Date(yyyy, MM, dd, hh, mm);
}
