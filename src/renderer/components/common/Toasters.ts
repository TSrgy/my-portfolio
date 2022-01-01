import { Intent, Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
const appToaster = Toaster.create({
    position: Position.TOP,
    usePortal: true
});

export const showSuccesToast = (message: string) => {
    appToaster.show({
        message: message,
        icon: "tick",
        intent: Intent.SUCCESS
    });
};
