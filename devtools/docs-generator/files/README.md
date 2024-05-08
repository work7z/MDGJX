<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - ${Dot("4BZFkrKZz","The next generation of a versatile toolbox designed for programmers")}
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">${Dot("SSjHemio0","Preview the Insider Version of LafTools")}</a>
</div>
</center> -->
<br><br>
</p>

NOTE_FOR_GEN

# 🔮 ${Dot('rpv2VknDH','Vision')}

${Dot('hOKTq1t-J',"LafTools is a privacy-first, self-hosted, fully open source toolbox designed for programmers, you can find plentful toolsets on this website.")}

# 💌 ${Dot('mVgJ1NxjT','Features')}

- ${Dot("Ed4z058Cr","FOSS Forever")}
- ${Dot("Jh-LM4MG","Lightweight Runtime")}
- ${Dot("RXAzQfM2L","Full platform support(including ARMv8)")}
- ${Dot("4hth-woPf","Full GPT-alike support")}
- ${Dot("iz4ROzL3","Highly integrated with productive UI")}
- ${Dot("HIAvRJazO","Available Docker Images and Portable Edition")}
- ${Dot("4ECM-GgIn","Desktop edition support")}(Planning)
- ...

# 🚀 ${Dot('PPI2qy173M','Run it on {0}','Docker')}

**${Dot('OfXsxq-cF','For GLOBAL users')}:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**${Dot('9efTlPJVX','For CHINESE users')}(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. ${Dot('t9ql09Wnx','Default port is set to 39899, you can adjust it if needed.')}
2. ${Dot('kQOiEpza3','LafTools will always be upgraded to latest version automatically so that you can enjoy latest functions and bugfixs.')}

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 ${Dot('MWEugYzuJ','Online Websites')}

${Dot("hDdqkdxkSd","To quickly use these functions, we've deployed stable online website in US and CN region for you to use. Most tools are available in our online websites except for some tools that rely on specific OS capablities.")}

- 🇺🇸 ${Dot("usvss","United State")}: [laftools.dev](https://laftools.dev)
- 🇨🇳 ${Dot("cnvss","China Mainland")}: [laftools.cn](https://laftools.cn)

# 🌠 ${Dot("OjKP47hFt","Preview")}

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark${extraLang}.png?raw=true)

# 📡 ${Dot("5fxv7a7sF","About {0}",'LAF')}

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

${Dot("15fbRc2id","In short, LafTools is a suite that offers a series of linked, asynchronous, and functional toolsets.")}

${Dot("7p5-nXoUr","Rest assured, this project will evolve in remarkable and fantastic ways over time. This project needs more time, just like wine, gets better with time.")}

# 🌠 ${Dot("Id8EbBiWX","Contribution")}

## 1. ${Dot("lmVW9z9oh","Setup System Environment")}

${Dot("dcOe3U","For the sake of simplicity, let's say that you've cloned this repository to either {0} on Windows or {1} on Linux/MacOS, then you should declare env and set config below in your file **~/.bashrc**, or simply execute them before running any command.",'`C:\\Users\jerry\\project\\laftools-repo`','`/Users/jerry/projects/laftools-repo`')}

${Dot("PLhTRM7Eqwk","If you're using Windows OS, please ensure that all commands are executed in git-bash, learn more please refer to [CONTRIBUTION]({0}). Apart from this, it is recommended to avoid using any whitespace or non-English characters in the file path where this project is located.","/docs/"+lang+"/CONTRIBUTION.md")}

**Env for Windows:**

```bash
git config core.ignorecase false
export LAFTOOLS_ROOT="C:\\users\\jerry\\project\\laftools-repo"
export PATH=$PATH:$LAFTOOLS_ROOT\\dev\\source\\windows-bin
```

**Env for Linux/MacOS:**

```bash
export LAFTOOLS_ROOT=/users/jerry/projects/laftools-repo
```

## 2. ${Dot("gfW2RheHJ-","Compile and Run")}

```bash
# ${Dot("uh8JUYWzH","install required global library")}
npm i -g pnpm ts-node typescript

# ${Dot("YCteaVxTx","install project deps")}
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# ${Dot("ypvuIXEcb","run core service")}
npm run fe-web

```

## 3. ${Dot("QYPc87A2j","Build")}

```bash
cd pipeline
./build-all.sh
```

# 📑 ${Dot("wieewa7cq","Other Materials")}

${Dot("i2fk8l8pB","Below are further materials that you can have a look if you'd like to learn more detail about this project:")}

- [${Dot("Wyi852ml4","FAQ")}](/docs/${lang}/FAQ.md)
- [${Dot("65xgSMWmS","CONTRIBUTION")}](/docs/${lang}/CONTRIBUTION.md)
- [${Dot("uavuXKo4x","For China Developers")}](/devtools/notes/common/issues.md)

# 💐 Icons

${Dot("eI8YT-N_a","We would appreciate talent artists who provided below beautiful icons:")}
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 ${Dot("QzssXokGC","Acknowledgements")}

${Dot("oM2NCFSQ1","This project would not have been possible without awesome open source projects which I would like to personally express my deepest gratitude to:")}

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

${Dot("vWi9Y_HJ6","For sure, there are other open source projects that have benefited and facilitated this project, which I couldn't detail in this part; Without these projects and these talent developers' efforts, LafTools would not have been possible.")}

# 🪪 License

${Dot("R1RzDLneG","This project is protected under the GNU Affero General Public License, please see the LICENSE file for more details.")}
