import * as vscode from 'vscode';
import { tsquery } from '@phenomnomnominal/tsquery';
import { Node } from "typescript";

const FDESCRIBE_FIT_QUERY = 'CallExpression > Identifier[name=/^f(describe|it)$/]';
const ONLY_QUERY = 'PropertyAccessExpression > Identifier[name="only"]';

let textEditorDecoration: vscode.TextEditorDecorationType;

export function activate(context: vscode.ExtensionContext): void {
	let activeEditor = vscode.window.activeTextEditor;

	textEditorDecoration = createTextEditorDecoration(context);

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;

		if (editor) {
			decorate(editor);
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && activeEditor.document === event.document) {
			decorate(activeEditor);
		}
	}, null, context.subscriptions);
	
	if (activeEditor) {
		decorate(activeEditor);
	}
}

function createTextEditorDecoration(context: vscode.ExtensionContext) {
	return vscode.window.createTextEditorDecorationType({
		overviewRulerLane: 4,
		gutterIconPath: context.asAbsolutePath('/images/warning.svg'),
		overviewRulerColor: new vscode.ThemeColor('editorWarning.foreground'),
		gutterIconSize: '1rem',
	});
}

function decorate(activeEditor: vscode.TextEditor) {
	if (!isSpecFile(activeEditor.document)) {
		return;
	}

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

function isSpecFile(document: vscode.TextDocument): boolean {
	const fileNameEndsWith = /[-|.]spec\.[j|t]s$/;

	return !document.isUntitled && (fileNameEndsWith.test(document.fileName));
}

function createDecorationOption(activeEditor: vscode.TextEditor, node: Node) {
	const startPosition = activeEditor.document.positionAt(node.getStart());
	const endPosition = activeEditor.document.positionAt(node.getEnd());

	const decoration: vscode.DecorationOptions = {
		range: new vscode.Range(startPosition, endPosition),
		hoverMessage: new vscode.MarkdownString('$(warning) Focused test. Be careful not to commit it!', true),
	};

	return decoration;
}

export function deactivate() {}
