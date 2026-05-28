export type UseReturnStoreState = {
  items: ReturnItem[];
};

export type ReturnItem = {
  historyItemId: string;
  returnDate: Date;
};

export type CreateReturnItemPayload = Pick<ReturnItem, 'historyItemId' | 'returnDate'>;
export type UpdateReturnItemPayload = Pick<ReturnItem, 'historyItemId' | 'returnDate'>;
