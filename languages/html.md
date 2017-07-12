---
title: HTML Programming
MetaDescription: Get the best out of Visual Studio Code for HTML development
commitid: cb7fea9ffdf45442cba2666b4855d70339685bba
---

VS Codeは初めからHTMLプログラミングの基本的なサポートを提供しています。拡張機能をインストールすることでより多くの機能性を得ることができます。





## IntelliSense <a id="intellisense"></a>

HTMLで入力するとき、HTMLのIntelliSenseを介して候補を提供します。次の画像では、HTML閉じタグ要素  `</ div>`と候補された要素のコンテキストリストを確認できます。

![HTML IntelliSense](images/html/htmlintellisense.png)

また、要素、タグ、HTML 5で定義されるいくつかの値、Ionic、AngularJSタグのための候補も提供しています。

埋め込みCSSとJavaScriptでも動作します。ただし、ScriptとStyleのIncludeでは実行されないことに注意してください。言語サポートはHTMLファイルの内容のみを参照します。

`kb(editor.action.triggerSuggest)` を押すことでIntelliSenseをいつでも起動できます。

また、ビルトインの補完プロバイダーをアクティブにするかどうかを制御することもできます。候補を表示したくない場合は、 ユーザーまたはワークスペース[設定](/docs/getstarted/settings.md)で次を設定します。

```json
  // ビルトイン HTML 言語サポートが Angular V1 のタグおよびプロパティを候補表示するかどうかを構成します。
"html.suggest.angular1": true,

  // ビルトイン HTML 言語サポートが Ionic のタグ、プロパティ、および値を候補表示するかどうかを構成します。
"html.suggest.ionic": true,

  // ビルトイン HTML 言語サポートが HTML5 のタグ、プロパティ、および値を候補表示するかどうかを構成します。
"html.suggest.html5": true
```

## ホバー <a id="hover"></a>

HTMLタグや埋め込みStyle、JavaScriptの上にマウスを移動すると、カーソルの下にシンボルの詳細を表示します。

![HTML Hover](images/html/htmlhover.png)

## 検証 <a id="validation"></a>

HTMLの言語サポートは、埋め込まれたすべてのJavaScriptとCSSの検証を行います。

次の設定で検証をオフにすることができます:

```json
  // ビルトイン HTML 言語サポートが埋め込みスクリプトを検証するかどうかを構成します。
  "html.validate.scripts": true

  // ビルトイン HTML 言語サポートが埋め込みスタイルを検証するかどうかを構成します。
  "html.validate.styles": true,
```

## HTMLのフォーマット <a id="format-html"></a>

HTMLのソースコードの書式を整えるために、`kb(editor.action.formatSelection)`を押して選択範囲をフォーマットすることができます。

>**Tip:** フォーマッタは`html.format.unformatted`設定に登録しているタグをフォーマットしません。埋め込みJavaScrirptは`script`タグを除外していない限り、フォーマットされます。

>**Tip:** [ユーザーとワークスペース設定](/docs/getstarted/settings.md)でHTMLのフォーマッターを構成できます。

## Emmet <a id="emmet-snippets"></a>

Emmetスニペットの拡張機能をサポートしています。Emmetの略語を展開するには`kb(editor.emmet.action.expandAbbreviation)`を押します。

![Emmet HTML support built-in](images/html/emmetsnippet.gif)

>**Tip:** 有効な略語については(https://docs.emmet.io/cheat-sheet)のHTMLセクションを参照してください。

HTML Emmetの略語を他の言語で使用したい場合はEmeet構文プロファイル(`html`, `css`など)を`emmet.syntaxProfiles`[設定](/docs/getstarted/settings.md)に関連付けることでできます。この設定は[language id](/docs/languages/overview.md#language-id)を使用してEmmetプロファイルに関連付けます。

たとえば、JavaScript内でEmmet HTML略語を使用するには、次のようにします:

```json
{
    "emmet.syntaxProfiles": {
        "javascript": "html"
     }
}
```

また[User Defined Snippets](/docs/userguide/userdefinedsnippets.md)もサポートしています。

## 次のステップ

次を見てください:

* [CSS, Less and Sass](/docs/languages/css.md) - VS Code has first class support for CSS including Less and Sass.
