import { useConfirmModal } from '@/hooks/useConfirmModal';
import {
  deleteAllData,
  removePasswordHash,
  setPassword,
  showHistoryMarkers,
  showOverdueDebtors,
  useSettingsStore,
} from '@/stores/use-settings-store';
import { ConfirmModal } from '@components/confirm-modal';
import { SetPasswordDialog } from '@components/set-password-dialog';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Field, FieldContent, FieldDescription, FieldLabel } from '@ui/field';
import { Separator } from '@ui/separator';
import { Switch } from '@ui/switch';
import { useId, useState, type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const showHistoryMarkersSwitchId = useId();
  const showOverdueDebtorsSwitchId = useId();
  const setPasswordSwitchId = useId();
  const settings = useSettingsStore(useShallow((state) => state));
  const { Modal: DeleteAllDataConfirmModal, confirm: confirmDeleteAllData } =
    useConfirmModal(ConfirmModal);
  const { Modal: CancelPasswordConfirmModal, confirm: confirmCancelPassword } =
    useConfirmModal(ConfirmModal);
  const [isPasswordDialogOpened, setIsPasswordDialogOpened] = useState(false);

  const handleShowHistoryMarkersSwitchChanged = (checked: boolean) => {
    showHistoryMarkers(checked);
  };

  const handleShowOverdueDebtorsSwitchChanged = (checked: boolean) => {
    showOverdueDebtors(checked);
  };

  const handleDeleteAllData = async () => {
    const confirmResult = await confirmDeleteAllData();

    if (!confirmResult) return;

    deleteAllData();
    toast.success('Все данные удалены');
  };

  const handleSetPasswordSwitchChanged = async (checked: boolean) => {
    if (checked) setIsPasswordDialogOpened(true);
    if (!checked) {
      const confirmResult = await confirmCancelPassword();
      if (!confirmResult) return;

      setPassword(false);
      removePasswordHash();
      toast.success('Вход по паролю отключен');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <Section title="Внешний вид">
          <Field orientation="horizontal" className="max-w-sm">
            <FieldContent>
              <FieldLabel htmlFor={showHistoryMarkersSwitchId}>Маркеры истории</FieldLabel>
              <FieldDescription>
                Отображать маркеры возврата/выдачи долга на карточках с историей
              </FieldDescription>
            </FieldContent>
            <Switch
              id={showHistoryMarkersSwitchId}
              onCheckedChange={handleShowHistoryMarkersSwitchChanged}
              checked={settings.showHistoryMarkers}
            />
          </Field>
          <Field orientation="horizontal" className="max-w-sm">
            <FieldContent>
              <FieldLabel htmlFor={showOverdueDebtorsSwitchId}>Выделение должников</FieldLabel>
              <FieldDescription>
                Выделение должников с просроченными долгами в списке должников, а также маркер с
                количеством просроченных долгов на странице с информацией о должнике
              </FieldDescription>
            </FieldContent>
            <Switch
              id={showOverdueDebtorsSwitchId}
              onCheckedChange={handleShowOverdueDebtorsSwitchChanged}
              checked={settings.showOverdueDebtors}
            />
          </Field>
        </Section>
        <Section title="Безопасность">
          <Field orientation="horizontal" className="max-w-sm">
            <FieldContent>
              <FieldLabel htmlFor={setPasswordSwitchId}>Установить пароль</FieldLabel>
              <FieldDescription>Установить пароль для входа в приложение</FieldDescription>
            </FieldContent>
            <Switch
              id={setPasswordSwitchId}
              onCheckedChange={handleSetPasswordSwitchChanged}
              checked={settings.setPassword}
            />
          </Field>
        </Section>
        <Section title="Данные">
          <Field orientation="horizontal" className="max-w-sm" data-invalid>
            <FieldContent>
              <FieldLabel>Удалить все данные</FieldLabel>
              <FieldDescription>
                Удалить данные о должниках, историю долгов, настройки приложения. После удаления
                данные нельзя будет восстановить
              </FieldDescription>
            </FieldContent>
            <Button variant={'destructive'} className="self-center" onClick={handleDeleteAllData}>
              Удалить
            </Button>
          </Field>
        </Section>
      </div>
      <DeleteAllDataConfirmModal
        title="Удалить все данные"
        description="Вы уверены, что хотите удалить все данные приложения. Данное действия нельзя будет отменить"
        actionText="Удалить"
        cancelText="Отменить"
      />
      <CancelPasswordConfirmModal title="Вы уверены, что хотите отключить вход по паролю?" />
      <SetPasswordDialog open={isPasswordDialogOpened} onOpenChange={setIsPasswordDialogOpened} />
    </>
  );
}

const Section = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <section>
    <h2 className="font-medium">{title}</h2>
    <Separator className="mt-2 mb-4" />
    <div className="flex flex-col gap-4">{children}</div>
  </section>
);
