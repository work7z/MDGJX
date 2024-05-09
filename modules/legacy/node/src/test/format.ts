const prettier = require("../lib/prettier/standalone.js");
const parserGraphql = require("../lib/prettier/parser-graphql.js");
const parserAngular = require("../lib/prettier/parser-angular.js");
const parserFlow = require("../lib/prettier/parser-flow.js");
const parserEspree = require("../lib/prettier/parser-espree.js");
const parserGlimmer = require("../lib/prettier/parser-glimmer.js");
const parserMarkdown = require("../lib/prettier/parser-markdown.js");
const parserPostcss = require("../lib/prettier/parser-postcss.js");
const parserTypescript = require("../lib/prettier/parser-typescript.js");
const parserYaml = require("../lib/prettier/parser-yaml.js");
const parserMeriyah = require("../lib/prettier/parser-meriyah.js");


let a = `type Query { hello:          String }`;
setInterval(() => { 
    let mystr = prettier.format(a, {
        parser: "graphql",
        plugins: [parserGraphql],
    });
    console.log(mystr+Date.now())
},100)