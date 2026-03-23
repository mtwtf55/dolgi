export type DebtStoreState = {
  debtHistory: DebtStoreHistoryItem[];
};

export type DebtStoreActions = {
  lend: (payload: LendActionPayload) => void;
};

export type DebtStoreHistoryItem = {
  id: string;
  to: {
    name: string;
    key: string;
  };
  amount: number;
  debtDate: Date;
  returnDate?: Date;
  createdAt: Date;
};

type LendActionPayload = Pick<
  DebtStoreHistoryItem,
  "amount" | "debtDate" | "returnDate"
> & { to: DebtStoreHistoryItem["to"]["name"] };
