import * as vscode from 'vscode';
import { tsquery } from '@phenomnomnominal/tsquery';
import { Node } from "typescript";

const FDESCRIBE_FIT_QUERY = 'CallExpression > Identifier[name=/^f(describe|it)$/]';
const ONLY_QUERY = 'PropertyAccessExpression > Identifier[name="only"]';

let decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor: '#ff37371a'
});

export function activate(context: vscode.ExtensionContext) {
	const activeEditor = vscode.window.activeTextEditor;

	if (!activeEditor || !isSpecFile(activeEditor.document)) {
		return;
	}

	decorate(activeEditor);
	
	const disposableChangeDocument = vscode.workspace.onDidChangeTextDocument(event => {
		const openEditor = vscode.window.visibleTextEditors.filter(
			editor => editor.document.uri === event.document.uri
		)[0];

		decorate(openEditor);
	});
	
	context.subscriptions.push(disposableChangeDocument);
}

function isSpecFile(document: vscode.TextDocument) {
	return !document.isUntitled && document.fileName.endsWith('.spec.js');
}

function decorate(activeEditor: vscode.TextEditor) {
	const sourceCode = activeEditor.document.getText();
	let decorationsArray: vscode.DecorationOptions[] = [];

	tsquery(sourceCode, FDESCRIBE_FIT_QUERY).map(result => {
		const decoration = newDecorationOption(activeEditor, result.parent);

		decorationsArray.push(decoration);
	});

	tsquery(sourceCode, ONLY_QUERY).map(result => {
		const decoration = newDecorationOption(activeEditor, result.parent.parent);

		decorationsArray.push(decoration);
	});

	activeEditor.setDecorations(decorationType, decorationsArray);
}

function newDecorationOption(activeEditor: vscode.TextEditor, node: Node) {
	const posStart = activeEditor.document.positionAt(node.getStart());
	const posEnd = activeEditor.document.positionAt(node.getEnd());

	return { range: new vscode.Range(posStart, posEnd) };
}

export function deactivate() {}
