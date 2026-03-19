import * as z from "zod";
import type { CreateDebtFormValues } from "./create-debt-form.types";
import { format } from "date-fns";
import { DateFormatters } from "@/constants/date";

const { ISO_DATE } = DateFormatters;

export const createDebtFormSchema = z.object({
  amount: z.coerce
    .number<number>()
    .positive("Значение должно быть больше нуля"),
  to: z.string().min(1, "Введите значение"),
  debtDate: z.iso.date("Введите корректную дату"),
  returnDate: z.iso.date("Введите корректную дату").optional(),
});

export const createDebtFormDefaultValues: CreateDebtFormValues = {
  amount: "" as unknown as number,
  to: "",
  debtDate: format(new Date(), ISO_DATE),
};

export const createDebtFormNames: Record<
  keyof CreateDebtFormValues,
  keyof CreateDebtFormValues
> = {
  amount: "amount",
  debtDate: "debtDate",
  returnDate: "returnDate",
  to: "to",
};
