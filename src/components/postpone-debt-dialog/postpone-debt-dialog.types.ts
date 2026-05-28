import type { HistoryItem } from '@/stores/use-history-store';
import type { Dialog } from '@ui/dialog';
import type { ComponentProps } from 'react';
import * as z from 'zod';
import type { postponeDebtFormSchema } from './postpone-debt-dialog.constants';

export type PostponeDebtFormValues = z.input<typeof postponeDebtFormSchema>;
export type PostponeDebtDialogProps = Pick<
  ComponentProps<typeof Dialog>,
  'open' | 'onOpenChange'
> & {
  itemId: HistoryItem['id'];
};
