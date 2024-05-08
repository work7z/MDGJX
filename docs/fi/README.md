<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Monipuolisen työkalupakin seuraavan sukupolven ohjelmoijille
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Esikatsele LafToolsin sisäpiiriversiota</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Tämä sivu on luotu sisäisesti LafToolsista.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Näkemys

LafTools on yksityisyyden ensisijainen, itse isännöity, täysin avoimen lähdekoodin työkalupakki, joka on suunniteltu ohjelmoijille. Tältä verkkosivustolta löydät runsaasti työkalusarjoja.

# 💌 ominaisuudet

- FOSS Ikuisesti
- Kevyt käyttöaika
- Täysi alustatuki (mukaan lukien ARMv8)
- Täysi GPT-kuten tuki
- Erittäin integroitu tuottavaan käyttöliittymään
- Saatavilla Docker-kuvat ja Portable Edition
- Työpöytäversion tuki(Planning)
- ...

# 🚀 Suorita se Docker

**GLOBAALILLE käyttäjille:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**KIINALAISILLE käyttäjille(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Oletusportti on 39899, ​​voit säätää sitä tarvittaessa.
2. LafTools päivitetään aina uusimpaan versioon automaattisesti, jotta voit nauttia uusimmista toiminnoista ja virheenkorjauksista.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Verkkosivustot

Jotta voit käyttää näitä toimintoja nopeasti, olemme ottaneet käyttöön vakaan online-sivuston Yhdysvalloissa ja CN-alueella. Useimmat työkalut ovat saatavilla online-sivustoillamme lukuun ottamatta joitakin työkaluja, jotka perustuvat tiettyihin käyttöjärjestelmän ominaisuuksiin.

- 🇺🇸 Yhdysvallat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Vain Manner-Kiina: [laftools.cn](https://laftools.cn)

# 🌠 Esikatselu

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Tietoja LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Pohjimmiltaan LafTools on sarja, joka tarjoaa joukon linkitettyjä, asynkronisia ja upeita työkalusarjoja.

Voit olla varma, että tämä projekti kehittyy merkittävillä ja fantastisilla tavoilla ajan myötä. Tämä projekti vaatii enemmän aikaa, kuten viini, paranee ajan myötä.

# 🌠 Osallistuminen

## 1. Määritä järjestelmäympäristö

Oletetaan yksinkertaisuuden vuoksi, että olet kloonannut tämän arkiston joko osoitteeseen `C:\Usersjerry\project\laftools-repo` Windowsissa tai `/Users/jerry/projects/laftools-repo` Linuxissa/MacOS:ssä, niin sinun tulee ilmoittaa env ja asettaa asetukset alla tiedostossasi **~/.bashrc* * tai yksinkertaisesti suorita ne ennen minkään komennon suorittamista.

Jos käytät Windows-käyttöjärjestelmää, varmista, että kaikki komennot suoritetaan git-bashissa. Lisätietoja on kohdassa [CONTRIBUTION](/docs/fi/CONTRIBUTION.md). Tämän lisäksi on suositeltavaa välttää välilyöntien tai muiden kuin englanninkielisten merkkien käyttöä tiedostopolussa, jossa tämä projekti sijaitsee.

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

## 2. Kääntää ja ajaa

```bash
# asenna vaadittu globaali kirjasto
npm i -g pnpm ts-node typescript

# asenna projektideps
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# suorittaa ydinpalvelua
npm run fe-web

```

## 3. Rakentaa

```bash
cd pipeline
./build-all.sh
```

# 📑 Muut materiaalit

Alla on muita materiaaleja, joita voit katsoa, ​​jos haluat saada lisätietoja tästä projektista:

- [FAQ](/docs/fi/FAQ.md)
- [AMOITUS](/docs/fi/CONTRIBUTION.md)
- [Kiinan kehittäjille](/devtools/notes/common/issues.md)

# 💐 Icons

Arvostamme lahjakkaita taiteilijoita, jotka toimittivat alla kauniita kuvakkeita:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Kiitokset

Tämä projekti ei olisi ollut mahdollinen ilman mahtavia avoimen lähdekoodin projekteja, joista haluan henkilökohtaisesti ilmaista syvimmän kiitokseni:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Varmasti on muitakin avoimen lähdekoodin projekteja, jotka ovat hyötyneet ja helpottaneet tätä projektia, joita en tässä osiossa pystynyt erittelemään; Ilman näitä projekteja ja lahjakkuuksien kehittäjien ponnisteluja LafTools ei olisi ollut mahdollinen.

# 🪪 License

Tämä projekti on suojattu GNU Affero General Public License -lisenssillä, katso lisätietoja LICENSE-tiedostosta.
