<i>Note: 该页面是由LafTools工具箱内部生成的。</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  简体中文  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  [Deutsch](/docs/de/CONTRIBUTION.md)  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  [日本語](/docs/ja/CONTRIBUTION.md)  |  [한국어](/docs/ko/CONTRIBUTION.md) | [More](/docs/) <br/>

## 先决条件

在开始开发此项目之前，请确保您已安装以下 SDK 和软件。请密切注意指定的版本，以避免任何兼容性问题。某些版本可能有效，但建议使用下面列出的版本。

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - 需要选择
- Visual Studio Code

在修改源代码之前，您应该阅读以下部分以了解架构和技术细节。

## 如何启动项目？

为了避免编写重复的部分，请阅读 [README.md](../README.md) 关于本节，它包含如何安装 deps 以及运行前端和后端项目的完整指南。

## 如何构建项目？

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## 面向开发的 VSCode 扩展

如果您要开发这个项目，这里有一些很棒的扩展供您检查，可能会有所帮助。请注意，这部分肯定没有什么意义。

1. Prettier - Code formatter
2. TODO Highlight
3. React
4. Go
5. Golang Tools
6. Tailwind CSS IntelliSense
7. Nano ID generator
8. HTML CSS Support
9. Go To Method
10. go snippets
11. Go Outliner
12. Go Asm
13. Go Doc

## 在 VSCode 上开发和构建

如果您要开发或构建此项目，请注意您应该首先完成以下步骤，否则，您将收到异常错误。

1. 将终端执行路径设置为 Git Bash
2. 在您的系统中设置一个环境: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. 首次启动 Go 后端服务时，请安装 dlv 和 gopls。

## 技术

要开始开发，请检查您是否熟悉我们使用的技术。如果不会，则无需全部学习，如果您只熟悉 F/E 或 B/E 技术也没关系，我们有单元测试和拉取请求工作流程来确保您的更改正确完成。

我们期待您的贡献。

用于前端开发:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

用于后端开发:

- Go
- Node.js

用于桌面/客户端开发:

- Wails.io
- Electron
- Browser Extension

为了简洁地编写我们的文档，我们不会在这里详细说明第三个库的每个细节，请阅读源代码以获取更多详细信息。

## Architecture

TODO:

Client (Web, Desktop, IDE Plugin)
<interact with>
Server SIde Go
<interact with>
Server Side Node

## Specifications

### Tools Implementation

To make sure all tools are supported on all UI clients (Web, Desktop, IDE, mobile, etc…), it is recommended that we implement the logic of tools on the server side, not the client side.

For instance, if you want to convert a base64 text into plain text, we should always do the conversion on the Go server side although there’s a quicker way to do it in the browser directly, which takes user experiences and tool compatibility into consideration.

### Node Module Design

You probably noticed there’s a Node.js server module in the architecture. Why should we use Node.js in this software, isn’t it eating our memory? Aren’t we are we pursuing low memory usage?

The reason why we bring Node worker is to :

- Utilize the ecosystem for extra tools logic in Node.js
- Define system menus, extensions, and config dynamically.
- Develop extensions without restarting the Go service.

To avoid the Node worker keeps eating u machine’s memory, we adopt the below strategy:

- Run Node as a sub-process in Go.
- Only run it when there’s a necessity.
- Using WebSocket as the protocol between Go and Node.
- Terminate Node if there’s no new request for it.

For instance, when you click a button to beautify a piece of code, the client will send a request to the server side. Note that the server side is the Go service.

Then, the Go service receives and detects this request depending on the Node service, accordingly, it will:

- Check if Node is still alive.
- If not then just launch it and keep waiting until Node is active.
- Publish a job to the node worker.
- Waiting for the response from the Node worker.

Once the Node worker completes the process, it will return the data to Go(service) via WebSocket protocol.

## Code Style

To have a good software quality and strong international support, please follow the code styles as below:

- Any label, text or message in front-end or back-end project that will be visible to users should be wrriten in English, and be wrapped by Dot function. (Learn more in i18n setup).
- Any comment for your changes should also be written in English.
- Consider performance and extensibility in your code.

## About i18n Config

Please ensure all text is written in English, for instance:

```Typescript
// "leVsK" -> fragment id
// "This is a {0} project, I like {1}" -> main text
// "awesome" -> {0}
// "LafTools" -> {1}
let str: string = Dot("leVsK","This is an {0} project, I like {1}","awesome","LafTools")

console.log(str) // This is an awesome project, I like LafTools
```

## Next Chapter

Great! You’ve learned the architecture and basic technical detail about this project.

Now, you can click below sections to learn more if you’re still interested.

- How to translate texts by using i18n config?
- How to develop and build for front-end project?
- How to develop and build for back-end project?
- How to write my extension?
- How to run unit tests?
- How to build the binary from source code?

For sure, there's also a FAQ link for your reference.

Lastly, we appreciate that you want to contribute to this project. Should you had any issues or bewilderments, feel free to contact us via Github issue at any time.

Thanks and Regards,  
Laftools Team
