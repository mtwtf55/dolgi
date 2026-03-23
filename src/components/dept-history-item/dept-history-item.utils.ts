import { DateFormatters } from "@/constants/date";
import { format } from "date-fns";
import { ru as ruLocale } from "date-fns/locale";

const { DATE_MONTH_HUMAN: DATE_MONTH } = DateFormatters;

export const formatDate = (date: Date) =>
  format(new Date(date), DATE_MONTH, {
    locale: ruLocale,
  });
