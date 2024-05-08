<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Den neste generasjonen av en allsidig verktøykasse designet for programmerere
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Forhåndsvis Insider-versjonen av LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Denne siden er generert fra LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Syn

LafTools er en personvern-først, selv-vert, fullt åpen kildekode-verktøykasse designet for programmerere, du kan finne mange verktøysett på denne nettsiden.

# 💌 Egenskaper

- FOSS for alltid
- Lett kjøretid
- Full plattformstøtte (inkludert ARMv8)
- Full GPT-lignende støtte
- Svært integrert med produktivt brukergrensesnitt
- Tilgjengelige Docker Images og Portable Edition
- Støtte for skrivebordsutgaver(Planning)
- ...

# 🚀 Kjør den på Docker

**For GLOBAL brukere:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**For KINESISKE brukere(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Standardporten er satt til 39899, ​​du kan justere den om nødvendig.
2. LafTools vil alltid oppgraderes til siste versjon automatisk slik at du kan nyte de nyeste funksjonene og feilrettingene.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Nettsider

For raskt å bruke disse funksjonene har vi distribuert en stabil nettside i USA og CN-regionen som du kan bruke. De fleste verktøyene er tilgjengelige på nettsidene våre, bortsett fra noen verktøy som er avhengige av spesifikke OS-funksjoner.

- 🇺🇸 forent stat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Kun fastlandet i Kina: [laftools.cn](https://laftools.cn)

# 🌠 Forhåndsvisning

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Om LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

I hovedsak er LafTools en suite som tilbyr en serie koblede, asynkrone og fantastiske verktøysett.

Vær trygg på at dette prosjektet vil utvikle seg på bemerkelsesverdige og fantastiske måter over tid. Dette prosjektet trenger mer tid, akkurat som vin, blir bedre med tiden.

# 🌠 Bidrag

## 1. Sett opp systemmiljø

For enkelhets skyld, la oss si at du har klonet dette depotet til enten `C:\Usersjerry\project\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, så bør du erklære env og angi config nedenfor i filen **~/.bashrc* *, eller bare kjør dem før du kjører en kommando.

Hvis du bruker Windows OS, sørg for at alle kommandoer utføres i git-bash, les mer, se [BIDRAG](/docs/no/CONTRIBUTION.md). Bortsett fra dette, anbefales det å unngå å bruke mellomrom eller ikke-engelske tegn i filbanen der dette prosjektet er plassert.

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

## 2. Kompiler og kjør

```bash
# installer det nødvendige globale biblioteket
npm i -g pnpm ts-node typescript

# installere prosjektdeps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# drive kjernetjeneste
npm run fe-web

```

## 3. Bygge

```bash
cd pipeline
./build-all.sh
```

# 📑 Andre materialer

Nedenfor er ytterligere materialer som du kan ta en titt på hvis du ønsker å lære mer detaljer om dette prosjektet:

- [FAQ](/docs/no/FAQ.md)
- [BIDRAG](/docs/no/CONTRIBUTION.md)
- [For Kina-utviklere](/devtools/notes/common/issues.md)

# 💐 Icons

Vi vil sette pris på talentartister som har gitt under vakre ikoner:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Anerkjennelser

Dette prosjektet ville ikke vært mulig uten fantastiske åpen kildekode-prosjekter som jeg personlig vil uttrykke min dypeste takknemlighet til:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Sikkert er det andre åpen kildekode-prosjekter som har vært til nytte og tilrettelagt for dette prosjektet, som jeg ikke kunne beskrive i denne delen; Uten disse prosjektene og disse talentutviklernes innsats hadde ikke LafTools vært mulig.

# 🪪 License

Dette prosjektet er beskyttet under GNU Affero General Public License, vennligst se LICENSE-filen for flere detaljer.
