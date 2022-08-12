declare const _default: (ctx: any) => {
    register: () => void;
    guiMenu: (ctx: any) => {
        label: string;
        handle(ctx: any, guiApi: any): Promise<void>;
    }[];
};
export = _default;
