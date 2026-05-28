import { updateReturnItem, useReturnStore } from '@/stores/use-return-store/use-return-store';
import { selectReturnDate } from '@/stores/use-return-store/use-return-store.selectors';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Button } from '@ui/button';
import { DatePicker } from '@ui/date-picker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@ui/dialog';
import { Field, FieldError } from '@ui/field';
import { useEffect, useId } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';
import { postponeDebtFormNames, postponeDebtFormSchema } from './postpone-debt-dialog.constants';
import {
  type PostponeDebtDialogProps,
  type PostponeDebtFormValues,
} from './postpone-debt-dialog.types';

export const PostponeDebtDialog = ({ onOpenChange, open, itemId }: PostponeDebtDialogProps) => {
  const formId = useId();

  const prevReturnDate = useReturnStore(useShallow((state) => selectReturnDate(state, itemId)));

  const form = useForm<PostponeDebtFormValues>({
    mode: 'onSubmit',
    resolver: standardSchemaResolver(postponeDebtFormSchema),
  });

  useEffect(() => {
    if (prevReturnDate) {
      form.setValue('returnDate', prevReturnDate);
    }
  }, [prevReturnDate]);

  const handleSubmit: SubmitHandler<PostponeDebtFormValues> = ({ returnDate }) => {
    updateReturnItem({ historyItemId: itemId, returnDate });

    toast.success('Дата возврата успешно изменена');
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    if (prevReturnDate) {
      form.setValue('returnDate', prevReturnDate);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogTitle>Изменить дату возврата</DialogTitle>
        <DialogDescription>
          Перенос срока выплаты. Зафиксируйте новый день, когда должник пообещал вернуть всю сумму
        </DialogDescription>
        <form onSubmit={form.handleSubmit(handleSubmit)} id={formId}>
          <Controller
            name={postponeDebtFormNames.returnDate}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <DatePicker onChange={field.onChange} ref={field.ref} value={field.value as Date} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={'lg'} variant={'outline'} onClick={handleCancel}>
              Отменить
            </Button>
          </DialogClose>
          <Button type="submit" form={formId} size={'lg'}>
            Изменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
