"use strict";
const crypto = require('crypto');
const guiMenu = ctx => {
    return [
        {
            label: '配置',
            async handle(ctx, guiApi) {
                const path = ctx.getConfig('picgo-plugin-custom-path.path');
                const value = await guiApi.showInputBox({
                    title: '打开对话框',
                    placeholder: '默认值：images/{y}/{m}/{d}/{origin}-{hash}',
                    value: path
                });
                ctx.saveConfig({
                    'picgo-plugin-custom-path': {
                        path: value
                    }
                });
            }
        }
    ];
};
module.exports = (ctx) => {
    const register = () => {
        ctx.helper.beforeUploadPlugins.register('custom-path', {
            handle: async function (ctx) {
                var _a;
                const autoRename = ctx.getConfig('settings.autoRename');
                const path = (((_a = ctx.getConfig('picgo-plugin-custom-path.path')) === null || _a === void 0 ? void 0 : _a.trim()) || '');
                // 冲突时，关闭autoRename
                if (autoRename && path) {
                    ctx.saveConfig('settings.autoRename', false);
                }
                if (path) {
                    const currentTime = new Date();
                    const formatObject = {
                        y: currentTime.getFullYear(),
                        m: currentTime.getMonth() + 1,
                        d: currentTime.getDate(),
                        h: currentTime.getHours(),
                        i: currentTime.getMinutes(),
                        s: currentTime.getSeconds(),
                        timestamp: currentTime.getTime().toString()
                    };
                    ctx.output.forEach((item, i) => {
                        let fileName = path
                            // 替换日期
                            .replace(/{(y|m|d|h|i|s|timestamp)}/gi, (result, key) => {
                            return (typeof formatObject[key] === 'number' && formatObject[key] < 10 ? '0' : '') + formatObject[key];
                        })
                            // 字符串替换
                            .replace(/{(hash|origin|\w+)}/gi, (result, key) => {
                            // 文件原名
                            if (key === 'origin') {
                                return fileName.substring(0, Math.max(0, fileName.lastIndexOf('.')) || fileName.length)
                                    .replace(/[\\\/:<>|"'*?$#&@()\[\]^~]+/g, '-');
                            }
                            // 文件hash值
                            if (key === 'hash') {
                                const hash = crypto.createHash('md5');
                                hash.update(item.buffer);
                                return hash.digest('hex');
                            }
                            return key;
                        })
                            // 去除多余的"/"
                            .replace(/[\/]+/g, '/');
                        if (fileName.slice(-1) === '/') {
                            fileName += i;
                        }
                        fileName += item.extname;
                        item.fileName = fileName;
                    });
                }
                return ctx;
            },
        });
    };
    return {
        register,
        guiMenu,
    };
};
