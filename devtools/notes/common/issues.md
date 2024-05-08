# NPM ISSUES

## Error: The specified module could not be found.

It's a common issue in Windows OS, please install the runtime which can be found in devtools/source/VC_redist.x64.exe

## cannot download deps

Before downloading deps, make sure all previous node_modules has been removed from your devices.

**If you're currently located in China, then please use cnpm instead of npm for a better network env.**

# IDE ISSUES

## VSCode Golang has no prompts or syntax accessblity

Cannot pop description panel for any method where your mouse just hovered? Check this section, which is applicable for Windows OS in China mainland only.

**Chinese guideline:**  
https://blog.51cto.com/u_13291771/3766911

**English guideline:**  
Actually, I am not able to find such an issue in other countries, it's probably caused by China mainland network issue. If you also encounter this issue, please setup a GOPROXY for your country and re-install Go extension in VSCode.  
If you still encounter this issue, feel free to raise an issue and contact us.

# For China Developers

In China mainland, it's probably having some connectivity issue while downloading deps, this section includes common cases in China.

Let's say that 127.0.0.1:7890 is your proxy server.

> If you don't have a proxy server, it's also fine as you can use mirrors for China developers, but I wouldn't list how to setup them particularly due to my limited energy and that regulation in the region where I'm living, sorry.

## Install Cygwin

```bash
https://mirrors.tuna.tsinghua.edu.cn/help/cygwin/
```

## Git Proxy

```bash
git config --global http.proxy http://127.0.0.1:7890
```

## NPM Proxy

```bash
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
```

## Bash Proxy

```bash
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
```

## Go Proxy

```bash
go env -w  GOPROXY=https://goproxy.cn,direct
```
