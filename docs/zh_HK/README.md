<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - 專為程式設計師設計的下一代多功能工具箱
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">預覽LafTools工具箱的 Insider 版本</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: 該頁面是由LafTools工具箱內部產生的。</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  繁體中文  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 想像

LafTools工具箱是一個專為程式設計師設計的隱私第一、自架、完全開源的工具箱，您可以在網站上找到豐富的工具集。

# 💌 特徵

- 永遠的自由軟體
- 輕量級運轉時
- 全平台支援（包括ARMv8）
- 完全類似 GPT 的支持
- 與高效的 UI 高度集成
- 可用的 Docker 映像和便攜式版本
- 桌面版支持(Planning)
- ...

# 🚀 在 Docker 上執行

**對於全球用戶:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**對於中國用戶(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. 預設連接埠設定為39899，您可以根據需要進行調整。
2. LafTools工具箱將始終自動升級到最新版本，以便您可以享受最新的功能和錯誤修復。

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 線上網站

為了快速使用這些功能，我們在美國和中國地區部署了穩定的線上網站供您使用。除了一些依賴特定作業系統功能的工具外，大多數工具都可以在我們的線上網站上找到。

- 🇺🇸 海外版: [laftools.dev](https://laftools.dev)
- 🇨🇳 國內版: [laftools.cn](https://laftools.cn)

# 🌠 預覽

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 關於LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

從本質上講，LafTools工具箱是一個提供一系列基於互連(Linked)、可異步(Asynchronous)且功能化(Functional)的編程向工具集。

請放心，隨著時間的推移，這個計畫將會以非凡而奇妙的方式發展。這個項目需要更多的時間，就像酒一樣，越久越好。

# 🌠 貢獻

## 1. 設定係統環境

為了簡單起見，假設您已將此儲存庫克隆到 Windows 上的 `C:\Usersjerry\project\laftools-repo` 或 Linux/MacOS 上的 `/Users/jerry/projects/laftools-repo`，那麼您應該在檔案 **~/.bashrc* 中聲明 env 並在下方設定設定* ，或者只是在運行任何命令之前執行它們。

如果您使用的是 Windows 作業系統，請確保所有命令都在 git-bash 中執行，以了解更多資訊請參閱 [貢獻](/docs/zh_HK/CONTRIBUTION.md)。除此之外，建議避免在該項目所在的檔案路徑中使用任何空格或非英文字元。

**Env for Windows:**

```bash
git config core.ignorecase false
export LAFTOOLS_ROOT="C:\users\jerry\project\laftools-repo"
export PATH=$PATH:$LAFTOOLS_ROOT\dev\source\windows-bin
```

**Env for Linux/MacOS:**

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## 2. 編譯並運行

```bash
# 安裝所需的全域庫
npm i -g pnpm ts-node typescript

# 安裝專案依賴
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# 運作核心服​​務
npm run fe-web

```

## 3. 構建(Build)

```bash
cd pipeline
./build-all.sh
```

# 📑 其他材料

如果您想了解有關該項目的更多詳細信息，可以查看以下更多材料：

- [常見問題](/docs/zh_HK/FAQ.md)
- [貢獻](/docs/zh_HK/CONTRIBUTION.md)
- [對於中國開發者](/devtools/notes/common/issues.md)

# 💐 Icons

我們非常感謝提供以下精美圖標的才華橫溢的藝術家：
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 致謝

如果沒有出色的開源項目，這個項目就不可能實現，我想親自向以下項目表示最深切的謝意：

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

當然，還有其他開源項目受益並促進了這個項目，我無法在這一部分中詳細介紹；如果沒有這些專案和這些人才開發人員的努力，LafTools工具箱就不可能實現。

# 🪪 License

此專案受 GNU Affero 通用公共授權保護，請參閱授權文件以了解更多詳細資訊。
