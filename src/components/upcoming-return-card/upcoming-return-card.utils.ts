import { add, isBefore, isToday, isWithinInterval, startOfDay } from "date-fns";

export const getStatusStyles = (returnDate: Date) => {
  if (isBefore(returnDate, startOfDay(new Date()))) {
    return "bg-red-100";
  }

  if (isToday(returnDate)) {
    return "bg-emerald-50";
  }

  if (
    isWithinInterval(returnDate, {
      start: startOfDay(new Date()),
      end: add(startOfDay(new Date()), { days: 3 }),
    })
  ) {
    return "bg-amber-50";
  }

  return "";
};
