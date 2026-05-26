import { Dialog } from '@ui/dialog';
import type { ComponentProps } from 'react';
import * as z from 'zod';
import type { createDebtorFormSchema } from './create-debtor-dialog.constants';

export type CreateDebtorFormValues = z.input<typeof createDebtorFormSchema>;
export type CreateDebtorDialogProps = Pick<ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'>;
