"use strict";
const Utils = require("./fs-utils");
module.exports = class PeekProvider {
  async provideDefinition(document, position, token) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);

    const propFile = await Utils.getWidgetPropsFile();
    return await Utils.getLocationsOfPropertyInFile(word, propFile.path);
  }
};
