# SRK Toolbox
[![Releases](https://github.com/Raka-loah/SRK-Toolbox/actions/workflows/releases.yml/badge.svg)](https://github.com/Raka-loah/SRK-Toolbox/actions/workflows/releases.yml)
![Github Release Total Downloads](https://img.shields.io/github/downloads/Raka-loah/SRK-Toolbox/total?label=Release%20Downloads)
![Docker Pulls](https://img.shields.io/docker/pulls/rakaloah/srk-toolbox?label=Docker%20Pulls)


CyberChef汉化版，因为是Apache 2.0 License，所以我可以给整个项目改名字 :)

已基本汉化完成，后续仅有小修复和版本更新。

[汉化版在这里](https://btsrk.me) - have fun!

[汉化分流地址](https://raka.rocks) - Github Pages防止上面的网站失联

如果因为缓存没有显示最新版，记得Ctrl+F5。

## 构建备注

由于原版CyberChef引用的[SnackbarJS](https://github.com/FezVrasta/snackbarjs)已经好几年不更新现在已经崩掉了，于是更换成了[toastr](https://github.com/CodeSeven/toastr)。

## Docker镜像

虽然觉得没什么必要（就一堆网页），但还是（学习了Docker的用法并）做了[Docker镜像](https://hub.docker.com/r/rakaloah/srk-toolbox)：

```docker pull rakaloah/srk-toolbox```

端口是3000，请自行反代。从v9.54.0开始，镜像会按照官方版本同步打Tag。

CyberChef的原版README：[点此](https://github.com/gchq/CyberChef/blob/master/README.md)