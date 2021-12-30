import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export interface Currency {
    name: string;
    oneDollarPrice: number;
}

export interface Asset {
    id: number;
    name: string;
    currency: Currency;
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
            assetsAdapter.addOne(state.assets, payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { addAsset } = assetSlice.actions;

export default assetSlice.reducer;
