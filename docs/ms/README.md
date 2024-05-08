<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Generasi seterusnya kotak alat serba boleh yang direka untuk pengaturcara
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Pratonton Versi Insider LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Halaman ini dihasilkan daripada LafTools secara dalaman.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Penglihatan

LafTools ialah peti alat sumber terbuka sepenuhnya yang mengutamakan privasi, dihoskan sendiri, yang direka untuk pengaturcara, anda boleh menemui set alat yang banyak di tapak web ini.

# 💌 ciri-ciri

- FOSS Selamanya
- Masa Jalanan Ringan
- Sokongan platform penuh (termasuk ARMv8)
- Sokongan penuh GPT serupa
- Sangat bersepadu dengan UI yang produktif
- Imej Docker dan Edisi Mudah Alih Tersedia
- Sokongan edisi desktop(Planning)
- ...

# 🚀 Jalankan pada Docker

**Untuk pengguna GLOBAL:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Untuk pengguna CINA(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Port lalai ditetapkan kepada 39899, ​​anda boleh melaraskannya jika perlu.
2. LafTools akan sentiasa dinaik taraf kepada versi terkini secara automatik supaya anda boleh menikmati fungsi terkini dan pembetulan pepijat.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Laman Web Dalam Talian

Untuk menggunakan fungsi ini dengan pantas, kami telah menggunakan tapak web dalam talian yang stabil di rantau AS dan CN untuk anda gunakan. Kebanyakan alat tersedia di tapak web dalam talian kami kecuali beberapa alat yang bergantung pada keupayaan OS tertentu.

- 🇺🇸 Amerika Syarikat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Tanah Besar China Sahaja: [laftools.cn](https://laftools.cn)

# 🌠 Pratonton

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Kira-kira LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Pada dasarnya, LafTools ialah suite yang menawarkan satu siri set alat yang dipautkan, tak segerak dan hebat.

Yakinlah, projek ini akan berkembang dengan cara yang luar biasa dan hebat dari semasa ke semasa. Projek ini memerlukan lebih banyak masa, sama seperti wain, menjadi lebih baik dengan masa.

# 🌠 Sumbangan

## 1. Persediaan Persekitaran Sistem

Demi kesederhanaan, katakan anda telah mengklon repositori ini sama ada `C:\Usersjerry\project\laftools-repo` pada Windows atau `/Users/jerry/projects/laftools-repo` pada Linux/MacOS, maka anda harus mengisytiharkan env dan tetapkan konfigurasi di bawah dalam fail anda **~/.bashrc* *, atau hanya laksanakannya sebelum menjalankan sebarang arahan.

Jika anda menggunakan OS Windows, sila pastikan semua arahan dilaksanakan dalam git-bash, ketahui lebih lanjut sila rujuk [SUMBANGAN](/docs/ms/CONTRIBUTION.md). Selain daripada ini, adalah disyorkan untuk mengelak daripada menggunakan sebarang ruang putih atau aksara bukan bahasa Inggeris dalam laluan fail di mana projek ini terletak.

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

## 2. Susun dan Jalankan

```bash
# pasang perpustakaan global yang diperlukan
npm i -g pnpm ts-node typescript

# pasang deps projek
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# menjalankan perkhidmatan teras
npm run fe-web

```

## 3. bina

```bash
cd pipeline
./build-all.sh
```

# 📑 Bahan Lain

Di bawah ialah bahan lanjut yang boleh anda lihat jika anda ingin mengetahui lebih terperinci tentang projek ini:

- [Soalan Lazim](/docs/ms/FAQ.md)
- [SUMBANGAN](/docs/ms/CONTRIBUTION.md)
- [Untuk Pemaju China](/devtools/notes/common/issues.md)

# 💐 Icons

Kami akan menghargai artis berbakat yang menyediakan ikon cantik di bawah:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Ucapan terima kasih

Projek ini tidak akan dapat dilaksanakan tanpa projek sumber terbuka yang hebat yang saya ingin mengucapkan terima kasih yang tidak terhingga kepada:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Yang pasti, terdapat projek sumber terbuka lain yang telah memberi manfaat dan memudahkan projek ini, yang tidak dapat saya perincikan dalam bahagian ini; Tanpa projek-projek ini dan usaha pembangun bakat ini, LafTools tidak mungkin dapat dilaksanakan.

# 🪪 License

Projek ini dilindungi di bawah GNU Affero General Public License, sila lihat fail LICENSE untuk butiran lanjut.
