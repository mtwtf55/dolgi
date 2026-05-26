import type { Debtor, UseDebtorsStoreState } from "./use-debtors-store.types";

export const selectDebtorById = (state: UseDebtorsStoreState, id: Debtor['id']) => {
    const findResult = state.debtors.find(item => item.id === id)

    if (!findResult) {
        throw new Error('Not found ')
    }

    return findResult
}