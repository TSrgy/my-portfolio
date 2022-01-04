import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import assetSlice, { AssetsState } from "./assetSlice";

export interface RootState {
    assets: AssetsState;
}

export function configureAppStore(initialState: RootState): EnhancedStore<RootState> {
    const store = configureStore({
        reducer: {
            assets: assetSlice
        },
        devTools: true,
        preloadedState: initialState && Object.keys(initialState).length > 0 ? initialState : undefined
    });

    return store;
}
