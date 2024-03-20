import Schedule from "../models/schedule";
import { formatDateToPtBr } from "../utils/date";

export function getSchedule(): Schedule {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const schedule: Schedule = {};
  for (let i = 0; i < 3; i += 1) {
    schedule[formatDateToPtBr(date)] = [];
    date.setDate(date.getDate() + 1);
  }

  return schedule;
}
