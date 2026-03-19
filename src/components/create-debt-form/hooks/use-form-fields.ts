import { useId, useMemo } from "react";
import { createDebtFormNames } from "../create-debt-form.constants";

const { amount, debtDate, returnDate, to } = createDebtFormNames;

export const useFormFields = () => {
  const toId = useId();
  const amountId = useId();
  const debtDateId = useId();
  const returnDateId = useId();

  return useMemo(
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
      {
        id: debtDateId,
        name: debtDate,
        label: "Дата выдачи",
        required: true,
        inputProps: {
          type: "date",
        },
      },
      {
        id: returnDateId,
        name: returnDate,
        label: "Дата возврата",
        required: false,
        inputProps: {
          type: "date",
        },
      },
    ],
    [amountId, debtDateId, returnDateId, toId],
  );
};
