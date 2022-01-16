import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { CurrencyId } from "./currencySlice";

export type AssetId = number;

export interface Asset {
    id: AssetId;
    name: string;
    currencyId: CurrencyId;
    price: number;
    amount: number;
}

export interface AssetsState {
    readonly assets: EntityState<Asset>;
}

const assetsAdapter = createEntityAdapter<Asset>({
    selectId: (asset) => asset.id
});

const initialState: AssetsState = {
    assets: assetsAdapter.getInitialState()
};

export const assetSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {
        addAsset: (state, { payload }: PayloadAction<Asset>) => {
            const ids = assetsAdapter
                .getSelectors()
                .selectIds(state.assets)
                .map((id) => <number>id);

            const newId = Math.max(...ids) + 1;

            assetsAdapter.addOne(state.assets, { ...payload, id: newId });
        }
    }
});

// Action creators are generated for each case reducer function
export const { addAsset } = assetSlice.actions;

export const assetReducer = assetSlice.reducer;
