// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// vscode.languages;
const { languages: Languages, Hover } = vscode;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "mendix-pluggable-widget-utilities" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "mendix-pluggable-widget-utilities.helloWorld",
    function () {
      vscode.window.showInformationMessage(
        "Hello World from mendix-pluggable-widget-utilities!"
      );
    }
  );
  Languages.registerHoverProvider("javascript", {
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
    },
  });
  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
