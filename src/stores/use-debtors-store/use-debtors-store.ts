import { slugifyToLatin } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEBTORS_STORE_PERSIST_KEY } from "./use-debtors-store.constants";
import type { CreateDebtorPayload, Debtor, UseDebtorsStoreState } from "./use-debtors-store.types";

export const useDebtorsStore = create<UseDebtorsStoreState>()(persist(() => ({debtors: [] as Debtor[]}), {name: DEBTORS_STORE_PERSIST_KEY}))

export const createDebtor = (payload: CreateDebtorPayload) => {
    const {firstName, lastName} = payload;

    const generatedId = lastName ? slugifyToLatin(`${firstName} ${lastName}`) : slugifyToLatin(firstName);
    const isIdExist = useDebtorsStore.getState().debtors.find(item => item.id === generatedId) !== undefined

    if (isIdExist) {
        throw new Error('Debtor already exists')
    }

    useDebtorsStore.setState(state => ({debtors: [...state.debtors, {id: generatedId, firstName, lastName}]}))
}
