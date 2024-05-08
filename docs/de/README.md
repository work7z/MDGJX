<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Die nächste Generation einer vielseitigen Toolbox für Programmierer
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Vorschau der Insider-Version von LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Diese Seite wird intern von LafTools generiert.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  Deutsch  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Vision

LafTools ist eine selbstgehostete, vollständig Open-Source-Toolbox für Programmierer, bei der der Datenschutz an erster Stelle steht. Auf dieser Website finden Sie zahlreiche Toolsets.

# 💌 Merkmale

- FOSS für immer
- Leichte Laufzeit
- Vollständige Plattformunterstützung (einschließlich ARMv8)
- Vollständige GPT-ähnliche Unterstützung
- Hochintegriert mit produktiver Benutzeroberfläche
- Verfügbare Docker-Images und Portable Edition
- Unterstützung der Desktop-Edition(Planning)
- ...

# 🚀 Führen Sie es auf Docker aus

**Für GLOBALE Benutzer:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Für CHINESISCHE Benutzer(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Der Standardport ist auf 39899 eingestellt. Sie können ihn bei Bedarf anpassen.
2. LafTools wird immer automatisch auf die neueste Version aktualisiert, damit Sie in den Genuss der neuesten Funktionen und Fehlerbehebungen kommen.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Online-Websites

Um diese Funktionen schnell nutzen zu können, haben wir in den USA und China eine stabile Online-Website für Sie bereitgestellt. Die meisten Tools sind auf unseren Online-Websites verfügbar, mit Ausnahme einiger Tools, die auf bestimmten Betriebssystemfunktionen basieren.

- 🇺🇸 Vereinigter Staat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Nur auf dem chinesischen Festland: [laftools.cn](https://laftools.cn)

# 🌠 Vorschau

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Über LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Im Wesentlichen handelt es sich bei LafTools um eine Suite, die eine Reihe verknüpfter, asynchroner und fantastischer Toolsets bietet.

Seien Sie versichert, dass sich dieses Projekt im Laufe der Zeit auf bemerkenswerte und fantastische Weise weiterentwickeln wird. Dieses Projekt braucht mehr Zeit, genau wie Wein mit der Zeit besser wird.

# 🌠 Beitrag

## 1. Systemumgebung einrichten

Nehmen wir der Einfachheit halber an, dass Sie dieses Repository entweder auf `C:\Usersjerry\project\laftools-repo` unter Windows oder auf `/Users/jerry/projects/laftools-repo` unter Linux/MacOS geklont haben. Dann sollten Sie env deklarieren und unten in Ihrer Datei config festlegen **~/.bashrc* *, oder führen Sie sie einfach aus, bevor Sie einen Befehl ausführen.

Wenn Sie ein Windows-Betriebssystem verwenden, stellen Sie bitte sicher, dass alle Befehle in Git-Bash ausgeführt werden. Weitere Informationen finden Sie unter [BEITRAG](/docs/de/CONTRIBUTION.md). Darüber hinaus wird empfohlen, im Dateipfad, in dem sich dieses Projekt befindet, keine Leerzeichen oder nicht-englischen Zeichen zu verwenden.

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

## 2. Kompilieren und ausführen

```bash
# Installieren Sie die erforderliche globale Bibliothek
npm i -g pnpm ts-node typescript

# Projekt-Abhängigkeiten installieren
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# Kerndienst ausführen
npm run fe-web

```

## 3. Bauen

```bash
cd pipeline
./build-all.sh
```

# 📑 Andere Materialien

Nachfolgend finden Sie weitere Materialien, die Sie sich ansehen können, wenn Sie mehr Details über dieses Projekt erfahren möchten:

- [FAQ](/docs/de/FAQ.md)
- [BEITRAG](/docs/de/CONTRIBUTION.md)
- [Für chinesische Entwickler](/devtools/notes/common/issues.md)

# 💐 Icons

Wir würden uns über talentierte Künstler freuen, die die folgenden wunderschönen Symbole zur Verfügung gestellt haben:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Danksagungen

Dieses Projekt wäre ohne großartige Open-Source-Projekte nicht möglich gewesen, bei denen ich persönlich meinen tiefsten Dank aussprechen möchte:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Sicherlich gibt es andere Open-Source-Projekte, die diesem Projekt geholfen und es erleichtert haben, worauf ich in diesem Teil nicht näher eingehen kann; Ohne diese Projekte und die Bemühungen dieser Talententwickler wäre LafTools nicht möglich gewesen.

# 🪪 License

Dieses Projekt ist unter der GNU Affero General Public License geschützt. Weitere Informationen finden Sie in der LIZENZdatei.
