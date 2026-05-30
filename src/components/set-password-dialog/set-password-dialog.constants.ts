import z from 'zod';
import type { SetPasswordFormValues } from './set-password-dialog.types';

export const setPasswordFormSchema = z
  .object({
    password: z.string().length(4, { message: 'Пин-код должен состоять из 4 цифр' }),
    repeatPassword: z.string(),
  })
  .refine(
    (data) => {
      if (!data.repeatPassword || data.repeatPassword.length < 4) {
        return true;
      }

      return data.password === data.repeatPassword;
    },
    {
      message: 'Пин-коды не совпадают',
      path: ['repeatPassword'],
    },
  );
export const setPasswordFormDefaultValues: SetPasswordFormValues = {
  password: '',
  repeatPassword: '',
};

export const setPasswordFormNames: Record<
  keyof SetPasswordFormValues,
  keyof SetPasswordFormValues
> = {
  password: 'password',
  repeatPassword: 'repeatPassword',
};

export const SetPasswordFormStep = {
  PASSWORD: 'PASSWORD',
  REPEAT_PASSWORD: 'REPEAT_PASSWORD',
} as const;
