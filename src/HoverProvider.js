"use strict";
const vscode = require("vscode");
const { Hover, Location, Uri, Position } = vscode;
module.exports = class HoverProvider {
  constructor() {}
  searchFilePath() {
    const xmlGlob = `**/src/*.xml`;
    return vscode.workspace.findFiles(xmlGlob, `**/package.xml`);
  }
  provideHover(document, position, token) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);

    if (word == "hello") {
      return new Hover(
        new vscode.MarkdownString("").appendCodeblock(
          "console.log('hi there')",
          "javascript"
        )
      );
    }
  }
};
