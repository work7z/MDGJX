<i>Note: このページは LafTools から内部的に生成されます。</i> <br/> [English](/docs/en_US/CONTRIBUTION.md)  |  [简体中文](/docs/zh_CN/CONTRIBUTION.md)  |  [繁體中文](/docs/zh_HK/CONTRIBUTION.md)  |  [Deutsch](/docs/de/CONTRIBUTION.md)  |  [Español](/docs/es/CONTRIBUTION.md)  |  [Français](/docs/fr/CONTRIBUTION.md)  |  日本語  |  [한국어](/docs/ko/CONTRIBUTION.md) | [More](/docs/) <br/>

## 前提条件

このプロジェクトの開発を開始する前に、次の SDK とソフトウェアがインストールされていることを確認してください。互換性の問題を避けるために、指定されたバージョンに細心の注意を払ってください。一部のバージョンは動作する可能性がありますが、以下にリストされているバージョンが推奨されます。

- Node v20.9.0
- Go 1.21.1
- Git Bash(for Windows)
  - 選択する必要があります
- Visual Studio Code

ソース コードを変更する前に、以下のセクションを読んでアーキテクチャと技術的な詳細を学ぶ必要があります。

## プロジェクトを立ち上げるにはどうすればいいですか?

重複した部分の記述を避けるために、このセクションについては [README.md](../README.md) をお読みください。deps のインストール方法とフロントエンドおよびバックエンド プロジェクトの実行方法に関する完全なガイドラインが含まれています。

## プロジェクトを構築するにはどうすればよいですか?

We fully opened the source project of this project, to build this project, you can trigger below commands in Git-Bash:

```bash
./pipeline/build-all.sh
```

## 開発用の VSCode 拡張機能

このプロジェクトを開発する場合は、役立つ可能性のある素晴らしい拡張機能をいくつか紹介しますので、ご確認ください。このセクションはまったく興味のないものであることに注意してください。

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

## VSCode での開発と構築

このプロジェクトを開発またはビルドする場合は、最初に以下の手順を完了する必要があることに注意してください。そうしないと、例外なくエラーが発生します。

1. ターミナルの実行パスを Git Bash として設定します
2. システムに環境を設定する: LAFTOOLS_ROOT=${Your Actual Project Root}.
3. Go バックエンド サービスを最初に起動するときに、そのサービス用の dlv と gopls をインストールします。

## テクノロジー

開発を始めるには、私たちが使用するテクノロジーに精通しているかどうかを確認してください。そうでない場合は、すべてを学ぶ必要はありません。F/E または B/E テクノロジーに精通しているだけであれば問題ありません。変更が適切に行われたことを確認するための単体テストとプル リクエスト ワークフローがあります。

皆様のご投稿をお待ちしております。

フロントエンド開発向け:

- React
- TypeScript
- BluePrint.js
- Tailwind.css

バックエンド開発向け:

- Go
- Node.js

デスクトップ/クライアント開発用:

- Wails.io
- Electron
- Browser Extension

ドキュメントを簡潔に書くために、ここでは 3 番目のライブラリについて詳しく説明しません。詳細については、ソース コードを読んでください。

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
