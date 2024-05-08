<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - La próxima generación de una caja de herramientas versátil diseñada para programadores
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Vista previa de la versión Insider de LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Esta página se genera internamente desde LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  Español  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Visión

LafTools es una caja de herramientas de código abierto, autohospedada y que prioriza la privacidad, diseñada para programadores; puede encontrar numerosos conjuntos de herramientas en este sitio web.

# 💌 Características

- FOSS para siempre
- Tiempo de ejecución ligero
- Soporte completo de plataforma (incluido ARMv8)
- Soporte completo similar a GPT
- Altamente integrado con una interfaz de usuario productiva
- Imágenes Docker disponibles y edición portátil
- Soporte de edición de escritorio(Planning)
- ...

# 🚀 Ejecútelo en Docker

**Para usuarios GLOBALES:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Para usuarios CHINOS(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. El puerto predeterminado está configurado en 39899, ​​puede ajustarlo si es necesario.
2. LafTools siempre se actualizará automáticamente a la última versión para que pueda disfrutar de las últimas funciones y correcciones de errores.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Sitios web en línea

Para utilizar rápidamente estas funciones, hemos implementado un sitio web estable en línea en la región de EE. UU. y CN para que usted lo utilice. La mayoría de las herramientas están disponibles en nuestros sitios web en línea, excepto algunas herramientas que dependen de capacidades específicas del sistema operativo.

- 🇺🇸 estado unido: [laftools.dev](https://laftools.dev)
- 🇨🇳 Solo China continental: [laftools.cn](https://laftools.cn)

# 🌠 Avance

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Acerca de LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

En esencia, LafTools es una suite que ofrece una serie de conjuntos de herramientas fantásticos, vinculados y asincrónicos.

Tenga la seguridad de que este proyecto evolucionará de manera notable y fantástica con el tiempo. Este proyecto necesita más tiempo, al igual que el vino, mejora con el tiempo.

# 🌠 Contribución

## 1. Configurar el entorno del sistema

En aras de la simplicidad, digamos que ha clonado este repositorio en `C:\Usersjerry\project\laftools-repo` en Windows o en `/Users/jerry/projects/laftools-repo` en Linux/MacOS, luego debe declarar env y establecer la configuración a continuación en su archivo **~/.bashrc* *, o simplemente ejecutarlos antes de ejecutar cualquier comando.

Si está utilizando el sistema operativo Windows, asegúrese de que todos los comandos se ejecuten en git-bash. Para obtener más información, consulte [CONTRIBUCIÓN](/docs/es/CONTRIBUTION.md). Aparte de esto, se recomienda evitar el uso de espacios en blanco o caracteres que no estén en inglés en la ruta del archivo donde se encuentra este proyecto.

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

## 2. Compilar y ejecutar

```bash
# instalar la biblioteca global requerida
npm i -g pnpm ts-node typescript

# instalar departamentos de proyectos
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# ejecutar el servicio principal
npm run fe-web

```

## 3. Construir

```bash
cd pipeline
./build-all.sh
```

# 📑 Otros materiales

A continuación se muestran más materiales que puede consultar si desea conocer más detalles sobre este proyecto:

- [Preguntas más frecuentes](/docs/es/FAQ.md)
- [CONTRIBUCIÓN](/docs/es/CONTRIBUTION.md)
- [Para desarrolladores chinos](/devtools/notes/common/issues.md)

# 💐 Icons

Agradeceríamos a los artistas talentosos que proporcionaron hermosos íconos a continuación:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Agradecimientos

Este proyecto no habría sido posible sin increíbles proyectos de código abierto a los que me gustaría expresar personalmente mi más profundo agradecimiento:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Seguramente hay otros proyectos de código abierto que han beneficiado y facilitado este proyecto, los cuales no podría detallar en esta parte; Sin estos proyectos y el esfuerzo de estos desarrolladores de talentos, LafTools no habría sido posible.

# 🪪 License

Este proyecto está protegido bajo la Licencia Pública General GNU Affero; consulte el archivo de LICENCIA para obtener más detalles.
