import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('test-focus-highlighter.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from test-focus-highlighter!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
