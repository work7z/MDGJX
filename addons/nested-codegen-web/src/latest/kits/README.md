[![NPM](https://nodei.co/npm/number-to-chinese-words.png)](https://www.npmjs.com/package/number-to-chinese-words)

# number-to-chinese-words
Convert a number to chinese words. 由數字轉為中文數目

此項目的測試以萬進制為基準，即10⁸為億，10¹²為兆
https://zh.wikipedia.org/wiki/%E5%84%84


### Install
`npm install number-to-chinese-words`

### API
The API is inspired from 
http://github.com/marlun78/number-to-words
This package allow user to use same api from number-to-words for Chinese support. 

#### `toOrdinal(number)`
將整數加上前置的「第」字。
如果輸入的數字包含小數點，小數點後的數目將會被移除。
```js
var converter = require('number-to-chinese-words');
converter.toOrdinal(21); // => “第21”
```

#### `toWords(number)`
將數目轉換成文字。
```js
// 整數:
var converter = require('number-to-chinese-words');
converter.toWords(13); // => “十三”

// Decimal numbers:
converter.toWords(2.9); // => “二點九”

// Negative numbers:
converter.toWords(-3); // => "負三"

// Large numbers:
converter.toWords(9007199254740992); // => “九千零七兆一千九百九十二億五千四百七十四萬零九百九十二”
```

#### `toWordsOrdinal(number)`
將整數轉換成文字，再加上前置的「第」字。
如果輸入的數字包含小數點，小數點後的數目將會被移除。
```js
import converter from "number-to-chinese-words";
converter.toWordsOrdinal(21); // => “第二十一”
```

#### `大寫`
```js
var converter = require("number-to-chinese-words")
converter.default.labels = Object.assign({},converter.default.labels, {
  digits : ['零','壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'],
  units: ['','拾', '佰', '仟', '萬', '拾', '佰', '仟', '億', '拾', '佰', '仟', '兆', '拾', '佰', '仟', '京', '拾', '佰', '仟', '垓']
})

converter.toWords(199254740992); // => 壹仟玖佰玖拾貳億伍仟肆佰柒拾肆萬零玖佰玖拾貳
```

#### `Direct load javascript from html`
```html
  <script src="//unpkg.com/number-to-chinese-words@^1.0/number-to-chinese-words.min.jsx"></script>
  <script>
    var converter = window.index.NumberToChineseWords;
    console.log(converter.toWords(13)); // => 十三
    console.log(converter.toWords(2.9)); // => 二點九
    console.log(converter.toWords(-3)); // => 負三
    console.log(converter.toWords(9007199254740992)); // => 九千零七兆一千九百九十二億五千四百七十四萬零九百九十二

    converter.labels = Object.assign({},converter.labels, {
      digits : ['零','壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'],
      units: ['','拾', '佰', '仟', '萬', '拾', '佰', '仟', '億', '拾', '佰', '仟', '兆', '拾', '佰', '仟', '京', '拾', '佰', '仟', '垓']
    });

    console.log(converter.toWords(199254740992));// => 壹仟玖佰玖拾貳億伍仟肆佰柒拾肆萬零玖佰玖拾貳
  </script>
```