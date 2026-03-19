import { DateFormatters } from "@/constants/date";
import { format } from "date-fns";
import { ru as ruLocale } from "date-fns/locale";

const { DATE_MONTH_HUMAN: DATE_MONTH } = DateFormatters;

export const formatDate = (date: string) =>
  format(new Date(date), DATE_MONTH, {
    locale: ruLocale,
  });

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(/\s+/);

  if (!firstName && !lastName) return "N.N.";
  if (!lastName) return firstName[0].toUpperCase();
  return `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}.`;
};
