import picgo from 'picgo';
declare const _default: (ctx: picgo) => {
    register: () => void;
    guiMenu: (ctx: any) => {
        label: string;
        handle(ctx: any, guiApi: any): Promise<void>;
    }[];
};
export = _default;
