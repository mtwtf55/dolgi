import { useCallback, useMemo, useState, type ComponentType } from "react";

type RequiredModalProps = {
  open: boolean;
  onCancel: VoidFunction;
  onAction: VoidFunction;
};

type ResolverFn = (value: boolean) => void;

export const useConfirmModal = <P extends RequiredModalProps>(
  ModalComponent: ComponentType<P>,
) => {
  const [resolver, setResolver] = useState<ResolverFn | null>(null);

  const confirm = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = useCallback(
    (success: boolean) => {
      resolver?.(success);
      setResolver(null);
    },
    [resolver],
  );

  const handleAction = useCallback(() => handleClose(true), [handleClose]);
  const handleCancel = useCallback(() => handleClose(false), [handleClose]);

  const isOpen = resolver !== null;

  const ConfiguredModal = useMemo(() => {
    return (props: Omit<P, keyof RequiredModalProps>) => (
      <ModalComponent
        {...(props as P)}
        open={isOpen}
        onAction={handleAction}
        onCancel={handleCancel}
      />
    );
  }, [ModalComponent, isOpen, handleAction, handleCancel]);

  return { confirm, Modal: ConfiguredModal };
};
