import type { Dialog } from '@ui/dialog';
import type { ComponentProps } from 'react';
import * as z from 'zod';
import type { createDebtFormSchema } from './create-debt-dialog.constants';

export type CreateDebtFormValues = z.input<typeof createDebtFormSchema>;
export type CreateDebtDialogProps = Pick<ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'>;
