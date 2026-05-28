import * as z from 'zod';
import type { PostponeDebtFormValues } from './postpone-debt-dialog.types';

export const postponeDebtFormSchema = z.object({
  returnDate: z.date('Введите корректную дату'),
});

export const postponeDebtFormNames: Record<
  keyof PostponeDebtFormValues,
  keyof PostponeDebtFormValues
> = {
  returnDate: 'returnDate',
};
