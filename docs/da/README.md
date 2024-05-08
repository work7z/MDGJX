<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Den næste generation af en alsidig værktøjskasse designet til programmører
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Forhåndsvisning af Insider-versionen af ​​LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Denne side er genereret fra LafTools internt.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Vision

LafTools er en privatlivsførende, selvhostet, fuldt open source-værktøjskasse designet til programmører, du kan finde masser af værktøjssæt på denne hjemmeside.

# 💌 Funktioner

- FOSS for evigt
- Letvægts Runtime
- Fuld platformunderstøttelse (inklusive ARMv8)
- Fuld GPT-lignende support
- Meget integreret med produktiv brugergrænseflade
- Tilgængelige Docker-billeder og Portable Edition
- Support til desktop-udgave(Planning)
- ...

# 🚀 Kør det på Docker

**For GLOBAL brugere:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**For KINESISKE brugere(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Standardporten er indstillet til 39899, ​​du kan justere den, hvis det er nødvendigt.
2. LafTools vil altid automatisk blive opgraderet til nyeste version, så du kan nyde de nyeste funktioner og fejlrettelser.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Online hjemmesider

For hurtigt at bruge disse funktioner har vi implementeret en stabil online hjemmeside i USA og CN-regionen, som du kan bruge. De fleste værktøjer er tilgængelige på vores online-websteder med undtagelse af nogle værktøjer, der er afhængige af specifikke OS-funktioner.

- 🇺🇸 forenet stat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Kun Kinas fastland: [laftools.cn](https://laftools.cn)

# 🌠 Forhåndsvisning

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Om LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

I det væsentlige er LafTools en suite, der tilbyder en række forbundne, asynkrone og fantastiske værktøjssæt.

Vær sikker på, dette projekt vil udvikle sig på bemærkelsesværdige og fantastiske måder over tid. Dette projekt har brug for mere tid, ligesom vin, bliver bedre med tiden.

# 🌠 Bidrag

## 1. Opsæt systemmiljø

Lad os for nemheds skyld sige, at du har klonet dette lager til enten `C:\Usersjerry\project\laftools-repo` på Windows eller `/Users/jerry/projects/laftools-repo` på Linux/MacOS, så skal du erklære env og indstille config nedenfor i din fil **~/.bashrc* *, eller blot udføre dem, før du kører en kommando.

Hvis du bruger Windows OS, skal du sørge for, at alle kommandoer udføres i git-bash, læs mere, se venligst [BIDRAG](/docs/da/CONTRIBUTION.md). Bortset fra dette anbefales det at undgå at bruge mellemrum eller ikke-engelske tegn i filstien, hvor dette projekt er placeret.

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

## 2. Kompiler og kør

```bash
# installere det nødvendige globale bibliotek
npm i -g pnpm ts-node typescript

# installere projekt deps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# drive kerneydelse
npm run fe-web

```

## 3. Byg

```bash
cd pipeline
./build-all.sh
```

# 📑 Andre materialer

Nedenfor er yderligere materialer, som du kan se, hvis du gerne vil vide mere om dette projekt:

- [FAQ](/docs/da/FAQ.md)
- [BIDRAG](/docs/da/CONTRIBUTION.md)
- [For udviklere i Kina](/devtools/notes/common/issues.md)

# 💐 Icons

Vi ville sætte pris på talentkunstnere, der leverede nedenstående smukke ikoner:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Anerkendelser

Dette projekt ville ikke have været muligt uden fantastiske open source-projekter, som jeg personligt vil udtrykke min dybeste taknemmelighed til:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Der er helt sikkert andre open source-projekter, der har gavnet og faciliteret dette projekt, som jeg ikke kunne beskrive i denne del; Uden disse projekter og disse talentudvikleres indsats havde LafTools ikke været mulig.

# 🪪 License

Dette projekt er beskyttet under GNU Affero General Public License, se venligst LICENS-filen for flere detaljer.
