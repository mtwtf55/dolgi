import { createDebtor } from '@/stores/use-debtors-store/use-debtors-store';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@ui/field';
import { Input } from '@ui/input';
import { useId } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import {
  createDebtorFormDefaultValues,
  createDebtorFormNames,
  createDebtorFormSchema,
} from './create-debtor-dialog.constants';
import type { CreateDebtorDialogProps, CreateDebtorFormValues } from './create-debtor-dialog.types';

export const CreateDebtorDialog = ({ onOpenChange, open }: CreateDebtorDialogProps) => {
  const form = useForm<CreateDebtorFormValues>({
    defaultValues: createDebtorFormDefaultValues,
    resolver: standardSchemaResolver(createDebtorFormSchema),
    mode: 'onSubmit',
  });
  const formId = useId();
  const firstNameId = useId();
  const lastNameId = useId();

  const handleSubmit: SubmitHandler<CreateDebtorFormValues> = (formValues) => {
    try {
      createDebtor({ ...formValues });
      form.reset();
      onOpenChange?.(false);
      toast.success('Должник успешно добавлен');
    } catch {
      toast.warning('Должник с такими данными уже существует');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={form.handleSubmit(handleSubmit)} id={formId}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Добавить должника</DialogTitle>
            <DialogDescription>
              Создайте нового должника для возможности вносить долги на его имя
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name={createDebtorFormNames.firstName}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={firstNameId} className="block">
                    Имя <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={firstNameId}
                    placeholder="Имя должника"
                    value={field.value}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name={createDebtorFormNames.lastName}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={lastNameId} className="block">
                    Фамилия
                  </FieldLabel>
                  <Input
                    {...field}
                    id={lastNameId}
                    placeholder="Фамилия должника"
                    value={field.value}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="lg">
                Отменить
              </Button>
            </DialogClose>
            <Button type="submit" size="lg" form={formId}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
