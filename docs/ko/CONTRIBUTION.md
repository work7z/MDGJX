<i>Note: 이 페이지는 LafTools에서 내부적으로 생성됩니다.</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  [简体中文](/docs/zh_CN/CONTRIBUTION.md)  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  [Deutsch](/docs/de/CONTRIBUTION.md)  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  [日本語](/docs/ja/CONTRIBUTION.md)  |  한국어 | [More](/docs/) <br/>

## 전제조건

이 프로젝트 개발을 시작하기 전에 다음 SDK와 소프트웨어가 설치되어 있는지 확인하십시오. 호환성 문제를 방지하려면 지정된 버전에 세심한 주의를 기울이십시오. 일부 버전은 작동할 수 있지만 아래 나열된 버전이 권장됩니다.

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - 설치 시 'Use Git and optional Unix....'을(를) 선택해야 합니다.
- Visual Studio Code

소스 코드를 수정하기 전에 아래 섹션을 읽어 아키텍처와 기술 세부 사항을 알아보세요.

## 프로젝트를 시작하는 방법은 무엇입니까?

중복된 부분을 작성하지 않으려면 이 섹션에 대한 [README.md](../README.md)를 읽어보세요. 여기에는 deps를 설치하고 프런트엔드 및 백엔드 프로젝트를 실행하는 방법에 대한 전체 지침이 포함되어 있습니다.

## 프로젝트를 빌드하는 방법?

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## 개발자용 VSCode 확장

이 프로젝트를 개발하려는 경우 도움이 될 수 있는 몇 가지 멋진 확장 기능을 확인해 보세요. 이 섹션은 전혀 관심이 없다는 점에 유의하세요.

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

## VSCode에서 개발 및 빌드

이 프로젝트를 개발하거나 빌드하려는 경우 아래 단계를 먼저 완료해야 합니다. 그렇지 않으면 예외 없는 오류가 발생합니다.

1. 터미널 실행 경로를 Git Bash로 설정하세요.
2. 시스템에 환경 설정: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. Go 백엔드 서비스를 처음 시작할 때 dlv 및 gopls를 설치하십시오.

## 기술

개발을 시작하려면 우리가 사용하는 기술에 대해 잘 알고 있는지 확인하세요. 그렇지 않다면 모두 배울 필요는 없습니다. F/E 또는 B/E 기술에만 익숙하더라도 괜찮습니다. 변경 사항이 제대로 수행되었는지 확인하기 위한 단위 테스트와 풀 요청 워크플로가 있습니다.

우리는 귀하의 기여를 기대하고 있습니다.

프론트엔드 개발을 위한:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

백엔드 개발용:

- Go
- Node.js

데스크탑/클라이언트 개발용:

- Wails.io
- Electron
- Browser Extension

문서를 간결하게 작성하기 위해 여기에서는 세 번째 라이브러리에 대한 모든 세부 사항을 자세히 설명하지 않을 것입니다. 자세한 내용은 소스 코드를 읽어보시기 바랍니다.

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
