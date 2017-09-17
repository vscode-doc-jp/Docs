---
title: Emmet
MetaDescription: Using Emmet abbreviations inside VS Code.
commitid: 4c08b57f75d6cfe04554c24a44a1267a55e7311c
---

> 編集メモ: Emmet の公式な日本語訳がなく VS Code 内でも独自の翻訳がされていることがよくあります。このページでもそういった翻訳があるので注意してください。


Visual Studio Code は [Emmet abbreviations and snippets](https://docs.emmet.io/cheat-sheet/) の拡張を含む [Emmet Actions](https://docs.emmet.io/actions/) のほとんどをサポートしています。

July 2017 (v1.15) のリリースでは Emmet らしい提案/自動補完リスト、マルチカーソル対応を含む Emmet 2.0 を導入しました。[Emmet 2.0 blog post](https://code.visualstudio.com/blogs/2017/08/07/emmet-2.0) で大幅な改善の理由とその方法について詳しく確認できます。

## Emmet 略語とスニペットの展開 <a id="how-to-expand-emmet-abbreviations-and-snippets"></a>

Emmet 略語とスニペットの展開は `html`, `haml`, `jade`, `slim`, `jsx`, `xml`, `xsl`, `css`, `scss`, `sass`, `less`, `stylus` で有効になっています。`handlebars` や `php` のような上記の言語から継承する言語も同様です。

Emmet 略語の入力をはじめるとその略語が提案リストに表示されます。提案のドキュメントを開いているときは、入力時に展開後のプレビューを表示します。スタイルシート ファイルの場合には、展開後の略語を他の CSS 提案と一緒に提案リストに表示します。

![Emmet in suggestion/auto-completion list](images/emmet/emmet.gif)

### quickSuggestions が無効なときの Emmet <a id="emmet-when-quicksuggestions-are-disabled"></a>

`editor.quickSuggestions` [設定](/docs/getstarted/settings.md) を無効にすると入力時に提案は表示されません。この場合でも `kb(editor.action.triggerSuggest)` を押して手動で提案をトリガーしプレビューを見ることができます。

### 提案での Emmet を無効にする <a id="disable-emmet-in-suggestions"></a>

提案で Emmet 略語を完全に表示しないようにするには `emmet.showExpandedAbbreviation` を `never` に設定します。このとき略語の展開には **Emmet: Expand Abbreviation** を使用します。任意のキーボード ショートカットにコマンド id `editor.emmet.action.expandAbbreviation` をバインドすることも可能です。

```json
{
    "emmet.showExpandedAbbreviation": "never"
}
```

### Emmet の展開に Tab を使用する <a id="using-tab-for-emmet-expansions"></a>

Emmet 略語の展開に `kbstyle(Tab)` キーを使用したいなら `emmet.triggerExpansionOnTab` 設定を `true` に設定します。この設定では Emmet 略語でないテキストのときには `kbstyle(Tab)` キーをインデントに使用します。

```json
{
    "emmet.triggerExpansionOnTab": true
}
```

### Emmet 提案の並び替え <a id="emmet-suggestion-ordering"></a>

Emmet 提案が提案リストの一番上で常に表示されるとは限りません。これは  `editor.snippetSuggestions` を `top` に設定しているかスタイルシート ファイルで他の CSS 提案と一緒に並び替えるからです。Emmet 提案を常に一番上で表示するには `emmet.showSuggestionsAsSnippets` を `top` にするか `editor.snippetSuggestions` を `top` にします。

```json
{
    "emmet.showSuggestionsAsSnippets": true,
    "editor.snippetSuggestions": "top"
}
```

## 他のファイルタイプで Emmet 略語 <a id="emmet-abbreviations-in-other-file-types"></a>

既定では利用できないファイル タイプで Emmet 略語展開を有効にするには `emmet.includeLanguages` 設定を使用します。指定には language id を使用してください。

例:

```json
"emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "plaintext": "jade"
}
```

Emmet はこれらの新しい言語を認知していないので HTML/CSS コンテキスト以外で Emmet の提案が表示されるかもしれません。これに対応するには `emmet.showExpandedAbbreviation` を  `inMarkupAndStylesheetFilesOnly` に設定します。

> Note: いぜんに `emmet.syntaxProfiles` を使用して新しいファイル タイプを指定したことがある場合、VS Code 1.15 以降では代わりに `emmet.includeLanguages` 設定を使用してください。`emmet.syntaxProfiles` は [customizing the final output](https://docs.emmet.io/customization/syntax-profiles) のみを対象としています。

## カスタム Emmet スニペット <a id="using-custom-emmet-snippets"></a>

カスタム Emmet スニペットは `snippets.json` json ファイルで定義する必要があります。`emmet.extensionsPath` 設定にはこのファイルを含むディレクトリーへのパスが必要です。

次はこの `snippets.json` ファイルの例です。

```json
{
    "html": {
        "snippets": {
            "ull": "ul>li[id=${1} class=${2}]*2{ Will work with html, jade, haml and slim }",
            "oll": "<ol><li id=${1} class=${2}> Will only work in html </ol>",
            "ran": "{ Wrap plain text in curly braces }"
        }
    },
    "css": {
        "snippets": {
            "cb": "color: black",
            "bsd": "border: 1px solid ${1:red}",
            "ls": "list-style: ${1}"
        }
    }
}
```

`snippets.json` ファイルによる Emmet 2.0 のカスタム スニペットの作成はいくつかの点でいままでの方法とことなります。

Topic | Old Emmet | Emmet 2.0
------ | -------- | ---------
Snippets vs Abbreviations | `snippets` と `abbreviations` の 2 つのプロパティ両方をサポートします 。| 2 つはスニペットと呼ばれる単一のプロパティに統合されています。既定の [html snippets](https://github.com/emmetio/snippets/blob/master/html.json) と [css snippets](https://github.com/emmetio/snippets/blob/master/css.json) を参照してください。
CSS snippet names | `:` を含むことができます。| スニペットの定義に `:` を使用できません。Emmet が指定された略語からスニペットをあいまい一致で選択するときに、プロパティ名と値を区切るために使用されます。
CSS snippet values | 最後に `;` を使用できます。 | 最後に `;` を使用できません。Emmet は ファイル タイプ (css/less/scss vs sass/stylus) または `css.propertyEnd`, `sass.propertyEnd`, `stylus.propertyEnd` に設定した Emmet プロパティに基づいて `;` を追加します。
Cursor location | `${cursor}` か `vertical bar` を使用できます。 | タブ ストップとカーソルの位置には `${1}`  のような textmate syntax しか使用できません。

> `A` = `|` です エスケープを抜けられなかった

### HTML Emmet スニペット <a id="html-emmet-snipets"></a>

HTML カスタム スニペットは `haml` や `jade` のような他のマークアップにも適用できます。スニペット値が実際の HTML ではなく略語である場合、適切な変換を適用して言語の種類ごとに適切な出力を得ることができます。

たとえばリスト項目のないリストの場合は、スニペット値が `ul>li` ならば `html`, `haml`, `jade`, `slim` で同じスニペットで使用することができますが、スニペット値は `<ul><li></li></ul>` になり `html` ファイルのみで動作します。

プレーン テキストのスニペットが必要な場合にはテキストを `{}` で囲います。

### CSS Emmet スニペット<a id="css-emmet-snippets"></a>

CSS Emmet スニペットの値は完全なプロパティ名と値のペアでなければなりません。

CSS カスタム スニペットは `scss`, `less`, `sass` のような他のスタイルシートすべてに適用できます。したがって、スニペット値の最後には `;` をつけないでください。Emmet は言語がこれを必要とするかどうかを言語に基づいて追加します。

スニペット名で `:` を使用しないでください。Emmet が指定された略語からスニペットをあいまい一致で選択するときに、プロパティ名と値を区切るために使用されます。

> Note: `snippets.json` ファイルに変更を加えた後は VS Code の再起動することを忘れないでください。

### カスタムスニペットのタブストップとカーソル <a id="tab-stops-and-cursors-in-custom-snippets"></a>

カスタム Emmet スニペットでタブ ストップに使用する構文は [Textmate snippets syntax](https://manual.macromates.com/en/snippets) に従います。

- タブ ストップには `${1}`, `${2}` を使用して、プレスフォルダーを持つタブ ストップには `${1:placeholder}` を使用してください。
- これまでは `|` や `${cursor}` がカスタム Emmet スニペットの位置を指定するために使用されていました。これはもはやサポートされていません。代わりに `${1}` を使用してください。

## Emmet の構成 <a id="emmet-configuration"></a>

次は VS Code 内で Emmet エクスペリエンスをカスタマイズするのに使用できる Emmet [設定](/docs/getstarted/settings.md) です。

* `emmet.includeLanguages`

    この設定を使用すると、選択した言語と Emmet に対応する言語の間のマッピングを追加して、後者の構文を使用して前者での Emmet を有効にします。
    両方の指定には language id を使用するようにしてください。

    例:
    ```json
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "vue-html": "html",
        "plaintext": "jade"
    }
    ```

* `emmet.excludeLanguages`

    Emmet 展開を表示したくない言語では language id の配列をとるこの設定で追加します。

* `emmet.syntaxProfiles`

    HTML 略語の出力をカスタマイズする方法については [Emmet Customization of output profile](https://docs.emmet.io/customization/syntax-profiles/#create-your-own-profile) を参照してください。

    例:
    ```json
    "emmet.syntaxProfiles": {
        "html": {
            "attr_quotes": "single"
        },
        "jsx": {
            "self_closing_tag": true
        }
    }
    ```

* `emmet.variables`

    Emmet スニペットに使用する変数をカスタマイズします。

    例:
    ```json
    "emmet.variables": {
        "lang": "de",
        "charset": "UTF-16"
    }
    ```

* `emmet.showExpandedAbbreviation`

    提案/補完リストに表示される Emmet の提案を制御します。

    Setting Value | Description
    ----------- | -------
    `never` | どの言語の提案リストでも Emmet 略語を表示しません。
    `inMarkupAndStylesheetFilesOnly` | マークアップとスタイル シートベース言語の Emmet 提案のみを表示します ('html', 'pug', 'slim', 'haml', 'xml', 'xsl', 'css', 'scss', 'sass', 'less', 'stylus') 。

    `always` | すべての Emmet サポートと `emmet.includeLanguages` 設定で指定された言語で Emmet 提案を表示します。

    **Note:** `always` モードでは、新しい Emmet 実装が認識されません。たとえば JavaScript React ファイルを編集する場合、マークアップを書く時だけでなく JavaScript を書く時にも Emmet 提案をえることができます。

* `emmet.showAbbreviationSuggestions`

    Emmet 略語を提案として表示します。 既定は `true` です。

    たとえば `li` を入力すると `li` like `link`, `link:css` , `link:favicon` などで始まるすべてのEmmet スニペットが表示されます。
    これは [Emmet cheatsheet](https://docs.emmet.io/cheat-sheet/) を十分に暗記していなくとも Emmet スニペットを確認するのに役立ちます。

    スタイルシートのときか `emmet.showExpandedAbbreviation` が `true` のときは適用されません。

* `emmet.extensionsPath`

   ユーザーのカスタマイズ スニペットを持つ `snippets.json` ファイルを保存するディレクトリーの場所を指定します。

* `emmet.triggerExpansionOnTab`

    `kbstyle(Tab)` キーを使用して Emmet 略語を展開できるようにするにはこれを ture にします。展開する略語がないときはインデントによって適切なフォールバックを行います。

* `emmet.showSuggestionsAsSnippets`

    `true` の場合 Emmet の提案は他のスニペットと一緒にグループ化され `editor.snippetSuggestions` 設定で並び替えられます。これを `true` にして `editor.snippetSuggestions` を `top` にすると、Emmet の提案は常に他の提案の中で一番上に表示するようにします。

* `emmet.preferences`

    この設定で [Emmet Preferences](https://docs.emmet.io/customization/preferences/) に記載されているように Emmet をカスタマイズすることができます。現在次のカスタマイズがサポートされています:
    - `css.propertyEnd`
    - `css.valueSeparator`
    - `sass.propertyEnd`
    - `sass.valueSeparator`
    - `stylus.propertyEnd`
    - `stylus.valueSeparator`
    - `css.unitAliases`
    - `css.intUnit`
    - `css.floatUnit`

    [Emmet Preferences](https://docs.emmet.io/customization/preferences/) に記載されている他の環境設定への対応を望む場合は [feature request](https://github.com/Microsoft/vscode/issues/new) に提出してください。

## Emmet 2.0 で既知の問題 <a id="known-issues-in-emmet-20"></a>

次は修正途中にある上流の Emmet 2.0 を使用する問題の一部です。

* リピーターで降順の番号をつけるのに `@-` を使用できません。[Issue: emmetio/html-transform#2](https://github.com/emmetio/html-transform/issues/2)
* [Emmet cheatsheet](https://docs.emmet.io/cheat-sheet/) の `+`, `select+`, `ul+` で終わる HTML スニペットはサポートされていません。[Issue: emmetio/html-matcher#1](https://github.com/emmetio/html-matcher/issues/1)
