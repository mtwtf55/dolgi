
export type HistoryStoreState = {
  history: HistoryItem[];
};

export type HistoryItem = {
  id: string;
  actorId: string;
  amount: number;
  date: Date;
  createdAt: Date;
};

export type CreateHistoryItemPayload = Pick<
  HistoryItem,
  "amount" | 'actorId' | 'date'
>;
