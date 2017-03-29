---
title: 独自のスニペットを作成
MetaDescription: It is easy to add code snippets to Visual Studio Code both for your own use or to share with others on the public Extension Marketplace. TextMate .tmSnippets files are supported.
commitid: 97b7ae9996f77dd4aa822fe8908c50863c4410d9
---

コードスニペットとは、ループや条件文など繰り返し使うコードパターンを簡単に生成するテンプレートのことです。

スニペットはIntelliSense(`kb(editor.action.triggerSuggest)`)に他の提案や専用のスニペット選択(**Insert Snippet**)と組み合わせて表示します。タブ補完サポートもしています。`"editor.tabCompletion": true`を有効にして*snippet prefix*を入力したら`kb(insertSnippet)`を押してスニペットを挿入可能です。

スニペット構文をサポートしていない'regular expression replacements', 'interpolated shell code'、'transformations'を除いて、[TextMate snippet syntax](https://manual.macromates.com/en/snippets)に従います。

<video id="snippets-showcase" src="https://az754404.vo.msecnd.net/public/snippets_showcase.mp4" placeholder="/images/userdefinedsnippets_snippets_placeholder.png" autoplay loop controls muted>
    Sorry you're browser doesn't support HTML 5 video.
</video>

## Marketplaceからスニペットを追加

VS Code [Marketplace](https://marketplace.visualstudio.com/vscode) には多くの[拡張機能](/docs/userguide/extension-gallery.md)を用意しています。使いたいものをインストールして再起動すれば、新しいスニペットが利用可能になります。(拡張機能インストールの詳細は[ここ](/docs/userguide/extension-gallery.md#browse-and-install-extensions) for more instructions on installing an extension)を参照してください)

## 独自のスニペットを作成

特定の言語に独自のスニペットを定義することができます。**ファイル**(**Code**) > **基本設定** > **ユーザースニペット**を開いて、スニペットを定義可能です。

スニペットはJSON形式で定義し、ユーザーごとの`(languageId).json`に保存します。たとえばMarkdownスニペットは`markdown.json`に登録します。

次の例はJavaScriptの`For Loop`スニペットです。

```json
    "For Loop": {
        "prefix": "for",
        "body": [
            "for (var ${1:index} = 0; ${1:index} < ${2:array}.length; ${1:index}++) {",
            "\tvar ${3:element} = ${2:array}[${1:index}];",
            "\t$0",
            "}"
        ],
        "description": "For Loop"
    },
```

上記の例ですと:

* `For Loop` : スニペットの名前。
* `prefix` : IntelliSenseとタブ補完の展開トリガーの値を定義します。この場合 `for` を入力すれば補完表示します。
* `body` : 展開されるコードやテキストを定義します。個々の要素が別々の行として挿入する単一の文字列か文字列の配列です。
* `description` : IntelliSenseで使用される説明。

になります。

上記の例で、`${1:index}`、 `${2:array}`、`${3:element}`の3つのプレースホルダを使用しました。これらは番号順にトラバース(横断)し、数字とコロンの後の文字列を挿入します。

なお新しくスニペットを追加したとき、再起動する必要はありません。

## スニペット シンタックス

`body`は特殊な構文を使ってカーソルと挿入テキストを制御できます。サポートする機能と構文を次に示します:

### タブストップ

タブストップを使用すると、カーソルをスニペットの指定場所に移動させることができます。カーソル位置を`$1`、`$2`のように指定します。番号順にカーソルを移動しますが`$0`は最終的なカーソル位置を示します。同じ番号のタブストップは、入力文字をリンクし同期します。

### プレースホルダ

プレースホルダとは`${1:foo}`のような値をもつタブストップです。 まずプレースホルダテキストを入力して、容易に内容を変更できるように選択状態になります。プレースホルダは`${1:another ${2:placeholder}}`のように入れ子にすることができます。

### 変数

`$name`や`${name:default}`を使うことで、変数の値を挿入することができます。変数を設定していないときは、その**default**または空文字列を挿入します。変数が不明な場合(名前が定義されていない場合)、変数名を挿入してプレースホルダに変換します。次の変数を使用できます。
(編集メモ: defaultは何を指しているのかがわからない既定値? それとも上のdefault?)

* `TM_SELECTED_TEXT` : 現在の選択テキストまたは空文字列
* `TM_CURRENT_LINE` : 現在行の内容
* `TM_CURRENT_WORD` : カーソル下の内容または空文字列
* `TM_LINE_INDEX` : 添字が0から始まるインデックス方式の行番号(0オリジン)
* `TM_LINE_NUMBER` : 添字が1から始まるインデックス方式の行番号(1オリジン)
* `TM_FILENAME` : 現在のドキュメント名
* `TM_DIRECTORY` : 現在のドキュメントのディレクトリ
* `TM_FILEPATH` : 現在のドキュメントへの完全なファイルパス


### 文法

以下はスニペットのEBNFです。`\`(backslash)を使用することで`$`、`}`、`\`をエスケープできます。

```
any         ::= tabstop | placeholder | variable | text
tabstop     ::= '$' int | '${' int '}'
placeholder ::= '${' int ':' any '}'
variable    ::= '$' var | '${' var }' | '${' var ':' any '}'
var         ::= [_a-zA-Z] [_a-zA-Z0-9]*
int         ::= [0-9]+
text        ::= .*
```

## TextMate Snippetsを使用する

またTextMateスニペット(.tmSnippets)を使用することができます。詳細についてExtension Authoringセクションの[Using TextMate Snippets](/docs/extensions/themes-snippets-colorizers.md#using-textmate-snippets)を参照してください。

## 次のステップ

* [Command Line](/docs/userguide/command-line.md) - VS Code has a rich command line interface to open or diff files and install extensions.
* [Extending Visual Studio Code](/docs/extensions/overview.md) - Learn about other ways to extend VS Code.
* [Themes, Snippets, and Colorizers](/docs/extensions/themes-snippets-colorizers.md) - You can package themes, snippets and language colorizers for use in VS Code.

## よくある質問

**Q: .tmSnippetファイルから既存のTextMateスニペットを使用したい場合はどうすればいいですか?**

**A:** VS Codeで使用するTextMateスニペットファイルにパッケージ化する必要があります。詳細をExtension Authoringドキュメントの[Using TextMate Snippets](/docs/extensions/themes-snippets-colorizers.md#using-textmate-snippets)で確認してください。
