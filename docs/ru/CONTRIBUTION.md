<i>Note: Эта страница создается внутри LafTools.</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  [简体中文](/docs/zh_CN/CONTRIBUTION.md)  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  [Deutsch](/docs/de/CONTRIBUTION.md)  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  [日本語](/docs/ja/CONTRIBUTION.md)  |  [한국어](/docs/ko/CONTRIBUTION.md) | [More](/docs/) <br/>

## Предварительные условия

Прежде чем приступить к разработке этого проекта, убедитесь, что у вас установлены следующие SDK и программное обеспечение. Обратите пристальное внимание на указанные версии, чтобы избежать проблем с совместимостью. Некоторые версии могут работать, но рекомендуется использовать перечисленные ниже.

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - Необходимо выбрать «Use Git and optional Unix....» при установке.
- Visual Studio Code

Прежде чем изменять исходный код, вам следует прочитать приведенные ниже разделы, чтобы изучить архитектуру и технические детали.

## Как запустить проект?

Чтобы избежать написания дублирующихся частей, прочтите [README.md](../README.md) об этом разделе. Он включает в себя полное руководство по установке deps и запуску внешнего и внутреннего проекта.

## Как построить проект?

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## Расширения VSCode для разработчиков

Если вы собираетесь развивать этот проект, вот несколько замечательных расширений, которые могут вам пригодиться. Обратите внимание, что этот раздел, безусловно, не представляет интереса.

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

## Разработка && Создание на основе VSCode

Если вы собираетесь разработать или построить этот проект, обратите внимание, что сначала вам следует выполнить следующие шаги, иначе вы получите неисключенные ошибки.

1. Установите путь выполнения терминала как Git Bash.
2. Установите окружение в вашей системе: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. Установите dlv и gopls для серверной службы Go при первом ее запуске.

## Технологии

Чтобы начать разработку, пожалуйста, проверьте, знакомы ли вы с технологиями, которые мы используем. В противном случае нет необходимости изучать их все, ничего страшного, если вы знакомы только с технологиями F/E или B/E. У нас есть модульные тесты и рабочий процесс запросов на внесение изменений, чтобы убедиться, что ваши изменения внесены правильно.

Мы с нетерпением ждем вашего вклада.

Для фронтенд-разработки:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

Для Back-end разработки:

- Go
- Node.js

Для разработки десктопов/клиентов:

- Wails.io
- Electron
- Browser Extension

Чтобы написать нашу документацию кратко, мы не будем подробно останавливаться на деталях этой третьей библиотеки, пожалуйста, прочитайте исходный код для получения более подробной информации.

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
