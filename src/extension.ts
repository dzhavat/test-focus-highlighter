import * as vscode from 'vscode';
import { tsquery } from '@phenomnomnominal/tsquery';
import { Node } from "typescript";

const FDESCRIBE_FIT_QUERY = 'CallExpression > Identifier[name=/^f(describe|it)$/]';
const ONLY_QUERY = 'PropertyAccessExpression > Identifier[name="only"]';

let textEditorDecoration: vscode.TextEditorDecorationType;

export function activate(context: vscode.ExtensionContext): void {
	const activeEditor = vscode.window.activeTextEditor;

	if (!activeEditor || !isSpecFile(activeEditor.document)) {
		return;
	}

	textEditorDecoration = createTextEditorDecoration(context);

	decorate(activeEditor);
	
	const disposableChangeDocument = vscode.workspace.onDidChangeTextDocument(event => {
		const openEditor = vscode.window.visibleTextEditors.filter(
			editor => editor.document.uri === event.document.uri
		)[0];

		decorate(openEditor);
	});
	
	context.subscriptions.push(disposableChangeDocument);
}

function createTextEditorDecoration(context: vscode.ExtensionContext) {
	return vscode.window.createTextEditorDecorationType({
		overviewRulerLane: 4,
		gutterIconPath: context.asAbsolutePath('/images/warning.svg'),
		overviewRulerColor: new vscode.ThemeColor('editorWarning.foreground'),
		gutterIconSize: '1rem',
	});
}

function isSpecFile(document: vscode.TextDocument) {
	return !document.isUntitled && (document.fileName.endsWith('.spec.js') || document.fileName.endsWith('.spec.ts'));
}

function decorate(activeEditor: vscode.TextEditor) {
	const sourceCode = activeEditor.document.getText();
	let decorationOptions: vscode.DecorationOptions[] = [];

	tsquery(sourceCode, FDESCRIBE_FIT_QUERY).map(result => {
		const decoration = createDecorationOption(activeEditor, result.parent.parent);

		decorationOptions.push(decoration);
	});

	tsquery(sourceCode, ONLY_QUERY).map(result => {
		const decoration = createDecorationOption(activeEditor, result.parent.parent.parent);

		decorationOptions.push(decoration);
	});

	activeEditor.setDecorations(textEditorDecoration, decorationOptions);
}

function createDecorationOption(activeEditor: vscode.TextEditor, node: Node) {
	const posStart = activeEditor.document.positionAt(node.getStart());
	const posEnd = activeEditor.document.positionAt(node.getEnd());

	const decoration: vscode.DecorationOptions = {
		range: new vscode.Range(posStart, posEnd),
		hoverMessage: new vscode.MarkdownString('$(warning) Focused test. Be careful not to commit it!', true),
	};

	return decoration;
}

export function deactivate() {}
