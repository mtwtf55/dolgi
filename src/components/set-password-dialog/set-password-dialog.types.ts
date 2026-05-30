import type { Dialog } from '@ui/dialog';
import type { ComponentProps } from 'react';
import z from 'zod';
import type { setPasswordFormSchema, SetPasswordFormStep } from './set-password-dialog.constants';

export type SetPasswordDialogProps = Pick<ComponentProps<typeof Dialog>, 'open' | 'onOpenChange'>;
export type SetPasswordFormValues = z.infer<typeof setPasswordFormSchema>;
export type SetPasswordFormStepType =
  (typeof SetPasswordFormStep)[keyof typeof SetPasswordFormStep];
