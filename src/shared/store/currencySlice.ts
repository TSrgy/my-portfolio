import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type CurrencyId = number;

export interface Currency {
    id: CurrencyId;
    name: string;
}

export interface CurrencyPrice {
    buyCurrencyId: CurrencyId;
    sellCurrencyId: CurrencyId;
    price: number;
}

export interface CurrencyState {
    readonly currencies: EntityState<Currency>;
    readonly prices: EntityState<CurrencyPrice>;
}

const currenciesAdapter = createEntityAdapter<Currency>({
    selectId: (currency) => currency.id
});

const currencyPriciesAdapter = createEntityAdapter<CurrencyPrice>({
    selectId: (price) => price.buyCurrencyId.toString() + "_" + price.sellCurrencyId.toString()
});

const initialState: CurrencyState = {
    currencies: currenciesAdapter.getInitialState(),
    prices: currencyPriciesAdapter.getInitialState()
};

export const currencySlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        addCurrency: (state, { payload }: PayloadAction<Currency>) => {
            const ids = currenciesAdapter
                .getSelectors()
                .selectIds(state.currencies)
                .map((id) => <CurrencyId>id);

            const newId = Math.max(...ids) + 1;

            currenciesAdapter.addOne(state.currencies, { ...payload, id: newId });
        },

        addPrice: (state, { payload }: PayloadAction<CurrencyPrice>) => {
            currencyPriciesAdapter.addOne(state.prices, payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { addCurrency, addPrice } = currencySlice.actions;

export const currencyReducer = currencySlice.reducer;
