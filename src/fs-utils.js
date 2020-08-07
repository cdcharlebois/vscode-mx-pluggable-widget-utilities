const vscode = require("vscode");
const { Location, Position, Uri } = vscode;
const fs = require("fs");
const getWidgetPropsFiles = async () => {
  const xmlGlob = `**/src/*.xml`;
  return vscode.workspace.findFiles(xmlGlob, `**/package.xml`);
};

const getLocationsOfPropertyInFile = async (propName, filePath) => {
  let ret = [];
  // find instance in the file
  const lines2 = await _getLinesFromFile(filePath);
  //////////////
  // const file = fs.readFileSync(filePath, "utf-8");
  // const lines = file.split(/\r?\n/);
  lines2.forEach((line, index) => {
    if (line.indexOf(propName) > -1) {
      ret.push(
        new Location(
          Uri.file(filePath),
          new Position(index, line.indexOf(propName))
        )
      );
    }
  });
  return ret;
};
module.exports = {
  getWidgetPropsFiles,
  getLocationsOfPropertyInFile,
};

const _getLinesFromFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data.split(/\r?\n/));
    });
  });
};
