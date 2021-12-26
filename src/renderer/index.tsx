/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as React from "react";
import * as ReactDOM from "react-dom";

import { HashRouter, Route, Routes } from "react-router-dom";

import App from "./components/App";
import { AssetCreateForm } from "./components/assets/AssetCreateForm";

ReactDOM.render(
    <HashRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/createAsset" element={<AssetCreateForm />}></Route>
                </Route>
            </Routes>
        </React.StrictMode>
    </HashRouter>,
    document.getElementById("root") as HTMLDivElement
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    import.meta.hot.accept();
}
