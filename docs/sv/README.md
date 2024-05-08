<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Nästa generation av en mångsidig verktygslåda designad för programmerare
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Förhandsgranska Insider-versionen av LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Den här sidan är genererad från LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Syn

LafTools är en integritets-först, självvärd, helt öppen källkodsverktygslåda designad för programmerare, du kan hitta massor av verktygsuppsättningar på denna webbplats.

# 💌 Funktioner

- FOSS för alltid
- Lättvikts körtid
- Fullständigt plattformsstöd (inklusive ARMv8)
- Fullständigt GPT-liknande stöd
- Mycket integrerad med produktivt användargränssnitt
- Tillgängliga Docker-bilder och Portable Edition
- Stöd för skrivbordsutgåvor(Planning)
- ...

# 🚀 Kör den på Docker

**För GLOBAL användare:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**För KINESISKA användare(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Standardporten är inställd på 39899, ​​du kan justera den om det behövs.
2. LafTools kommer alltid att uppgraderas till senaste versionen automatiskt så att du kan njuta av de senaste funktionerna och buggfixarna.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Webbplatser online

För att snabbt kunna använda dessa funktioner har vi distribuerat en stabil onlinewebbplats i USA och CN-regionen som du kan använda. De flesta verktyg är tillgängliga på våra onlinewebbplatser förutom vissa verktyg som är beroende av specifika OS-funktioner.

- 🇺🇸 USA: [laftools.dev](https://laftools.dev)
- 🇨🇳 Endast fastlandet i Kina: [laftools.cn](https://laftools.cn)

# 🌠 Förhandsvisning

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Om LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

I huvudsak är LafTools en svit som erbjuder en serie länkade, asynkrona och fantastiska verktygsuppsättningar.

Du kan vara säker på att det här projektet kommer att utvecklas på anmärkningsvärda och fantastiska sätt över tiden. Det här projektet behöver mer tid, precis som vin, blir bättre med tiden.

# 🌠 Bidrag

## 1. Konfigurera systemmiljön

För enkelhetens skull, låt oss säga att du har klonat det här arkivet till antingen `C:\Usersjerry\project\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, då bör du deklarera env och ställa in config nedan i din fil **~/.bashrc* *, eller helt enkelt köra dem innan du kör något kommando.

Om du använder Windows OS, se till att alla kommandon körs i git-bash, läs mer se [BIDRAG](/docs/sv/CONTRIBUTION.md). Bortsett från detta rekommenderas det att undvika att använda blanksteg eller icke-engelska tecken i filsökvägen där detta projekt finns.

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

## 2. Kompilera och kör

```bash
# installera det globala biblioteket
npm i -g pnpm ts-node typescript

# installera projektdeps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# köra kärntjänst
npm run fe-web

```

## 3. Bygga

```bash
cd pipeline
./build-all.sh
```

# 📑 Andra material

Nedan finns ytterligare material som du kan ta en titt på om du vill veta mer om detta projekt:

- [FAQ](/docs/sv/FAQ.md)
- [BIDRAG](/docs/sv/CONTRIBUTION.md)
- [För utvecklare i Kina](/devtools/notes/common/issues.md)

# 💐 Icons

Vi skulle uppskatta talangartister som tillhandahåller nedanstående vackra ikoner:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Erkännanden

Detta projekt hade inte varit möjligt utan fantastiska projekt med öppen källkod som jag personligen skulle vilja uttrycka min djupaste tacksamhet till:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

För visst finns det andra projekt med öppen källkod som har gynnat och underlättat detta projekt, som jag inte kunde beskriva i den här delen; Utan dessa projekt och dessa talangutvecklares insatser hade LafTools inte varit möjligt.

# 🪪 License

Detta projekt är skyddat under GNU Affero General Public License, se LICENS-filen för mer information.
