import { contextBridge, ipcRenderer } from "electron";

import { RootState } from "@store/index";

contextBridge.exposeInMainWorld("api", {
    getStateAsync: async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await ipcRenderer.invoke("get-state");
    },

    saveStateAsync: async (state: RootState) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await ipcRenderer.invoke("save-state", state);
    }
});
