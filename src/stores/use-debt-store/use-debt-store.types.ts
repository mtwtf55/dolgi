export type DebtStoreState = {
  debtHistory: DebtStoreHistoryItem[];
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

export type LendActionPayload = Pick<
  DebtStoreHistoryItem,
  "amount" | "debtDate" | "returnDate"
> & { to: DebtStoreHistoryItem["to"]["name"] };
