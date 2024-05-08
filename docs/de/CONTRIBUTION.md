<i>Note: Diese Seite wird intern von LafTools generiert.</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  [简体中文](/docs/zh_CN/CONTRIBUTION.md)  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  Deutsch  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  [日本語](/docs/ja/CONTRIBUTION.md)  |  [한국어](/docs/ko/CONTRIBUTION.md) | [More](/docs/) <br/>

## Voraussetzungen

Bevor Sie mit der Entwicklung dieses Projekts beginnen, stellen Sie bitte sicher, dass Sie die folgenden SDKs und Software installiert haben. Achten Sie genau auf die angegebenen Versionen, um Kompatibilitätsprobleme zu vermeiden. Einige Versionen funktionieren möglicherweise, die unten aufgeführten werden jedoch empfohlen.

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - Muss ausgewählt werden
- Visual Studio Code

Bevor Sie den Quellcode ändern, sollten Sie die folgenden Abschnitte lesen, um mehr über die Architektur und die technischen Details zu erfahren.

## Wie starte ich ein Projekt?

Um das Schreiben doppelter Teile zu vermeiden, lesen Sie bitte [README.md](../README.md) zu diesem Abschnitt. Er enthält eine vollständige Anleitung zur Installation von Deps und zur Ausführung von Frontend- und Backend-Projekten.

## Wie baue ich ein Projekt auf?

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## VSCode-Erweiterungen für Dev

Wenn Sie dieses Projekt entwickeln möchten, finden Sie hier einige tolle Erweiterungen, die Sie überprüfen können und die hilfreich sein könnten. Beachten Sie, dass dieser Abschnitt sicherlich nicht von Interesse ist.

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

## Entwickeln und auf VSCode aufbauen

Wenn Sie dieses Projekt entwickeln oder erstellen möchten, beachten Sie, dass Sie zuerst die folgenden Schritte ausführen sollten, andernfalls erhalten Sie unvorhergesehene Fehler.

1. Legen Sie Ihren Terminal-Ausführungspfad als Git Bash fest
2. Legen Sie eine Umgebung in Ihrem System fest: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. Installieren Sie dlv und gopls für den Go-Backend-Dienst, wenn Sie ihn zum ersten Mal starten.

## Technologien

Um mit der Entwicklung zu beginnen, prüfen Sie bitte, ob Sie mit den von uns verwendeten Technologien vertraut sind. Wenn nicht, müssen Sie nicht alle lernen. Es ist kein Problem, wenn Sie nur mit F/E- oder B/E-Technologien vertraut sind. Wir verfügen über Unit-Tests und einen Pull-Request-Workflow, um sicherzustellen, dass Ihre Änderungen ordnungsgemäß durchgeführt werden.

Wir freuen uns auf Ihren Beitrag.

Für die Frontend-Entwicklung:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

Für die Backend-Entwicklung:

- Go
- Node.js

Für Desktop-/Client-Entwicklung:

- Wails.io
- Electron
- Browser Extension

Um unsere Dokumente prägnant zu schreiben, werden wir hier nicht auf jedes Detail dieser dritten Bibliothek näher eingehen. Bitte lesen Sie den Quellcode für weitere Details.

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
