let jvm_script = `
let USER_DEFINE_LOGIC = {
  // package
  show_package: 'false',
  package: null,
  // other functions
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatFieldType(fieldObj){
      let typeObjMapping = ({'plainobject':'Object','number':'java.math.BigDecimal','string':'String','boolean':'boolean'})
      let dataType = fieldObj.dataType 
      if(dataType == 'object'){
          return USER_DEFINE_LOGIC.formatClz(fieldObj.fieldName)
      }else if(dataType == 'array'){
          if(fieldObj.primitiveType){
              return \`\${(typeObjMapping[fieldObj.genericType])}[]\`
          }else{
              return \`\${USER_DEFINE_LOGIC.formatClz(fieldObj.genericType)}[]\`
          }
      }else{
        let fv = typeObjMapping[dataType]
        if(_.isNil(fv)){
          return dataType;
        }else{
          return fv;
        }
      }
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`;

const all_lang_tempaltes = [
  {
    label: "PHP",
    value: "PHP",
    language_template: `<?php
class {{formatClz className}} {
    {{#each fields}}
    var {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
    {{/each}}
}
?>`,
    language_script: `
addModel({
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
})`,
  },
  {
    label: "C++",
    value: "cpp",
    language_template: `class {{formatClz className}} {
  public:
  {{#each fields}}
    var {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
}`,
    language_script: `
let USER_DEFINE_LOGIC = {
  // other functions
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`,
  },
  {
    label: "Go",
    value: "go",
    language_template: `type {{formatClz className}} struct {
  {{#each fields}}
    {{formatField fieldName}} {{formatFieldType this}} {{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}}
  {{/each}}
}`,
    language_script: `
let USER_DEFINE_LOGIC = {
  // package
  show_package: 'false',
  package: null,
  // other functions
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatFieldType(fieldObj){
      let typeObjMapping = ({plainobject: 'var','number':'int','string':'string','boolean': 'bool'})
      let dataType = fieldObj.dataType
      if(dataType == 'object'){
          return USER_DEFINE_LOGIC.formatClz(fieldObj.fieldName)
      }else if(dataType == 'array'){
          if(fieldObj.primitiveType){
              return \`\$[]{(typeObjMapping[fieldObj.genericType])}\`
          }else{
              return \`\$[]{USER_DEFINE_LOGIC.formatClz(fieldObj.genericType)}\`
          }
      }else{
          return typeObjMapping[dataType]
      }
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.upperFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`,
  },
  {
    label: "Python",
    value: "python",
    language_template: `{{#if (isBoolTrue @root.show_package) }}package {{@root.package}};
{{/if}}
class {{formatClz className}}:
    def __init__(self, {{formatAllFieldAsArgs fields}}):
        {{#each fields}}
        self.{{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{else}} = {{formatField fieldName}}{{/if}};
        {{/each}}  
}`,
    language_script: `
let USER_DEFINE_LOGIC = {
  formatAllFieldAsArgs(fields){
    return _.chain(fields).map(x=>USER_DEFINE_LOGIC.formatField(x.fieldName)).join(', ').value()
  },
  // other functions
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
    `,
  },
  {
    label: "C#",
    value: "csharp",
    language_template: `{{#if (isBoolTrue @root.show_package) }}namespace {{@root.package}};
{{/if}}
using System;

class {{formatClz className}} {
  {{#each fields}}
  {{formatFieldType this}} {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}

  {{#each fields}}
  public ({{formatFieldType this}} {{formatField fieldName}}){
      get; 
      set;
  }
  {{/each}}
}  
`,
    language_script: `
let USER_DEFINE_LOGIC = {
  // package
  show_package: 'false',
  package: null,
  // other functions
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatFieldType(fieldObj){
      let typeObjMapping = ({'plainobject':'System.Object','number':'decimal','string':'string','boolean':'boolean'})
      let dataType = fieldObj.dataType
      if(dataType == 'object'){
          return USER_DEFINE_LOGIC.formatClz(fieldObj.fieldName)
      }else if(dataType == 'array'){
          if(fieldObj.primitiveType){
              return \`\${(typeObjMapping[fieldObj.genericType])}[]\`
          }else{
              return \`\${USER_DEFINE_LOGIC.formatClz(fieldObj.genericType)}[]\`
          }
      }else{
          return typeObjMapping[dataType]
      }
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`,
  },
  {
    label: "Java",
    value: "java",
    language_template: `{{#if (isBoolTrue @root.show_package) }}package {{@root.package}};
{{/if}}
class {{formatClz className}} {
  {{#each fields}}
  {{formatFieldType this}} {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
  
  {{#each fields}}
  public {{formatFieldType this}} {{formatGetSetFuncName (formatField fieldName) 'get'}}(){
      return this.{{formatField fieldName}};
  }
  {{/each}}

  {{#each fields}}
  public void {{formatGetSetFuncName (formatField fieldName) 'set'}}({{formatFieldType this}} {{formatField fieldName}}){
      this.{{formatField fieldName}} = {{formatField fieldName}};
  }
  {{/each}}
}  
`,
    language_script: jvm_script,
  },
  {
    label: "Scala",
    value: "scala",
    language_template: `{{#if (isBoolTrue @root.show_package) }}package {{@root.package}};
{{/if}}
class {{formatClz className}} {
  {{#each fields}}
  var {{formatField fieldName}}: {{formatFieldType this}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
  
  {{#each fields}}
  public {{formatFieldType this}} {{formatGetSetFuncName (formatField fieldName) 'get'}}(){
      return this.{{formatField fieldName}};
  }
  {{/each}}

  {{#each fields}}
  public void {{formatGetSetFuncName (formatField fieldName) 'set'}}({{formatFieldType this}} {{formatField fieldName}}){
      this.{{formatField fieldName}} = {{formatField fieldName}};
  }
  {{/each}}
}`,
    language_script: jvm_script,
  },
  {
    label: "Kotlin",
    value: "kotlin",
    language_template: `{{#if (isBoolTrue @root.show_package) }}package {{@root.package}};
{{/if}}
class {{formatClz className}} {
  {{#each fields}}
  var {{formatField fieldName}}: {{formatFieldType this}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
  
  {{#each fields}}
  public {{formatFieldType this}} {{formatGetSetFuncName (formatField fieldName) 'get'}}(){
      return this.{{formatField fieldName}};
  }
  {{/each}}

  {{#each fields}}
  public void {{formatGetSetFuncName (formatField fieldName) 'set'}}({{formatFieldType this}} {{formatField fieldName}}){
      this.{{formatField fieldName}} = {{formatField fieldName}};
  }
  {{/each}}
}`,
    language_script: jvm_script,
  },
  {
    label: "Groovy",
    value: "groovy",
    language_template: `{{#if (isBoolTrue @root.show_package) }}package {{@root.package}};
{{/if}}
class {{formatClz className}} {
  {{#each fields}}
  {{formatFieldType this}} {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
}`,
    language_script: jvm_script,
  },
  {
    label: "JavaScript",
    value: "javascript",
    language_template: `class {{formatClz className}} {
  {{#each fields}}
  {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
}`,
    language_script: `
let USER_DEFINE_LOGIC = {
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`,
  },
  {
    label: "TypeScript",
    value: "typescript",
    language_template: `class {{formatClz className}} {
  {{#each fields}}
  {{formatField fieldName}}: {{formatFieldType this}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
}`,
    language_script: `
let USER_DEFINE_LOGIC = {
  // package
  show_package: 'false',
  package: null,
  // other functions
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatFieldType(fieldObj){
      let typeObjMapping = ({plainobject: 'any','number':'number','string':'string','boolean':'boolean'})
      let dataType = fieldObj.dataType
      if(dataType == 'object'){
          return USER_DEFINE_LOGIC.formatClz(fieldObj.fieldName)
      }else if(dataType == 'array'){
          if(fieldObj.primitiveType){
              return \`\${(typeObjMapping[fieldObj.genericType])}[]\`
          }else{
              return \`\${USER_DEFINE_LOGIC.formatClz(fieldObj.genericType)}[]\`
          }
      }else{
          return typeObjMapping[dataType]
      }
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`,
  },
  {
    label: "CoffeeScript",
    value: "coffeescript",
    language_template: `class {{formatClz className}}:
  {{#each fields}}
  {{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{/if}};
  {{/each}}
`,
    language_script: `
    let USER_DEFINE_LOGIC = {
      formatGetSetFuncName(name,type){
          return type+_.upperFirst(name)
      },
      formatClz(clzName){
          return _.upperFirst(clzName);
      },
      formatField(fieldName){
          return _.lowerFirst(fieldName)
      },
    }
    addModel(USER_DEFINE_LOGIC)
    `,
  },
  {
    label: "ES5 Prototype",
    value: "ecmahelper",
    language_template: `function {{formatClz className}}(){
  {{#each fields}}
  this.{{formatField fieldName}}{{#if (isBoolTrue @root.language_show_dft_value)}}{{formatExample example this}}{{else}} = null{{/if}};
  {{/each}}
}`,
    language_script: `
let USER_DEFINE_LOGIC = {
  formatGetSetFuncName(name,type){
      return type+_.upperFirst(name)
  },
  formatClz(clzName){
      return _.upperFirst(clzName);
  },
  formatField(fieldName){
      return _.lowerFirst(fieldName)
  },
}
addModel(USER_DEFINE_LOGIC)
`,
  },
  {
    label: t("Other Programming Language"),
    value: "other",
    language_template: `${t(
      `Pay Attention! Before switching to another language type, please save your template and script firstly, otherwise it will be overwritten.`
    )}
${t(`Welcome to define the template for another programming language`)}.
${t(
  `If you could share the new language template with us, it would be great and CodeGen will become more mature than before.`
)}
`,
    language_script: "",
  },
].map((x, d, n) => {
  if (x.language_script) {
    x.language_script = `// ${t(
      `If you need to modify render function and model value, please kindly check this template script.`
    )}
// ${t(`You can customize the class name and field name by below config.`)}
${x.language_script}
// ${t(`Internal System Definition`)}
addModel({
  isBoolTrue(value){
      return value == 'true'
  },
  formatExample(exampleValue){
    // SYSTEM INTERNAL LOGIC
    if(!_.isNil(exampleValue) && (exampleValue+'').indexOf('CG_TYPE_VALUE_OCT98_')!=-1){
      let formattingTypeObj = JSON.parse((exampleValue+'').replace('CG_TYPE_VALUE_OCT98_',''))
      return " = "+formattingTypeObj.value;
    }
    // SYSTEM INTERNAL LOGIC

    if(exampleValue == null){
        return ''
    }else if(_.isArray(exampleValue) || _.isPlainObject(exampleValue)){
        return \` = null; // \${(JSON.stringify(exampleValue))}\`
    }else if(typeof exampleValue =='string'){
        return \`= "\${exampleValue}"\`
    }else{
        return \`= \${exampleValue}\`
    }
  }
})`;
  }
  return x;
});
export default all_lang_tempaltes;
