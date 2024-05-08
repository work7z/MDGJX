console.log("working it");

function beGOOD(idx) {
  return "((?<![\\\\])['\"`])((?:.(?!(?<![\\\\])\\1))*.?)\\" + idx;
}

let commonText = new RegExp(
  "Dot\\s*\\(\\s*" + beGOOD(1) + "\\s*,\\s*" + beGOOD(3)
);

let exampleStr = `
<Tooltip
content={
  !hasRemarkThisOne
    ? Dot("lp0qmd0", "Mark it as favourite")
    : Dot("_5OqeG", "Unmark it")
}
>
`;

// print out all matched items in exampleStr by commonText
let match;
while ((match = commonText.exec(exampleStr))) {
  console.log(match[0]);
  // substring
  exampleStr = exampleStr.substring(match.index + match[0].length);
}

