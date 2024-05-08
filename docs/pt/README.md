<p align="center">
<img width="100" src="https://github.com/work7z/LafTools/blob/dev/modules/web2/public/static/icon.png?raw=true"></img>
<br>
<span style="font-size:20px">LafTools - A próxima geração de uma caixa de ferramentas versátil projetada para programadores
</span>
<!-- <center>
<div style="text-align:center;">
<a target="_blank" href="http://cloud.laftools.cn">Visualize a versão interna do LafTools</a>
</div>
</center> -->
<br><br>
</p>

<i>Note: Esta página é gerada internamente pelo LafTools.</i> <br/> [English](/docs/en_US/README.md)  |  [简体中文](/docs/zh_CN/README.md)  |  [繁體中文](/docs/zh_HK/README.md)  |  [Deutsch](/docs/de/README.md)  |  [Español](/docs/es/README.md)  |  [Français](/docs/fr/README.md)  |  [日本語](/docs/ja/README.md)  |  [한국어](/docs/ko/README.md) | [More](/docs/) <br/>

# 🔮 Visão

LafTools é uma caixa de ferramentas de código aberto, auto-hospedada e com foco na privacidade, projetada para programadores. Você pode encontrar vários conjuntos de ferramentas neste site.

# 💌 Características

- Software Livre para Sempre
- Tempo de execução leve
- Suporte completo à plataforma (incluindo ARMv8)
- Suporte completo semelhante ao GPT
- Altamente integrado com UI produtiva
- Imagens Docker disponíveis e edição portátil
- Suporte para edição desktop(Planning)
- ...

# 🚀 Execute-o em Docker

**Para usuários GLOBAIS:**

```
docker run -e LAFREGION=US -e APPLANG=en_US --name mylaftools -v ~/.laftools-docker:/root/.laftools  -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**Para usuários CHINESES(国内用户):**

```
docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
```

**NOTE**:

1. A porta padrão está definida como 39899, ​​você pode ajustá-la se necessário.
2. LafTools sempre será atualizado automaticamente para a versão mais recente para que você possa aproveitar as funções e correções de bugs mais recentes.

**Docker Images:**

- [Docker Hub - laftools-linux-x64](https://hub.docker.com/r/codegentoolbox/laftools-linux-x64)
- [Docker Hub - laftools-arm64-x64](https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64)

# 🔗 Sites on-line

Para usar essas funções rapidamente, implantamos um site on-line estável nas regiões dos EUA e CN para você usar. A maioria das ferramentas está disponível em nossos sites on-line, exceto algumas ferramentas que dependem de recursos específicos do sistema operacional.

- 🇺🇸 Estado unido: [laftools.dev](https://laftools.dev)
- 🇨🇳 Apenas China Continental: [laftools.cn](https://laftools.cn)

# 🌠 Visualização

![](https://github.com/work7z/LafTools/blob/dev/devtools/images/portal-1.png?raw=true)
![](https://github.com/work7z/LafTools/blob/dev/devtools/images/preview-dark.png?raw=true)

# 📡 Sobre LAF

- `L` -> Linked
- `A` -> Asynchronous
- `F` -> Functional

Em essência, LafTools é um pacote que oferece uma série de conjuntos de ferramentas vinculados, assíncronos e fantásticos.

Fique tranquilo, este projeto evoluirá de maneiras notáveis ​​e fantásticas ao longo do tempo. Este projeto precisa de mais tempo, assim como o vinho, fica melhor com o tempo.

# 🌠 Contribuição

## 1. Configurar ambiente do sistema

Para simplificar, digamos que você clonou este repositório para `C:\Usersjerry\project\laftools-repo` no Windows ou `/Users/jerry/projects/laftools-repo` no Linux/MacOS, então você deve declarar env e definir config abaixo em seu arquivo **~/.bashrc* *, ou simplesmente execute-os antes de executar qualquer comando.

Se você estiver usando o sistema operacional Windows, certifique-se de que todos os comandos sejam executados no git-bash. Para saber mais, consulte [CONTRIBUIÇÃO](/docs/pt/CONTRIBUTION.md). Além disso, é recomendável evitar o uso de espaços em branco ou caracteres que não sejam do inglês no caminho do arquivo onde este projeto está localizado.

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

## 2. Compilar e executar

```bash
# instale a biblioteca global necessária
npm i -g pnpm ts-node typescript

# instalar dependências do projeto
cd $LAFTOOLS_ROOT && npm install -S -D --force
cd $LAFTOOLS_ROOT/modules/web2 && npm install -S -D --force
cd $LAFTOOLS_ROOT/devtools/scripts/scan && npm install -S -D --force

# executar o serviço principal
npm run fe-web

```

## 3. Construir

```bash
cd pipeline
./build-all.sh
```

# 📑 Outros materiais

Abaixo estão outros materiais que você pode dar uma olhada se quiser saber mais detalhes sobre este projeto:

- [Perguntas frequentes](/docs/pt/FAQ.md)
- [CONTRIBUIÇÃO](/docs/pt/CONTRIBUTION.md)
- [Para desenvolvedores da China](/devtools/notes/common/issues.md)

# 💐 Icons

Gostaríamos de agradecer aos artistas talentosos que forneceram os belos ícones abaixo:
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by umartvurdu - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/ide" title="ide icons">Ide icons created by heisenberg_jr - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/fund" title="fund icons">Fund icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/to-do" title="to do icons">To do icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by Freepik - Flaticon</a>

# 🙏 Reconhecimentos

Este projeto não teria sido possível sem incríveis projetos de código aberto aos quais gostaria de expressar pessoalmente minha mais profunda gratidão:

1. [Blueprint UI](https://blueprintjs.com/) - a React-based UI toolkit.
1. [CyberChef](https://github.com/gchq/CyberChef/tree/master) - a web app for encryption, encoding, compression and data analysis.
1. [Lodash](https://github.com/lodash/lodash) - a modern JavaScript utility library delivering modularity, performance, & extras.
1. [one-api](https://github.com/songquanpeng/one-api) - an OpenAI key management & redistribution system.

Com certeza existem outros projetos open source que beneficiaram e facilitaram este projeto, que não pude detalhar nesta parte; Sem esses projetos e os esforços desses desenvolvedores de talentos, o LafTools não teria sido possível.

# 🪪 License

Este projeto está protegido pela Licença Pública Geral GNU Affero. Consulte o arquivo LICENSE para obter mais detalhes.
