export type DebtStoreState = {
  debtHistory: DebtStoreHistoryItem[];
};

export type DebtStoreActions = {
  lend: (payload: LendActionPayload) => void;
};

export type DebtStoreHistoryItem = {
  id: string;
  to: string;
  amount: number;
  debtDate: string;
  returnDate?: string;
  createdAt: string;
};

type LendActionPayload = Pick<
  DebtStoreHistoryItem,
  "amount" | "debtDate" | "returnDate" | "to"
>;
