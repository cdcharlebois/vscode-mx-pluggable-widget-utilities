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

    try {
      const propFile = await Utils.getWidgetPropsFile();
      const foundLocations = await Utils.getLocationsOfPropertyInFile(
        word,
        propFile.path
      );
      if (foundLocations.length > 0) {
        const propType = await Utils.getWidgetPropertyTypeFromName(
          word,
          propFile.path
        );
        return new Hover(
          new vscode.MarkdownString(
            `Widget Property \`${word}\`: *${propType}*`
          ).appendCodeblock(PropertyTypes[propType], "typescript")
        );
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};
