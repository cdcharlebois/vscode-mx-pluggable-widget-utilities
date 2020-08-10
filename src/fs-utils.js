const vscode = require("vscode");
const { Location, Position, Uri } = vscode;
const fs = require("fs");
const xml2js = require("xml2js");
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

/**
 *
 * @param {String} propName - the name of the property to lookup
 * @param {String} filePath - path to the widget properties file
 */
const getWidgetPropertyTypeFromName = async (propName, filePath) => {
  // first, need to load the properties file and parse it as xml
  const propsXML = await _getXMLFromFile(filePath);
  // next, query that result for the property
  const propertyGroups = propsXML.widget.properties[0].propertyGroup;
  for (let i = 0; i < propertyGroups.length; i++) {
    for (let j = 0; j < propertyGroups[i].property.length; j++) {
      if (propertyGroups[i].property[j].$.key === propName) {
        return propertyGroups[i].property[j].$.type;
      }
    }
  }
};
module.exports = {
  getWidgetPropsFiles,
  getLocationsOfPropertyInFile,
  getWidgetPropertyTypeFromName,
};

const _getPropertyList = async (filePath) => {
  const propsXML = await _getXMLFromFile(filePath);
  const propertyGroups = propsXML.widget.properties[0].propertyGroup;
  let mapping = [];
  propertyGroups.forEach((pg) => {
    const thisGroup = pg.property.map((p) => ({
      key: p.$.key,
      type: p.$.type,
      group: pg.$.caption,
    }));
    mapping.push(...thisGroup);
  });
  return mapping;
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

const _getXMLFromFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, async (err, data) => {
      if (err) {
        reject(err);
      }
      const xml = await _parseString(data);
      resolve(xml);
    });
  });
};

const _parseString = async (data) => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
