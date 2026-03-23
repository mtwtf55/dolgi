import { useId, useMemo } from "react";
import { createDebtFormNames } from "../create-debt-form.constants";

const { amount, debtDate, returnDate, to } = createDebtFormNames;

export const useFormFields = () => {
  const toId = useId();
  const amountId = useId();
  const debtDateId = useId();
  const returnDateId = useId();

  const mainFields = useMemo(
    () => [
      {
        id: toId,
        name: to,
        label: "Кому",
        required: true,
        inputProps: {
          placeholder: "Введите должника",
        },
      },
      {
        id: amountId,
        name: amount,
        label: "Сколько",
        required: true,
        inputProps: {
          placeholder: "Введите количество",
          type: "number",
          step: "0.01",
        },
      },
    ],
    [amountId, toId],
  );

  const extraFields = useMemo(
    () => [
      {
        id: debtDateId,
        name: debtDate,
        label: "Дата выдачи",
        required: true,
      },
      {
        id: returnDateId,
        name: returnDate,
        label: "Дата возврата",
        required: false,
      },
    ],
    [debtDateId, returnDateId],
  );

  return { mainFields, extraFields };
};
