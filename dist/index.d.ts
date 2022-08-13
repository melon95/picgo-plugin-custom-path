import picgo from 'picgo';
declare const _default: (ctx: picgo) => {
    register: () => void;
    guiMenu: (ctx: picgo) => {
        label: string;
        handle(ctx: any, guiApi: any): Promise<void>;
    }[];
};
export = _default;
