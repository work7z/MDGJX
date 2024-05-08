<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - De volgende generatie van een veelzijdige toolbox ontworpen voor programmeurs
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Bekijk een voorbeeld van de Insider-versie van LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Deze pagina wordt intern gegenereerd vanuit LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Visie

LafTools is een op privacy gerichte, zelfgehoste, volledig open source toolbox ontworpen voor programmeurs. Op deze website vindt u een overvloed aan toolsets.

# 💌 Functies

- FOSS voor altijd
- Lichtgewicht looptijd
- Volledige platformondersteuning (inclusief ARMv8)
- Volledige GPT-achtige ondersteuning
- Sterk geïntegreerd met productieve gebruikersinterface
- Beschikbare Docker-images en Portable Edition
- Ondersteuning voor desktopversies(Planning)
- ...

# 🚀 Voer het uit op Docker

**Voor GLOBAL-gebruikers:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Voor CHINESE gebruikers(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. De standaardpoort is ingesteld op 39899. U kunt deze indien nodig aanpassen.
2. LafTools wordt altijd automatisch geüpgraded naar de nieuwste versie, zodat u kunt genieten van de nieuwste functies en bugfixes.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Onlinewebsites

Om deze functies snel te kunnen gebruiken, hebben we een stabiele online website in de VS en de CN-regio geïmplementeerd die u kunt gebruiken. De meeste tools zijn beschikbaar op onze online websites, met uitzondering van enkele tools die afhankelijk zijn van specifieke mogelijkheden van het besturingssysteem.

- 🇺🇸 Verenigde staat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Alleen het vasteland van China: [laftools.cn](https://laftools.cn)

# 🌠 Voorbeeld

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Over LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

In wezen is LafTools een suite die een reeks gekoppelde, asynchrone en fantastische toolsets biedt.

Wees gerust, dit project zal in de loop van de tijd op opmerkelijke en fantastische manieren evolueren. Dit project heeft meer tijd nodig, net zoals wijn met de tijd beter wordt.

# 🌠 Bijdrage

## 1. Systeemomgeving instellen

Laten we voor de eenvoud zeggen dat je deze repository hebt gekloond naar `C:\Usersjerry\project\laftools-repo` op Windows of naar `/Users/jerry/projects/laftools-repo` op Linux/MacOS, dan moet je env declareren en config hieronder instellen in je bestand **~/.bashrc* *, of voer ze eenvoudigweg uit voordat u een opdracht uitvoert.

Als je Windows OS gebruikt, zorg er dan voor dat alle opdrachten worden uitgevoerd in git-bash. Voor meer informatie raadpleeg je [CONTRIBUTION](/docs/nl/CONTRIBUTION.md). Daarnaast wordt aanbevolen om geen spaties of niet-Engelse tekens te gebruiken in het bestandspad waar dit project zich bevindt.

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

## 2. Compileren en uitvoeren

```bash
# installeer de vereiste globale bibliotheek
npm i -g pnpm ts-node typescript

# projectdepartementen installeren
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# kerndienst uitvoeren
npm run fe-web

```

## 3. Bouwen

```bash
cd pipeline
./build-all.sh
```

# 📑 Andere materialen

Hieronder vindt u nog meer materialen die u kunt bekijken als u meer details over dit project wilt weten:

- [FAQ](/docs/nl/FAQ.md)
- [BIJDRAGE](/docs/nl/CONTRIBUTION.md)
- [Voor Chinese ontwikkelaars](/devtools/notes/common/issues.md)

# 💐 Icons

We zouden talentkunstenaars op prijs stellen die onderstaande prachtige iconen aanleveren:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Dankbetuigingen

Dit project zou niet mogelijk zijn geweest zonder geweldige open source-projecten waarvoor ik persoonlijk mijn diepste dankbaarheid wil uiten:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Zeker, er zijn andere open source-projecten die dit project hebben geprofiteerd en gefaciliteerd, die ik in dit deel niet in detail kon beschrijven; Zonder deze projecten en de inspanningen van deze talentontwikkelaars zou LafTools niet mogelijk zijn geweest.

# 🪪 License

Dit project is beschermd onder de GNU Affero General Public License. Zie het LICENSE-bestand voor meer details.
