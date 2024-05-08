<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Kotak peralatan serbaguna generasi berikutnya yang dirancang untuk pemrogram
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Pratinjau LafTools Versi Insider</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Halaman ini dihasilkan dari LafTools secara internal.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Penglihatan

LafTools adalah kotak alat sumber terbuka yang mengutamakan privasi, dihosting sendiri, dan dirancang untuk pemrogram. Anda dapat menemukan banyak rangkaian alat di situs web ini.

# 💌 Fitur

- FOSS Selamanya
- Waktu Proses Ringan
- Dukungan platform penuh (termasuk ARMv8)
- Dukungan penuh mirip GPT
- Sangat terintegrasi dengan UI produktif
- Tersedia Gambar Docker dan Edisi Portabel
- Dukungan edisi desktop(Planning)
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

1. Port default diatur ke 39899, ​​Anda dapat menyesuaikannya jika diperlukan.
2. LafTools akan selalu diupgrade ke versi terbaru secara otomatis sehingga Anda dapat menikmati fungsi-fungsi terbaru dan perbaikan bug.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Situs Web Daring

Untuk menggunakan fungsi-fungsi ini dengan cepat, kami telah menerapkan situs web online yang stabil di wilayah AS dan CN untuk Anda gunakan. Sebagian besar alat tersedia di situs online kami kecuali beberapa alat yang mengandalkan kemampuan OS tertentu.

- 🇺🇸 Amerika Serikat: [laftools.dev](https://laftools.dev)
- 🇨🇳 Khusus Tiongkok Daratan: [laftools.cn](https://laftools.cn)

# 🌠 Pratinjau

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Tentang LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Intinya, LafTools adalah rangkaian yang menawarkan serangkaian rangkaian alat yang terhubung, asinkron, dan fantastis.

Yakinlah, proyek ini akan berkembang dengan cara yang luar biasa dan fantastis seiring berjalannya waktu. Proyek ini membutuhkan lebih banyak waktu, seperti halnya anggur, menjadi lebih baik seiring berjalannya waktu.

# 🌠 Kontribusi

## 1. Pengaturan Lingkungan Sistem

Demi kesederhanaan, katakanlah Anda telah mengkloning repositori ini ke `C:\Usersjerry\project\laftools-repo` di Windows atau `/Users/jerry/projects/laftools-repo` di Linux/MacOS, maka Anda harus mendeklarasikan env dan menyetel config di bawah ini dalam file Anda **~/.bashrc* *, atau jalankan saja sebelum menjalankan perintah apa pun.

Jika Anda menggunakan OS Windows, pastikan semua perintah dijalankan di git-bash, pelajari lebih lanjut silakan merujuk ke [KONTRIBUSI](/docs/id/CONTRIBUTION.md). Selain itu, disarankan untuk menghindari penggunaan spasi atau karakter non-Inggris di jalur file tempat proyek ini berada.

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

## 2. Kompilasi dan Jalankan

```bash
# instal perpustakaan global yang diperlukan
npm i -g pnpm ts-node typescript

# instal deps proyek
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# menjalankan layanan inti
npm run fe-web

```

## 3. Membangun

```bash
cd pipeline
./build-all.sh
```

# 📑 Bahan Lainnya

Di bawah ini adalah materi lebih lanjut yang dapat Anda lihat jika Anda ingin mempelajari lebih detail tentang proyek ini:

- [Pertanyaan Umum](/docs/id/FAQ.md)
- [KONTRIBUSI](/docs/id/CONTRIBUTION.md)
- [Untuk Pengembang Tiongkok](/devtools/notes/common/issues.md)

# 💐 Icons

Kami sangat menghargai seniman berbakat yang menyediakan ikon-ikon indah di bawah ini:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Ucapan Terima Kasih

Proyek ini tidak akan mungkin terwujud tanpa proyek open source yang luar biasa. Saya secara pribadi ingin mengucapkan terima kasih yang sebesar-besarnya kepada:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Yang pasti, ada proyek open source lain yang memberikan manfaat dan memfasilitasi proyek ini, yang tidak dapat saya jelaskan secara rinci di bagian ini; Tanpa proyek-proyek ini dan upaya para pengembang bakat ini, LafTools tidak akan mungkin terwujud.

# 🪪 License

Proyek ini dilindungi di bawah Lisensi Publik Umum GNU Affero, silakan lihat file LISENSI untuk lebih jelasnya.
