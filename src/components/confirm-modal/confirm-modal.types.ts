export type ConfirmModalProps = {
  onAction: VoidFunction;
  onCancel: VoidFunction;
  actionText?: string;
  cancelText?: string;
  open: boolean;
  title: string;
  description?: string;
};
