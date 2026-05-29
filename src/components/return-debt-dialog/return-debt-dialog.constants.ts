import z from 'zod';
import type { ReturnDebtFormValues } from './return-debt-dialog.types';

export const returnDebtFormSchema = (totalAmount: number) =>
  z.object({
    amount: z.coerce
      .number<number>('Введите размер возвращенного долга')
      .min(0, 'Значение должно быть больше нуля')
      .max(totalAmount, 'Значение не может превышать всей суммы долга'),
  });

export const returnDebtFormDefaultValues: ReturnDebtFormValues = {
  amount: 0.0,
};

export const returnDebtFormNames: Record<keyof ReturnDebtFormValues, keyof ReturnDebtFormValues> = {
  amount: 'amount',
};
