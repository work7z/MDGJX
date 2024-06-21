# SRK Toolbox 改动记录

## 版本命名

SRK Toolbox沿用CyberChef版本命名方式，此处记录和官方版本不同的版本号与改动记录，未记载此处的版本内容改动同[CyberChef原版改动](https://github.com/gchq/CyberChef/blob/master/CHANGELOG.md)。

## 详细信息

### [10.15.2] - 2024-04-08
- 大意了，合并冲突的时候不小心删了一些东西得补回来。
- 因为官方加入了自动检测输出字符编码的功能，所以删除“输出默认使用UTF8编码”的选项。

### [10.4.1] - 2023-05-09
- 汉化之前漏掉的一小部分说明文字（主要是F1帮助）。
- 增加“输出默认使用UTF8编码”的选项，因为“显示原始字节”不能显示中文，导致汉化后的模块输出看起来是乱码，默认关闭，需要在设置里手动打开。
- 修复选择GB18030解码有时会卡死的问题。

### [9.54.1] - 2022-12-05
- 彻底汉化单元测试并修复对应操作的bug，此后发布的版本均进行全部单元测试。（备注：经核对前期版本中少量操作存在数据部分丢失或汉化疏漏，但不存在数据错误，可放心使用）
- 将Package名称修改为`srktoolbox`与原版进行区分。
- Toastr的一处显示bug修复。

### [9.49.1] - 2022-11-23
- 启用Github Actions作为CI，添加docker镜像。
- 替换SnackbarJS为Toastr。

[10.15.2]: https://github.com/Raka-loah/SRK-Toolbox/releases/tag/v10.15.2
[10.4.1]: https://github.com/Raka-loah/SRK-Toolbox/releases/tag/v10.4.1
[9.54.1]: https://github.com/Raka-loah/SRK-Toolbox/releases/tag/v9.54.1
[9.49.1]: https://github.com/Raka-loah/SRK-Toolbox/releases/tag/v9.49.1