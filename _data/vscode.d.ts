/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {

	/**
	 * エディターのバージョン
	 */
	export const version: string;

	/**
	 * コマンドへの参照を表示します
	 *
	 * UI でコマンドを表すために使用されます。オプションで呼び出されたとき、コマンド ハンドラに渡される引数の配列を提供します。

	 */
	export interface Command {
		/**
		 * `save`のようなコマンドのタイトル
		 */
		title: string;

		/**
		 * 実際のコマンドハンドラの識別子
		 * @see [commands.registerCommand](#commands.registerCommand).
		 */
		command: string;

		/**
		 * UI で表示されたときのコマンド用ツールチップ
		 */
		tooltip?: string;

		/**
		 * コマンドハンドラが呼び出されるべき引数

		 */
		arguments?: any[];
	}

	/**
	 * ソース コードなどのテキスト行を表します
	 *
	 * TextLine のオブジェクトは  __immutable__ です。[ドキュメント](#TextDocument) が変更されるとき、以前に取得された行は最新の状態を表しません。
	 *
	 */
	export interface TextLine {

		/**
		 * 0 から始まる行番号 (0オリジン)
		 */
		readonly lineNumber: number;

		/**
		 * 行の区切り文字を含まない、この行のテキスト
		 */
		readonly text: string;

		/**
		 * 行の区切り文字を含まない、この行の範囲
		 */
		readonly range: Range;

		/**
		 * 行の区切り文字を含む、この行の範囲
		 */
		readonly rangeIncludingLineBreak: Range;

		/**
		 * `/\s/` によって定義された空白文字ではない最初の文字のオフセット
		 *
		 * **Note** 行がすべて空白の場合行の長さが返されます。
		 */
		readonly firstNonWhitespaceCharacterIndex: number;

		/**
		 * この行が空白のみであるかどうか
		 *
		 *略語 : [TextLine.firstNonWhitespaceCharacterIndex](#TextLine.firstNonWhitespaceCharacterIndex) === [TextLine.text.length](#TextLine.text)
		 */
		readonly isEmptyOrWhitespace: boolean;
	}

	/**
	 * ソース ファイルなどのテキスト ドキュメントを表します
         *
	 * テキスト ドキュメントは [lines](#TextLine) とファイルのような元となるリソースに関する情報を持っています。
	 */
	export interface TextDocument {

		/**
		 * このドキュメントに関連する URL
		 *
		 * ほとんどのドキュメントは __file__ スキームをもち、ディスク上のファイルを表します。
		 *
		 * ただし、ドキュメントによってはディスク上で利用できないことを表すのスキームを持つことがあります。
		 */
		readonly uri: Uri;

		/**
		 * 関連リソースのファイル システム パス
		 *
		 * 略記法 [TextDocument.uri.fsPath](#TextDocument.uri)。Uri のスキームとは独立しています。
		 */
		readonly fileName: string;

		/**
		 * このドキュメントが無題のファイルかどうか
		 */
		readonly isUntitled: boolean;

		/**
		 * このドキュメントに関連する言語の識別子
		 */
		readonly languageId: string;

		/**
		 * このドキュメントのバージョン番号
		 *
		 * 取り消し/やり直しを含む各変更後に、厳密に増加します。
		 */
		readonly version: number;

		/**
		 * 無修正の変更がある場合は `true` です
		 */
		readonly isDirty: boolean;

		/**
		 * ドキュメントが閉じられている場合は `true` です
		 *
		  *閉じたドキュメントは同期されず、同じリソースが再度開かれたとき再利用されません。
		 */
		readonly isClosed: boolean;

		/**
		 * 元となるファイルを保存します
		 *
		 * @return (promise)ファイルが保存されたとき true に解決されます。
		 *ファイルがダーティーでないか保存に失敗したときは false が返ります。

		 */
		save(): Thenable<boolean>;

		/**
		 * このドキュメントで主に使用されている [end of line](#EndOfLine) シークエンス

		 */
		readonly eol: EndOfLine;

		/**
		 * このドキュメント内で行の番号
		 */
		readonly lineCount: number;

		/**
		 * 行番号を意味するテキスト行を返します
		 *
		 * 返されるオブジェクトは live では**ありません**、ドキュメントへの変更は反映されないことに注意してください。

		 *
		 * @param line A line number [0, lineCount]
		 * @return [line](#TextLine)
		 */
		lineAt(line: number): TextLine;

		/**
		 * position を示すテキスト行を返します
		 *
		 * 返されるオブジェクトは live では**ありません**、ドキュメントへの変更は反映されないことに注意してください。

		 *
		 * position は [adjusted](#TextDocument.validatePosition) されます。
		 *
		 * @see [TextDocument.lineAt](#TextDocument.lineAt)
		 * @param position A position.
		 * @return [line](#TextLine)
		 */
		lineAt(position: Position): TextLine;

		/**
		 * positionを zero-based offset に変換します
		 *
		 * position は [adjusted](#TextDocument.validatePosition) されます。
		 *
		 * @param position A position.
		 * @return 有効な zero-based offset
		 */
		offsetAt(position: Position): number;

		/**
		 * zero-based offset を position に変換します
		 *
		 * @param offset A zero-based offset.
		 * @return 有効な [position](#Position)
		 */
		positionAt(offset: number): Position;

		/**
		 * このドキュメントのテキストを取得します
		 *
		 * 範囲を指定すると文字列の一部を取得できます。範囲は [adjusted](#TextDocument.validateRange) されます。
		 *
		 * @param range Include only the text included by the range.
		 * @return 指定された範囲内のテキストまたはテキスト全体
		 */
		getText(range?: Range): string;

		/**
		 * 与えられた位置で単語の範囲を取得します
		 *
		 * 既定で単語は、 space, -, _, etc などのような区切り文字で定義されます。
		 * さらに、言語ごとにカスタムな [word definitions](#LanguageConfiguration.wordPattern) を定義できます。
		 * これにはカスタムな正規表現を提供することも可能です。
		 *
		 * * *Note 1:* カスタム正規表現は、空の文字列と一致してはいけません。一致した場合は無視されます。
		 *

		 * * *Note 2:* カスタムの正規表現は複数行の文字列に一致せず、speed の名前で正規表現は単語をスペースに一致させるべきではありません。
		 *
		 * より複雑で、単語性でない場合は [`TextLine.text`](#TextLine.text) を使用してください。
		 *
		 * position は [adjusted](#TextDocument.validatePosition) されます。
		 *
		 * @param position A position.
		 * @param regex Optional regular expression that describes what a word is.
		 * @return 単語にまたがる範囲または`undefined`
		 */
		getWordRangeAtPosition(position: Position, regex?: RegExp): Range | undefined;

		/**
		 * このドキュメントに range が完全に含まれていることを確認します
		 *
		 * @param range A range.
		 * @return 指定された範囲または新しい調整済み範囲
		 */
		validateRange(range: Range): Range;

		/**
		 * このドキュメントの範囲内に、position が含まれていることを確認します
		 *
		 * @param position A position.
		 * @return 指定された位置または新しい調整された位置
		 */
		validatePosition(position: Position): Position;
	}

	/**
	 * カーソルの位置を行と文字の位置で表します

	 *
	 * Position オブジェクトは  __immutable__ です。既存の位置から新しい位置を導出するには [with](#Position.with) か [translate](#Position.translate) メソッドを使用してください。


	 */
	export class Position {

		/**
		 * 0 から始まる行の値
		 */
		readonly line: number;

		/**
		 * 0 から始まる文字値
		 */
		readonly character: number;

		/**
		 * @param line A zero-based line value.
		 * @param character A zero-based character value.
		 */
		constructor(line: number, character: number);

		/**
		 * この位置の前に `other` があるか確認します
		 *
		 * @param other A position.
		 * @return 位置が前にある場合、または前の文字で同じ行にある場合は `true`

		 */
		isBefore(other: Position): boolean;

		/**
		 * `other` がこの位置の前か等しいかどうかを確認します
		 *
		 * @param other A position.
		 * @return 位置が前にある場合、または前の文字または同じ文字の同じ行にある場合は `true`

		 */
		isBeforeOrEqual(other: Position): boolean;

		/**
		 * この位置の後ろに `other` があるか確認します
		 *
		 * @param other A position.
		 * @return 位置が後ろにある場合、または後ろの文字で同じ行にある場合は `true`

		 */
		isAfter(other: Position): boolean;

		/**
		 * `other` がこの位置の後ろか等しいかどうかを確認します
		 *
		 * @param other A position.
		 * @return 位置が後ろにある場合、または後ろの文字または同じ文字の同じ行にある場合は `true`

		 */
		isAfterOrEqual(other: Position): boolean;

		/**
		 * `other` がこの位置に等しいか確認します
		 *
		 * @param other A position.
		 * @return 指定された位置の行と文字がこの位置の行と文字と等しい場合は `true`

		 */
		isEqual(other: Position): boolean;

		/**
		 * これを `other` と比較
		 *
		 * @param other A position.
		 * @return この位置が指定された位置の前にある場合は 0 より小さい数値。この位置が指定された位置の後ろにある場合は 0 より大きい数値。これと指定した位置が等しい場合は 0 です。


		 */
		compareTo(other: Position): number;

		/**
		 * この位置に相対的な新しい位置を作成します
		 *
		 * @param lineDelta Delta value for the line value, default is `0`.
		 * @param characterDelta Delta value for the character value, default is `0`.
		 * @return 行と文字の位置は、現在の行と文字と対応するデルタの合計です

		 */
		translate(lineDelta?: number, characterDelta?: number): Position;

		/**
		 * この位置と相対的な新しい位置を派生します
		 *
		 * @param change An object that describes a delta to this position.
		 * @return 指定されたデルタを反映する位置。その変更が何も変更しない場合 `this`(この) の位置に戻ります。

		 */
		translate(change: { lineDelta?: number; characterDelta?: number; }): Position;

		/**
		 * このポジションから派生した新しいポジションを作成します
		 *
		 * @param line Value that should be used as line value, default is the [existing value](#Position.line)
		 * @param character Value that should be used as character value, default is the [existing value](#Position.character)
		 * @return 行と文字が指定された値で置き換えられた位置
		 */
		with(line?: number, character?: number): Position;

		/**
		 * この位置から新しい位置を派生します
		 *
		 * @param change An object that describes a change to this position.
		 * @return 指定した変更を反映する位置。その変更が何も変更しない場合 `this`(この) の位置に戻ります。

		 */
		with(change: { line?: number; character?: number; }): Position;
	}

	/**
	 * 範囲は順序付けられた 2 つの位置のペアで表します
	 *
	 * これは [start](#Range.start).isBeforeOrEqual([end](#Range.end)) が補償されるということです。
	 *
	 * Range オブジェクトは __immutable__ です。既存の範囲から新しい範囲を導出するには、[with](#Range.with)、[with](#Range.with)、[union](#Range.union) メソッドを使用してください。


	 */
	export class Range {

		/**
		 * 開始位置。これは [end](#Range.end) と同じかそれより前です。
		 */
		readonly start: Position;

		/**
		 * 終了位置。これは [start](#Range.start) と同じかそれより後ろです。
		 */
		readonly end: Position;

		/**
		 * 2 つの位置から新しい範囲を作成します
		 *
		 * `start` が `end` の前になければ値は入れ替えられます。
		 *
		 * @param start A position.
		 * @param end A position.
		 */
		constructor(start: Position, end: Position);

		/**
		 * 数値座標から新しい範囲を作成します
		 *
		 * これは `new Range(new Position(startLine, startCharacter), new Position(endLine, endCharacter))` を使用することと同じです。
		 *
		 * @param startLine A zero-based line value.
		 * @param startCharacter A zero-based character value.
		 * @param endLine A zero-based line value.
		 * @param endCharacter A zero-based character value.
		 */
		constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number);

		/**
		 * `start` と `end` が等しい場合は `true` を返します
		 */
		isEmpty: boolean;

		/**
		 * `start.line` と `end.line` が等しい場合は `true` を返します
		 */
		isSingleLine: boolean;

		/**
		 * この範囲に位置もしくは範囲が含まれているかどうかを確認します
		 *
		 * @param positionOrRange A position or a range.
		 * @return 位置または範囲が指定した範囲の中またはそれに等しい場合は `true` を返します
		 * to this range.
		 */
		contains(positionOrRange: Position | Range): boolean;

		/**
		 *`other` がこの範囲に等しいかどうかを確認します
		 *
		 * @param other A range.
		 * @return 指定した範囲の開始と終了には、開始と終了が[equal](#Position.isEqual)とき `true` になります

		 */
		isEqual(other: Range): boolean;

		/**
		 * この範囲で `range` をインターセクトして、範囲に重複がない場合は、新しい範囲または `undefined` を返します

		 *
		 * @param range A range.
		 * @return その後ろの開始位置とその前の終了位置の範囲。
		 * 重複がない場合は未定義に戻ります。
		 */
		intersection(range: Range): Range | undefined;

		/**
		 * この範囲で `other` のユニオンを計算します
		 *
		 * @param other A range.
		 * @return その前の開始位置とその後ろの終了位置の範囲。
		 */
		union(other: Range): Range;

		/**
		 * この範囲から新しい範囲を派生します
		 *
		 * @param start A position that should be used as start. The default value is the [current start](#Range.start).
		 * @param end A position that should be used as end. The default value is the [current end](#Range.end).
		 * @return 指定された開始位置と終了位置で範囲から派生した範囲。
		 * 開始と終了が一緒の場合は `this` (こ) の範囲が返されます。
		 */
		with(start?: Position, end?: Position): Range;

		/**
		 * この範囲から新しい範囲を派生します
		 *
		 * @param change An object that describes a change to this range.
		 * @return 指定された変更を反映する範囲。その変更が何も変更しない場合 `this`(こ) の範囲に戻ります。

		 */
		with(change: { start?: Position, end?: Position }): Range;
	}

	/**
	 * エディター内のテキスト選択範囲を表します
	 */
	export class Selection extends Range {

		/**
		 * 選択範囲が始まる範囲の位置
		 *
		 * この位置は [active](#Selection.active) の前後にある必要があります。
		 */
		anchor: Position;

		/**
		 * カーソルの位置
		 *
		 * この位置は [anchor](#Selection.anchor) の前後にある必要があります。
		 */
		active: Position;

		/**
		 * 2 つの位置から選択範囲を作成します
		 *
		 * @param anchor A position.
		 * @param active A position.
		 */
		constructor(anchor: Position, active: Position);

		/**
		 * 4 つの座標から選択範囲を作成します
		 *
		 * @param anchorLine A zero-based line value.
		 * @param anchorCharacter A zero-based character value.
		 * @param activeLine A zero-based line value.
		 * @param activeCharacter A zero-based character value.
		 */
		constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number);

		/**
		 * [active](#Selection.active).isBefore([anchor](#Selection.anchor)) の場合選択範囲が逆になります
		 */
		isReversed: boolean;
	}

	/**
	 * [selection change events](#window.onDidChangeTextEditorSelection) を引き起こす可能性があるソースを表します
	*/
	export enum TextEditorSelectionChangeKind {
		/**
		 * エディターでの入力によって選択範囲が変更
		 */
		Keyboard = 1,
		/**
		 * エディターでのクリックによって選択範囲が変更
		 */
		Mouse = 2,
		/**
		 * コマンドが実行されたことによって選択範囲が変更
		 */
		Command = 3
	}

	/**
	 *  [text editor's selections](#TextEditor.selections)での変更を説明するイベントを表します
	 */
	export interface TextEditorSelectionChangeEvent {
		/**
		 * 選択が変更された [text editor](#TextEditor)
		 */
		textEditor: TextEditor;
		/**
		 * [text editor's selections](#TextEditor.selections) 用の新しい値
		 */
		selections: Selection[];
		/**
		 * このイベントを発生させた [change kind](#TextEditorSelectionChangeKind)
		 *
		 *`undefined` にすることができます。
		 */
		kind?: TextEditorSelectionChangeKind;
	}

	/**
	 * [text editor's options](#TextEditor.options) での変更を説明するイベントを表します
	 */
	export interface TextEditorOptionsChangeEvent {
		/**
		 * オプションが変更された  [text editor](#TextEditor)
		 */
		textEditor: TextEditor;
		/**
		 * [text editor's options](#TextEditor.options) の新しい値
		 */
		options: TextEditorOptions;
	}

	/**
	 * [text editor's view column](#TextEditor.viewColumn) の変更を説明するイベントを表します
	 */
	export interface TextEditorViewColumnChangeEvent {
		/**
		 * オプションが変更された  [text editor](#TextEditor)
		 */
		textEditor: TextEditor;
		/**
		 * [text editor's view column](#TextEditor.viewColumn) の新しい値
		 */
		viewColumn: ViewColumn;
	}

	/**
	 * カーソルの描画スタイル
	 */
	export enum TextEditorCursorStyle {
		/**
		 * カーソルを垂直の太い線として描画します
		 */
		Line = 1,
		/**
		 * カーソルを塗りつぶされたブロックで描画します
		 */
		Block = 2,
		/**
		 * カーソルを太い水平線として描画します
		 */
		Underline = 3,
		/**
		 * カーソルを細い線として描画します
		 */
		LineThin = 4,
		/**
		 * カーソルをアウトラインのブロックとして描画します
		 */
		BlockOutline = 5,
		/**
		 * カーソルを細い水平線として描画します
		 */
		UnderlineThin = 6
	}

	/**
	 * 行番号の描画スタイル
	 */
	export enum TextEditorLineNumbersStyle {
		/**
		 * 秒番号を描画しない
		 */
		Off = 0,
		/**
		 * 秒番号を描画する
		 */
		On = 1,
		/**
		 * プライマリ カーソルの位置を基準にした値で行番号を描画します
		 */
		Relative = 2
	}

	/**
	 * [text editor](#TextEditor) の [options](#TextEditor.options) を示します
	 */
	export interface TextEditorOptions {

		/**
		 * タブのスペース サイズ。これは 2 つの目的で使用されます:
		 *  - タブ文字の描画幅;
		 *  - [insertSpaces](#TextEditorOptions.insertSpaces) が true の時に挿入するスペースの数
		 *
		 * テキスト エディターのオプションを取得するき、このプロパティは常に数値(解決済み)になります。
		 *
		 * テキスト エディターのオプションを設定するとき、このプロパティはオプションであり数値または `"auto"` にすることができます。
		 */
		tabSize?: number | string;

		/**
		 * Tab を押したとき  [n](#TextEditorOptions.tabSize) 個のスペースを挿入します
		 *
		 * テキスト エディターのオプションを取得するとき、このプロパティは常にブール値(解決済み)になります。
		 *
		 * テキスト エディターのオプションを設定するとき、このプロパティはオプションであり数値または`"auto"`にすることができます。
		 */
		insertSpaces?: boolean | string;

		/**
		 * このエディターでのカーソルの描画スタイル
		 *
		 * テキスト エディターのオプションを取得するとき、このプロパティは常に存在します。
		 *
		 * テキスト エディターのオプションを設定するとき、このプロパティはオプションです。
		 */
		cursorStyle?: TextEditorCursorStyle;

		/**
		 * 現在の行番号を相対的な行番号で描画します
		 *
		 * テキスト エディターのオプションを取得するとき、このプロパティは常に存在します。
		 *
		 * テキスト エディターのオプションを設定するとき、このプロパティはオプションです。
		 */
		lineNumbers?: TextEditorLineNumbersStyle;
	}

	/**
	 * [text editor](#TextEditor) で同じ [styling options](#DecorationRenderOptions) を共有する装飾のハンドルを表します

	 *
	 * `TextEditorDecorationType` のインスタンスを取得するには [createTextEditorDecorationType](#window.createTextEditorDecorationType) を使用してください。

	 */
	export interface TextEditorDecorationType {

		/**
		 * ハンドルの内部表現
		 */
		readonly key: string;

		/**
		 * この装飾タイプとそれを使用するテキスト エディターのすべての装飾を削除します。
		 */
		dispose(): void;
	}

	/**
	 * テキスト エディターでの [reveal](#TextEditor.revealRange) strategies を表します
	 */
	export enum TextEditorRevealType {
		/**
		 * 範囲はできるだけ少ないスクロールで表示されます
		 */
		Default = 0,
		/**
		 * 範囲は常にビューポートの中央に表示します
		 */
		InCenter = 1,
		/**
		 * 範囲がビューポートの外側にある場合は、ビューポート中央に表示されます。
		 *
		 * それ以外の場合は、できるだけスクロールしないで表示します。
		 */
		InCenterIfOutsideViewport = 2,
		/**
		 * 範囲は常にビューポートの上部に表示します
		 */
		AtTop = 3
	}

	/**
	 * [overview ruler](#DecorationRenderOptions.overviewRulerLane)での装飾の描画用の異なる位置を表します
	 *
	 * 概要ルーラーは 3 つのレーンに対応しています。
	 */
	export enum OverviewRulerLane {
		Left = 1,
		Center = 2,
		Right = 4,
		Full = 7
	}

	/**
	 * 入力/編集するとき、エッジでのデコレーションの動作を説明します
	 */
	export enum DecorationRangeBehavior {
		/**
		 * 初めのまたは終わりで編集が行われるとデコレーションの範囲が広がります
		 */
		OpenOpen = 0,
		/**
		 * 終わりで変更が行われるときデコレーションの範囲は広がりません
		 */
		ClosedClosed = 1,
		/**
		 * 初めで編集が行われるときにデコレーションの範囲が広がりますが、終わりでは行われません。
		 */
		OpenClosed = 2,
		/**
		 * 終わりで編集が行われるときにデコレーションの範囲が広がりますが、初めでは行われません。
		 */
		ClosedOpen = 3
	}

	/**
	 * [document](#TextDocument) を [editor](#TextEditor) に表示する動作を構成するオプションを表します
	 */
	export interface TextDocumentShowOptions {
		/**
		 * オプションのビュー列で、[editor](#TextEditor) を表示します
		 *
		 * 既定値は [one](#ViewColumn.One) で、他の値は __Min(column, columnCount + 1)__ に調整されます。

		 */
		viewColumn?: ViewColumn;

		/**
		 * オプション フラグ。 `true` を指定するとき、[editor](#TextEditor) はフォーカスをとりません。
		 */
		preserveFocus?: boolean;

		/**
		 * オプション フラグ。 [editor](#TextEditor)-tab を次のエディターに置き換えるかどうかまたはそれを保持するかどうか。

		 */
		preview?: boolean;

		/**
		 * [editor](#TextEditor) のドキュメントを適応するオプションの選択範囲。
		 */
		selection?: Range;
	}

	/**
	 * https://code.visualstudio.com/docs/getstarted/theme-color-reference で定義されるワークベンチ配色のいずれかへの参照
	 *
	 * テーマの配色を使用するとき、テーマ作成者とユーザーが色を変更する可能性があるため、カスタム配色よりも優先されます。
	 */
	export class ThemeColor {

		/**
		 * テーマ配色への参照を作成します
		 * @param id of the color. The available colors are listed in https://code.visualstudio.com/docs/getstarted/theme-color-reference.
		 */
		constructor(id: string);
	}

	/**
	 * [text editor decoration](#TextEditorDecorationType) 用のテーマ固有の描画スタイルを表します
	 */
	export interface ThemableDecorationRenderOptions {
		/**
		 * デコレーションの背景色。rgba() を使用して透明な背景色を定義することで、他のデコレーションとうまく一緒になります。
		 *
		 * あるいはカラー レジストリの配色が [referenced](#ColorIdentifier) されます
		 */
		backgroundColor?: string | ThemeColor;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		outline?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のアウトライン プロパティを設定する場合は 'outline' を使用する方が効果的です。
		 */
		outlineColor?: string | ThemeColor;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のアウトライン プロパティを設定する場合は 'outline' を使用する方が効果的です。
		 */
		outlineStyle?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のアウトライン プロパティを設定する場合は 'outline' を使用する方が効果的です。
		 */
		outlineWidth?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		border?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のボーダー プロパティを設定する場合は 'border' を使用する方が効果的です。
		 */
		borderColor?: string | ThemeColor;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のボーダー プロパティを設定する場合は 'border' を使用する方が効果的です。
		 */
		borderRadius?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のボーダー プロパティを設定する場合は 'border' を使用する方が効果的です。
		 */
		borderSpacing?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のボーダー プロパティを設定する場合は 'border' を使用する方が効果的です。
		 */
		borderStyle?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 *
		 * 1 つ以上のボーダー プロパティを設定する場合は 'border' を使用する方が効果的です。
		 */
		borderWidth?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		textDecoration?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		cursor?: string;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		color?: string | ThemeColor;

		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		letterSpacing?: string;

		/**
		 * **絶対パス** または ガターに描画する画像への URI
		 */
		gutterIconPath?: string | Uri;

		/**
		 * ガターアイコンのサイズを指定します
		 *
		 * 使用可能な値は  'auto', 'contain', 'cover', 任意のパーセント値です。
		 *
		 * 詳細: https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx
		 */
		gutterIconSize?: string;

		/**
		 * 概要ルーラーのデコレーション色
		 *rgba() を使用して透明な色を定義することで、他のデコレーションとうまく一緒になります。
		 */
		overviewRulerColor?: string | ThemeColor;

		/**
		 * デコレーションされたテキストの前に挿入される attachment の描画オプションを定義します
		 */
		before?: ThemableDecorationAttachmentRenderOptions;

		/**
		 * デコレーションされたテキストの後ろに挿入される attachment の描画オプションを定義します
		 */
		after?: ThemableDecorationAttachmentRenderOptions;
	}

	export interface ThemableDecorationAttachmentRenderOptions {
		/**
		 * attachment に表示されるテキスト コンテンツを定義します。アイコンまたはテキストのいずれかを表示できますが、両方を表示することはできません。
		 */
		contentText?: string;
		/**
		 * **絶対パス** または attachment に描画する画像への URI。アイコンまたはテキストのいずれかを表示できますが、両方を表示することはできません。

		 */
		contentIconPath?: string | Uri;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		border?: string;
		/**
		 * デコレーションで囲まれたテキストに適用される CSS スタイル プロパティ
		 */
		borderColor?: string | ThemeColor;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		textDecoration?: string;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		color?: string | ThemeColor;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		backgroundColor?: string | ThemeColor;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		margin?: string;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		width?: string;
		/**
		 * デコレーション attachment に適応される CSS スタイル プロパティ
		 */
		height?: string;
	}

	/**
	 * [text editor decoration](#TextEditorDecorationType) 用の描画スタイルを表します
	 */
	export interface DecorationRenderOptions extends ThemableDecorationRenderOptions {
		/**
		 * デコレーションは行テキストの後ろの空白でも表示されるべきか
		 *
		 * 既定は `false` です
		 */
		isWholeLine?: boolean;

		/**
		 * デコレーションの範囲のエッジで編集が行われたとき、デコレーションのどうだが変化するようにカスタマイズします
		 *
		 * 既定は `DecorationRangeBehavior.OpenOpen` です。
		 */
		rangeBehavior?: DecorationRangeBehavior;

		/**
		 * デコレーションを描画するべき概要ルーラーの位置
		 */
		overviewRulerLane?: OverviewRulerLane;

		/**
		 * light theme 用の上書きオプション
		 */
		light?: ThemableDecorationRenderOptions;

		/**
		 * dark theme 用の上書きオプション
		 */
		dark?: ThemableDecorationRenderOptions;
	}

	/**
	 * [decoration set](#TextEditorDecorationType) 内で特定のデコレーション用のオプションを表します
	 */
	export interface DecorationOptions {

		/**
		 * このデコレーションができようされる範囲。範囲は空にできません。
		 */
		range: Range;

		/**
		 * デコレーション上をホバーするとき、描画されるべきメッセージ
		 */
		hoverMessage?: MarkedString | MarkedString[];

		/**
		 * 現在のデコレーションに適用される描画オプション
		 * パフォーマンスの理由から、デコレーション固有のオプションの数はできるだけ少なくし、可能な限りデコレーション タイプを使用してください
		 */
		renderOptions?: DecorationInstanceRenderOptions;
	}

	export interface ThemableDecorationInstanceRenderOptions {
		/**
		 * デコレーションされたテキストの前に挿入される attachment の描画オプションを定義します
		 */
		before?: ThemableDecorationAttachmentRenderOptions;

		/**
		 * デコレーションされたテキストの後ろに挿入される attachment の描画オプションを定義します
		 */
		after?: ThemableDecorationAttachmentRenderOptions;
	}

	export interface DecorationInstanceRenderOptions extends ThemableDecorationInstanceRenderOptions {
		/**
		 * light theme 用の上書きオプション
		 */
		light?: ThemableDecorationInstanceRenderOptions;

		/**
		 * dark theme 用の上書きオプション
		 */
		dark?: ThemableDecorationInstanceRenderOptions;
	}

	/**
	 * Represents an editor that is attached to a [document](#TextDocument).
	 */
	export interface TextEditor {

		/**
		 * The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.
		 */
		document: TextDocument;

		/**
		 * The primary selection on this text editor. Shorthand for `TextEditor.selections[0]`.
		 */
		selection: Selection;

		/**
		 * The selections in this text editor. The primary selection is always at index 0.
		 */
		selections: Selection[];

		/**
		 * Text editor options.
		 */
		options: TextEditorOptions;

		/**
		 * The column in which this editor shows. Will be `undefined` in case this
		 * isn't one of the three main editors, e.g an embedded editor.
		 */
		viewColumn?: ViewColumn;

		/**
		 * Perform an edit on the document associated with this text editor.
		 *
		 * The given callback-function is invoked with an [edit-builder](#TextEditorEdit) which must
		 * be used to make edits. Note that the edit-builder is only valid while the
		 * callback executes.
		 *
		 * @param callback A function which can create edits using an [edit-builder](#TextEditorEdit).
		 * @param options The undo/redo behavior around this edit. By default, undo stops will be created before and after this edit.
		 * @return A promise that resolves with a value indicating if the edits could be applied.
		 */
		edit(callback: (editBuilder: TextEditorEdit) => void, options?: { undoStopBefore: boolean; undoStopAfter: boolean; }): Thenable<boolean>;

		/**
		 * Insert a [snippet](#SnippetString) and put the editor into snippet mode. "Snippet mode"
		 * means the editor adds placeholders and additionals cursors so that the user can complete
		 * or accept the snippet.
		 *
		 * @param snippet The snippet to insert in this edit.
		 * @param location Position or range at which to insert the snippet, defaults to the current editor selection or selections.
		 * @param options The undo/redo behavior around this edit. By default, undo stops will be created before and after this edit.
		 * @return A promise that resolves with a value indicating if the snippet could be inserted. Note that the promise does not signal
		 * that the snippet is completely filled-in or accepted.
		 */
		insertSnippet(snippet: SnippetString, location?: Position | Range | Position[] | Range[], options?: { undoStopBefore: boolean; undoStopAfter: boolean; }): Thenable<boolean>;

		/**
		 * Adds a set of decorations to the text editor. If a set of decorations already exists with
		 * the given [decoration type](#TextEditorDecorationType), they will be replaced.
		 *
		 * @see [createTextEditorDecorationType](#window.createTextEditorDecorationType).
		 *
		 * @param decorationType A decoration type.
		 * @param rangesOrOptions Either [ranges](#Range) or more detailed [options](#DecorationOptions).
		 */
		setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: Range[] | DecorationOptions[]): void;

		/**
		 * Scroll as indicated by `revealType` in order to reveal the given range.
		 *
		 * @param range A range.
		 * @param revealType The scrolling strategy for revealing `range`.
		 */
		revealRange(range: Range, revealType?: TextEditorRevealType): void;

		/**
		 * ~~Show the text editor.~~
		 *
		 * @deprecated Use [window.showTextDocument](#window.showTextDocument)
		 *
		 * @param column The [column](#ViewColumn) in which to show this editor.
		 * instead. This method shows unexpected behavior and will be removed in the next major update.
		 */
		show(column?: ViewColumn): void;

		/**
		 * ~~Hide the text editor.~~
		 *
		 * @deprecated Use the command `workbench.action.closeActiveEditor` instead.
		 * This method shows unexpected behavior and will be removed in the next major update.
		 */
		hide(): void;
	}


	/**
	 * [document](#TextDocument) 内の行末文字列を表します
	 */
	export enum EndOfLine {
		/**
		 * 改行コード `\n`
		 */
		LF = 1,
		/**
		 * キャリッジ リターン・改行コード `\r\n`
		 */
		CRLF = 2
	}

	/**
	 * TextEditor で 1 つのトランザクションに適用する複雑な編集
	 *
	 * これは編集の内容を保持し、編集が有効な場合(領域が重複していない、文書が変更されていないなど)、これらは [text editor](#TextEditor) に関連付けられた  [text editor](#TextEditor) に適応されます。


	 */
	export interface TextEditorEdit {
		/**
		 * 特定のテキスト領域を新しい値に置き換えます
		 *
		 * `value` には \r\n か \n を使用することができ、これらは現在の [document](#TextDocument) に正規化されます。
		 *
		 * @param location The range this operation should remove.
		 * @param value The new text this operation should insert after removing `location`.
		 */
		replace(location: Position | Range | Selection, value: string): void;

		/**
		 * 指定する場所にテキストを挿入します
		 * `value` には \r\n か \n を使用することができ、これらは現在の [document](#TextDocument) に正規化されます。
		 *
		 * `insert` はことなる選択範囲を作成します(移動させることができる)。同等のテキスト編集は [replace](#TextEditorEdit.replace) で行うことができます。
		 *
		 * @param location The position where the new text should be inserted.
		 * @param value The new text this operation should insert.
		 */
		insert(location: Position, value: string): void;

		/**
		 * 特定のテキスト範囲を削除します
		 *
		 * @param location The range this operation should remove.
		 */
		delete(location: Range | Selection): void;

		/**
		 * EOF シーケンスを設定します
		 *
		 * @param endOfLine The new end of line for the [document](#TextDocument).
		 */
		setEndOfLine(endOfLine: EndOfLine): void;
	}

	/**
	 * ディスク上のファイルまたは無題のリソースのような別のリソースを表すユニバーサル リソース識別子

	 */
	export class Uri {

		/**
		 * ファイル システム パスから URI を作成します
		 *
		 * [scheme](#Uri.scheme) は `file` になります
		 *
		 * @param path A file system or UNC path.
		 * @return 新しい Uri インスタンス
		 */
		static file(path: string): Uri;

		/**
		 * 文字列から URI を作成します
		 *
		 * 与えられた値が正しくない場合は throw します。
		 *
		 * @param value The string value of an Uri.
		 * @return 新しい Uri インスタンス
		 */
		static parse(value: string): Uri;

		/**
		 * Scheme は `http://www.msft.com/some/path?query#fragment` の `http` 部分です
		 *
		 * 最初のコロンの前部分を指します。
		 */
		readonly scheme: string;

		/**
		 * Authority は `http://www.msft.com/some/path?query#fragment` の `www.msft.com` 部分です
		 *
		 * 最初の 2 重スラッシュから次のスラッシュまでの間の部分を指します。
		 */
		readonly authority: string;

		/**
		 * Path は `http://www.msft.com/some/path?query#fragment` の `/some/path` 部分です
		 */
		readonly path: string;

		/**
		 * Query は `http://www.msft.com/some/path?query#fragment` の `query` 部分です
		 */
		readonly query: string;

		/**
		 * Fragment は `http://www.msft.com/some/path?query#fragment` の `fragment` 部分です
		 */
		readonly fragment: string;

		/**
		 * この Uri の 対応するファイル システム パスを表す文字列
		 *
		 * UNC  パスで処理し、Windows ドライブ文字を小文字に正規化します。また、プラットフォーム固有のパス区切り文字も使用されます。
		 * 無効な文字とセマンティックのパスを検証**しません**。

		 */
		readonly fsPath: string;

		/**
		 * この Uri から 新しい Uri を派生します
		 *
		 * ```ts
		 * let file = Uri.parse('before:some/file/path');
		 * let other = file.with({ scheme: 'after' });
		 * assert.ok(other.toString() === 'after:some/file/path');
		 * ```
		 *
		 * @param change An object that describes a change to this Uri. To unset components use `null` or
		 *  the empty string.
		 * @return 指定された変更を反映する新しい Uri。その変更が何も変更しない場合 `this`(こ) の Uri に戻ります。

		 */
		with(change: { scheme?: string; authority?: string; path?: string; query?: string; fragment?: string }): Uri;

		/**
		 * この Uri を文字列表記で返します
		 * URI の表現と正規化はスキームに依存します。結果の文字列は  [Uri.parse](#Uri.parse) を使用して安全に使用できます。

		 *
		 * @param skipEncoding Do not percentage-encode the result, defaults to `false`. Note that
		 *	the `#` and `?` characters occuring in the path will always be encoded.
		 * @returns この Uri の文字列表記
		 */
		toString(skipEncoding?: boolean): string;

		/**
		 * この Uri を JSON 表記で返します
		 *
		 * @return オブジェクト
		 */
		toJSON(): any;
	}

	/**
	 * A cancellation token is passed to an asynchronous or long running
	 * operation to request cancellation, like cancelling a request
	 * for completion items because the user continued to type.
	 *
	 * To get an instance of a `CancellationToken` use a
	 * [CancellationTokenSource](#CancellationTokenSource).
	 */
	export interface CancellationToken {

		/**
		 * Is `true` when the token has been cancelled, `false` otherwise.
		 */
		isCancellationRequested: boolean;

		/**
		 * An [event](#Event) which fires upon cancellation.
		 */
		onCancellationRequested: Event<any>;
	}

	/**
	 * A cancellation source creates and controls a [cancellation token](#CancellationToken).
	 */
	export class CancellationTokenSource {

		/**
		 * The cancellation token of this source.
		 */
		token: CancellationToken;

		/**
		 * Signal cancellation on the token.
		 */
		cancel(): void;

		/**
		 * Dispose object and free resources. Will call [cancel](#CancellationTokenSource.cancel).
		 */
		dispose(): void;
	}

	/**
	 * Represents a type which can release resources, such
	 * as event listening or a timer.
	 */
	export class Disposable {

		/**
		 * Combine many disposable-likes into one. Use this method
		 * when having objects with a dispose function which are not
		 * instances of Disposable.
		 *
		 * @param disposableLikes Objects that have at least a `dispose`-function member.
		 * @return Returns a new disposable which, upon dispose, will
		 * dispose all provided disposables.
		 */
		static from(...disposableLikes: { dispose: () => any }[]): Disposable;

		/**
		 * Creates a new Disposable calling the provided function
		 * on dispose.
		 * @param callOnDispose Function that disposes something.
		 */
		constructor(callOnDispose: Function);

		/**
		 * Dispose this object.
		 */
		dispose(): any;
	}

	/**
	 * Represents a typed event.
	 *
	 * A function that represents an event to which you subscribe by calling it with
	 * a listener function as argument.
	 *
	 * @sample `item.onDidChange(function(event) { console.log("Event happened: " + event); });`
	 */
	export interface Event<T> {

		/**
		 * A function that represents an event to which you subscribe by calling it with
		 * a listener function as argument.
		 *
		 * @param listener The listener function will be called when the event happens.
		 * @param thisArgs The `this`-argument which will be used when calling the event listener.
		 * @param disposables An array to which a [disposable](#Disposable) will be added.
		 * @return A disposable which unsubscribes the event listener.
		 */
		(listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
	}

	/**
	 * An event emitter can be used to create and manage an [event](#Event) for others
	 * to subscribe to. One emitter always owns one event.
	 *
	 * Use this class if you want to provide event from within your extension, for instance
	 * inside a [TextDocumentContentProvider](#TextDocumentContentProvider) or when providing
	 * API to other extensions.
	 */
	export class EventEmitter<T> {

		/**
		 * The event listeners can subscribe to.
		 */
		event: Event<T>;

		/**
		 * Notify all subscribers of the [event](EventEmitter#event). Failure
		 * of one or more listener will not fail this function call.
		 *
		 * @param data The event object.
		 */
		fire(data?: T): void;

		/**
		 * Dispose this object and free resources.
		 */
		dispose(): void;
	}

	/**
	 * A file system watcher notifies about changes to files and folders
	 * on disk.
	 *
	 * To get an instance of a `FileSystemWatcher` use
	 * [createFileSystemWatcher](#workspace.createFileSystemWatcher).
	 */
	export interface FileSystemWatcher extends Disposable {

		/**
		 * true if this file system watcher has been created such that
		 * it ignores creation file system events.
		 */
		ignoreCreateEvents: boolean;

		/**
		 * true if this file system watcher has been created such that
		 * it ignores change file system events.
		 */
		ignoreChangeEvents: boolean;

		/**
		 * true if this file system watcher has been created such that
		 * it ignores delete file system events.
		 */
		ignoreDeleteEvents: boolean;

		/**
		 * An event which fires on file/folder creation.
		 */
		onDidCreate: Event<Uri>;

		/**
		 * An event which fires on file/folder change.
		 */
		onDidChange: Event<Uri>;

		/**
		 * An event which fires on file/folder deletion.
		 */
		onDidDelete: Event<Uri>;
	}

	/**
	 * A text document content provider allows to add readonly documents
	 * to the editor, such as source from a dll or generated html from md.
	 *
	 * Content providers are [registered](#workspace.registerTextDocumentContentProvider)
	 * for a [uri-scheme](#Uri.scheme). When a uri with that scheme is to
	 * be [loaded](#workspace.openTextDocument) the content provider is
	 * asked.
	 */
	export interface TextDocumentContentProvider {

		/**
		 * An event to signal a resource has changed.
		 */
		onDidChange?: Event<Uri>;

		/**
		 * Provide textual content for a given uri.
		 *
		 * The editor will use the returned string-content to create a readonly
		 * [document](#TextDocument). Resources allocated should be released when
		 * the corresponding document has been [closed](#workspace.onDidCloseTextDocument).
		 *
		 * @param uri An uri which scheme matches the scheme this provider was [registered](#workspace.registerTextDocumentContentProvider) for.
		 * @param token A cancellation token.
		 * @return A string or a thenable that resolves to such.
		 */
		provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult<string>;
	}

	/**
	 * Represents an item that can be selected from
	 * a list of items.
	 */
	export interface QuickPickItem {

		/**
		 * A human readable string which is rendered prominent.
		 */
		label: string;

		/**
		 * A human readable string which is rendered less prominent.
		 */
		description: string;

		/**
		 * A human readable string which is rendered less prominent.
		 */
		detail?: string;
	}

	/**
	 * Options to configure the behavior of the quick pick UI.
	 */
	export interface QuickPickOptions {
		/**
		 * An optional flag to include the description when filtering the picks.
		 */
		matchOnDescription?: boolean;

		/**
		 * An optional flag to include the detail when filtering the picks.
		 */
		matchOnDetail?: boolean;

		/**
		 * An optional string to show as place holder in the input box to guide the user what to pick on.
		 */
		placeHolder?: string;

		/**
		 * Set to `true` to keep the picker open when focus moves to another part of the editor or to another window.
		 */
		ignoreFocusOut?: boolean;

		/**
		 * An optional function that is invoked whenever an item is selected.
		 */
		onDidSelectItem?(item: QuickPickItem | string): any;
	}

	/**
	 * Represents an action that is shown with an information, warning, or
	 * error message.
	 *
	 * @see [showInformationMessage](#window.showInformationMessage)
	 * @see [showWarningMessage](#window.showWarningMessage)
	 * @see [showErrorMessage](#window.showErrorMessage)
	 */
	export interface MessageItem {

		/**
		 * A short title like 'Retry', 'Open Log' etc.
		 */
		title: string;

		/**
		 * Indicates that this item replaces the default
		 * 'Close' action.
		 */
		isCloseAffordance?: boolean;
	}

	/**
	 * Options to configure the behavior of the message.
	 *
	 * @see [showInformationMessage](#window.showInformationMessage)
	 * @see [showWarningMessage](#window.showWarningMessage)
	 * @see [showErrorMessage](#window.showErrorMessage)
	 */
	export interface MessageOptions {

		/**
		 * Indicates that this message should be modal.
		 */
		modal?: boolean;
	}

	/**
	 * Options to configure the behavior of the input box UI.
	 */
	export interface InputBoxOptions {

		/**
		 * The value to prefill in the input box.
		 */
		value?: string;

		/**
		 * Selection of the prefilled [`value`](#InputBoxOptions.value). Defined as tuple of two number where the
		 * first is the inclusive start index and the second the exclusive end index. When `undefined` the whole
		 * word will be selected, when empty (start equals end) only the cursor will be set,
		 * otherwise the defined range will be selected.
		 */
		valueSelection?: [number, number];

		/**
		 * The text to display underneath the input box.
		 */
		prompt?: string;

		/**
		 * An optional string to show as place holder in the input box to guide the user what to type.
		 */
		placeHolder?: string;

		/**
		 * Set to `true` to show a password prompt that will not show the typed value.
		 */
		password?: boolean;

		/**
		 * Set to `true` to keep the input box open when focus moves to another part of the editor or to another window.
		 */
		ignoreFocusOut?: boolean;

		/**
		 * An optional function that will be called to validate input and to give a hint
		 * to the user.
		 *
		 * @param value The current value of the input box.
		 * @return A human readable string which is presented as diagnostic message.
		 * Return `undefined`, `null`, or the empty string when 'value' is valid.
		 */
		validateInput?(value: string): string | undefined | null;
	}

	/**
	 * A document filter denotes a document by different properties like
	 * the [language](#TextDocument.languageId), the [scheme](#Uri.scheme) of
	 * its resource, or a glob-pattern that is applied to the [path](#TextDocument.fileName).
	 *
	 * @sample A language filter that applies to typescript files on disk: `{ language: 'typescript', scheme: 'file' }`
	 * @sample A language filter that applies to all package.json paths: `{ language: 'json', pattern: '**∕package.json' }`
	 */
	export interface DocumentFilter {

		/**
		 * A language id, like `typescript`.
		 */
		language?: string;

		/**
		 * A Uri [scheme](#Uri.scheme), like `file` or `untitled`.
		 */
		scheme?: string;

		/**
		 * A glob pattern, like `*.{ts,js}`.
		 */
		pattern?: string;
	}

	/**
	 * A language selector is the combination of one or many language identifiers
	 * and [language filters](#DocumentFilter).
	 *
	 * @sample `let sel:DocumentSelector = 'typescript'`;
	 * @sample `let sel:DocumentSelector = ['typescript', { language: 'json', pattern: '**∕tsconfig.json' }]`;
	 */
	export type DocumentSelector = string | DocumentFilter | (string | DocumentFilter)[];


	/**
	 * A provider result represents the values a provider, like the [`HoverProvider`](#HoverProvider),
	 * may return. For once this is the actual result type `T`, like `Hover`, or a thenable that resolves
	 * to that type `T`. In addition, `null` and `undefined` can be returned - either directly or from a
	 * thenable.
	 *
	 * The snippets below are all valid implementions of the [`HoverProvider`](#HoverProvider):
	 *
	 * ```ts
	 * let a: HoverProvider = {
	 * 	provideHover(doc, pos, token): ProviderResult<Hover> {
	 * 		return new Hover('Hello World');
	 * 	}
	 * }
	 *
	 * let b: HoverProvider = {
	 * 	provideHover(doc, pos, token): ProviderResult<Hover> {
	 * 		return new Promise(resolve => {
	 * 			resolve(new Hover('Hello World'));
	 * 	 	});
	 * 	}
	 * }
	 *
	 * let c: HoverProvider = {
	 * 	provideHover(doc, pos, token): ProviderResult<Hover> {
	 * 		return; // undefined
	 * 	}
	 * }
	 * ```
	 */
	export type ProviderResult<T> = T | undefined | null | Thenable<T | undefined | null>;

	/**
	 * Contains additional diagnostic information about the context in which
	 * a [code action](#CodeActionProvider.provideCodeActions) is run.
	 */
	export interface CodeActionContext {

		/**
		 * An array of diagnostics.
		 */
		readonly diagnostics: Diagnostic[];
	}

	/**
	 * The code action interface defines the contract between extensions and
	 * the [light bulb](https://code.visualstudio.com/docs/editor/editingevolved#_code-action) feature.
	 *
	 * A code action can be any command that is [known](#commands.getCommands) to the system.
	 */
	export interface CodeActionProvider {

		/**
		 * Provide commands for the given document and range.
		 *
		 * @param document The document in which the command was invoked.
		 * @param range The range for which the command was invoked.
		 * @param context Context carrying additional information.
		 * @param token A cancellation token.
		 * @return An array of commands or a thenable of such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideCodeActions(document: TextDocument, range: Range, context: CodeActionContext, token: CancellationToken): ProviderResult<Command[]>;
	}

	/**
	 * CodeLens は参照の数、テストを実行する方法など、ソース テキストともに表示される [command](#Command) を表します

	 *
	 *  CodeLens はコマンドが関連付けされていないときは _unresolved_ です。
	 * パフォーマンス上の理由から、CodeLensの作成と解決は 2 つの段階に分かれていなければなりません。
	 *
	 * @see [CodeLensProvider.provideCodeLenses](#CodeLensProvider.provideCodeLenses)
	 * @see [CodeLensProvider.resolveCodeLens](#CodeLensProvider.resolveCodeLens)
	 */
	export class CodeLens {

		/**
		 * このCodeLens が有効な範囲。1 行のみ span します。
		 */
		range: Range;

		/**
		 * このCodeLens が示すコマンド
		 */
		command?: Command;

		/**
		 * 関連するコマンドがあるとき `true` です
		 */
		readonly isResolved: boolean;

		/**
		 * 新しい CodeLens オブジェクトを作成します
		 *
		 * @param range The range to which this code lens applies.
		 * @param command The command associated to this code lens.
		 */
		constructor(range: Range, command?: Command);
	}

	/**
	 * CodeLens プロバイダーはソース テキストに [commands](#Command) を追加します
	 *
	 * コマンドはソース テキストの間に専用の水平な行で表示されます。
	 */
	export interface CodeLensProvider {

		/**
		 * このプロバイダーが変更されたことを通知するオプションのイベント
		 */
		onDidChangeCodeLenses?: Event<void>;

		/**
		 *  [lenses](#CodeLens) のリストを計算します。
		 * この呼び出しはできるだけ速く返す必要があります。もしコマンドの計算が複雑な実装の場合は範囲を指定する CodeLens オブジェクトを返すだけで [resolve](#CodeLensProvider.resolveCodeLens) するよう実装しなければなりません。

		 *
		 * @param document The document in which the command was invoked.
		 * @param token A cancellation token.
		 * @return An array of code lenses or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]>;

		/**
		 * この関数は CodeLens が表示されるたびに呼び出されます。通常はスクロール後と[compute](#CodeLensProvider.provideCodeLenses)-lenses を呼び出したあとです。

		 *
		 * @param codeLens code lens that must be resolved.
		 * @param token A cancellation token.
		 * @return The given, resolved code lens or thenable that resolves to such.
		 */
		resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): ProviderResult<CodeLens>;
	}

	/**
	 * The definition of a symbol represented as one or many [locations](#Location).
	 * For most programming languages there is only one location at which a symbol is
	 * defined.
	 */
	export type Definition = Location | Location[];

	/**
	 * The definition provider interface defines the contract between extensions and
	 * the [go to definition](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition)
	 * and peek definition features.
	 */
	export interface DefinitionProvider {

		/**
		 * Provide the definition of the symbol at the given position and document.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return A definition or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined` or `null`.
		 */
		provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition>;
	}

	/**
	 * The implemenetation provider interface defines the contract between extensions and
	 * the go to implementation feature.
	 */
	export interface ImplementationProvider {

		/**
		 * Provide the implementations of the symbol at the given position and document.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return A definition or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined` or `null`.
		 */
		provideImplementation(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition>;
	}

	/**
	 * The type definition provider defines the contract between extensions and
	 * the go to type definition feature.
	 */
	export interface TypeDefinitionProvider {

		/**
		 * Provide the type definition of the symbol at the given position and document.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return A definition or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined` or `null`.
		 */
		provideTypeDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition>;
	}

	/**
	 * MarkedString can be used to render human readable text. It is either a markdown string
	 * or a code-block that provides a language and a code snippet. Note that
	 * markdown strings will be sanitized - that means html will be escaped.
	 */
	export type MarkedString = string | { language: string; value: string };

	/**
	 * A hover represents additional information for a symbol or word. Hovers are
	 * rendered in a tooltip-like widget.
	 */
	export class Hover {

		/**
		 * The contents of this hover.
		 */
		contents: MarkedString[];

		/**
		 * The range to which this hover applies. When missing, the
		 * editor will use the range at the current position or the
		 * current position itself.
		 */
		range?: Range;

		/**
		 * Creates a new hover object.
		 *
		 * @param contents The contents of the hover.
		 * @param range The range to which the hover applies.
		 */
		constructor(contents: MarkedString | MarkedString[], range?: Range);
	}

	/**
	 * The hover provider interface defines the contract between extensions and
	 * the [hover](https://code.visualstudio.com/docs/editor/intellisense)-feature.
	 */
	export interface HoverProvider {

		/**
		 * Provide a hover for the given position and document. Multiple hovers at the same
		 * position will be merged by the editor. A hover can have a range which defaults
		 * to the word range at the position when omitted.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return A hover or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined` or `null`.
		 */
		provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover>;
	}

	/**
	 * A document highlight kind.
	 */
	export enum DocumentHighlightKind {

		/**
		 * A textual occurrence.
		 */
		Text = 0,

		/**
		 * Read-access of a symbol, like reading a variable.
		 */
		Read = 1,

		/**
		 * Write-access of a symbol, like writing to a variable.
		 */
		Write = 2
	}

	/**
	 * A document highlight is a range inside a text document which deserves
	 * special attention. Usually a document highlight is visualized by changing
	 * the background color of its range.
	 */
	export class DocumentHighlight {

		/**
		 * The range this highlight applies to.
		 */
		range: Range;

		/**
		 * The highlight kind, default is [text](#DocumentHighlightKind.Text).
		 */
		kind?: DocumentHighlightKind;

		/**
		 * Creates a new document highlight object.
		 *
		 * @param range The range the highlight applies to.
		 * @param kind The highlight kind, default is [text](#DocumentHighlightKind.Text).
		 */
		constructor(range: Range, kind?: DocumentHighlightKind);
	}

	/**
	 * document highlight provider interface は拡張機能と word-higliht-機能の間のコントラクトを定義します

	 */
	export interface DocumentHighlightProvider {

		/**
		 * 変数のすべての出現箇所や、関数すべての exit-point のような一連のドキュメント ハイライトを提供します

		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return ドキュメント ハイライトの配列またはそう解決される thenable。結果の欠落は `undefined`, `null` または空の配列を返すことによって伝えることができます。

		 */
		provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<DocumentHighlight[]>;
	}

	/**
	 * シンボルの種類
	 */
	export enum SymbolKind {
		File = 0,
		Module = 1,
		Namespace = 2,
		Package = 3,
		Class = 4,
		Method = 5,
		Property = 6,
		Field = 7,
		Constructor = 8,
		Enum = 9,
		Interface = 10,
		Function = 11,
		Variable = 12,
		Constant = 13,
		String = 14,
		Number = 15,
		Boolean = 16,
		Array = 17,
		Object = 18,
		Key = 19,
		Null = 20,
		EnumMember = 21,
		Struct = 22,
		Event = 23,
		Operator = 24,
		TypeParameter = 25
	}

	/**
	 * 変数、クラス、interface などのプログラミング構造に関する情報を表します

	 */
	export class SymbolInformation {

		/**
		 * このシンボルの名前
		 */
		name: string;

		/**
		 * このシンボルを含むシンボルの名前
		 */
		containerName: string;

		/**
		 * このシンボルの種類
		 */
		kind: SymbolKind;

		/**
		 * このシンボルの位置
		 */
		location: Location;

		/**
		 * 新しいシンボル情報のオブジェクトを作成します
		 *
		 * @param name The name of the symbol.
		 * @param kind The kind of the symbol.
		 * @param containerName The name of the symbol containing the symbol.
		 * @param location The the location of the symbol.
		 */
		constructor(name: string, kind: SymbolKind, containerName: string, location: Location);

		/**
		 * 新しいシンボル情報のオブジェクトを作成します~~
		 *
		 * @deprecated [location](#Location) オブジェクトを使用するコンストラクタを使用してください
		 *
		 * @param name The name of the symbol.
		 * @param kind The kind of the symbol.
		 * @param range The range of the location of the symbol.
		 * @param uri The resource of the location of symbol, defaults to the current document.
		 * @param containerName The name of the symbol containing the symbol.
		 */
		constructor(name: string, kind: SymbolKind, range: Range, uri?: Uri, containerName?: string);
	}

	/**
	 * document symbol provider interface は拡張機能と [go to symbol](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-symbol)-機能 の間のコントラクトを定義します

	 */
	export interface DocumentSymbolProvider {

		/**
		 * 与えられたドキュメントのシンボル情報を提供する
		 *
		 * @param document The document in which the command was invoked.
		 * @param token A cancellation token.
		 * @return ドキュメント ハイライトの配列またはそう解決される thenable。結果の欠落は `undefined`, `null` または空の配列を返すことによって伝えることができます。

		 */
		provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[]>;
	}

	/**
	 * workspace symbol provider interface は拡張機能と [symbol search](https://code.visualstudio.com/docs/editor/editingevolved#_open-symbol-by-name)-機能の間のコントラクトを定義します
	 * the [symbol search](https://code.visualstudio.com/docs/editor/editingevolved#_open-symbol-by-name)-feature.
	 */
	export interface WorkspaceSymbolProvider {

		/**
		 * Project-wide search for a symbol matching the given query string. It is up to the provider
		 * how to search given the query string, like substring, indexOf etc. To improve performance implementors can
		 * skip the [location](#SymbolInformation.location) of symbols and implement `resolveWorkspaceSymbol` to do that
		 * later.
		 *
		 * @param query A non-empty query string.
		 * @param token A cancellation token.
		 * @return An array of document highlights or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideWorkspaceSymbols(query: string, token: CancellationToken): ProviderResult<SymbolInformation[]>;

		/**
		 * Given a symbol fill in its [location](#SymbolInformation.location). This method is called whenever a symbol
		 * is selected in the UI. Providers can implement this method and return incomplete symbols from
		 * [`provideWorkspaceSymbols`](#WorkspaceSymbolProvider.provideWorkspaceSymbols) which often helps to improve
		 * performance.
		 *
		 * @param symbol The symbol that is to be resolved. Guaranteed to be an instance of an object returned from an
		 * earlier call to `provideWorkspaceSymbols`.
		 * @param token A cancellation token.
		 * @return The resolved symbol or a thenable that resolves to that. When no result is returned,
		 * the given `symbol` is used.
		 */
		resolveWorkspaceSymbol?(symbol: SymbolInformation, token: CancellationToken): ProviderResult<SymbolInformation>;
	}

	/**
	 * Value-object that contains additional information when
	 * requesting references.
	 */
	export interface ReferenceContext {

		/**
		 * Include the declaration of the current symbol.
		 */
		includeDeclaration: boolean;
	}

	/**
	 * The reference provider interface defines the contract between extensions and
	 * the [find references](https://code.visualstudio.com/docs/editor/editingevolved#_peek)-feature.
	 */
	export interface ReferenceProvider {

		/**
		 * Provide a set of project-wide references for the given position and document.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param context
		 * @param token A cancellation token.
		 * @return An array of locations or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]>;
	}

	/**
	 * A text edit represents edits that should be applied
	 * to a document.
	 */
	export class TextEdit {

		/**
		 * Utility to create a replace edit.
		 *
		 * @param range A range.
		 * @param newText A string.
		 * @return A new text edit object.
		 */
		static replace(range: Range, newText: string): TextEdit;

		/**
		 * Utility to create an insert edit.
		 *
		 * @param position A position, will become an empty range.
		 * @param newText A string.
		 * @return A new text edit object.
		 */
		static insert(position: Position, newText: string): TextEdit;

		/**
		 * Utility to create a delete edit.
		 *
		 * @param range A range.
		 * @return A new text edit object.
		 */
		static delete(range: Range): TextEdit;

		/**
		 * Utility to create an eol-edit.
		 *
		 * @param eol An eol-sequence
		 * @return A new text edit object.
		 */
		static setEndOfLine(eol: EndOfLine): TextEdit;

		/**
		 * The range this edit applies to.
		 */
		range: Range;

		/**
		 * The string this edit will insert.
		 */
		newText: string;

		/**
		 * The eol-sequence used in the document.
		 *
		 * *Note* that the eol-sequence will be applied to the
		 * whole document.
		 */
		newEol: EndOfLine;

		/**
		 * Create a new TextEdit.
		 *
		 * @param range A range.
		 * @param newText A string.
		 */
		constructor(range: Range, newText: string);
	}

	/**
	 * A workspace edit represents textual changes for many documents.
	 */
	export class WorkspaceEdit {

		/**
		 * The number of affected resources.
		 */
		readonly size: number;

		/**
		 * Replace the given range with given text for the given resource.
		 *
		 * @param uri A resource identifier.
		 * @param range A range.
		 * @param newText A string.
		 */
		replace(uri: Uri, range: Range, newText: string): void;

		/**
		 * Insert the given text at the given position.
		 *
		 * @param uri A resource identifier.
		 * @param position A position.
		 * @param newText A string.
		 */
		insert(uri: Uri, position: Position, newText: string): void;

		/**
		 * Delete the text at the given range.
		 *
		 * @param uri A resource identifier.
		 * @param range A range.
		 */
		delete(uri: Uri, range: Range): void;

		/**
		 * Check if this edit affects the given resource.
		 * @param uri A resource identifier.
		 * @return `true` if the given resource will be touched by this edit.
		 */
		has(uri: Uri): boolean;

		/**
		 * Set (and replace) text edits for a resource.
		 *
		 * @param uri A resource identifier.
		 * @param edits An array of text edits.
		 */
		set(uri: Uri, edits: TextEdit[]): void;

		/**
		 * Get the text edits for a resource.
		 *
		 * @param uri A resource identifier.
		 * @return An array of text edits.
		 */
		get(uri: Uri): TextEdit[];

		/**
		 * Get all text edits grouped by resource.
		 *
		 * @return An array of `[Uri, TextEdit[]]`-tuples.
		 */
		entries(): [Uri, TextEdit[]][];
	}

	/**
	 * A snippet string is a template which allows to insert text
	 * and to control the editor cursor when insertion happens.
	 *
	 * A snippet can define tab stops and placeholders with `$1`, `$2`
	 * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
	 * the end of the snippet. Variables are defined with `$name` and
	 * `${name:default value}`. The full snippet syntax is documented
	 * [here](http://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets).
	 */
	export class SnippetString {

		/**
		 * The snippet string.
		 */
		value: string;

		constructor(value?: string);

		/**
		 * Builder-function that appends the given string to
		 * the [`value`](#SnippetString.value) of this snippet string.
		 *
		 * @param string A value to append 'as given'. The string will be escaped.
		 * @return This snippet string.
		 */
		appendText(string: string): SnippetString;

		/**
		 * Builder-function that appends a tabstop (`$1`, `$2` etc) to
		 * the [`value`](#SnippetString.value) of this snippet string.
		 *
		 * @param number The number of this tabstop, defaults to an auto-incremet
		 * value starting at 1.
		 * @return This snippet string.
		 */
		appendTabstop(number?: number): SnippetString;

		/**
		 * Builder-function that appends a placeholder (`${1:value}`) to
		 * the [`value`](#SnippetString.value) of this snippet string.
		 *
		 * @param value The value of this placeholder - either a string or a function
		 * with which a nested snippet can be created.
		 * @param number The number of this tabstop, defaults to an auto-incremet
		 * value starting at 1.
		 * @return This snippet string.
		 */
		appendPlaceholder(value: string | ((snippet: SnippetString) => any), number?: number): SnippetString;

		/**
		 * Builder-function that appends a variable (`${VAR}`) to
		 * the [`value`](#SnippetString.value) of this snippet string.
		 *
		 * @param name The name of the variable - excluding the `$`.
		 * @param defaultValue The default value which is used when the variable name cannot
		 * be resolved - either a string or a function with which a nested snippet can be created.
		 * @return This snippet string.
		 */
		appendVariable(name: string, defaultValue: string | ((snippet: SnippetString) => any)): SnippetString;
	}

	/**
	 * The rename provider interface defines the contract between extensions and
	 * the [rename](https://code.visualstudio.com/docs/editor/editingevolved#_rename-symbol)-feature.
	 */
	export interface RenameProvider {

		/**
		 * Provide an edit that describes changes that have to be made to one
		 * or many resources to rename a symbol to a different name.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param newName The new name of the symbol. If the given name is not valid, the provider must return a rejected promise.
		 * @param token A cancellation token.
		 * @return A workspace edit or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined` or `null`.
		 */
		provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit>;
	}

	/**
	 * Value-object describing what options formatting should use.
	 */
	export interface FormattingOptions {

		/**
		 * Size of a tab in spaces.
		 */
		tabSize: number;

		/**
		 * Prefer spaces over tabs.
		 */
		insertSpaces: boolean;

		/**
		 * Signature for further properties.
		 */
		[key: string]: boolean | number | string;
	}

	/**
	 * The document formatting provider interface defines the contract between extensions and
	 * the formatting-feature.
	 */
	export interface DocumentFormattingEditProvider {

		/**
		 * Provide formatting edits for a whole document.
		 *
		 * @param document The document in which the command was invoked.
		 * @param options Options controlling formatting.
		 * @param token A cancellation token.
		 * @return A set of text edits or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>;
	}

	/**
	 * The document formatting provider interface defines the contract between extensions and
	 * the formatting-feature.
	 */
	export interface DocumentRangeFormattingEditProvider {

		/**
		 * Provide formatting edits for a range in a document.
		 *
		 * The given range is a hint and providers can decide to format a smaller
		 * or larger range. Often this is done by adjusting the start and end
		 * of the range to full syntax nodes.
		 *
		 * @param document The document in which the command was invoked.
		 * @param range The range which should be formatted.
		 * @param options Options controlling formatting.
		 * @param token A cancellation token.
		 * @return A set of text edits or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideDocumentRangeFormattingEdits(document: TextDocument, range: Range, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>;
	}

	/**
	 * The document formatting provider interface defines the contract between extensions and
	 * the formatting-feature.
	 */
	export interface OnTypeFormattingEditProvider {

		/**
		 * Provide formatting edits after a character has been typed.
		 *
		 * The given position and character should hint to the provider
		 * what range the position to expand to, like find the matching `{`
		 * when `}` has been entered.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param ch The character that has been typed.
		 * @param options Options controlling formatting.
		 * @param token A cancellation token.
		 * @return A set of text edits or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideOnTypeFormattingEdits(document: TextDocument, position: Position, ch: string, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>;
	}


	/**
	 * 呼び出し可能な signature(以下署名) のパラメーターを表します
	 *
	 * パラメーターはラベルと doc-comment を持ちます
	 */
	export class ParameterInformation {

		/**
		 * この署名のラベル
		 *
		 * UI で表示されます
		 */
		label: string;

		/**
		 * この署名の human-readable な doc-comment
		 *
		 * UI で表示されますが、省略できます
		 */
		documentation?: string;

		/**
		 * 新しいパラメーター情報オブジェクトを作成します
		 *
		 * @param label A label string.
		 * @param documentation A doc string.
		 */
		constructor(label: string, documentation?: string);
	}

	/**
	 * 呼び出し可能な署名を表します
	 *
	 * 署名は関数名、doc-comment及びパラメーターのようなラベルを付けることができます

	 */
	export class SignatureInformation {

		/**
		 * この署名のラベル
		 *
		 * UI で表示されます
		 */
		label: string;

		/**
		 * この署名の human-readable な doc-comment
		 *
		 * UI で表示されますが、省略できます
		 */
		documentation?: string;

		/**
		 * この署名のパラメーター
		 */
		parameters: ParameterInformation[];

		/**
		 *新しい署名情報オブジェクトを作成します
		 *
		 * @param label A label string.
		 * @param documentation A doc string.
		 */
		constructor(label: string, documentation?: string);
	}

	/**
	 * 呼び出し可能な署名を表します
	 *
	 *  複数の署名にすることができますが、アクティブなものは一つでアクティブなパラメーターは一つです。

	 */
	export class SignatureHelp {

		/**
		 * 1 つ以上の署名
		 */
		signatures: SignatureInformation[];

		/**
		 * アクティブな署名
		 */
		activeSignature: number;

		/**
		 * アクティな署名のアクティブ パラメーター
		 */
		activeParameter: number;
	}

	/**
	 * signature help provider interface は拡張機能と [parameter hints](https://code.visualstudio.com/docs/editor/intellisense)-機能の間のコントラクトを定義します

	 */
	export interface SignatureHelpProvider {

		/**
		 * 指定する位置とドキュメントで署名のヘルプを提供します
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return Signature help or a thenable that resolves to such. The lack of a result can be
		 * signaled by returning `undefined` or `null`.
		 */
		provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<SignatureHelp>;
	}

	/**
	 * Completion の種類
	 */
	export enum CompletionItemKind {
		Text = 0,
		Method = 1,
		Function = 2,
		Constructor = 3,
		Field = 4,
		Variable = 5,
		Class = 6,
		Interface = 7,
		Module = 8,
		Property = 9,
		Unit = 10,
		Value = 11,
		Enum = 12,
		Keyword = 13,
		Snippet = 14,
		Color = 15,
		Reference = 17,
		File = 16,
		Folder = 18,
		EnumMember = 19,
		Constant = 20,
		Struct = 21,
		Event = 22,
		Operator = 23,
		TypeParameter = 24
	}

	/**
	 * A completion item represents a text snippet that is proposed to complete text that is being typed.
	 *
	 * It is suffient to create a completion item from just a [label](#CompletionItem.label). In that
	 * case the completion item will replace the [word](#TextDocument.getWordRangeAtPosition)
	 * until the cursor with the given label or [insertText](#CompletionItem.insertText). Otherwise the
	 * the given [edit](#CompletionItem.textEdit) is used.
	 *
	 * When selecting a completion item in the editor its defined or synthesized text edit will be applied
	 * to *all* cursors/selections whereas [additionalTextEdits](CompletionItem.additionalTextEdits) will be
	 * applied as provided.
	 *
	 * @see [CompletionItemProvider.provideCompletionItems](#CompletionItemProvider.provideCompletionItems)
	 * @see [CompletionItemProvider.resolveCompletionItem](#CompletionItemProvider.resolveCompletionItem)
	 */
	export class CompletionItem {

		/**
		 * The label of this completion item. By default
		 * this is also the text that is inserted when selecting
		 * this completion.
		 */
		label: string;

		/**
		 * The kind of this completion item. Based on the kind
		 * an icon is chosen by the editor.
		 */
		kind?: CompletionItemKind;

		/**
		 * A human-readable string with additional information
		 * about this item, like type or symbol information.
		 */
		detail?: string;

		/**
		 * A human-readable string that represents a doc-comment.
		 */
		documentation?: string;

		/**
		 * A string that should be used when comparing this item
		 * with other items. When `falsy` the [label](#CompletionItem.label)
		 * is used.
		 */
		sortText?: string;

		/**
		 * A string that should be used when filtering a set of
		 * completion items. When `falsy` the [label](#CompletionItem.label)
		 * is used.
		 */
		filterText?: string;

		/**
		 * A string or snippet that should be inserted in a document when selecting
		 * this completion. When `falsy` the [label](#CompletionItem.label)
		 * is used.
		 */
		insertText?: string | SnippetString;

		/**
		 * A range of text that should be replaced by this completion item.
		 *
		 * Defaults to a range from the start of the [current word](#TextDocument.getWordRangeAtPosition) to the
		 * current position.
		 *
		 * *Note:* The range must be a [single line](#Range.isSingleLine) and it must
		 * [contain](#Range.contains) the position at which completion has been [requested](#CompletionItemProvider.provideCompletionItems).
		 */
		range?: Range;

		/**
		 * An optional set of characters that when pressed while this completion is active will accept it first and
		 * then type that character. *Note* that all commit characters should have `length=1` and that superfluous
		 * characters will be ignored.
		 */
		commitCharacters?: string[];

		/**
		 * @deprecated Use `CompletionItem.insertText` and `CompletionItem.range` instead.
		 *
		 * ~~An [edit](#TextEdit) which is applied to a document when selecting
		 * this completion. When an edit is provided the value of
		 * [insertText](#CompletionItem.insertText) is ignored.~~
		 *
		 * ~~The [range](#Range) of the edit must be single-line and on the same
		 * line completions were [requested](#CompletionItemProvider.provideCompletionItems) at.~~
		 */
		textEdit?: TextEdit;

		/**
		 * An optional array of additional [text edits](#TextEdit) that are applied when
		 * selecting this completion. Edits must not overlap with the main [edit](#CompletionItem.textEdit)
		 * nor with themselves.
		 */
		additionalTextEdits?: TextEdit[];

		/**
		 * An optional [command](#Command) that is executed *after* inserting this completion. *Note* that
		 * additional modifications to the current document should be described with the
		 * [additionalTextEdits](#CompletionItem.additionalTextEdits)-property.
		 */
		command?: Command;

		/**
		 * Creates a new completion item.
		 *
		 * Completion items must have at least a [label](#CompletionItem.label) which then
		 * will be used as insert text as well as for sorting and filtering.
		 *
		 * @param label The label of the completion.
		 * @param kind The [kind](#CompletionItemKind) of the completion.
		 */
		constructor(label: string, kind?: CompletionItemKind);
	}

	/**
	 * Represents a collection of [completion items](#CompletionItem) to be presented
	 * in the editor.
	 */
	export class CompletionList {

		/**
		 * This list it not complete. Further typing should result in recomputing
		 * this list.
		 */
		isIncomplete?: boolean;

		/**
		 * The completion items.
		 */
		items: CompletionItem[];

		/**
		 * Creates a new completion list.
		 *
		 * @param items The completion items.
		 * @param isIncomplete The list is not complete.
		 */
		constructor(items?: CompletionItem[], isIncomplete?: boolean);
	}

	/**
	 * The completion item provider interface defines the contract between extensions and
	 * [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense).
	 *
	 * When computing *complete* completion items is expensive, providers can optionally implement
	 * the `resolveCompletionItem`-function. In that case it is enough to return completion
	 * items with a [label](#CompletionItem.label) from the
	 * [provideCompletionItems](#CompletionItemProvider.provideCompletionItems)-function. Subsequently,
	 * when a completion item is shown in the UI and gains focus this provider is asked to resolve
	 * the item, like adding [doc-comment](#CompletionItem.documentation) or [details](#CompletionItem.detail).
	 *
	 * Providers are asked for completions either explicitly by a user gesture or -depending on the configuration-
	 * implicitly when typing words or trigger characters.
	 */
	export interface CompletionItemProvider {

		/**
		 * Provide completion items for the given position and document.
		 *
		 * @param document The document in which the command was invoked.
		 * @param position The position at which the command was invoked.
		 * @param token A cancellation token.
		 * @return An array of completions, a [completion list](#CompletionList), or a thenable that resolves to either.
		 * The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<CompletionItem[] | CompletionList>;

		/**
		 * Given a completion item fill in more data, like [doc-comment](#CompletionItem.documentation)
		 * or [details](#CompletionItem.detail).
		 *
		 * The editor will only resolve a completion item once.
		 *
		 * @param item A completion item currently active in the UI.
		 * @param token A cancellation token.
		 * @return The resolved completion item or a thenable that resolves to of such. It is OK to return the given
		 * `item`. When no result is returned, the given `item` will be used.
		 */
		resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem>;
	}


	/**
	 * A document link is a range in a text document that links to an internal or external resource, like another
	 * text document or a web site.
	 */
	export class DocumentLink {

		/**
		 * The range this link applies to.
		 */
		range: Range;

		/**
		 * The uri this link points to.
		 */
		target?: Uri;

		/**
		 * Creates a new document link.
		 *
		 * @param range The range the document link applies to. Must not be empty.
		 * @param target The uri the document link points to.
		 */
		constructor(range: Range, target?: Uri);
	}

	/**
	 * The document link provider defines the contract between extensions and feature of showing
	 * links in the editor.
	 */
	export interface DocumentLinkProvider {

		/**
		 * Provide links for the given document. Note that the editor ships with a default provider that detects
		 * `http(s)` and `file` links.
		 *
		 * @param document The document in which the command was invoked.
		 * @param token A cancellation token.
		 * @return An array of [document links](#DocumentLink) or a thenable that resolves to such. The lack of a result
		 * can be signaled by returning `undefined`, `null`, or an empty array.
		 */
		provideDocumentLinks(document: TextDocument, token: CancellationToken): ProviderResult<DocumentLink[]>;

		/**
		 * Given a link fill in its [target](#DocumentLink.target). This method is called when an incomplete
		 * link is selected in the UI. Providers can implement this method and return incomple links
		 * (without target) from the [`provideDocumentLinks`](#DocumentLinkProvider.provideDocumentLinks) method which
		 * often helps to improve performance.
		 *
		 * @param link The link that is to be resolved.
		 * @param token A cancellation token.
		 */
		resolveDocumentLink?(link: DocumentLink, token: CancellationToken): ProviderResult<DocumentLink>;
	}

	/**
	 * A tuple of two characters, like a pair of
	 * opening and closing brackets.
	 */
	export type CharacterPair = [string, string];

	/**
	 * Describes how comments for a language work.
	 */
	export interface CommentRule {

		/**
		 * The line comment token, like `// this is a comment`
		 */
		lineComment?: string;

		/**
		 * The block comment character pair, like `/* block comment *&#47;`
		 */
		blockComment?: CharacterPair;
	}

	/**
	 * Describes indentation rules for a language.
	 */
	export interface IndentationRule {
		/**
		 * If a line matches this pattern, then all the lines after it should be unindendented once (until another rule matches).
		 */
		decreaseIndentPattern: RegExp;
		/**
		 * If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).
		 */
		increaseIndentPattern: RegExp;
		/**
		 * If a line matches this pattern, then **only the next line** after it should be indented once.
		 */
		indentNextLinePattern?: RegExp;
		/**
		 * If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.
		 */
		unIndentedLinePattern?: RegExp;
	}

	/**
	 * Describes what to do with the indentation when pressing Enter.
	 */
	export enum IndentAction {
		/**
		 * Insert new line and copy the previous line's indentation.
		 */
		None = 0,
		/**
		 * Insert new line and indent once (relative to the previous line's indentation).
		 */
		Indent = 1,
		/**
		 * Insert two new lines:
		 *  - the first one indented which will hold the cursor
		 *  - the second one at the same indentation level
		 */
		IndentOutdent = 2,
		/**
		 * Insert new line and outdent once (relative to the previous line's indentation).
		 */
		Outdent = 3
	}

	/**
	 * Describes what to do when pressing Enter.
	 */
	export interface EnterAction {
		/**
		 * Describe what to do with the indentation.
		 */
		indentAction: IndentAction;
		/**
		 * Describes text to be appended after the new line and after the indentation.
		 */
		appendText?: string;
		/**
		 * Describes the number of characters to remove from the new line's indentation.
		 */
		removeText?: number;
	}

	/**
	 * Describes a rule to be evaluated when pressing Enter.
	 */
	export interface OnEnterRule {
		/**
		 * This rule will only execute if the text before the cursor matches this regular expression.
		 */
		beforeText: RegExp;
		/**
		 * This rule will only execute if the text after the cursor matches this regular expression.
		 */
		afterText?: RegExp;
		/**
		 * The action to execute.
		 */
		action: EnterAction;
	}

	/**
	 * The language configuration interfaces defines the contract between extensions
	 * and various editor features, like automatic bracket insertion, automatic indentation etc.
	 */
	export interface LanguageConfiguration {
		/**
		 * The language's comment settings.
		 */
		comments?: CommentRule;
		/**
		 * The language's brackets.
		 * This configuration implicitly affects pressing Enter around these brackets.
		 */
		brackets?: CharacterPair[];
		/**
		 * The language's word definition.
		 * If the language supports Unicode identifiers (e.g. JavaScript), it is preferable
		 * to provide a word definition that uses exclusion of known separators.
		 * e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):
		 *   /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
		 */
		wordPattern?: RegExp;
		/**
		 * The language's indentation settings.
		 */
		indentationRules?: IndentationRule;
		/**
		 * The language's rules to be evaluated when pressing Enter.
		 */
		onEnterRules?: OnEnterRule[];

		/**
		 * **Deprecated** Do not use.
		 *
		 * @deprecated Will be replaced by a better API soon.
		 */
		__electricCharacterSupport?: {
			/**
			 * This property is deprecated and will be **ignored** from
			 * the editor.
			 * @deprecated
			 */
			brackets?: any;
			/**
			 * This property is deprecated and not fully supported anymore by
			 * the editor (scope and lineStart are ignored).
			 * Use the the autoClosingPairs property in the language configuration file instead.
			 * @deprecated
			 */
			docComment?: {
				scope: string;
				open: string;
				lineStart: string;
				close?: string;
			};
		};

		/**
		 * **Deprecated** Do not use.
		 *
		 * @deprecated * Use the the autoClosingPairs property in the language configuration file instead.
		 */
		__characterPairSupport?: {
			autoClosingPairs: {
				open: string;
				close: string;
				notIn?: string[];
			}[];
		};
	}

	/**
	 * The configuration target
	 */
	export enum ConfigurationTarget {
		/**
		 * Global configuration
		*/
		Global = 1,

		/**
		 * Workspace configuration
		 */
		Workspace = 2,

		/**
		 * Workspace folder configuration
		 */
		WorkspaceFolder = 3
	}

	/**
	 * Represents the configuration. It is a merged view of
	 *
	 * - Default configuration
	 * - Global configuration
	 * - Workspace configuration (if available)
	 * - Workspace folder configuration of the requested resource (if available)
	 *
	 * *Global configuration* comes from User Settings and shadows Defaults.
	 *
	 * *Workspace configuration* comes from Workspace Settings and shadows Global configuration.
	 *
	 * *Workspace Folder configuration* comes from `.vscode` folder under one of the [workspace folders](#workspace.workspaceFolders).
	 *
	 * *Note:* Workspace and Workspace Folder configurations contains `launch` and `tasks` settings. Their basename will be
	 * part of the section identifier. The following snippets shows how to retrieve all configurations
	 * from `launch.json`:
	 *
	 * ```ts
	 * // launch.json configuration
	 * const config = workspace.getConfiguration('launch', vscode.window.activeTextEditor.document.uri);
	 *
	 * // retrieve values
	 * const values = config.get('configurations');
	 * ```
	 *
	 * Refer to [Settings](https://code.visualstudio.com/docs/getstarted/settings) for more information.
	 */
	export interface WorkspaceConfiguration {

		/**
		 * Return a value from this configuration.
		 *
		 * @param section Configuration name, supports _dotted_ names.
		 * @return The value `section` denotes or `undefined`.
		 */
		get<T>(section: string): T | undefined;

		/**
		 * Return a value from this configuration.
		 *
		 * @param section Configuration name, supports _dotted_ names.
		 * @param defaultValue A value should be returned when no value could be found, is `undefined`.
		 * @return The value `section` denotes or the default.
		 */
		get<T>(section: string, defaultValue: T): T;

		/**
		 * Check if this configuration has a certain value.
		 *
		 * @param section Configuration name, supports _dotted_ names.
		 * @return `true` if the section doesn't resolve to `undefined`.
		 */
		has(section: string): boolean;

		/**
		 * Retrieve all information about a configuration setting. A configuration value
		 * often consists of a *default* value, a global or installation-wide value,
		 * a workspace-specific value and a folder-specific value.
		 *
		 * The *effective* value (returned by [`get`](#WorkspaceConfiguration.get))
		 * is computed like this: `defaultValue` overwritten by `globalValue`,
		 * `globalValue` overwritten by `workspaceValue`. `workspaceValue` overwritten by `workspaceFolderValue`.
		 * Refer to [Settings Inheritence](https://code.visualstudio.com/docs/getstarted/settings)
		 * for more information.
		 *
		 * *Note:* The configuration name must denote a leaf in the configuration tree
		 * (`editor.fontSize` vs `editor`) otherwise no result is returned.
		 *
		 * @param section Configuration name, supports _dotted_ names.
		 * @return Information about a configuration setting or `undefined`.
		 */
		inspect<T>(section: string): { key: string; defaultValue?: T; globalValue?: T; workspaceValue?: T, workspaceFolderValue?: T } | undefined;

		/**
		 * Update a configuration value. The updated configuration values are persisted.
		 *
		 * A value can be changed in
		 *
		 * - [Global configuration](#ConfigurationTarget.Global): Changes the value for all instances of the editor.
		 * - [Workspace configuration](#ConfigurationTarget.Workspace): Changes the value for current workspace, if available.
		 * - [Workspace folder configuration](#ConfigurationTarget.WorkspaceFolder): Changes the value for the
		 * [Workspace folder](#workspace.workspaceFolders) to which the current [configuration](#WorkspaceConfiguration) is scoped to.
		 *
		 * *Note 1:* Setting a global value in the presence of a more specific workspace value
		 * has no observable effect in that workspace, but in others. Setting a workspace value
		 * in the presence of a more specific folder value has no observable effect for the resources
		 * under respective [folder](#workspace.workspaceFolders), but in others. Refer to
		 * [Settings Inheritence](https://code.visualstudio.com/docs/getstarted/settings) for more information.
		 *
		 * *Note 2:* To remove a configuration value use `undefined`, like so: `config.update('somekey', undefined)`
		 *
		 * Will throw error when
		 * - Writing a configuration which is not registered.
		 * - Writing a configuration to workspace or folder target when no workspace is opened
		 * - Writing a configuration to folder target when there is no folder settings
		 * - Writing to folder target without passing a resource when getting the configuration (`workspace.getConfiguration(section, resource)`)
		 * - Writing a window configuration to folder target
		 *
		 * @param section Configuration name, supports _dotted_ names.
		 * @param value The new value.
		 * @param configurationTarget The [configuration target](#ConfigurationTarget) or a boolean value.
		 *	If `undefined` or `null` or `false` configuration target is `ConfigurationTarget.Workspace`.
		 *	If `true` configuration target is `ConfigurationTarget.Global`.
		 */
		update(section: string, value: any, configurationTarget?: ConfigurationTarget | boolean): Thenable<void>;

		/**
		 * Readable dictionary that backs this configuration.
		 */
		readonly [key: string]: any;
	}

	/**
	 * Represents a location inside a resource, such as a line
	 * inside a text file.
	 */
	export class Location {

		/**
		 * The resource identifier of this location.
		 */
		uri: Uri;

		/**
		 * The document range of this locations.
		 */
		range: Range;

		/**
		 * Creates a new location object.
		 *
		 * @param uri The resource identifier.
		 * @param rangeOrPosition The range or position. Positions will be converted to an empty range.
		 */
		constructor(uri: Uri, rangeOrPosition: Range | Position);
	}

	/**
	 * Represents the severity of diagnostics.
	 */
	export enum DiagnosticSeverity {

		/**
		 * Something not allowed by the rules of a language or other means.
		 */
		Error = 0,

		/**
		 * Something suspicious but allowed.
		 */
		Warning = 1,

		/**
		 * Something to inform about but not a problem.
		 */
		Information = 2,

		/**
		 * Something to hint to a better way of doing it, like proposing
		 * a refactoring.
		 */
		Hint = 3
	}

	/**
	 * Represents a diagnostic, such as a compiler error or warning. Diagnostic objects
	 * are only valid in the scope of a file.
	 */
	export class Diagnostic {

		/**
		 * The range to which this diagnostic applies.
		 */
		range: Range;

		/**
		 * The human-readable message.
		 */
		message: string;

		/**
		 * A human-readable string describing the source of this
		 * diagnostic, e.g. 'typescript' or 'super lint'.
		 */
		source: string;

		/**
		 * The severity, default is [error](#DiagnosticSeverity.Error).
		 */
		severity: DiagnosticSeverity;

		/**
		 * A code or identifier for this diagnostics. Will not be surfaced
		 * to the user, but should be used for later processing, e.g. when
		 * providing [code actions](#CodeActionContext).
		 */
		code: string | number;

		/**
		 * Creates a new diagnostic object.
		 *
		 * @param range The range to which this diagnostic applies.
		 * @param message The human-readable message.
		 * @param severity The severity, default is [error](#DiagnosticSeverity.Error).
		 */
		constructor(range: Range, message: string, severity?: DiagnosticSeverity);
	}

	/**
	 * A diagnostics collection is a container that manages a set of
	 * [diagnostics](#Diagnostic). Diagnostics are always scopes to a
	 * diagnostics collection and a resource.
	 *
	 * To get an instance of a `DiagnosticCollection` use
	 * [createDiagnosticCollection](#languages.createDiagnosticCollection).
	 */
	export interface DiagnosticCollection {

		/**
		 * The name of this diagnostic collection, for instance `typescript`. Every diagnostic
		 * from this collection will be associated with this name. Also, the task framework uses this
		 * name when defining [problem matchers](https://code.visualstudio.com/docs/editor/tasks#_defining-a-problem-matcher).
		 */
		readonly name: string;

		/**
		 * Assign diagnostics for given resource. Will replace
		 * existing diagnostics for that resource.
		 *
		 * @param uri A resource identifier.
		 * @param diagnostics Array of diagnostics or `undefined`
		 */
		set(uri: Uri, diagnostics: Diagnostic[] | undefined): void;

		/**
		 * Replace all entries in this collection.
		 *
		 * Diagnostics of multiple tuples of the same uri will be merged, e.g
		 * `[[file1, [d1]], [file1, [d2]]]` is equivalent to `[[file1, [d1, d2]]]`.
		 * If a diagnostics item is `undefined` as in `[file1, undefined]`
		 * all previous but not subsequent diagnostics are removed.
		 *
		 * @param entries An array of tuples, like `[[file1, [d1, d2]], [file2, [d3, d4, d5]]]`, or `undefined`.
		 */
		set(entries: [Uri, Diagnostic[] | undefined][]): void;

		/**
		 * Remove all diagnostics from this collection that belong
		 * to the provided `uri`. The same as `#set(uri, undefined)`.
		 *
		 * @param uri A resource identifier.
		 */
		delete(uri: Uri): void;

		/**
		 * Remove all diagnostics from this collection. The same
		 * as calling `#set(undefined)`;
		 */
		clear(): void;

		/**
		 * Iterate over each entry in this collection.
		 *
		 * @param callback Function to execute for each entry.
		 * @param thisArg The `this` context used when invoking the handler function.
		 */
		forEach(callback: (uri: Uri, diagnostics: Diagnostic[], collection: DiagnosticCollection) => any, thisArg?: any): void;

		/**
		 * Get the diagnostics for a given resource. *Note* that you cannot
		 * modify the diagnostics-array returned from this call.
		 *
		 * @param uri A resource identifier.
		 * @returns An immutable array of [diagnostics](#Diagnostic) or `undefined`.
		 */
		get(uri: Uri): Diagnostic[] | undefined;

		/**
		 * Check if this collection contains diagnostics for a
		 * given resource.
		 *
		 * @param uri A resource identifier.
		 * @returns `true` if this collection has diagnostic for the given resource.
		 */
		has(uri: Uri): boolean;

		/**
		 * Dispose and free associated resources. Calls
		 * [clear](#DiagnosticCollection.clear).
		 */
		dispose(): void;
	}

	/**
	 * Denotes a column in the editor window. Columns are
	 * used to show editors side by side.
	 */
	export enum ViewColumn {
		One = 1,
		Two = 2,
		Three = 3
	}

	/**
	 * An output channel is a container for readonly textual information.
	 *
	 * To get an instance of an `OutputChannel` use
	 * [createOutputChannel](#window.createOutputChannel).
	 */
	export interface OutputChannel {

		/**
		 * The human-readable name of this output channel.
		 */
		readonly name: string;

		/**
		 * Append the given value to the channel.
		 *
		 * @param value A string, falsy values will not be printed.
		 */
		append(value: string): void;

		/**
		 * Append the given value and a line feed character
		 * to the channel.
		 *
		 * @param value A string, falsy values will be printed.
		 */
		appendLine(value: string): void;

		/**
		 * Removes all output from the channel.
		 */
		clear(): void;

		/**
		 * Reveal this channel in the UI.
		 *
		 * @param preserveFocus When `true` the channel will not take focus.
		 */
		show(preserveFocus?: boolean): void;

		/**
		 * ~~Reveal this channel in the UI.~~
		 *
		 * @deprecated Use the overload with just one parameter (`show(preserveFocus?: boolean): void`).
		 *
		 * @param column This argument is **deprecated** and will be ignored.
		 * @param preserveFocus When `true` the channel will not take focus.
		 */
		show(column?: ViewColumn, preserveFocus?: boolean): void;

		/**
		 * Hide this channel from the UI.
		 */
		hide(): void;

		/**
		 * Dispose and free associated resources.
		 */
		dispose(): void;
	}

	/**
	 * Represents the alignment of status bar items.
	 */
	export enum StatusBarAlignment {

		/**
		 * Aligned to the left side.
		 */
		Left = 1,

		/**
		 * Aligned to the right side.
		 */
		Right = 2
	}

	/**
	 * A status bar item is a status bar contribution that can
	 * show text and icons and run a command on click.
	 */
	export interface StatusBarItem {

		/**
		 * The alignment of this item.
		 */
		readonly alignment: StatusBarAlignment;

		/**
		 * The priority of this item. Higher value means the item should
		 * be shown more to the left.
		 */
		readonly priority: number;

		/**
		 * The text to show for the entry. You can embed icons in the text by leveraging the syntax:
		 *
		 * `My text $(icon-name) contains icons like $(icon'name) this one.`
		 *
		 * Where the icon-name is taken from the [octicon](https://octicons.github.com) icon set, e.g.
		 * `light-bulb`, `thumbsup`, `zap` etc.
		 */
		text: string;

		/**
		 * The tooltip text when you hover over this entry.
		 */
		tooltip: string | undefined;

		/**
		 * The foreground color for this entry.
		 */
		color: string | ThemeColor | undefined;

		/**
		 * The identifier of a command to run on click. The command must be
		 * [known](#commands.getCommands).
		 */
		command: string | undefined;

		/**
		 * Shows the entry in the status bar.
		 */
		show(): void;

		/**
		 * Hide the entry in the status bar.
		 */
		hide(): void;

		/**
		 * Dispose and free associated resources. Call
		 * [hide](#StatusBarItem.hide).
		 */
		dispose(): void;
	}

	/**
	 * Defines a generalized way of reporting progress updates.
	 */
	export interface Progress<T> {

		/**
		 * Report a progress update.
		 * @param value A progress item, like a message or an updated percentage value
		 */
		report(value: T): void;
	}

	/**
	 * An individual terminal instance within the integrated terminal.
	 */
	export interface Terminal {

		/**
		 * The name of the terminal.
		 */
		readonly name: string;

		/**
		 * The process ID of the shell process.
		 */
		readonly processId: Thenable<number>;

		/**
		 * Send text to the terminal. The text is written to the stdin of the underlying pty process
		 * (shell) of the terminal.
		 *
		 * @param text The text to send.
		 * @param addNewLine Whether to add a new line to the text being sent, this is normally
		 * required to run a command in the terminal. The character(s) added are \n or \r\n
		 * depending on the platform. This defaults to `true`.
		 */
		sendText(text: string, addNewLine?: boolean): void;

		/**
		 * Show the terminal panel and reveal this terminal in the UI.
		 *
		 * @param preserveFocus When `true` the terminal will not take focus.
		 */
		show(preserveFocus?: boolean): void;

		/**
		 * Hide the terminal panel if this terminal is currently showing.
		 */
		hide(): void;

		/**
		 * Dispose and free associated resources.
		 */
		dispose(): void;
	}

	/**
	 * Represents an extension.
	 *
	 * To get an instance of an `Extension` use [getExtension](#extensions.getExtension).
	 */
	export interface Extension<T> {

		/**
		 * The canonical extension identifier in the form of: `publisher.name`.
		 */
		readonly id: string;

		/**
		 * The absolute file path of the directory containing this extension.
		 */
		readonly extensionPath: string;

		/**
		 * `true` if the extension has been activated.
		 */
		readonly isActive: boolean;

		/**
		 * The parsed contents of the extension's package.json.
		 */
		readonly packageJSON: any;

		/**
		 * The public API exported by this extension. It is an invalid action
		 * to access this field before this extension has been activated.
		 */
		readonly exports: T;

		/**
		 * Activates this extension and returns its public API.
		 *
		 * @return A promise that will resolve when this extension has been activated.
		 */
		activate(): Thenable<T>;
	}

	/**
	 * An extension context is a collection of utilities private to an
	 * extension.
	 *
	 * An instance of an `ExtensionContext` is provided as the first
	 * parameter to the `activate`-call of an extension.
	 */
	export interface ExtensionContext {

		/**
		 * An array to which disposables can be added. When this
		 * extension is deactivated the disposables will be disposed.
		 */
		subscriptions: { dispose(): any }[];

		/**
		 * A memento object that stores state in the context
		 * of the currently opened [workspace](#workspace.workspaceFolders).
		 */
		workspaceState: Memento;

		/**
		 * A memento object that stores state independent
		 * of the current opened [workspace](#workspace.workspaceFolders).
		 */
		globalState: Memento;

		/**
		 * The absolute file path of the directory containing the extension.
		 */
		extensionPath: string;

		/**
		 * Get the absolute path of a resource contained in the extension.
		 *
		 * @param relativePath A relative path to a resource contained in the extension.
		 * @return The absolute path of the resource.
		 */
		asAbsolutePath(relativePath: string): string;

		/**
		 * An absolute file path of a workspace specific directory in which the extension
		 * can store private state. The directory might not exist on disk and creation is
		 * up to the extension. However, the parent directory is guaranteed to be existent.
		 *
		 * Use [`workspaceState`](#ExtensionContext.workspaceState) or
		 * [`globalState`](#ExtensionContext.globalState) to store key value data.
		 */
		storagePath: string | undefined;
	}

	/**
	 * A memento represents a storage utility. It can store and retrieve
	 * values.
	 */
	export interface Memento {

		/**
		 * Return a value.
		 *
		 * @param key A string.
		 * @return The stored value or `undefined`.
		 */
		get<T>(key: string): T | undefined;

		/**
		 * Return a value.
		 *
		 * @param key A string.
		 * @param defaultValue A value that should be returned when there is no
		 * value (`undefined`) with the given key.
		 * @return The stored value or the defaultValue.
		 */
		get<T>(key: string, defaultValue: T): T;

		/**
		 * Store a value. The value must be JSON-stringifyable.
		 *
		 * @param key A string.
		 * @param value A value. MUST not contain cyclic references.
		 */
		update(key: string, value: any): Thenable<void>;
	}

	/**
	 * Controls the behaviour of the terminal's visibility.
	 */
	export enum TaskRevealKind {
		/**
		 * Always brings the terminal to front if the task is executed.
		 */
		Always = 1,

		/**
		 * Only brings the terminal to front if a problem is detected executing the task
		 * (e.g. the task couldn't be started because).
		 */
		Silent = 2,

		/**
		 * The terminal never comes to front when the task is executed.
		 */
		Never = 3
	}

	/**
	 * Controls how the task channel is used between tasks
	 */
	export enum TaskPanelKind {

		/**
		 * Shares a panel with other tasks. This is the default.
		 */
		Shared = 1,

		/**
		 * Uses a dedicated panel for this tasks. The panel is not
		 * shared with other tasks.
		 */
		Dedicated = 2,

		/**
		 * Creates a new panel whenever this task is executed.
		 */
		New = 3
	}

	/**
	 * Controls how the task is presented in the UI.
	 */
	export interface TaskPresentationOptions {
		/**
		 * Controls whether the task output is reveal in the user interface.
		 * Defaults to `RevealKind.Always`.
		 */
		reveal?: TaskRevealKind;

		/**
		 * Controls whether the command associated with the task is echoed
		 * in the user interface.
		 */
		echo?: boolean;

		/**
		 * Controls whether the panel showing the task output is taking focus.
		 */
		focus?: boolean;

		/**
		 * Controls if the task panel is used for this task only (dedicated),
		 * shared between tasks (shared) or if a new panel is created on
		 * every task execution (new). Defaults to `TaskInstanceKind.Shared`
		 */
		panel?: TaskPanelKind;
	}

	/**
	 * A grouping for tasks. The editor by default supports the
	 * 'Clean', 'Build', 'RebuildAll' and 'Test' group.
	 */
	export class TaskGroup {

		/**
		 * The clean task group;
		 */
		public static Clean: TaskGroup;

		/**
		 * The build task group;
		 */
		public static Build: TaskGroup;

		/**
		 * The rebuild all task group;
		 */
		public static Rebuild: TaskGroup;

		/**
		 * The test all task group;
		 */
		public static Test: TaskGroup;

		private constructor(id: string, label: string);
	}


	/**
	 * A structure that defines a task kind in the system.
	 * The value must be JSON-stringifyable.
	 */
	export interface TaskDefinition {
		/**
		 * The task definition descibing the task provided by an extension.
		 * Usually a task provider defines more properties to identify
		 * a task. They need to be defined in the package.json of the
		 * extension under the 'taskDefinitions' extension point. The npm
		 * task definition for example looks like this
		 * ```typescript
		 * interface NpmTaskDefinition extends TaskDefinition {
		 *     script: string;
		 * }
		 * ```
		 */
		readonly type: string;

		/**
		 * Additional attributes of a concrete task definition.
		 */
		[name: string]: any;
	}

	/**
	 * Options for a process execution
	 */
	export interface ProcessExecutionOptions {
		/**
		 * The current working directory of the executed program or shell.
		 * If omitted the tools current workspace root is used.
		 */
		cwd?: string;

		/**
		 * The additional environment of the executed program or shell. If omitted
		 * the parent process' environment is used. If provided it is merged with
		 * the parent process' environment.
		 */
		env?: { [key: string]: string };
	}

	/**
	 * The execution of a task happens as an external process
	 * without shell interaction.
	 */
	export class ProcessExecution {

		/**
		 * Creates a process execution.
		 *
		 * @param process The process to start.
		 * @param options Optional options for the started process.
		 */
		constructor(process: string, options?: ProcessExecutionOptions);

		/**
		 * Creates a process execution.
		 *
		 * @param process The process to start.
		 * @param args Arguments to be passed to the process.
		 * @param options Optional options for the started process.
		 */
		constructor(process: string, args: string[], options?: ProcessExecutionOptions);

		/**
		 * The process to be executed.
		 */
		process: string;

		/**
		 * The arguments passed to the process. Defaults to an empty array.
		 */
		args: string[];

		/**
		 * The process options used when the process is executed.
		 * Defaults to undefined.
		 */
		options?: ProcessExecutionOptions;
	}

	/**
	 * Options for a shell execution
	 */
	export interface ShellExecutionOptions {
		/**
		 * The shell executable.
		 */
		executable?: string;

		/**
		 * The arguments to be passed to the shell executable used to run the task.
		 */
		shellArgs?: string[];

		/**
		 * The current working directory of the executed shell.
		 * If omitted the tools current workspace root is used.
		 */
		cwd?: string;

		/**
		 * The additional environment of the executed shell. If omitted
		 * the parent process' environment is used. If provided it is merged with
		 * the parent process' environment.
		 */
		env?: { [key: string]: string };
	}


	export class ShellExecution {
		/**
		 * Creates a process execution.
		 *
		 * @param commandLine The command line to execute.
		 * @param options Optional options for the started the shell.
		 */
		constructor(commandLine: string, options?: ShellExecutionOptions);

		/**
		 * The shell command line
		 */
		commandLine: string;

		/**
		 * The shell options used when the command line is executed in a shell.
		 * Defaults to undefined.
		 */
		options?: ShellExecutionOptions;
	}

	/**
	 * A task to execute
	 */
	export class Task {

		/**
		 * Creates a new task.
		 *
		 * @param definition The task definition as defined in the taskDefintions extension point.
		 * @param name The task's name. Is presented in the user interface.
		 * @param source The task's source (e.g. 'gulp', 'npm', ...). Is presented in the user interface.
		 * @param execution The process or shell execution.
		 * @param problemMatchers the names of problem matchers to use, like '$tsc'
		 *  or '$eslint'. Problem matchers can be contributed by an extension using
		 *  the `problemMatchers` extension point.
		 */
		constructor(taskDefinition: TaskDefinition, name: string, source: string, execution?: ProcessExecution | ShellExecution, problemMatchers?: string | string[]);

		/**
		 * The task's definition.
		 */
		definition: TaskDefinition;

		/**
		 * The task's name
		 */
		name: string;

		/**
		 * The task's execution engine
		 */
		execution: ProcessExecution | ShellExecution;

		/**
		 * Whether the task is a background task or not.
		 */
		isBackground: boolean;

		/**
		 * A human-readable string describing the source of this
		 * shell task, e.g. 'gulp' or 'npm'.
		 */
		source: string;

		/**
		 * The task group this tasks belongs to. See TaskGroup
		 * for a predefined set of available groups.
		 * Defaults to undefined meaning that the task doesn't
		 * belong to any special group.
		 */
		group?: TaskGroup;

		/**
		 * The presentation options. Defaults to an empty literal.
		 */
		presentationOptions: TaskPresentationOptions;

		/**
		 * The problem matchers attached to the task. Defaults to an empty
		 * array.
		 */
		problemMatchers: string[];
	}

	/**
	 * A task provider allows to add tasks to the task service.
	 * A task provider is registerd via #workspace.registerTaskProvider.
	 */
	export interface TaskProvider {
		/**
		 * Provides tasks.
		 * @param token A cancellation token.
		 * @return an array of tasks
		 */
		provideTasks(token?: CancellationToken): ProviderResult<Task[]>;

		/**
		 * Resolves a task that has no [`execution`](#Task.execution) set. Tasks are
		 * often created from information found in the `task.json`-file. Such tasks miss
		 * the information on how to execute them and a task provider must fill in
		 * the missing information in the `resolveTask`-method.
		 *
		 * @param task The task to resolve.
		 * @param token A cancellation token.
		 * @return The resolved task
		 */
		resolveTask(task: Task, token?: CancellationToken): ProviderResult<Task>;
	}

	/**
	 * エディターが実行される環境を説明する名前空間
	 */
	export namespace env {

		/**
		 * 'VS Code' のようなエディターのアプリケーション名
		 *
		 * @readonly
		 */
		export let appName: string;

		/**
		 * `de-CH`, `fr`, `en-US` のようなユーザーが設定したユーザーの言語を表します
		 *
		 * @readonly
		 */
		export let language: string;

		/**
		 * そのコンピューターを示すユニークな識別子
		 *
		 * @readonly
		 */
		export let machineId: string;

		/**
		 * 現在のセッションを示すユニークな識別子
		 *
		 * エディターが起動されるたびに変更されます
		 *
		 * @readonly
		 */
		export let sessionId: string;
	}

	/**
	 * Namespace for dealing with commands. In short, a command is a function with a
	 * unique identifier. The function is sometimes also called _command handler_.
	 *
	 * Commands can be added to the editor using the [registerCommand](#commands.registerCommand)
	 * and [registerTextEditorCommand](#commands.registerTextEditorCommand) functions. Commands
	 * can be executed [manually](#commands.executeCommand) or from a UI gesture. Those are:
	 *
	 * * palette - Use the `commands`-section in `package.json` to make a command show in
	 * the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).
	 * * keybinding - Use the `keybindings`-section in `package.json` to enable
	 * [keybindings](https://code.visualstudio.com/docs/getstarted/keybindings#_customizing-shortcuts)
	 * for your extension.
	 *
	 * Commands from other extensions and from the editor itself are accessible to an extension. However,
	 * when invoking an editor command not all argument types are supported.
	 *
	 * This is a sample that registers a command handler and adds an entry for that command to the palette. First
	 * register a command handler with the identifier `extension.sayHello`.
	 * ```javascript
	 * commands.registerCommand('extension.sayHello', () => {
	 * 	window.showInformationMessage('Hello World!');
	 * });
	 * ```
	 * Second, bind the command identifier to a title under which it will show in the palette (`package.json`).
	 * ```json
	 * {
	 * 	"contributes": {
	 * 		"commands": [{
	 * 			"command": "extension.sayHello",
	 * 			"title": "Hello World"
	 * 		}]
	 * 	}
	 * }
	 * ```
	 */
	export namespace commands {

		/**
		 * Registers a command that can be invoked via a keyboard shortcut,
		 * a menu item, an action, or directly.
		 *
		 * Registering a command with an existing command identifier twice
		 * will cause an error.
		 *
		 * @param command A unique identifier for the command.
		 * @param callback A command handler function.
		 * @param thisArg The `this` context used when invoking the handler function.
		 * @return Disposable which unregisters this command on disposal.
		 */
		export function registerCommand(command: string, callback: (...args: any[]) => any, thisArg?: any): Disposable;

		/**
		 * Registers a text editor command that can be invoked via a keyboard shortcut,
		 * a menu item, an action, or directly.
		 *
		 * Text editor commands are different from ordinary [commands](#commands.registerCommand) as
		 * they only execute when there is an active editor when the command is called. Also, the
		 * command handler of an editor command has access to the active editor and to an
		 * [edit](#TextEditorEdit)-builder.
		 *
		 * @param command A unique identifier for the command.
		 * @param callback A command handler function with access to an [editor](#TextEditor) and an [edit](#TextEditorEdit).
		 * @param thisArg The `this` context used when invoking the handler function.
		 * @return Disposable which unregisters this command on disposal.
		 */
		export function registerTextEditorCommand(command: string, callback: (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]) => void, thisArg?: any): Disposable;

		/**
		 * Executes the command denoted by the given command identifier.
		 *
		 * When executing an editor command not all types are allowed to
		 * be passed as arguments. Allowed are the primitive types `string`, `boolean`,
		 * `number`, `undefined`, and `null`, as well as classes defined in this API.
		 * There are no restrictions when executing commands that have been contributed
		 * by extensions.
		 *
		 * @param command Identifier of the command to execute.
		 * @param rest Parameters passed to the command function.
		 * @return A thenable that resolves to the returned value of the given command. `undefined` when
		 * the command handler function doesn't return anything.
		 */
		export function executeCommand<T>(command: string, ...rest: any[]): Thenable<T | undefined>;

		/**
		 * Retrieve the list of all available commands. Commands starting an underscore are
		 * treated as internal commands.
		 *
		 * @param filterInternal Set `true` to not see internal commands (starting with an underscore)
		 * @return Thenable that resolves to a list of command ids.
		 */
		export function getCommands(filterInternal?: boolean): Thenable<string[]>;
	}

	/**
	 * Namespace for dealing with the current window of the editor. That is visible
	 * and active editors, as well as, UI elements to show messages, selections, and
	 * asking for user input.
	 */
	export namespace window {

		/**
		 * The currently active editor or `undefined`. The active editor is the one
		 * that currently has focus or, when none has focus, the one that has changed
		 * input most recently.
		 */
		export let activeTextEditor: TextEditor | undefined;

		/**
		 * The currently visible editors or an empty array.
		 */
		export let visibleTextEditors: TextEditor[];

		/**
		 * An [event](#Event) which fires when the [active editor](#window.activeTextEditor)
		 * has changed. *Note* that the event also fires when the active editor changes
		 * to `undefined`.
		 */
		export const onDidChangeActiveTextEditor: Event<TextEditor>;

		/**
		 * An [event](#Event) which fires when the array of [visible editors](#window.visibleTextEditors)
		 * has changed.
		 */
		export const onDidChangeVisibleTextEditors: Event<TextEditor[]>;

		/**
		 * An [event](#Event) which fires when the selection in an editor has changed.
		 */
		export const onDidChangeTextEditorSelection: Event<TextEditorSelectionChangeEvent>;

		/**
		 * An [event](#Event) which fires when the options of an editor have changed.
		 */
		export const onDidChangeTextEditorOptions: Event<TextEditorOptionsChangeEvent>;

		/**
		 * An [event](#Event) which fires when the view column of an editor has changed.
		 */
		export const onDidChangeTextEditorViewColumn: Event<TextEditorViewColumnChangeEvent>;

		/**
		 * An [event](#Event) which fires when a terminal is disposed.
		 */
		export const onDidCloseTerminal: Event<Terminal>;

		/**
		 * Show the given document in a text editor. A [column](#ViewColumn) can be provided
		 * to control where the editor is being shown. Might change the [active editor](#window.activeTextEditor).
		 *
		 * @param document A text document to be shown.
		 * @param column A view column in which the editor should be shown. The default is the [one](#ViewColumn.One), other values
		 * are adjusted to be __Min(column, columnCount + 1)__.
		 * @param preserveFocus When `true` the editor will not take focus.
		 * @return A promise that resolves to an [editor](#TextEditor).
		 */
		export function showTextDocument(document: TextDocument, column?: ViewColumn, preserveFocus?: boolean): Thenable<TextEditor>;

		/**
		 * Show the given document in a text editor. [Options](#TextDocumentShowOptions) can be provided
		 * to control options of the editor is being shown. Might change the [active editor](#window.activeTextEditor).
		 *
		 * @param document A text document to be shown.
		 * @param options [Editor options](#ShowTextDocumentOptions) to configure the behavior of showing the [editor](#TextEditor).
		 * @return A promise that resolves to an [editor](#TextEditor).
		 */
		export function showTextDocument(document: TextDocument, options?: TextDocumentShowOptions): Thenable<TextEditor>;

		/**
		 * A short-hand for `openTextDocument(uri).then(document => showTextDocument(document, options))`.
		 *
		 * @see [openTextDocument](#openTextDocument)
		 *
		 * @param uri A resource identifier.
		 * @param options [Editor options](#ShowTextDocumentOptions) to configure the behavior of showing the [editor](#TextEditor).
		 * @return A promise that resolves to an [editor](#TextEditor).
		 */
		export function showTextDocument(uri: Uri, options?: TextDocumentShowOptions): Thenable<TextEditor>;

		/**
		 * Create a TextEditorDecorationType that can be used to add decorations to text editors.
		 *
		 * @param options Rendering options for the decoration type.
		 * @return A new decoration type instance.
		 */
		export function createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType;

		/**
		 * Show an information message to users. Optionally provide an array of items which will be presented as
		 * clickable buttons.
		 *
		 * @param message The message to show.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showInformationMessage(message: string, ...items: string[]): Thenable<string | undefined>;

		/**
		 * Show an information message to users. Optionally provide an array of items which will be presented as
		 * clickable buttons.
		 *
		 * @param message The message to show.
		 * @param options Configures the behaviour of the message.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showInformationMessage(message: string, options: MessageOptions, ...items: string[]): Thenable<string | undefined>;

		/**
		 * Show an information message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showInformationMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>;

		/**
		 * Show an information message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param options Configures the behaviour of the message.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showInformationMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>;

		/**
		 * Show a warning message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showWarningMessage(message: string, ...items: string[]): Thenable<string | undefined>;

		/**
		 * Show a warning message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param options Configures the behaviour of the message.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showWarningMessage(message: string, options: MessageOptions, ...items: string[]): Thenable<string | undefined>;

		/**
		 * Show a warning message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showWarningMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>;

		/**
		 * Show a warning message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param options Configures the behaviour of the message.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showWarningMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>;

		/**
		 * Show an error message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showErrorMessage(message: string, ...items: string[]): Thenable<string | undefined>;

		/**
		 * Show an error message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param options Configures the behaviour of the message.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showErrorMessage(message: string, options: MessageOptions, ...items: string[]): Thenable<string | undefined>;

		/**
		 * Show an error message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showErrorMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>;

		/**
		 * Show an error message.
		 *
		 * @see [showInformationMessage](#window.showInformationMessage)
		 *
		 * @param message The message to show.
		 * @param options Configures the behaviour of the message.
		 * @param items A set of items that will be rendered as actions in the message.
		 * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
		 */
		export function showErrorMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>;

		/**
		 * Shows a selection list.
		 *
		 * @param items An array of strings, or a promise that resolves to an array of strings.
		 * @param options Configures the behavior of the selection list.
		 * @param token A token that can be used to signal cancellation.
		 * @return A promise that resolves to the selection or `undefined`.
		 */
		export function showQuickPick(items: string[] | Thenable<string[]>, options?: QuickPickOptions, token?: CancellationToken): Thenable<string | undefined>;

		/**
		 * Shows a selection list.
		 *
		 * @param items An array of items, or a promise that resolves to an array of items.
		 * @param options Configures the behavior of the selection list.
		 * @param token A token that can be used to signal cancellation.
		 * @return A promise that resolves to the selected item or `undefined`.
		 */
		export function showQuickPick<T extends QuickPickItem>(items: T[] | Thenable<T[]>, options?: QuickPickOptions, token?: CancellationToken): Thenable<T | undefined>;

		/**
		 * Opens an input box to ask the user for input.
		 *
		 * The returned value will be `undefined` if the input box was canceled (e.g. pressing ESC). Otherwise the
		 * returned value will be the string typed by the user or an empty string if the user did not type
		 * anything but dismissed the input box with OK.
		 *
		 * @param options Configures the behavior of the input box.
		 * @param token A token that can be used to signal cancellation.
		 * @return A promise that resolves to a string the user provided or to `undefined` in case of dismissal.
		 */
		export function showInputBox(options?: InputBoxOptions, token?: CancellationToken): Thenable<string | undefined>;

		/**
		 * Create a new [output channel](#OutputChannel) with the given name.
		 *
		 * @param name Human-readable string which will be used to represent the channel in the UI.
		 */
		export function createOutputChannel(name: string): OutputChannel;

		/**
		 * Set a message to the status bar. This is a short hand for the more powerful
		 * status bar [items](#window.createStatusBarItem).
		 *
		 * @param text The message to show, supports icon substitution as in status bar [items](#StatusBarItem.text).
		 * @param hideAfterTimeout Timeout in milliseconds after which the message will be disposed.
		 * @return A disposable which hides the status bar message.
		 */
		export function setStatusBarMessage(text: string, hideAfterTimeout: number): Disposable;

		/**
		 * Set a message to the status bar. This is a short hand for the more powerful
		 * status bar [items](#window.createStatusBarItem).
		 *
		 * @param text The message to show, supports icon substitution as in status bar [items](#StatusBarItem.text).
		 * @param hideWhenDone Thenable on which completion (resolve or reject) the message will be disposed.
		 * @return A disposable which hides the status bar message.
		 */
		export function setStatusBarMessage(text: string, hideWhenDone: Thenable<any>): Disposable;

		/**
		 * Set a message to the status bar. This is a short hand for the more powerful
		 * status bar [items](#window.createStatusBarItem).
		 *
		 * *Note* that status bar messages stack and that they must be disposed when no
		 * longer used.
		 *
		 * @param text The message to show, supports icon substitution as in status bar [items](#StatusBarItem.text).
		 * @return A disposable which hides the status bar message.
		 */
		export function setStatusBarMessage(text: string): Disposable;

		/**
		 * ~~Show progress in the Source Control viewlet while running the given callback and while
		 * its returned promise isn't resolve or rejected.~~
		 *
		 * @deprecated Use `withProgress` instead.
		 *
		 * @param task A callback returning a promise. Progress increments can be reported with
		 * the provided [progress](#Progress)-object.
		 * @return The thenable the task did rseturn.
		 */
		export function withScmProgress<R>(task: (progress: Progress<number>) => Thenable<R>): Thenable<R>;

		/**
		 * Show progress in the editor. Progress is shown while running the given callback
		 * and while the promise it returned isn't resolved nor rejected. The location at which
		 * progress should show (and other details) is defined via the passed [`ProgressOptions`](#ProgressOptions).
		 *
		 * @param task A callback returning a promise. Progress state can be reported with
		 * the provided [progress](#Progress)-object.
		 * @return The thenable the task-callback returned.
		 */
		export function withProgress<R>(options: ProgressOptions, task: (progress: Progress<{ message?: string; }>) => Thenable<R>): Thenable<R>;

		/**
		 * Creates a status bar [item](#StatusBarItem).
		 *
		 * @param alignment The alignment of the item.
		 * @param priority The priority of the item. Higher values mean the item should be shown more to the left.
		 * @return A new status bar item.
		 */
		export function createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem;

		/**
		 * Creates a [Terminal](#Terminal). The cwd of the terminal will be the workspace directory
		 * if it exists, regardless of whether an explicit customStartPath setting exists.
		 *
		 * @param name Optional human-readable string which will be used to represent the terminal in the UI.
		 * @param shellPath Optional path to a custom shell executable to be used in the terminal.
		 * @param shellArgs Optional args for the custom shell executable, this does not work on Windows (see #8429)
		 * @return A new Terminal.
		 */
		export function createTerminal(name?: string, shellPath?: string, shellArgs?: string[]): Terminal;

		/**
		 * Creates a [Terminal](#Terminal). The cwd of the terminal will be the workspace directory
		 * if it exists, regardless of whether an explicit customStartPath setting exists.
		 *
		 * @param options A TerminalOptions object describing the characteristics of the new terminal.
		 * @return A new Terminal.
		 */
		export function createTerminal(options: TerminalOptions): Terminal;

		/**
		 * Register a [TreeDataProvider](#TreeDataProvider) for the view contributed using the extension point `views`.
		 * @param viewId Id of the view contributed using the extension point `views`.
		 * @param treeDataProvider A [TreeDataProvider](#TreeDataProvider) that provides tree data for the view
		 */
		export function registerTreeDataProvider<T>(viewId: string, treeDataProvider: TreeDataProvider<T>): Disposable;
	}

	/**
	 * A data provider that provides tree data
	 */
	export interface TreeDataProvider<T> {
		/**
		 * An optional event to signal that an element or root has changed.
		 * To signal that root has changed, do not pass any argument or pass `undefined` or `null`.
		 */
		onDidChangeTreeData?: Event<T | undefined | null>;

		/**
		 * Get [TreeItem](#TreeItem) representation of the `element`
		 *
		 * @param element The element for which [TreeItem](#TreeItem) representation is asked for.
		 * @return [TreeItem](#TreeItem) representation of the element
		 */
		getTreeItem(element: T): TreeItem | Thenable<TreeItem>;

		/**
		 * Get the children of `element` or root if no element is passed.
		 *
		 * @param element The element from which the provider gets children. Can be `undefined`.
		 * @return Children of `element` or root if no element is passed.
		 */
		getChildren(element?: T): ProviderResult<T[]>;
	}

	export class TreeItem {
		/**
		 * A human-readable string describing this item
		 */
		label: string;

		/**
		 * The icon path for the tree item
		 */
		iconPath?: string | Uri | { light: string | Uri; dark: string | Uri };

		/**
		 * The [command](#Command) which should be run when the tree item is selected.
		 */
		command?: Command;

		/**
		 * [TreeItemCollapsibleState](#TreeItemCollapsibleState) of the tree item.
		 */
		collapsibleState?: TreeItemCollapsibleState;

		/**
		 * Context value of the tree item. This can be used to contribute item specific actions in the tree.
		 * For example, a tree item is given a context value as `folder`. When contributing actions to `view/item/context`
		 * using `menus` extension point, you can specify context value for key `viewItem` in `when` expression like `viewItem == folder`.
		 * ```
		 *	"contributes": {
		 *		"menus": {
		 *			"view/item/context": [
		 *				{
		 *					"command": "extension.deleteFolder",
		 *					"when": "viewItem == folder"
		 *				}
		 *			]
		 *		}
		 *	}
		 * ```
		 * This will show action `extension.deleteFolder` only for items with `contextValue` is `folder`.
		 */
		contextValue?: string;

		/**
		 * @param label A human-readable string describing this item
		 * @param collapsibleState [TreeItemCollapsibleState](#TreeItemCollapsibleState) of the tree item. Default is [TreeItemCollapsibleState.None](#TreeItemCollapsibleState.None)
		 */
		constructor(label: string, collapsibleState?: TreeItemCollapsibleState);
	}

	/**
	 * Collapsible state of the tree item
	 */
	export enum TreeItemCollapsibleState {
		/**
		 * Determines an item can be neither collapsed nor expanded. Implies it has no children.
		 */
		None = 0,
		/**
		 * Determines an item is collapsed
		 */
		Collapsed = 1,
		/**
		 * Determines an item is expanded
		 */
		Expanded = 2
	}

	/**
	 * Value-object describing what options a terminal should use.
	 */
	export interface TerminalOptions {
		/**
		 * A human-readable string which will be used to represent the terminal in the UI.
		 */
		name?: string;

		/**
		 * A path to a custom shell executable to be used in the terminal.
		 */
		shellPath?: string;

		/**
		 * Args for the custom shell executable, this does not work on Windows (see #8429)
		 */
		shellArgs?: string[];
	}

	/**
	 * A location in the editor at which progress information can be shown. It depends on the
	 * location how progress is visually represented.
	 */
	export enum ProgressLocation {

		/**
		 * Show progress for the source control viewlet, as overlay for the icon and as progress bar
		 * inside the viewlet (when visible).
		 */
		SourceControl = 1,

		/**
		 * Show progress in the status bar of the editor.
		 */
		Window = 10
	}

	/**
	 * Value-object describing where and how progress should show.
	 */
	export interface ProgressOptions {

		/**
		 * The location at which progress should show.
		 */
		location: ProgressLocation;

		/**
		 * A human-readable string which will be used to describe the
		 * operation.
		 */
		title?: string;
	}

	/**
	 * An event describing an individual change in the text of a [document](#TextDocument).
	 */
	export interface TextDocumentContentChangeEvent {
		/**
		 * The range that got replaced.
		 */
		range: Range;
		/**
		 * The length of the range that got replaced.
		 */
		rangeLength: number;
		/**
		 * The new text for the range.
		 */
		text: string;
	}

	/**
	 * An event describing a transactional [document](#TextDocument) change.
	 */
	export interface TextDocumentChangeEvent {

		/**
		 * The affected document.
		 */
		document: TextDocument;

		/**
		 * An array of content changes.
		 */
		contentChanges: TextDocumentContentChangeEvent[];
	}

	/**
	 * Represents reasons why a text document is saved.
	 */
	export enum TextDocumentSaveReason {

		/**
		 * Manually triggered, e.g. by the user pressing save, by starting debugging,
		 * or by an API call.
		 */
		Manual = 1,

		/**
		 * Automatic after a delay.
		 */
		AfterDelay = 2,

		/**
		 * When the editor lost focus.
		 */
		FocusOut = 3
	}

	/**
	 * An event that is fired when a [document](#TextDocument) will be saved.
	 *
	 * To make modifications to the document before it is being saved, call the
	 * [`waitUntil`](#TextDocumentWillSaveEvent.waitUntil)-function with a thenable
	 * that resolves to an array of [text edits](#TextEdit).
	 */
	export interface TextDocumentWillSaveEvent {

		/**
		 * The document that will be saved.
		 */
		document: TextDocument;

		/**
		 * The reason why save was triggered.
		 */
		reason: TextDocumentSaveReason;

		/**
		 * Allows to pause the event loop and to apply [pre-save-edits](#TextEdit).
		 * Edits of subsequent calls to this function will be applied in order. The
		 * edits will be *ignored* if concurrent modifications of the document happened.
		 *
		 * *Note:* This function can only be called during event dispatch and not
		 * in an asynchronous manner:
		 *
		 * ```ts
		 * workspace.onWillSaveTextDocument(event => {
		 * 	// async, will *throw* an error
		 * 	setTimeout(() => event.waitUntil(promise));
		 *
		 * 	// sync, OK
		 * 	event.waitUntil(promise);
		 * })
		 * ```
		 *
		 * @param thenable A thenable that resolves to [pre-save-edits](#TextEdit).
		 */
		waitUntil(thenable: Thenable<TextEdit[]>): void;

		/**
		 * Allows to pause the event loop until the provided thenable resolved.
		 *
		 * *Note:* This function can only be called during event dispatch.
		 *
		 * @param thenable A thenable that delays saving.
		 */
		waitUntil(thenable: Thenable<any>): void;
	}

	/**
	 * An event describing a change to the set of [workspace folders](#workspace.workspaceFolders).
	 */
	export interface WorkspaceFoldersChangeEvent {
		/**
		 * Added workspace folders.
		 */
		readonly added: WorkspaceFolder[];

		/**
		 * Removed workspace folders.
		 */
		readonly removed: WorkspaceFolder[];
	}

	/**
	 * A workspace folder is one of potentially many roots opened by the editor. All workspace folders
	 * are equal which means there is notion of an active or master workspace folder.
	 */
	export interface WorkspaceFolder {

		/**
		 * The associated URI for this workspace folder.
		 */
		readonly uri: Uri;

		/**
		 * The name of this workspace folder. Defaults to
		 * the basename its [uri-path](#Uri.path)
		 */
		readonly name: string;

		/**
		 * The ordinal number of this workspace folder.
		 */
		readonly index: number;
	}

	/**
	 * Namespace for dealing with the current workspace. A workspace is the representation
	 * of the folder that has been opened. There is no workspace when just a file but not a
	 * folder has been opened.
	 *
	 * The workspace offers support for [listening](#workspace.createFileSystemWatcher) to fs
	 * events and for [finding](#workspace.findFiles) files. Both perform well and run _outside_
	 * the editor-process so that they should be always used instead of nodejs-equivalents.
	 */
	export namespace workspace {

		/**
		 * ~~The folder that is open in the editor. `undefined` when no folder
		 * has been opened.~~
		 *
		 * @deprecated Use [`workspaceFolders`](#workspace.workspaceFolders) instead.
		 *
		 * @readonly
		 */
		export let rootPath: string | undefined;

		/**
		 * List of workspace folders or `undefined` when no folder is open.
		 * *Note* that the first entry corresponds to the value of `rootPath`.
		 *
		 * @readonly
		 */
		export let workspaceFolders: WorkspaceFolder[] | undefined;

		/**
		 * An event that is emitted when a workspace folder is added or removed.
		 */
		export const onDidChangeWorkspaceFolders: Event<WorkspaceFoldersChangeEvent>;

		/**
		 * Returns a [workspace folder](#WorkspaceFolder) for the provided resource. When the resource
		 * is a workspace folder itself, its parent workspace folder or `undefined` is returned.
		 *
		 * @param uri An uri.
		 * @return A workspace folder or `undefined`
		 */
		export function getWorkspaceFolder(uri: Uri): WorkspaceFolder | undefined;

		/**
		 * Returns a path that is relative to the workspace folder or folders.
		 *
		 * When there are no [workspace folders](#workspace.workspaceFolders) or when the path
		 * is not contained in them, the input is returned.
		 *
		 * @param pathOrUri A path or uri. When a uri is given its [fsPath](#Uri.fsPath) is used.
		 * @param includeWorkspaceFolder When `true` and when the given path is contained inside a
		 * workspace folder the name of the workspace is prepended. Defaults to `true` when there are
		 * multiple workspace folders and `false` otherwise.
		 * @return A path relative to the root or the input.
		 */
		export function asRelativePath(pathOrUri: string | Uri, includeWorkspaceFolder?: boolean): string;

		/**
		 * Creates a file system watcher.
		 *
		 * A glob pattern that filters the file events must be provided. Optionally, flags to ignore certain
		 * kinds of events can be provided. To stop listening to events the watcher must be disposed.
		 *
		 * *Note* that only files within the current [workspace folders](#workspace.workspaceFolders) can be watched.
		 *
		 * @param globPattern A glob pattern that is applied to the names of created, changed, and deleted files.
		 * @param ignoreCreateEvents Ignore when files have been created.
		 * @param ignoreChangeEvents Ignore when files have been changed.
		 * @param ignoreDeleteEvents Ignore when files have been deleted.
		 * @return A new file system watcher instance.
		 */
		export function createFileSystemWatcher(globPattern: string, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean): FileSystemWatcher;

		/**
		 * Find files in the workspace.
		 *
		 * @sample `findFiles('**∕*.js', '**∕node_modules∕**', 10)`
		 * @param include A glob pattern that defines the files to search for.
		 * @param exclude A glob pattern that defines files and folders to exclude.
		 * @param maxResults An upper-bound for the result.
		 * @param token A token that can be used to signal cancellation to the underlying search engine.
		 * @return A thenable that resolves to an array of resource identifiers.
		 */
		export function findFiles(include: string, exclude?: string, maxResults?: number, token?: CancellationToken): Thenable<Uri[]>;

		/**
		 * Save all dirty files.
		 *
		 * @param includeUntitled Also save files that have been created during this session.
		 * @return A thenable that resolves when the files have been saved.
		 */
		export function saveAll(includeUntitled?: boolean): Thenable<boolean>;

		/**
		 * Make changes to one or many resources as defined by the given
		 * [workspace edit](#WorkspaceEdit).
		 *
		 * When applying a workspace edit, the editor implements an 'all-or-nothing'-strategy,
		 * that means failure to load one document or make changes to one document will cause
		 * the edit to be rejected.
		 *
		 * @param edit A workspace edit.
		 * @return A thenable that resolves when the edit could be applied.
		 */
		export function applyEdit(edit: WorkspaceEdit): Thenable<boolean>;

		/**
		 * All text documents currently known to the system.
		 *
		 * @readonly
		 */
		export let textDocuments: TextDocument[];

		/**
		 * Opens a document. Will return early if this document is already open. Otherwise
		 * the document is loaded and the [didOpen](#workspace.onDidOpenTextDocument)-event fires.
		 *
		 * The document is denoted by an [uri](#Uri). Depending on the [scheme](#Uri.scheme) the
		 * following rules apply:
		 * * `file`-scheme: Open a file on disk, will be rejected if the file does not exist or cannot be loaded.
		 * * `untitled`-scheme: A new file that should be saved on disk, e.g. `untitled:c:\frodo\new.js`. The language
		 * will be derived from the file name.
		 * * For all other schemes the registered text document content [providers](#TextDocumentContentProvider) are consulted.
		 *
		 * *Note* that the lifecycle of the returned document is owned by the editor and not by the extension. That means an
		 * [`onDidClose`](#workspace.onDidCloseTextDocument)-event can occur at any time after opening it.
		 *
		 * @param uri Identifies the resource to open.
		 * @return A promise that resolves to a [document](#TextDocument).
		 */
		export function openTextDocument(uri: Uri): Thenable<TextDocument>;

		/**
		 * A short-hand for `openTextDocument(Uri.file(fileName))`.
		 *
		 * @see [openTextDocument](#openTextDocument)
		 * @param fileName A name of a file on disk.
		 * @return A promise that resolves to a [document](#TextDocument).
		 */
		export function openTextDocument(fileName: string): Thenable<TextDocument>;

		/**
		 * Opens an untitled text document. The editor will prompt the user for a file
		 * path when the document is to be saved. The `options` parameter allows to
		 * specify the *language* and/or the *content* of the document.
		 *
		 * @param options Options to control how the document will be created.
		 * @return A promise that resolves to a [document](#TextDocument).
		 */
		export function openTextDocument(options?: { language?: string; content?: string; }): Thenable<TextDocument>;

		/**
		 * Register a text document content provider.
		 *
		 * Only one provider can be registered per scheme.
		 *
		 * @param scheme The uri-scheme to register for.
		 * @param provider A content provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerTextDocumentContentProvider(scheme: string, provider: TextDocumentContentProvider): Disposable;

		/**
		 * An event that is emitted when a [text document](#TextDocument) is opened.
		 */
		export const onDidOpenTextDocument: Event<TextDocument>;

		/**
		 * An event that is emitted when a [text document](#TextDocument) is disposed.
		 */
		export const onDidCloseTextDocument: Event<TextDocument>;

		/**
		 * An event that is emitted when a [text document](#TextDocument) is changed. This usually happens
		 * when the [contents](#TextDocument.getText) changes but also when other things like the
		 * [dirty](TextDocument#isDirty)-state changes.
		 */
		export const onDidChangeTextDocument: Event<TextDocumentChangeEvent>;

		/**
		 * An event that is emitted when a [text document](#TextDocument) will be saved to disk.
		 *
		 * *Note 1:* Subscribers can delay saving by registering asynchronous work. For the sake of data integrity the editor
		 * might save without firing this event. For instance when shutting down with dirty files.
		 *
		 * *Note 2:* Subscribers are called sequentially and they can [delay](#TextDocumentWillSaveEvent.waitUntil) saving
		 * by registering asynchronous work. Protection against misbehaving listeners is implemented as such:
		 *  * there is an overall time budget that all listeners share and if that is exhausted no further listener is called
		 *  * listeners that take a long time or produce errors frequently will not be called anymore
		 *
		 * The current thresholds are 1.5 seconds as overall time budget and a listener can misbehave 3 times before being ignored.
		 */
		export const onWillSaveTextDocument: Event<TextDocumentWillSaveEvent>;

		/**
		 * An event that is emitted when a [text document](#TextDocument) is saved to disk.
		 */
		export const onDidSaveTextDocument: Event<TextDocument>;

		/**
		 * Get a workspace configuration object.
		 *
		 * When a section-identifier is provided only that part of the configuration
		 * is returned. Dots in the section-identifier are interpreted as child-access,
		 * like `{ myExt: { setting: { doIt: true }}}` and `getConfiguration('myExt.setting').get('doIt') === true`.
		 *
		 * When a resource is provided, configuration scoped to that resource is returned.
		 *
		 * @param section A dot-separated identifier.
		 * @param resource A resource for which the configuration is asked for
		 * @return The full configuration or a subset.
		 */
		export function getConfiguration(section?: string, resource?: Uri): WorkspaceConfiguration;

		/**
		 * An event that is emitted when the [configuration](#WorkspaceConfiguration) changed.
		 */
		export const onDidChangeConfiguration: Event<void>;

		/**
		 * Register a task provider.
		 *
		 * @param type The task kind type this provider is registered for.
		 * @param provider A task provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerTaskProvider(type: string, provider: TaskProvider): Disposable;
	}

	/**
	 * Namespace for participating in language-specific editor [features](https://code.visualstudio.com/docs/editor/editingevolved),
	 * like IntelliSense, code actions, diagnostics etc.
	 *
	 * Many programming languages exist and there is huge variety in syntaxes, semantics, and paradigms. Despite that, features
	 * like automatic word-completion, code navigation, or code checking have become popular across different tools for different
	 * programming languages.
	 *
	 * The editor provides an API that makes it simple to provide such common features by having all UI and actions already in place and
	 * by allowing you to participate by providing data only. For instance, to contribute a hover all you have to do is provide a function
	 * that can be called with a [TextDocument](#TextDocument) and a [Position](#Position) returning hover info. The rest, like tracking the
	 * mouse, positioning the hover, keeping the hover stable etc. is taken care of by the editor.
	 *
	 * ```javascript
	 * languages.registerHoverProvider('javascript', {
	 * 	provideHover(document, position, token) {
	 * 		return new Hover('I am a hover!');
	 * 	}
	 * });
	 * ```
	 *
	 * Registration is done using a [document selector](#DocumentSelector) which is either a language id, like `javascript` or
	 * a more complex [filter](#DocumentFilter) like `{ language: 'typescript', scheme: 'file' }`. Matching a document against such
	 * a selector will result in a [score](#languages.match) that is used to determine if and how a provider shall be used. When
	 * scores are equal the provider that came last wins. For features that allow full arity, like [hover](#languages.registerHoverProvider),
	 * the score is only checked to be `>0`, for other features, like [IntelliSense](#languages.registerCompletionItemProvider) the
	 * score is used for determining the order in which providers are asked to participate.
	 */
	export namespace languages {

		/**
		 * Return the identifiers of all known languages.
		 * @return Promise resolving to an array of identifier strings.
		 */
		export function getLanguages(): Thenable<string[]>;

		/**
		 * Compute the match between a document [selector](#DocumentSelector) and a document. Values
		 * greater than zero mean the selector matches the document.
		 *
		 * A match is computed according to these rules:
		 * 1. When [`DocumentSelector`](#DocumentSelector) is an array, compute the match for each contained `DocumentFilter` or language identifier and take the maximum value.
		 * 2. A string will be desugared to become the `language`-part of a [`DocumentFilter`](#DocumentFilter), so `"fooLang"` is like `{ language: "fooLang" }`.
		 * 3. A [`DocumentFilter`](#DocumentFilter) will be matched against the document by comparing its parts with the document. The following rules apply:
		 *  1. When the `DocumentFilter` is empty (`{}`) the result is `0`
		 *  2. When `scheme`, `language`, or `pattern` are defined but one doesn’t match, the result is `0`
		 *  3. Matching against `*` gives a score of `5`, matching via equality or via a glob-pattern gives a score of `10`
		 *  4. The result is the maximun value of each match
		 *
		 * Samples:
		 * ```js
		 * // default document from disk (file-scheme)
		 * doc.uri; //'file:///my/file.js'
		 * doc.languageId; // 'javascript'
		 * match('javascript', doc); // 10;
		 * match({language: 'javascript'}, doc); // 10;
		 * match({language: 'javascript', scheme: 'file'}, doc); // 10;
		 * match('*', doc); // 5
		 * match('fooLang', doc); // 0
		 * match(['fooLang', '*'], doc); // 5
		 *
		 * // virtual document, e.g. from git-index
		 * doc.uri; // 'git:/my/file.js'
		 * doc.languageId; // 'javascript'
		 * match('javascript', doc); // 10;
		 * match({language: 'javascript', scheme: 'git'}, doc); // 10;
		 * match('*', doc); // 5
		 * ```
		 *
		 * @param selector A document selector.
		 * @param document A text document.
		 * @return A number `>0` when the selector matches and `0` when the selector does not match.
		 */
		export function match(selector: DocumentSelector, document: TextDocument): number;

		/**
		 * Create a diagnostics collection.
		 *
		 * @param name The [name](#DiagnosticCollection.name) of the collection.
		 * @return A new diagnostic collection.
		 */
		export function createDiagnosticCollection(name?: string): DiagnosticCollection;

		/**
		 * Register a completion provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and groups of equal score are sequentially asked for
		 * completion items. The process stops when one or many providers of a group return a
		 * result. A failing provider (rejected promise or exception) will not fail the whole
		 * operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A completion provider.
		 * @param triggerCharacters Trigger completion when the user types one of the characters, like `.` or `:`.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerCompletionItemProvider(selector: DocumentSelector, provider: CompletionItemProvider, ...triggerCharacters: string[]): Disposable;

		/**
		 * Register a code action provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A code action provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerCodeActionsProvider(selector: DocumentSelector, provider: CodeActionProvider): Disposable;

		/**
		 * Register a code lens provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A code lens provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerCodeLensProvider(selector: DocumentSelector, provider: CodeLensProvider): Disposable;

		/**
		 * Register a definition provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A definition provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerDefinitionProvider(selector: DocumentSelector, provider: DefinitionProvider): Disposable;

		/**
		 * Register an implementation provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider An implementation provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerImplementationProvider(selector: DocumentSelector, provider: ImplementationProvider): Disposable;

		/**
		 * Register a type definition provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A type definition provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerTypeDefinitionProvider(selector: DocumentSelector, provider: TypeDefinitionProvider): Disposable;

		/**
		 * Register a hover provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A hover provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerHoverProvider(selector: DocumentSelector, provider: HoverProvider): Disposable;

		/**
		 * Register a document highlight provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and groups sequentially asked for document highlights.
		 * The process stops when a provider returns a `non-falsy` or `non-failure` result.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A document highlight provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerDocumentHighlightProvider(selector: DocumentSelector, provider: DocumentHighlightProvider): Disposable;

		/**
		 * Register a document symbol provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A document symbol provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerDocumentSymbolProvider(selector: DocumentSelector, provider: DocumentSymbolProvider): Disposable;

		/**
		 * Register a workspace symbol provider.
		 *
		 * Multiple providers can be registered. In that case providers are asked in parallel and
		 * the results are merged. A failing provider (rejected promise or exception) will not cause
		 * a failure of the whole operation.
		 *
		 * @param provider A workspace symbol provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerWorkspaceSymbolProvider(provider: WorkspaceSymbolProvider): Disposable;

		/**
		 * Register a reference provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A reference provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerReferenceProvider(selector: DocumentSelector, provider: ReferenceProvider): Disposable;

		/**
		 * Register a reference provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and the best-matching provider is used. Failure
		 * of the selected provider will cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A rename provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerRenameProvider(selector: DocumentSelector, provider: RenameProvider): Disposable;

		/**
		 * Register a formatting provider for a document.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and the best-matching provider is used. Failure
		 * of the selected provider will cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A document formatting edit provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerDocumentFormattingEditProvider(selector: DocumentSelector, provider: DocumentFormattingEditProvider): Disposable;

		/**
		 * Register a formatting provider for a document range.
		 *
		 * *Note:* A document range provider is also a [document formatter](#DocumentFormattingEditProvider)
		 * which means there is no need to [register](registerDocumentFormattingEditProvider) a document
		 * formatter when also registering a range provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and the best-matching provider is used. Failure
		 * of the selected provider will cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A document range formatting edit provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerDocumentRangeFormattingEditProvider(selector: DocumentSelector, provider: DocumentRangeFormattingEditProvider): Disposable;

		/**
		 * Register a formatting provider that works on type. The provider is active when the user enables the setting `editor.formatOnType`.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and the best-matching provider is used. Failure
		 * of the selected provider will cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider An on type formatting edit provider.
		 * @param firstTriggerCharacter A character on which formatting should be triggered, like `}`.
		 * @param moreTriggerCharacter More trigger characters.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerOnTypeFormattingEditProvider(selector: DocumentSelector, provider: OnTypeFormattingEditProvider, firstTriggerCharacter: string, ...moreTriggerCharacter: string[]): Disposable;

		/**
		 * Register a signature help provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are sorted
		 * by their [score](#languages.match) and called sequentially until a provider returns a
		 * valid result.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A signature help provider.
		 * @param triggerCharacters Trigger signature help when the user types one of the characters, like `,` or `(`.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerSignatureHelpProvider(selector: DocumentSelector, provider: SignatureHelpProvider, ...triggerCharacters: string[]): Disposable;

		/**
		 * Register a document link provider.
		 *
		 * Multiple providers can be registered for a language. In that case providers are asked in
		 * parallel and the results are merged. A failing provider (rejected promise or exception) will
		 * not cause a failure of the whole operation.
		 *
		 * @param selector A selector that defines the documents this provider is applicable to.
		 * @param provider A document link provider.
		 * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
		 */
		export function registerDocumentLinkProvider(selector: DocumentSelector, provider: DocumentLinkProvider): Disposable;

		/**
		 * Set a [language configuration](#LanguageConfiguration) for a language.
		 *
		 * @param language A language identifier like `typescript`.
		 * @param configuration Language configuration.
		 * @return A [disposable](#Disposable) that unsets this configuration.
		 */
		export function setLanguageConfiguration(language: string, configuration: LanguageConfiguration): Disposable;
	}

	/**
	 * Represents the input box in the Source Control viewlet.
	 */
	export interface SourceControlInputBox {

		/**
		 * Setter and getter for the contents of the input box.
		 */
		value: string;
	}

	interface QuickDiffProvider {

		/**
		 * Provide a [uri](#Uri) to the original resource of any given resource uri.
		 *
		 * @param uri The uri of the resource open in a text editor.
		 * @param token A cancellation token.
		 * @return A thenable that resolves to uri of the matching original resource.
		 */
		provideOriginalResource?(uri: Uri, token: CancellationToken): ProviderResult<Uri>;
	}

	/**
	 * The theme-aware decorations for a
	 * [source control resource state](#SourceControlResourceState).
	 */
	export interface SourceControlResourceThemableDecorations {

		/**
		 * The icon path for a specific
		 * [source control resource state](#SourceControlResourceState).
		 */
		readonly iconPath?: string | Uri;
	}

	/**
	 * The decorations for a [source control resource state](#SourceControlResourceState).
	 * Can be independently specified for light and dark themes.
	 */
	export interface SourceControlResourceDecorations extends SourceControlResourceThemableDecorations {

		/**
		 * Whether the [source control resource state](#SourceControlResourceState) should
		 * be striked-through in the UI.
		 */
		readonly strikeThrough?: boolean;

		/**
		 * Whether the [source control resource state](#SourceControlResourceState) should
		 * be faded in the UI.
		 */
		readonly faded?: boolean;

		/**
		 * The light theme decorations.
		 */
		readonly light?: SourceControlResourceThemableDecorations;

		/**
		 * The dark theme decorations.
		 */
		readonly dark?: SourceControlResourceThemableDecorations;
	}

	/**
	 * An source control resource state represents the state of an underlying workspace
	 * resource within a certain [source control group](#SourceControlResourceGroup).
	 */
	export interface SourceControlResourceState {

		/**
		 * The [uri](#Uri) of the underlying resource inside the workspace.
		 */
		readonly resourceUri: Uri;

		/**
		 * The [command](#Command) which should be run when the resource
		 * state is open in the Source Control viewlet.
		 */
		readonly command?: Command;

		/**
		 * The [decorations](#SourceControlResourceDecorations) for this source control
		 * resource state.
		 */
		readonly decorations?: SourceControlResourceDecorations;
	}

	/**
	 * A source control resource group is a collection of
	 * [source control resource states](#SourceControlResourceState).
	 */
	export interface SourceControlResourceGroup {

		/**
		 * The id of this source control resource group.
		 */
		readonly id: string;

		/**
		 * The label of this source control resource group.
		 */
		label: string;

		/**
		 * Whether this source control resource group is hidden when it contains
		 * no [source control resource states](#SourceControlResourceState).
		 */
		hideWhenEmpty?: boolean;

		/**
		 * This group's collection of
		 * [source control resource states](#SourceControlResourceState).
		 */
		resourceStates: SourceControlResourceState[];

		/**
		 * Dispose this source control resource group.
		 */
		dispose(): void;
	}

	/**
	 * An source control is able to provide [resource states](#SourceControlResourceState)
	 * to the editor and interact with the editor in several source control related ways.
	 */
	export interface SourceControl {

		/**
		 * The id of this source control.
		 */
		readonly id: string;

		/**
		 * The human-readable label of this source control.
		 */
		readonly label: string;

		/**
		 * The UI-visible count of [resource states](#SourceControlResourceState) of
		 * this source control.
		 *
		 * Equals to the total number of [resource state](#SourceControlResourceState)
		 * of this source control, if undefined.
		 */
		count?: number;

		/**
		 * An optional [quick diff provider](#QuickDiffProvider).
		 */
		quickDiffProvider?: QuickDiffProvider;

		/**
		 * Optional commit template string.
		 *
		 * The Source Control viewlet will populate the Source Control
		 * input with this value when appropriate.
		 */
		commitTemplate?: string;

		/**
		 * Optional accept input command.
		 *
		 * This command will be invoked when the user accepts the value
		 * in the Source Control input.
		 */
		acceptInputCommand?: Command;

		/**
		 * Optional status bar commands.
		 *
		 * These commands will be displayed in the editor's status bar.
		 */
		statusBarCommands?: Command[];

		/**
		 * Create a new [resource group](#SourceControlResourceGroup).
		 */
		createResourceGroup(id: string, label: string): SourceControlResourceGroup;

		/**
		 * Dispose this source control.
		 */
		dispose(): void;
	}

	export namespace scm {

		/**
		 * The [input box](#SourceControlInputBox) in the Source Control viewlet.
		 */
		export const inputBox: SourceControlInputBox;

		/**
		 * Creates a new [source control](#SourceControl) instance.
		 *
		 * @param id A unique `id` for the source control. Something short, eg: `git`.
		 * @param label A human-readable string for the source control. Eg: `Git`.
		 * @return An instance of [source control](#SourceControl).
		 */
		export function createSourceControl(id: string, label: string): SourceControl;
	}

	/**
	 * Configuration for a debug session.
	 */
	export interface DebugConfiguration {
		/**
		 * The type for the debug session.
		 */
		type: string;

		/**
		 * An optional name for the debug session.
		 */
		name?: string;

		/**
		 * The request type of the debug session.
		 */
		request: string;

		/**
		 * Additional debug type specific properties.
		 */
		[key: string]: any;
	}

	/**
	 * A debug session.
	 */
	export interface DebugSession {

		/**
		 * The unique ID of this debug session.
		 */
		readonly id: string;

		/**
		 * The debug session's type from the [debug configuration](#DebugConfiguration).
		 */
		readonly type: string;

		/**
		 * The debug session's name from the [debug configuration](#DebugConfiguration).
		 */
		readonly name: string;

		/**
		 * Send a custom request to the debug adapter.
		 */
		customRequest(command: string, args?: any): Thenable<any>;
	}

	/**
	 * A custom Debug Adapter Protocol event received from a [debug session](#DebugSession).
	 */
	export interface DebugSessionCustomEvent {
		/**
		 * The [debug session](#DebugSession) for which the custom event was received.
		 */
		session: DebugSession;

		/**
		 * Type of event.
		 */
		event: string;

		/**
		 * Event specific information.
		 */
		body?: any;
	}

	/**
	 * Namespace for dealing with debug sessions.
	 */
	export namespace debug {

		/**
		 * Start debugging by using either a named launch or named compound configuration,
		 * or by directly passing a [DebugConfiguration](#DebugConfiguration).
		 * The named configurations are looked up in '.vscode/launch.json' found in the given folder.
		 * Before debugging starts, all unsaved files are saved and the launch configurations are brought up-to-date.
		 * Folder specific variables used in the configuration (e.g. '${workspaceRoot}') are resolved against the given folder.
		 * @param folder The [workspace folder](#WorkspaceFolder) for looking up named configurations and resolving variables or `undefined` for a non-folder setup.
		 * @param nameOrConfiguration Either the name of a debug or compound configuration or a [DebugConfiguration](#DebugConfiguration) object.
		 * @return A thenable that resolves when debugging could be successfully started.
		 */
		export function startDebugging(folder: WorkspaceFolder | undefined, nameOrConfiguration: string | DebugConfiguration): Thenable<boolean>;

		/**
		 * The currently active [debug session](#DebugSession) or `undefined`. The active debug session is the one
		 * represented by the debug action floating window or the one currently shown in the drop down menu of the debug action floating window.
		 * If no debug session is active, the value is `undefined`.
		 */
		export let activeDebugSession: DebugSession | undefined;

		/**
		 * An [event](#Event) which fires when the [active debug session](#debug.activeDebugSession)
		 * has changed. *Note* that the event also fires when the active debug session changes
		 * to `undefined`.
		 */
		export const onDidChangeActiveDebugSession: Event<DebugSession | undefined>;

		/**
		 * An [event](#Event) which fires when a new [debug session](#DebugSession) has been started.
		 */
		export const onDidStartDebugSession: Event<DebugSession>;

		/**
		 * An [event](#Event) which fires when a custom DAP event is received from the [debug session](#DebugSession).
		 */
		export const onDidReceiveDebugSessionCustomEvent: Event<DebugSessionCustomEvent>;

		/**
		 * An [event](#Event) which fires when a [debug session](#DebugSession) has terminated.
		 */
		export const onDidTerminateDebugSession: Event<DebugSession>;
	}

	/**
	 * インストールされた拡張機能を扱うための名前空間
	 *
	 * 拡張機能は、それらを反映することができる [extension](#Extension) インターフェイスに表示します。

	 * 拡張機能の作成者は API の public surface を `activate`-call (アクティ化呼び出し) から返すことによって他の拡張機能に API を提供することができます。(?)

	 *
	 * ```javascript
	 * export function activate(context: vscode.ExtensionContext) {
	 * 	let api = {
	 * 		sum(a, b) {
	 * 			return a + b;
	 * 		},
	 * 		mul(a, b) {
	 * 			return a * b;
	 * 		}
	 * 	};
	 * 	// 'export' public api-surface
	 * 	return api;
	 * }
	 * ```
	 * 別の拡張機能の API に依存するときは、`extensionDependency` エントリを `package.json` に追加し、 [getExtension](#extensions.getExtension)-関数と [getExtension](#extensions.getExtension)-関数を以下のように使用します:


	 *
	 * ```javascript
	 * let mathExt = extensions.getExtension('genius.math');
	 * let importedApi = mathExt.exports;
	 *
	 * console.log(importedApi.mul(42, 1));
	 * ```
	 */
	export namespace extensions {

		/**
		 * 拡張機能を `publisher.name` の形で完全な識別子を取得します
		 *
		 * @param extensionId An extension identifier.
		 * @return 拡張機能または `undefined`
		 */
		export function getExtension(extensionId: string): Extension<any> | undefined;

		/**
		 * 拡張機能を `publisher.name` の形で識別子を取得します
		 *
		 * @param extensionId An extension identifier.
		 * @return 拡張機能または `undefined`
		 */
		export function getExtension<T>(extensionId: string): Extension<T> | undefined;

		/**
		 * 現在システムに登録されているすべての拡張機能
		 */
		export let all: Extension<any>[];
	}
}

/**
 * Thenable は ES6 promises, Q, jquery.Deferred, WinJS.Promise, その他 の間で共通です。
 *
 * この API は 特定の promise の実装に移行せずに、既存のコードを再利用することができる promise libary が使用されることについては想定しません。
 *

 * それでも、このエディターで利用可能な native promises の使用を推奨します。
 */
interface Thenable<T> {
	/**
	* Promise の解決やリジェクトのコールバックをアタッチします。
	* @param onfulfilled The callback to execute when the Promise is resolved.
	* @param onrejected The callback to execute when the Promise is rejected.
	* @returns A Promise for the completion of which ever callback is executed.
	*/
	then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;
	then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
}
