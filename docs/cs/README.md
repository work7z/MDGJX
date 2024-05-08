<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Nová generace všestranného toolboxu určeného pro programátory
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Náhled Insider verze LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Tato stránka je generována interně z LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Vidění

LafTools je samozřejmý, plně otevřený zdrojový soubor nástrojů zaměřený na ochranu soukromí, určený pro programátory, na tomto webu můžete najít spoustu sad nástrojů.

# 💌 Funkce

- FOSS navždy
- Lehký běhový čas
- Plná podpora platformy (včetně ARMv8)
- Plná podpora GPT
- Vysoce integrovaný s produktivním uživatelským rozhraním
- Dostupné Docker Images a Portable Edition
- Podpora desktopové edice(Planning)
- ...

# 🚀 Spusťte jej na Docker

**Pro GLOBÁLNÍ uživatele:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Pro ČÍNSKÉ uživatele(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Výchozí port je nastaven na 39899, ​​v případě potřeby jej můžete upravit.
2. LafTools bude vždy automaticky aktualizován na nejnovější verzi, abyste si mohli užívat nejnovější funkce a opravy chyb.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Online webové stránky

Pro rychlé použití těchto funkcí jsme pro vás nasadili stabilní online web v regionu USA a CN. Většina nástrojů je k dispozici na našich online webových stránkách s výjimkou některých nástrojů, které se spoléhají na konkrétní funkce operačního systému.

- 🇺🇸 spojený stát: [laftools.dev](https://laftools.dev)
- 🇨🇳 Pouze pevninská Čína: [laftools.cn](https://laftools.cn)

# 🌠 Náhled

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 O LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

LafTools je v podstatě sada, která nabízí řadu propojených, asynchronních a fantastických sad nástrojů.

Buďte si jisti, že tento projekt se bude časem vyvíjet pozoruhodnými a fantastickými způsoby. Tento projekt potřebuje více času, stejně jako víno, časem se zlepšuje.

# 🌠 Příspěvek

## 1. Nastavení prostředí systému

Pro zjednodušení řekněme, že jste toto úložiště naklonovali buď do `C:\Usersjerry\project\laftools-repo` na Windows nebo `/Users/jerry/projects/laftools-repo` na Linux/MacOS, pak byste měli deklarovat env a nastavit konfiguraci níže ve vašem souboru **~/.bashrc* *, nebo je jednoduše spusťte před spuštěním jakéhokoli příkazu.

Pokud používáte operační systém Windows, ujistěte se, že jsou všechny příkazy prováděny v git-bash, další informace naleznete v [PŘÍSPĚVEK](/docs/cs/CONTRIBUTION.md). Kromě toho se doporučuje nepoužívat žádné mezery nebo neanglické znaky v cestě k souboru, kde je tento projekt umístěn.

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

## 2. Zkompilujte a spusťte

```bash
# nainstalovat požadovanou globální knihovnu
npm i -g pnpm ts-node typescript

# nainstalovat zast
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# spustit základní službu
npm run fe-web

```

## 3. Stavět

```bash
cd pipeline
./build-all.sh
```

# 📑 Jiné materiály

Níže jsou uvedeny další materiály, které si můžete prohlédnout, pokud se chcete o tomto projektu dozvědět více podrobností:

- [FAQ](/docs/cs/FAQ.md)
- [PŘÍSPĚVEK](/docs/cs/CONTRIBUTION.md)
- [Pro čínské vývojáře](/devtools/notes/common/issues.md)

# 💐 Icons

Ocenili bychom talentované umělce, kteří poskytli níže krásné ikony:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Poděkování

Tento projekt by nebyl možný bez úžasných open source projektů, kterým bych rád osobně vyjádřil své nejhlubší poděkování:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Jistě existují další projekty s otevřeným zdrojovým kódem, které tomuto projektu prospěly a usnadnily jej, což jsem v této části nemohl podrobně popsat; Bez těchto projektů a úsilí těchto talentovaných vývojářů by LafTools nebylo možné.

# 🪪 License

Tento projekt je chráněn pod licencí GNU Affero General Public License, další podrobnosti naleznete v souboru LICENSE.
