const crypto = require('crypto')

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
const guiMenu = ctx => {
  return [
    {
      label: '配置',
      async handle(ctx, guiApi) {
        const format = ctx.getConfig('picgo-plugin-custom-path.format')
        const value = await guiApi.showInputBox({
          title: '打开对话框',
          placeholder: '默认值：images/{y}/{m}/{d}/{origin}-{hash}',
          value: format
        })
        ctx.saveConfig({
          'picgo-plugin-custom-path': {
            format: value
          }
        })
      }
    }
  ]
}


export = (ctx: any) => {
  const register = () => {
    ctx.helper.beforeUploadPlugins.register('custom-path', {
      handle: async function (ctx) {
        const autoRename = ctx.getConfig('settings.autoRename')
        if (autoRename) {
          ctx.emit('notification', {
            title: '❌ 警告',
            body: '请关闭 PicGo 的 【时间戳重命名】 功能,\ncustom-path 插件重命名方式会被覆盖'
          })
          await sleep(10000)
          throw new Error('custom-path conflict')
        }
        const format: string = ctx.getConfig('picgo-plugin-custom-path.format') || ''
        ctx.output.forEach((item, i) => {
          let fileName = item.fileName
          if (format) {
            let currentTime = new Date()
            let formatObject = {
              y: currentTime.getFullYear(),
              m: currentTime.getMonth() + 1,
              d: currentTime.getDate(),
              h: currentTime.getHours(),
              i: currentTime.getMinutes(),
              s: currentTime.getSeconds(),
              ms : currentTime.getTime().toString().slice(-3),
              timestamp: currentTime.getTime().toString().slice(0,-3)
            }
            // 去除空格
            fileName = format.trim()
              // 替换日期
              .replace(/{(y|m|d|h|i|s|ms|timestamp)}/gi, (result, key) => {
                return (typeof formatObject[key] === 'number' && formatObject[key] < 10 ? '0' : '') + formatObject[key]
              })
              // 字符串替换
              .replace(/{(hash|origin|\w+)}/gi,(result, key) => {
                  // 文件原名
                if (key === 'origin') {
                  return fileName.substring(0, Math.max(0, fileName.lastIndexOf('.')) || fileName.length)
                      .replace(/[\\\/:<>|"'*?$#&@()\[\]^~]+/g, '-')
                }
                  // 文件hash值
                if (key === 'hash') {
                  const hash = crypto.createHash('md5')
                  hash.update(item.buffer)
                  return hash.digest('hex')
                }
                return key
              })

            // 去除多余的"/"
              .replace(/[\/]+/g,'/')

            if (fileName.slice(-1) === '/') {
              fileName += i
            }

            fileName += item.extname
          }
          item.fileName = fileName
        })
        return ctx
      },
    })
  }
  return {
    register,
    guiMenu,
  }
}
