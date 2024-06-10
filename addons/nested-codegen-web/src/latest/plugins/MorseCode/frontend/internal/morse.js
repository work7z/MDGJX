import codes from "./code";
let flagItem = `\n___MORSE_RESULT_EOL___`;
let morse = (stringText) => {
  let morseBox = [];
  stringText
    .toUpperCase()
    .split("")
    .forEach((str) => {
      codes.forEach((code) => {
        if (str === code.letter) {
          morseBox.push(code.code);
        }
      });
    });
  return morseBox.join(".");
};
let morseSentence = (stringSentence) => {
  let sentenceBox = [];
  stringSentence.split(" ").forEach((string) => {
    sentenceBox.push(this.morse(string));
  });
  return sentenceBox.join("|");
};
let string = (morseText) => {
  let stringBox = [];
  morseText.split(".").forEach((morse) => {
    codes.forEach((code) => {
      if (morse === code.code) {
        stringBox.push(code.letter);
      }
    });
  });
  return stringBox.join("");
};
let stringSentence = (morseSentence) => {
  let sentenceBox = [];
  morseSentence.split("|").forEach((morse) => {
    sentenceBox.push(this.string(morse));
  });
  return sentenceBox.join(" ");
};
let isMorse = (val) => {
  return string(val) != "" && val.indexOf(flagItem) == -1;
};
const MorseUtils = {
  isMorse,
  flagItem,
  morse,
  morseSentence,
  string,
  stringSentence,
};

export default MorseUtils;
