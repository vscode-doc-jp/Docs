---
title: 基本的な編集
MetaDescription: Learn about the basic editing features of Visual Studio Code. Search, multiple selection, code formatting.
commitid: 42757495f4d9a4a7a959e45a7eb459c388b04aaf
---
Visual Studio Codeとは何よりもまずエディターであり、生産的なソースコード編集に必要な機能を含んでいます。このトピックではエディターの基本を紹介します。コードの編集に役立ててください。

## キーボードショートカット <a id="keyboard-shortcuts"></a>

高い生産性のために、コードを書いている途中でもキーボード上に手を置き続けられることは重要なことです。VS Codeにはデフォルトのキーボードショートカットが豊富に用意されているのはもちろん、それをカスタマイズすることもできます。

* [Keyboard Shortcuts Reference](/docs/getstarted/keybindings.md#keyboard-shortcuts-reference) - Reference Sheetをダウンロードして、よく使用される一般的なキーバインドショートカットを確認します。
* [Install a Keymap extension](/docs/getstarted/keybindings.md#keymap-extensions) - キーマップの拡張機能をインストールして、使い慣れたエディター(Sublime Text、Atom、Vimなど)のキーボードショートカットVS Codeで使用します。
* [Customize Keyboard Shortcuts](/docs/getstarted/keybindings.md#customizing-shortcuts) - 好みに合わせてキーボードショートカットショートカットを変更します。

## 複数の選択範囲 (マルチカーソル) <a id="multiple-selections-multicursor"></a>

VS Codeは高度な連立の編集ができるように、マルチカーソルをサポートしています。`kbstyle(Alt+Click)`を使用して2個目のカーソル(薄く表示)を追加することができます。各カーソルは、それがおかれているコンテキストに基づいて独立的に動作します。追加のカーソルを追加するのによく使う方法は、`kb(editor.action.insertCursorBelow)`(下に挿入)や`kb(editor.action.insertCursorAbove)`(上に挿入)です。

> **Note:** ビデオカードのドライバー(例: NVIDIA)がこれら既定のショートカットを上書きすることがあります。

![Multi-cursor](images/editingevolved/multicursor.gif)

`kb(editor.action.addSelectionToNextFindMatch)`はカーソルの単語または次の出現箇所を選択します。

![Multi-cursor-next-word](images/editingevolved/multicursor-word.gif)

> **Tip:** また、追加のカーソルを`kb(editor.action.selectHighlights)`を使用することでも追加できます。これは現在選択しているテキストの出現個所のそれぞれに選択範囲を追加します。

### 選択範囲の縮小/拡大 <a id="column-box-selection"></a>

現在の選択範囲をすばやく縮小または拡大できます。`kb(editor.action.smartSelect.shrink)`と`kb(editor.action.smartSelect.grow)`でこれを実行できます。

次に`kb(editor.action.smartSelect.grow)`を使用して選択範囲を拡大する例を示します:

![Expand selection](images/editingevolved/expandselection.gif)

## 列 (短形) の選択<a id="column-box-selection"></a>

行選択をするには`kbstyle(Shift)`と`kbstyle(Alt)`を押しながらドラッグします:

![Column text selection](images/editingevolved/column-select.gif)

MacとWindowsには行選択のための既定のキーバインドがありますが、Linuxにはありません。

Key|Command|Command id
---|-------|----------
`kb(cursorColumnSelectDown)`|下に短形選択|`cursorColumnSelectDown`
`kb(cursorColumnSelectUp)`|上に短形選択|`cursorColumnSelectUp`
`kb(cursorColumnSelectLeft)`|左に短形選択|`cursorColumnSelectLeft`
`kb(cursorColumnSelectRight)`|右に短形選択|`cursorColumnSelectRight`
`kb(cursorColumnSelectPageDown)`|ページ ダウン 短形選択 |`cursorColumnSelectPageDown`
`kb(cursorColumnSelectPageUp)`|ページ アップ 短形選択|`cursorColumnSelectPageUp`

必要に応じて、`keybindings.json`を[編集](/docs/getstarted/keybindings.md)してより親しみやすいものに設定することができます。

## 保存/自動保存 <a id="save-auto-save"></a>

既定では、VS Codeはディスクへ変更書き込むに操作(`kb(workbench.action.files.save)`)が必要です。

ですが問題ありません。`Auto Save`を有効にするのはとても簡単です。これは設定した遅延タイミングやエディターからフォーカスを離したときに変更を保存します。このオプションを有効化するとファイルを保存するのに操作が必要ありません。`Auto Save`を有効にする最も簡単な方法は、**ファイル**>**自動保存**で切り替えてオンまたはオフにすることです。

自動保存をより制御するには、ユーザーかワークスペース[設定](/docs/getstarted/settings.md)を開いて次の関連する設定を見つけてください:

* `files.autoSave`: 次の値をとります。
  * `off` - 自動保存を無効にします。
  * `afterDelay` - 設定した遅延でファイルを保存します。
  * `onFocusChange` -フォーカスがダーティーファイルのエディターから移動したときにファイルを保存します。
  * `onWindowChange` - フォーカスがVS Codeから移動したときにファイルを保存します。
* `files.autoSaveDelay`: `files.autoSave`が`afterDelay`に設定されているときにミリ秒で遅延を構成します。

## Hot Exit <a id="hot-exit"></a>

既定でVS Codeは、編集を終了するときに保存していない変更を記憶します。Hot Exitは、アプリケーションが**ファイル**>**終了**(**Code**>**Quit**)によって閉じたときか、最後のウィンドウが閉じられたときに実行されます。

`files.hotExit`設定に次の値を設定してHot Exitを構成できます:

* `"off"`: Hot Exitを無効にします。
* `"onExit"`: アプリケーションを閉じた(Windows/Linux上で最後のウィンドウを閉じた)とき、または`workbench.action.quit`コマンドを(**コマンドパレット**、ショートカット、メニューから)実行したときにHot Exitを実行します。バックアップしてあるすべてのウィンドウは、次回の起動時に復元されます。
* `"onExit"`: アプリケーションを閉じた(Windows/Linux上で最後のウィンドウを閉じた)とき、または`workbench.action.quit`コマンドを(**コマンドパレット**、ショートカット、メニューから)実行したときにHot Exitを実行します。また最後のウィンドウであるかどうかにかかわらず、フォルダーを開いている任意のウィンドウを閉じたときもこれを実行します。フォルダーを開いていないすべてのウィンドウは、次回の再起動時に復元されます。閉じるまえのフォルダーのウィンドウを復元するには`window.reopenFolders`を`all`に設定します。

## ファイル間の検索 <a id="search-across-files"></a>

VS Codeでは、現在開いているフォルダー内すべてのファイルを素早く検索することができます。`kb(workbench.view.search)`を押して、検索文字を入力します。検索結果は、検索文字を含むファイルごとにグループ分けされ、各ファイルのヒット数とその場所を表示します。ファイル内すべてのヒット項目をプレビューするには、ファイルを展開してください。次にヒット項目の1つをシングルクリックして、エディターでそれを表示します。

![A simple text search across files](images/codebasics/search.png)

>**Tip:** 検索窓では正規表現による検索をサポートしています。

`kb(workbench.action.search.toggleQueryDetails)`を入力することで、高度な検索オプションを構成できます。これにより、検索を構成する追加のフィードを表示します。

![Advanced search options](images/codebasics/searchadvanced.png)

検索ボックスの下にある2つの入力ボックスで、ファイルを含めるか除外するるかを指定できます。globパターンの構文を有効にするには、右のトグルをクリックしてください:

* `*` はパスセグメントで1個以上の文字と一致します
* `?* `*` はパスセグメントで1個の文字と一致します
* `**` はnoneを含む任意の数のパスセグメントに一致します
* `{}` は条件をグループ化します (例:`{**/*.html,**/*.txt}` すべてのHTMLとテキストファイルに一致します)
* `[]` は一致する文字の範囲を宣言します (例: `example.[0-9]` は `example.0`, `example.1`, … に一致します)

既定でVS Codeはいくつかのフォルダーを除外して、興味のない検索結果の数を減らします(例: `node_modules`)。これらのルールを変更するには[設定](/docs/getstarted/settings.md)を開いて、`files.exclude`と`search.exclude`セクションを変更します。

>**Tip:** エクスプローラーからフォルダーを右クリックして、**フォルダー内を検索**を選択するとフォルダー内のみを検索します。

また、ファイル間で検索と置換を行うこともできます。検索ウィジェットを展開して、置換テキストボックスを表示します。

![search and replace](images/codebasics/global-search-replace.png)

置換テキストボックスにテキストを入力するとき、保留中の変更の差分を表示します。置換テキストボックスからファイル間すべてを置き換えたり、1つのファイル内をすべて置換したり、1つの変更を置き換えたりすることができます。

![search and replace diff view](images/codebasics/search-replace-example.png)

>**Tip:** `kb(search.history.showNext)`と`kb(search.history.showPrevious)` を使用して検索文字の履歴を移動することで、素早く以前の検索文字を再利用できます。

## IntelliSense <a id="intellisense"></a>

JavaScript、JSON、HTML、CSS、Less、Sass、C#、TypeScriptのとき真のIntelliSense体験を提供します。これらRich [Languages](/docs/languages/overview.md)でなくとも、私たちは常に単語による補完を提供しています。もし言語サービスが候補を提案できる状態にあれば、入力時にIntelliSenseは候補をポップアップ表示します。これを`kb(editor.action.triggerSuggest)`でいつでも手動で起動することができます。既定で`kbstyle(Tab)`や`kbstyle(Enter)`はキーボードのトリガーをうけつけますが、これらのキーバインドを[カスタマイズ](/docs/getstarted/keybindings.md)することもできます。

> **Tip:** 提案に対するフィルタはCamelCaseサポートしています。メソッド名に大文字を入力するだけで、項目を限定することができます。たとえば"createApplication"を表示するときは"cra"ですぐに表示可能です。

> **Tip:** IntelliSenseの提案は`editor.quickSuggestions`と`editor.suggestOnTriggerCharacters` [設定](/docs/getstarted/settings.md)を通して構成できます。

JavaScriptとTypeScriptの開発者は、[npmjs](https://www.npmjs.com)の型定義(typings)ファイルリポジトリーの利点を、一般的なJavaScriptライブラリー(Node.js、React、Angular)に対するIntelliSenseを手に入れることで得ることができます。[JavaScript](/docs/languages/javascript.md#intellisense)トピックと[Node.js](/docs/nodejs/nodejs-tutorial.md)トライアルで、型定義ファイルを使用する方法について確認できます。

詳細は[IntelliSenseドキュメント](/docs/userguide/intellisense.md)を参照してください。

## フォーマット <a id="formatting"></a>

VS Codeではソースコードのフォーマットに対する十分なサポートを用意しています。エディターには2つのはっきりしたフォーマット操作があります:

* **Format Document** (`kb(editor.action.formatDocument)`) - アクティなファイル全体をフォーマットします。
* **Format Selection** (`kb(editor.action.formatSelection)`) - 選択したテキストをフォーマットします。

これらを**コマンドパレット** (`kb(workbench.action.showCommands)`)か、エディターのコンテキストメニューから呼びだすことができます。

VS CodeにはJavaScript、TypeScript、JSON、HTML用の既定のフォーマッターがあります。各言語にはユーザーやワークスペース[設定](/docs/getstarted/settings.md)で好みに応じたフォーマットオプションがあります(例: `html.format.indentInnerHtml`)。また、同じ言語のフォーマットを提供する別の拡張機能がインストールされている場合は、既定のフォーマットを無効にすることもできます。

```json
"html.format.enable": false
```

手動でコードのフォーマットを呼びだすのと一緒に、入力、保存、貼り付けなどのユーザー操作によってフォーマットをトリガーすることもできます。これらは既定でオフになっていますが、次の[設定](/docs/getstarted/settings.md)を通して有効にすることができます:

* `editor.formatOnType` - 入力後に行をフォーマットします。
* `editor.formatOnSave` - 保存時にファイルをフォーマットします。
* `editor.formatOnPaste` - 貼り付けた内容をフォーマットします。

>Note: すべてのフォーマッターが貼り付け時のフォーマットをサポートしているわけではありません。これにはフォーマッターが選択範囲やテキストの範囲のフォーマットをサポートしている必要があります。

既定のフォーマッターに加えMarketplace上に、他の言語やフォーマットツールをサポートする拡張機能を見つけることができます。`Formatters`カテゴリーがありますから、簡単に検索して[formatting extensions](https://marketplace.visualstudio.com/search?target=VSCode&category=Formatters&sortBy=Downloads)を見つけることができます。**拡張機能**ビューの検索ボックスで、'formatters'や'category:formatters'を入力してVS Code内でフィルター済みの拡張機能リストを確認できます。

## 折りたたみ <a id="folding"></a>

ガター上の行番号と行の開始の間にある折りたたみアイコンを使用して、ソースコードの領域を折りたたむことができます。マウスをガター上に動かして、領域の展開と折りたたみます。折りたたみの領域は、行のインデントに基づいて評価されます。折りたたみ領域は、1つ以上の次の行よりインデントが小さい場合に開始して、インデントが同じかこれより小さいときに終了します。

次の操作でも使用できます:

 * Fold (`kb(editor.fold)`) カーソルの位置で最も内側の非折りたたみ領域を折りたたみます
 * Unfold (`kb(editor.unfold)`) カーソルの位置で折りたたみ領域を展開します
 * Fold All (`kb(editor.foldAll)`) エディター内のすべての領域を折りたたみます
 * Unfold All (`kb(editor.unfoldAll)`) エディター内のすべての領域を展開します
 * Fold Level X (`kb(editor.foldLevel2)` for level 2) カーソルの位置の領域を除いて、レベルXですべての領域を折りたたみます

![Folding](images/codebasics/folding.png)

## 文字エンコードのサポート <a id="file-encoding-support"></a>

**ユーザー設定**または**ワークスペース設定**の`files.encoding`設定を使用して、グローバルまたはワークスペースごとにファイルエンコーディングを設定します。

![files.encoding setting](images/codebasics/filesencodingsetting.png)

ステータスバーでファイルのエンコードを表示します。

![Encoding in status bar](images/codebasics/fileencoding.png)

ステータスバーのエンコードボタンをクリックすると、アクティブなファイルを別のエンコードで開きなおすか保存します。

![Reopen or save with a different encoding](images/codebasics/encodingclicked.png)

次にエンコードを選択します。

![Select an encoding](images/codebasics/encodingselection.png)

## 次のステップ

VS Codeの多くの内ユーザインターフェイスの基礎を確認しました。次を見てください:

* [Intro Video - Setup and Basics](/docs/introvideos/basics.md) - Watch a tutorial on the basics of VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through user and workspace settings.
* [Code Navigation](/docs/userguide/editingevolved.md) - Peek and Goto Definition, and more
* [Integrated Terminal](/docs/userguide/integrated-terminal.md) - Learn about the integrated terminal for quickly performing command line tasks from within VS Code.
* [IntelliSense](/docs/userguide/intellisense.md) - VS Code brings smart code completions.
* [Debugging](/docs/userguide/debugging.md) - This is where VS Code really shines

## よくある質問

**Q: グローバルに検索して置換することは可能ですか？**

**A:** はい可能です。検索ビューのテキストボックスを展開して置換テキストのフィールドを表示してください。ワークスペース内のすべてのファイル間を検索して置き換えることができます。VS Codeのフォルダーを開いていなかった場合は、現在開いているファイルに対してのみに機能することに注意してください。

![global search and replace](images/codebasics/global-search-replace.png)

**Q: 文字の折り返しを有効にするにはどうすればいいですか？**

**A:** `editor.wordWrap` [設定](/docs/getstarted/settings.md)を通して文字の折り返しを制御できます。既定で`editor.wordwrap`は`off`ですが、`on`に設定するとテキストはエディターのビューポート幅で折り返します。

```json
    "editor.wordwrap": "on"
```

`kb(editor.action.toggleWordWrap)`を使用して、VS Codeセクションの文字の折り返しを切り替えることができます。VS Codeを再起動すると、永続化した`editor.wordwrap`値が取得されます。

`editor.rulers`設定を利用して、垂直カラムのルーラーをエディターに追加することもできます。

**Q: 開いているエディターのセクションにもっと多くのファイルを表示するにはどうすればいいですか？**

**A:** [設定](/docs/getstarted/settings.md)を通して**開いているエディター**の外見を構成できます。たとえば、マウスホバーせずに表示するファイルの最大数を`explorer.openEditors.visible`設定を介して設定したり、**開いているエディター**セクションの高さを動的に変えるかどうかを`explorer.openEditors.dynamicHeight`を介して設定したりできます。
