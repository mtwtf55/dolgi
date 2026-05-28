import { useId } from 'react';

export const useFormIds = () => {
  const toId = useId();
  const amountId = useId();
  const debtDateId = useId();
  const returnDateId = useId();
  const formId = useId();

  return { formId, toId, amountId, debtDateId, returnDateId };
};
