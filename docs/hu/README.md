<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - A programozók számára tervezett sokoldalú eszköztár következő generációja
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Tekintse meg a LafTools Insider verzióját</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Ezt az oldalt a LafTools belsőleg hozta létre.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Látomás

A LafTools egy adatvédelem előtt álló, saját üzemeltetésű, teljesen nyílt forráskódú eszköztár programozók számára, ezen a weboldalon rengeteg eszközkészletet találhat.

# 💌 Jellemzők

- FOSS Forever
- Könnyű futásidő
- Teljes platform támogatás (beleértve az ARMv8-at is)
- Teljes GPT-szerű támogatás
- Erősen integrált a produktív felhasználói felülettel
- Elérhető Docker képek és Portable Edition
- Asztali kiadás támogatása(Planning)
- ...

# 🚀 Futtassa a következőn: Docker

**GLOBÁLIS felhasználóknak:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**KÍNAI felhasználóknak(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Az alapértelmezett port 39899, ​​szükség esetén módosíthatja.
2. A LafTools mindig automatikusan frissül a legújabb verzióra, így élvezheti a legújabb funkciókat és hibajavításokat.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Online Weboldalak

A funkciók gyors használatához stabil online webhelyet állítottunk be az Egyesült Államokban és a CN régióban. A legtöbb eszköz elérhető online webhelyeinken, kivéve néhány olyan eszközt, amelyek az operációs rendszer adott képességeire támaszkodnak.

- 🇺🇸 Egyesült Államok: [laftools.dev](https://laftools.dev)
- 🇨🇳 Csak Kína szárazföldi része: [laftools.cn](https://laftools.cn)

# 🌠 Előnézet

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Körülbelül LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Lényegében a LafTools egy olyan programcsomag, amely összekapcsolt, aszinkron és fantasztikus eszközkészleteket kínál.

Biztos lehet benne, hogy ez a projekt az idő múlásával figyelemre méltó és fantasztikus módon fog fejlődni. Ez a projekt több időt igényel, akárcsak a bor, idővel jobb lesz.

# 🌠 Hozzájárulás

## 1. Rendszerkörnyezet beállítása

Az egyszerűség kedvéért tegyük fel, hogy klónozta ezt a tárolót a következőre: `C:\Usersjerry\project\laftools-repo` Windows rendszeren vagy `/Users/jerry/projects/laftools-repo` Linux/MacOS rendszeren, majd deklarálja az env-t, és állítsa be a konfigurációt alább a **~/.bashrc* fájlban. *, vagy egyszerűen futtassa őket, mielőtt bármilyen parancsot futtatna.

Ha Windows operációs rendszert használ, győződjön meg arról, hogy az összes parancsot a git-bash-ban hajtja végre. További információért olvassa el a [KÖZREHAJTÁS](/docs/hu/CONTRIBUTION.md) részt. Ezen kívül ajánlatos kerülni a szóközök vagy nem angol karakterek használatát a fájl elérési útjában, ahol a projekt található.

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

## 2. Fordítás és futtatás

```bash
# telepítse a szükséges globális könyvtárat
npm i -g pnpm ts-node typescript

# projekt deps telepítése
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# alapszolgáltatás futtatása
npm run fe-web

```

## 3. Épít

```bash
cd pipeline
./build-all.sh
```

# 📑 Más anyagok

Az alábbiakban további anyagok találhatók, amelyeket megtekinthet, ha többet szeretne megtudni erről a projektről:

- [GYIK](/docs/hu/FAQ.md)
- [HOZZÁJÁRULÁS](/docs/hu/CONTRIBUTION.md)
- [Kínai fejlesztőknek](/devtools/notes/common/issues.md)

# 💐 Icons

Nagyra értékelnénk azokat a tehetséges művészeket, akik az alábbi gyönyörű ikonokat mutatták be:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Köszönetnyilvánítás

Ez a projekt nem jöhetett volna létre fantasztikus nyílt forráskódú projektek nélkül, amelyekért személyesen szeretném kifejezni legmélyebb hálámat:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Az biztos, hogy vannak más nyílt forráskódú projektek is, amelyek hasznot húztak ennek a projektnek, és ezeket ebben a részben nem tudtam részletezni; E projektek és a tehetségfejlesztők erőfeszítései nélkül a LafTools nem jöhetett volna létre.

# 🪪 License

Ezt a projektet a GNU Affero General Public License védi, további részletekért tekintse meg a LICENC fájlt.
