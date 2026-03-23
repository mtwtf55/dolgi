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
  debtDate: Date;
  returnDate?: Date;
  createdAt: Date;
};

type LendActionPayload = Pick<
  DebtStoreHistoryItem,
  "amount" | "debtDate" | "returnDate" | "to"
>;
