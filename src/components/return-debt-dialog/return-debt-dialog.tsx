import { useDebtorsStore } from '@/stores/use-debtors-store/use-debtors-store';
import { selectDebtorById } from '@/stores/use-debtors-store/use-debtors-store.selectors';
import {
  createHistoryItem,
  selectDebtorHistory,
  useHistoryStore,
} from '@/stores/use-history-store';
import { useReturnStore } from '@/stores/use-return-store/use-return-store';
import { getFullName, roundMoney } from '@/utils';
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
import { Field, FieldError } from '@ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@ui/input-group';
import { useId, useMemo } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';
import {
  returnDebtFormDefaultValues,
  returnDebtFormNames,
  returnDebtFormSchema,
} from './return-debt-dialog.constants';
import { type ReturnDebtDialogProps, type ReturnDebtFormValues } from './return-debt-dialog.types';

export const ReturnDebtDialog = ({ actorId, onOpenChange, open }: ReturnDebtDialogProps) => {
  const formId = useId();

  const debtor = useDebtorsStore(useShallow((state) => selectDebtorById(state, actorId)));
  const debtorHistory = useHistoryStore(useShallow((state) => selectDebtorHistory(state, actorId)));
  const returnsIds = useReturnStore(
    useShallow((state) => state.items.map(({ historyItemId }) => historyItemId)),
  );
  const totalDebt = roundMoney(debtorHistory.reduce((acc, item) => acc + item.amount, 0));

  const isHasReturn = useMemo(() => {
    const historyIds = debtorHistory.map(({ id }) => id);
    return historyIds.some((id) => returnsIds.includes(id));
  }, [debtorHistory, returnsIds]);

  const form = useForm<ReturnDebtFormValues>({
    mode: 'onSubmit',
    resolver: standardSchemaResolver(returnDebtFormSchema(totalDebt)),
    defaultValues: returnDebtFormDefaultValues,
  });

  const handleSubmit: SubmitHandler<ReturnDebtFormValues> = (formValues) => {
    const { amount } = formValues;

    if (isHasReturn) {
      toast.warning('Должник имеет непогашенные долги со сроком возврата');
      return;
    }

    createHistoryItem({ actorId: debtor.id, amount: -amount, date: new Date() });
    form.reset();
    toast.success(`Долг в размере ${amount} BYN успешно списан`);
    onOpenChange?.(false);
  };

  const handleAllDebt = () => {
    form.setValue('amount', totalDebt);
  };

  const handleCancel = () => form.reset();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            Сколько вернул {getFullName(debtor.firstName, debtor.lastName)}?
          </DialogTitle>
          <DialogDescription>
            Введите полученную сумму. Если долг закрыт не полностью, мы посчитаем остаток.
          </DialogDescription>
        </DialogHeader>
        <form
          id={formId}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex gap-4 justify-between"
        >
          <Controller
            name={returnDebtFormNames.amount}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    placeholder="Введите количество"
                    type="number"
                    step={'0.01'}
                    value={field.value}
                  />
                  <InputGroupAddon align={'inline-end'}>
                    <InputGroupText>BYN</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button className="w-20" variant={'secondary'} onClick={handleAllDebt} type="button">
            Всё
          </Button>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'} size={'lg'} onClick={handleCancel}>
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit" form={formId} size={'lg'}>
            Списать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
