import { contextBridge, ipcRenderer } from "electron";

import { IAppState } from "@store/index";

contextBridge.exposeInMainWorld("api", {
    getStateAsync: async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await ipcRenderer.invoke("get-state");
    },

    saveStateAsync: async (state: IAppState) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await ipcRenderer.invoke("save-state", state);
    }
});
