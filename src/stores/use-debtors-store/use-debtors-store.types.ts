export type UseDebtorsStoreState = {
    debtors: Debtor[]
}

export type Debtor = {
    firstName: string;
    lastName?: string;
    id: string;
}

export type CreateDebtorPayload = Pick<Debtor, 'firstName' | 'lastName'>
export type DeleteDebtorPayload = Pick<Debtor, 'id'>;
export type UpdateDebtorPayload = Pick<Debtor, 'id' | 'firstName' | 'lastName'>