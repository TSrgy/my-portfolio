/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root") as HTMLDivElement
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    import.meta.hot.accept();
}
