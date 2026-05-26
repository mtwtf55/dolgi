import * as z from 'zod';
import type { CreateDebtorFormValues } from './create-debtor-dialog.types';

export const createDebtorFormSchema = z.object({
  firstName: z.string().min(1, 'Введите значение'),
  lastName: z.string().optional(),
});

export const createDebtorFormDefaultValues: CreateDebtorFormValues = {
  firstName: '',
  lastName: '',
};

export const createDebtorFormNames: Record<
  keyof CreateDebtorFormValues,
  keyof CreateDebtorFormValues
> = {
  firstName: 'firstName',
  lastName: 'lastName',
};
