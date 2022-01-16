import { AssetsState, assetReducer } from "./assetSlice";
import { CurrencyState, currencyReducer } from "./currencySlice";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";

export interface RootState {
    assets: AssetsState;
    currencies: CurrencyState;
}

export function configureAppStore(initialState: RootState): EnhancedStore<RootState> {
    const store = configureStore({
        reducer: {
            assets: assetReducer,
            currencies: currencyReducer
        },
        devTools: true,
        preloadedState: initialState && Object.keys(initialState).length > 0 ? initialState : undefined
    });

    return store;
}
