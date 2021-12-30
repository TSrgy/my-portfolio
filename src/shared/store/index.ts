import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import assetSlice, { AssetsState } from "./assetSlice";

export interface IAppState {
    assets: AssetsState;
}

export function configureAppStore(initialState: IAppState): EnhancedStore<IAppState> {
    const store = configureStore({
        reducer: {
            assets: assetSlice
        },
        devTools: true,
        preloadedState: initialState && Object.keys(initialState).length > 0 ? initialState : undefined
    });

    return store;
}
