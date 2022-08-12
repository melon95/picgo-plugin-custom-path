## picgo-plugin-custom-path



A PicGo plugin for customizing file name.

可以很自定义生成文件存储路径的插件，文件(包括路径)名称支持日期、随机字符串、原文件名等规则。

更多需求，欢迎PR或提ISSUE。


---

## 例如

`2020/07/24/674b96a992fac527a8332ac4adc89a14-filename-fa2c97-19-44-17.png`

---

## 修改配置参数后生效

format，文件(路径)格式，默认为空，自定义文件路径及文件名，例如：

    fix-dir/{localFolder:2}/{y}/{m}/{d}/{h}-{i}-{s}-{hash}-{origin}-{rand:6}
    
上传文件名为`/images/test/localImage.jpg`的文件时，会重命名为

    fix-dir/images/test/2020/07/24/21-40-31-36921a9c364ed4789d4bc684bcb81d62-localImage-fa2c97.jpg



命名规则：

- {y} 年，4位
- {m} 月，2位
- {d} 日期，2位
- {h} 小时，2位
- {i} 分钟，2位
- {s} 秒，2位
- {ms} 毫秒，3位(**v1.0.4**)
- {timestamp} 时间戳(秒)，10位(**v1.0.4**)
- {hash}，文件的md5值，32位
- {origin}，文件原名（会去掉后缀）


---
### 版权声明

MIT
