import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui/alert-dialog";
import type { ConfirmModalProps } from "./confirm-modal.types";
import {
  DEFAULT_ACTION_TEXT,
  DEFAULT_CANCEL_TEXT,
} from "./confirm-modal.constants";

export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    cancelText,
    actionText,
    onCancel,
    onAction,
    open,
    description,
    title,
  } = props;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelText ?? DEFAULT_CANCEL_TEXT}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            {actionText ?? DEFAULT_ACTION_TEXT}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
