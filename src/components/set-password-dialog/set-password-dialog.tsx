import { savePasswordHash, setPassword } from '@/stores/use-settings-store';
import { hashPassword } from '@/utils';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog';
import { Field, FieldError, FieldLabel } from '@ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useId, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import {
  setPasswordFormDefaultValues,
  setPasswordFormNames,
  setPasswordFormSchema,
  SetPasswordFormStep,
} from './set-password-dialog.constants';
import {
  type SetPasswordDialogProps,
  type SetPasswordFormStepType,
  type SetPasswordFormValues,
} from './set-password-dialog.types';

export const SetPasswordDialog = ({ onOpenChange, open }: SetPasswordDialogProps) => {
  const form = useForm<SetPasswordFormValues>({
    defaultValues: setPasswordFormDefaultValues,
    resolver: standardSchemaResolver(setPasswordFormSchema),
    mode: 'onSubmit',
  });

  const formId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();
  const [formStep, setFormStep] = useState<SetPasswordFormStepType>(SetPasswordFormStep.PASSWORD);

  const handleSubmit: SubmitHandler<SetPasswordFormValues> = async (formValues) => {
    const { password } = formValues;

    try {
      const passwordHash = await hashPassword(password);
      savePasswordHash(passwordHash);
    } catch (err) {
      toast.error('Ошибка при создании пароля. Попробуйте еще раз');
      return;
    }

    setPassword(true);
    toast.success('Пароль успешно установлен.');
    form.reset();
    setFormStep(SetPasswordFormStep.PASSWORD);
    onOpenChange?.(false);
  };

  const handlePrevStep = () => {
    setFormStep(SetPasswordFormStep.PASSWORD);
  };

  const handleNextStep = async () => {
    const passwordValidateResult = await form.trigger('password');
    if (!passwordValidateResult) return;

    form.clearErrors();
    setFormStep(SetPasswordFormStep.REPEAT_PASSWORD);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          {formStep === SetPasswordFormStep.PASSWORD && (
            <DialogTitle>Придумайте пароль</DialogTitle>
          )}
          {formStep === SetPasswordFormStep.REPEAT_PASSWORD && (
            <DialogTitle>Подтвердите пароль</DialogTitle>
          )}
          {formStep === SetPasswordFormStep.PASSWORD && (
            <DialogDescription>
              Он понадобится для следующего входа в профиль. В случае утери пароля восстановление
              невозможно - только полное удаления данных профиля. Пароль должен состоять из 4-х цифр
            </DialogDescription>
          )}
        </DialogHeader>
        <form id={formId} onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center">
          {formStep === SetPasswordFormStep.PASSWORD && (
            <Controller
              name={setPasswordFormNames.password}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={passwordId} className="block text-center">
                    Пароль
                  </FieldLabel>
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    id={passwordId}
                    {...field}
                    containerClassName="justify-center"
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-center" />
                  )}
                </Field>
              )}
            />
          )}
          {formStep === SetPasswordFormStep.REPEAT_PASSWORD && (
            <Controller
              name={setPasswordFormNames.repeatPassword}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={repeatPasswordId} className="block text-center">
                    Повторите пароль
                  </FieldLabel>
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    id={repeatPasswordId}
                    {...field}
                    containerClassName="justify-center"
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-center" />
                  )}
                </Field>
              )}
            />
          )}
        </form>
        <DialogFooter>
          {formStep === SetPasswordFormStep.PASSWORD && (
            <Button size={'lg'} variant={'secondary'} onClick={handleCancel}>
              Отмена
            </Button>
          )}
          {formStep === SetPasswordFormStep.REPEAT_PASSWORD && (
            <Button size={'lg'} variant={'secondary'} onClick={handlePrevStep}>
              Назад
            </Button>
          )}
          {formStep === SetPasswordFormStep.PASSWORD && (
            <Button
              size={'lg'}
              variant={'default'}
              type="submit"
              form={formId}
              onClick={handleNextStep}
            >
              Далее
            </Button>
          )}
          {formStep === SetPasswordFormStep.REPEAT_PASSWORD && (
            <Button size={'lg'} variant={'default'} type="submit" form={formId}>
              Установить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
