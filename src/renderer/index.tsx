import * as React from "react";
import * as ReactDOM from "react-dom";

import { HashRouter, Route, Routes } from "react-router-dom";
import { RootState, configureAppStore } from "@store/index";

import App from "./components/App";
import { AssetCreateForm } from "./components/assets/AssetCreateForm";
import { AssetList } from "@components/assets/AssetList";
import { Provider } from "react-redux";

declare global {
    interface Window {
        api: {
            getStateAsync: () => Promise<RootState>;
            saveStateAsync: (state: RootState) => Promise<void>;
        };
    }
}

(async () => {
    const initialState = await window.api.getStateAsync();
    console.debug(initialState);

    const store = configureAppStore(initialState);

    store.subscribe(() => {
        window.api.saveStateAsync(store.getState());
    });

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<AssetList />}></Route>
                            <Route path="assetList" element={<AssetList />}></Route>
                            <Route path="createAsset" element={<AssetCreateForm />}></Route>
                        </Route>
                    </Routes>
                </HashRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById("root") as HTMLDivElement
    );

    // Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
    // Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
    if (import.meta.hot) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        import.meta.hot.accept();
    }
})();
