import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { createHistoryItem } from '@/stores/use-history-store';
import { createReturnItem } from '@/stores/use-return-store/use-return-store';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Button } from '@ui/button';
import { DatePicker } from '@ui/date-picker';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';
import {
  createDebtFormDefaultValues,
  createDebtFormNames,
  createDebtFormSchema,
} from './create-debt-dialog.constants';
import type { CreateDebtDialogProps, CreateDebtFormValues } from './create-debt-dialog.types';
import { useFormIds } from './hooks/use-form-ids';

export const CreateDebtDialog = ({ onOpenChange, open }: CreateDebtDialogProps) => {
  const form = useForm<CreateDebtFormValues>({
    defaultValues: createDebtFormDefaultValues,
    resolver: standardSchemaResolver(createDebtFormSchema),
    mode: 'onSubmit',
  });

  const debtors = useDebtorsStore(useShallow((state) => state.debtors));

  const { amountId, debtDateId, formId, returnDateId, toId } = useFormIds();

  const handleSubmit: SubmitHandler<CreateDebtFormValues> = (formValues) => {
    const { amount, debtDate, to, returnDate } = formValues;

    const historyItemId = createHistoryItem({ actorId: to, amount, date: debtDate });

    if (returnDate) {
      createReturnItem({ historyItemId, returnDate });
    }

    toast.success('Запись была успешно добавлена');
    form.reset();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Дать в долг</DialogTitle>
          <DialogDescription>
            Для того чтобы создать запись о выдаче займа, заполните форму. Если долг со сроком
            возврата, то заполните поле <b>Дата возврата</b>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} id={formId}>
          <FieldGroup>
            <Controller
              name={createDebtFormNames.to}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={toId} className="block">
                    Кому <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value as string}>
                    <SelectTrigger id={toId} ref={field.ref}>
                      <SelectValue placeholder="Выберите должника" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Должники</SelectLabel>
                        {debtors.map((item) => (
                          <SelectItem value={String(item.id)} key={item.id}>
                            {[item.firstName, item.lastName].join(' ')}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name={createDebtFormNames.amount}
              key={amountId}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={amountId} className="block">
                    Сколько <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={amountId}
                    placeholder="Введите количество"
                    type="number"
                    step={'0.01'}
                    value={field.value as string}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={createDebtFormNames.debtDate}
                key={debtDateId}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={debtDateId} className="block">
                      Дата выдачи <span className="text-destructive">*</span>
                    </FieldLabel>
                    <DatePicker
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value as Date}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name={createDebtFormNames.returnDate}
                key={returnDateId}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={returnDateId} className="block">
                      Дата возврата
                    </FieldLabel>
                    <DatePicker
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value as Date}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'outline'} size={'lg'} onClick={handleCancel}>
              Отменить
            </Button>
          </DialogClose>
          <Button type="submit" form={formId} size={'lg'}>
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
