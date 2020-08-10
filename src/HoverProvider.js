"use strict";
const vscode = require("vscode");
const Utils = require("./fs-utils");
const PropertyTypes = require("./PropertyTypes");
const { Hover, Location, Uri, Position } = vscode;
module.exports = class HoverProvider {
  constructor() {}
  searchFilePath() {
    const xmlGlob = `**/src/*.xml`;
    return vscode.workspace.findFiles(xmlGlob, `**/package.xml`);
  }
  async provideHover(document, position, token) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);
    const searchText = `key="${word}"`;

    try {
      const propFiles = await Utils.getWidgetPropsFiles();
      const foundLocations = await Utils.getLocationsOfPropertyInFile(
        searchText,
        propFiles[0].path
      );
      if (foundLocations.length > 0) {
        const propType = await Utils.getWidgetPropertyTypeFromName(
          word,
          propFiles[0].path
        );
        return new Hover(
          new vscode.MarkdownString(
            `Widget Property \`${word}\`: *${propType}*`
          ).appendCodeblock(PropertyTypes[propType], "typescript")
        );
        // return new Hover(
        //   new vscode.MarkdownString("").appendCodeblock(
        //     "console.log('hi there')",
        //     "javascript"
        //   )
        // );
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};
