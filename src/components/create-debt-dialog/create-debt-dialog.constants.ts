import { startOfDay } from 'date-fns';
import * as z from 'zod';
import type { CreateDebtFormValues } from './create-debt-dialog.types';

export const createDebtFormSchema = z.object({
  amount: z.coerce.number<number>().positive('Значение должно быть больше нуля'),
  to: z.string().min(1, 'Введите значение'),
  debtDate: z.date('Введите корректную дату'),
  returnDate: z.date('Введите корректную дату').optional(),
});

export const createDebtFormDefaultValues: CreateDebtFormValues = {
  amount: '' as unknown as number,
  to: '',
  debtDate: startOfDay(new Date()),
  returnDate: undefined,
};

export const createDebtFormNames: Record<keyof CreateDebtFormValues, keyof CreateDebtFormValues> = {
  amount: 'amount',
  debtDate: 'debtDate',
  returnDate: 'returnDate',
  to: 'to',
};
