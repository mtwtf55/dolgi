import * as z from "zod";
import type { CreateDeptFormValues } from "./create-dept-form.types";
import { format } from "date-fns";
import { DateFormatters } from "@/constants/date";

const { ISO_DATE } = DateFormatters;

export const createDeptFormSchema = z.object({
  amount: z.coerce
    .number<number>()
    .positive("Значение должно быть больше нуля"),
  to: z.string().min(1, "Введите значение"),
  debtDate: z.iso.date("Введите корректную дату"),
  returnDate: z.iso.date("Введите корректную дату").optional(),
});

export const createDeptFormDefaultValues: CreateDeptFormValues = {
  amount: "" as unknown as number,
  to: "",
  debtDate: format(new Date(), ISO_DATE),
};

export const createDeptFormNames: Record<
  keyof CreateDeptFormValues,
  keyof CreateDeptFormValues
> = {
  amount: "amount",
  debtDate: "debtDate",
  returnDate: "returnDate",
  to: "to",
};
