"use strict";
const vscode = require("vscode");
const fs = require("fs");
const Utils = require("./fs-utils");
module.exports = class PeekProvider {
  async provideDefinition(document, position, token) {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);
    const searchText = `key="${word}"`;

    const propFiles = await Utils.getWidgetPropsFiles();
    return await Utils.getLocationsOfPropertyInFile(
      searchText,
      propFiles[0].path
    );
    // });
  }
};
