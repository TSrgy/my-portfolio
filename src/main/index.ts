/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { BrowserWindow, app, dialog, ipcMain } from "electron";

import { RootState } from "@store/index";
import jsonStorage from "electron-json-storage";
import path from "path";

let mainWindow: BrowserWindow | null | undefined;
let state: RootState;

function createMainWindow(): BrowserWindow {
    ipcMain.handle("get-state", (_event, _arg) => {
        return state;
    });

    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (process.env.MODE !== "production") {
        window.webContents.openDevTools();
    }

    window.loadFile("index.html");

    window.on("closed", (): void => {
        mainWindow = null;
    });

    window.webContents.on("devtools-opened", (): void => {
        window.focus();
        setImmediate((): void => {
            window.focus();
        });
    });

    return window;
}

async function start() {
    const loadState = new Promise<RootState>((resolve, reject) => {
        jsonStorage.get("state", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data as RootState);
            }
        });
    });
    state = await loadState;

    ipcMain.handle("save-state", (_event, state: RootState) => {
        jsonStorage.set("state", state, (error) => {
            if (error) {
                throw error;
            }
        });
    });

    // quit application when all windows are closed
    app.on("window-all-closed", (): void => {
        // on macOS it is common for applications to stay open until the user explicitly quits
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", (): void => {
        // on macOS it is common to re-create a window even after all windows have been closed
        if (mainWindow === null) {
            mainWindow = createMainWindow();
        }
    });

    createMainWindow();
}

// create main BrowserWindow when electron is ready
app.on("ready", () => {
    start().catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        dialog.showErrorBox("There's been an error", err && err.message);
    });
});
