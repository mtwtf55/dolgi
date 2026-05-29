import type { Debtor } from '@/stores/use-debtors-store/use-debtors-store.types';
import type { Dialog } from '@ui/dialog';
import type { ComponentProps } from 'react';
import z from 'zod';
import type { returnDebtFormSchema } from './return-debt-dialog.constants';

export type ReturnDebtDialogProps = Pick<ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'> & {
  actorId: Debtor['id'];
};
export type ReturnDebtFormValues = z.infer<ReturnType<typeof returnDebtFormSchema>>;
