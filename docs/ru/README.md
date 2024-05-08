<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - Следующее поколение универсального набора инструментов, предназначенного для программистов.
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Предварительный просмотр инсайдерской версии LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Эта страница создается внутри LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Зрение

LafTools — это самостоятельный набор инструментов с открытым исходным кодом, ориентированный на конфиденциальность, предназначенный для программистов. На этом веб-сайте вы можете найти множество наборов инструментов.

# 💌 Функции

- ФОСС навсегда
- Легкая среда выполнения
- Полная поддержка платформ (включая ARMv8)
- Полная поддержка GPT
- Высокая интеграция с продуктивным пользовательским интерфейсом
- Доступные образы Docker и портативная версия
- Поддержка настольной версии(Planning)
- ...

# 🚀 Запустите его на Docker

**Для ГЛОБАЛЬНЫХ пользователей:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Для КИТАЙСКИХ пользователей(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. Порт по умолчанию установлен на 39899, ​​при необходимости вы можете изменить его.
2. LafTools всегда будет автоматически обновляться до последней версии, чтобы вы могли пользоваться новейшими функциями и исправлениями ошибок.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Интернет-сайты

Чтобы быстро использовать эти функции, мы развернули для вас стабильный онлайн-сайт в США и Китае. Большинство инструментов доступно на наших веб-сайтах, за исключением некоторых инструментов, которые зависят от конкретных возможностей ОС.

- 🇺🇸 Соединенные Штаты: [laftools.dev](https://laftools.dev)
- 🇨🇳 Только материковый Китай: [laftools.cn](https://laftools.cn)

# 🌠 Предварительный просмотр

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 О LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

По сути, LafTools — это пакет, который предлагает ряд связанных, асинхронных и фантастических наборов инструментов.

Будьте уверены, этот проект со временем будет развиваться удивительными и фантастическими способами. Этот проект требует больше времени, как и вино, которое со временем становится лучше.

# 🌠 Вклад

## 1. Настройка системной среды

Для простоты предположим, что вы клонировали этот репозиторий либо в `C:\Usersjerry\project\laftools-repo` в Windows, либо в `/Users/jerry/projects/laftools-repo` в Linux/MacOS, затем вам следует объявить env и установить конфигурацию ниже в своем файле **~/.bashrc* * или просто выполните их перед запуском любой команды.

Если вы используете ОС Windows, убедитесь, что все команды выполняются в git-bash. Дополнительную информацию см. в разделе [ВКЛАД](/docs/ru/CONTRIBUTION.md). Помимо этого, рекомендуется избегать использования пробелов или неанглийских символов в пути к файлу, где находится этот проект.

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

## 2. Скомпилируйте и запустите

```bash
# установить необходимую глобальную библиотеку
npm i -g pnpm ts-node typescript

# установить описания проекта
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# запустить основной сервис
npm run fe-web

```

## 3. Строить

```bash
cd pipeline
./build-all.sh
```

# 📑 Другие материалы

Ниже приведены дополнительные материалы, с которыми вы можете ознакомиться, если хотите узнать больше об этом проекте:

- [Часто задаваемые вопросы](/docs/ru/FAQ.md)
- [ВКЛАД](/docs/ru/CONTRIBUTION.md)
- [Для китайских разработчиков](/devtools/notes/common/issues.md)

# 💐 Icons

Мы будем признательны талантливым художникам, предоставившим ниже красивые иконки:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Благодарности

Этот проект был бы невозможен без замечательных проектов с открытым исходным кодом, которым я хотел бы лично выразить глубочайшую благодарность:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Конечно, есть и другие проекты с открытым исходным кодом, которые принесли пользу и облегчили этот проект, о которых я не мог подробно рассказать в этой части; Без этих проектов и усилий этих талантливых разработчиков создание LafTools было бы невозможно.

# 🪪 License

Этот проект защищен Генеральной общественной лицензией GNU Affero. Более подробную информацию см. в файле ЛИЦЕНЗИИ.
