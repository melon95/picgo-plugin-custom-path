## picgo-plugin-custom-path

A PicGo plugin for customizing upload path

自定义生成文件存储路径的插件，支持日期、随机字符串、原文件名等规则。

## 修改配置参数后生效

path，文件(路径)格式，默认为空，自定义文件路径及文件名，例如：

    images/{year}/{month}/{day}/{origin}-{hash}

上传文件名为`/images/test/test.png`的文件时，会重命名为

    images/2020/07/24/test-6921a9c364e344782d4bc684bcb81d62.png

命名规则：

- year 年，4 位
- month 月，2 位
- day 日期，2 位
- hour 小时，2 位
- minute 分钟，2 位
- second 秒，2 位
- timestamp 时间戳，13 位
- hash，文件的 md5 值，32 位
- origin，文件名
