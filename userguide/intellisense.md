---
title: IntelliSense
MetaDescription:  Learn about Visual Studio Code IntelliSense (intelligent code completion).
commitid: 8f449295b321510871e357b12f9aaa6070944db3
---

IntelliSenseとは、メンバーの一覧、パラメーター ヒント、クイック ヒント、入力候補など多数の機能を指す総称です。その特徴から「code completion」「content assist」「code hinting」と呼ばれることもあります。

![IntelliSense demo](images/intellisense/intellisense.gif)

## プログラミング言語のIntelliSense

初期のIntelliSenseはJavaScript、TypeScript、JSON、CSS、LESS、SASSに補完を提供します。この状態でもそれなりの言語で単語ベースの補完をサポートしますが、言語拡張機能をインストールすることでより豊かなIntelliSenseを構成可能です。





## IntelliSenseの特徴 <a id="intellisense-features"></a>

IntelliSenseの機能は、セマンティクスとソースコードの分析に基づいて高度なコードな補完を生成する言語サーバーによって構成されています。生成された補完はIntelliSenseを通してリスト表示しますが、文字を続けることでIntelliSenseがフィルターをかけて、メンバー(変数、メソッドなど)のより最適なリスト表示が可能になります。こうして出てきた項目は`kbstyle(Tab)`や`kbstyle(Enter)`で確定できます。

IntelliSenseを起動するときには、エディタで`kb(editor.action.triggerSuggest)`もしくはトリガーになるような文字(javascriptではドット(`kbstyle(.)`)などを入力します。

![intellisense in package json](images/intellisense/intellisense_packagejson.gif)

> **Tip:** IntelliSenseはキャメルケースフィルターをサポートしています。ですから、メソッド名に大文字を入力するだけで、項目を限定することができます。例えば「createApplication」を表示するときは「cra」ですぐに表示可能です。

必要に応じて、入力中にIntelliSenseをオフにすることもできます。IntelliSense機能を無効化したり、カスタマイズしたりする詳細方法は [Customizing IntelliSense](/docs/userguide/intellisense.md#customizing-intellisense)を参照してください。

言語サービスから提供があるとき、`kb(toggleSuggestionDetails)`をおすか情報のアイコンをおすことで、各メソッドの**quick info**を確認することができます。メソッドに関するドキュメントが横に展開されます。展開されたドキュメントはそのまま残り、リストを移動すると更新します。`kb(toggleSuggestionDetails)`をもう一度おすか、閉じるアイコンをクリックしてこれを閉じることができます。

![quick info](images/intellisense/intellisense_docs.gif)

メソッドを選んだあと、**パラメーター情報**を提供しているのがわかるかと思います。

![parameter info](images/intellisense/paramater_info.png)

該当するものがあるとき、言語サービスはクイックヒントと
とメソッドシグネチャの基になる型を表示します。たとえば上の画像で、いくつかの`any`の種類を確認できます。JavaScriptは動的であり型を強制しないので`any`変数はどんな型でもいいことを示唆しています。

## 入力候補の種類

下のJavaScriptコードでIntelliSenseによる入力候補の例を示しています。以下の画像を見てもわかりますが、候補とプロジェクトのグローバル識別子の両方を表示します。候補のシンボルが最初に表示され、続いてグローバル識別子を表示します。

![intellisense icons](images/intellisense/intellisense_icons.png)

IntelliSenseは言語サーバーの候補、スニペット、単純な単語のテキスト補完などさまざまな種類の補完を提供します。

|                                                                                                       |                      |
| ----------------------------------------------------------------------------------------------------- | -------------------- |
| ![method icon](images/intellisense/Method_16x.svg)                                                    | メソッド、関数、コンストラクター |
| ![variable icon](images/intellisense/Field_16x.svg)                                                   | 変数またはフィールド         |
| ![class](images/intellisense/Class_16x.svg)                                                           | クラス                  |
| ![interface](images/intellisense/Interface_16x.svg)                                                   | インターフェイス             |
| ![module](images/intellisense/Namespace_16x.svg)                                                      | モジュール                |
| ![property](images/intellisense/Property_16x.svg)                                                     | プロパティまたは属性         |
| ![enumeration icon](images/intellisense/EnumItem_16x.svg)                                             | 値と列挙              |
| ![color](images/intellisense/Enumerator_16x.svg)                                                      | 参照                 |
| ![keyword](images/intellisense/IntelliSenseKeyword_16x.svg)                                           | キーワード                |
| ![global identifiers](images/intellisense/Document_16x.svg)                                           | グローバル識別子          |
| ![color](images/intellisense/ColorPalette_16x.svg)                                                    | 色                   |
| ![unit](images/intellisense/Ruler_16x.svg)                                                            | ユニット                 |
| ![a square with ellipses forming the bottom show snippet prefix](images/intellisense/Snippet_16x.svg) | スニペットプレフィックス         |
| ![a square with letters abc word completion](images/intellisense/String_16x.svg)                      | 単語                 |
| ![Miscellaneous](images/intellisense/Misc_16x.svg)                                                    | その他                 |

## IntelliSenseのカスタマイズ <a id="customizing-intellisense"></a>

設定とキーバインドを変更してIntelliSenseの操作をカスタマイズできます。

### 設定

以下に示す例は既定の設定です。`settings.json`で設定を変更する場合は[User and Workspace Settings](/docs/getstarted/settings.md)の説明を参照してください。

```javascript
{
  // 入力中にクイック候補を表示するかどうかを制御します
    "editor.quickSuggestions": true,

  // 'Tab' キーに加えて 'Enter' キーで候補を受け入れるかどうかを制御します。改行の挿入や候補の反映の間であいまいさを解消するのに役立ちます。
    "editor.acceptSuggestionOnEnter": true,

  // クイック候補が表示されるまでの待ち時間 (ミリ秒) を制御します
    "editor.quickSuggestionsDelay": 10,

  // 単語ベースの修正候補を有効にします。
    "editor.wordBasedSuggestions": true,

    // パラメーター ヒントを有効にする
    "editor.parameterHints": true
}
```

既定では1つのウィジェットで修正候補と一緒にスニペットを表示します。これを`editor.snippetSuggestions`設定で制御することが可能です。このウィジェットからスニペットを削除するには`none`に設定します。スニペットを一緒に表示する場合、その並び替えの方法は指定できます。上部(`"top"`) 下部(`"bottom`") アルファベット順(`"inline"`)です。デフォルトは`"bottom`"です。

### キーバインド

次に示すキーバインディングは、既定の設定です。これらは[Key Bindings](/docs/getstarted/keybindings.md)にしたがって`keybindings.json`ファイルで変更することができます。

> **Note:** 以下の例はIntelliSenseのごく一部設定をまとめています。*Default Keyboard Shortcuts** (**File** > **Preferences** > **Keyboard Shortcuts**) を開いて"suggest"を検索てください。

```json
{
    {
       "key": "ctrl+space",
       "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+space",
        "command": "toggleSuggestionDetails",
        "when": "editorTextFocus && suggestWidgetVisible"
    },
    {
        "key": "ctrl+alt+space",
        "command": "toggleSuggestionFocus",
        "when": "editorTextFocus && suggestWidgetVisible" },
    }
```

## トラブルシューティング

IntelliSenseが機能しないときは、言語サービスが実行されていない可能性があります。VS Codeを再起動すればこの問題は解決するはずです。言語拡張機能をインストールしてもIntelliSense機能が不足している場合は、そのレポジトリで問題を確認してください。

> **Tip:** JavaScript の IntelliSense 設定とトラブルシューティングについては[こちら](/docs/languages/javascript.md#intellisense)を確認できます。

入手した言語拡張がIntelliSense機能を完全にサポートするとは限りません。拡張機能のREADMEで何がサポートされているのか確認します。もし、言語拡張に問題があると思ったら [Marketplace](https://marketplace.visualstudio.com/vscode) で拡張機能を検索して、 サポートリンクを探してください。

## 次のステップ

IntelliSenseはVS Codeの強力な機能の1つにすぎません。VS Codeにさらに詳しくなりましょう。

* [JavaScript](/docs/languages/javascript.md) - Get the most out of your JavaScript development, including configuring IntelliSense.
* [Node.js](/docs/nodejs/nodejs-tutorial.md) - See an example of IntelliSense in action in the Node.js walkthrough.
* [Debugging](/docs/userguide/debugging.md) - Learn how to set up debugging for your application.

## よくある質問

**Q: なぜ何の候補もないのですか？**

![image of IntelliSense not working](images/intellisense/intellisense_error.png)

**A:** これには様々な理由が考えられます。まずVS Codeを再起動してみてください。それでも問題が解決しないは、言語拡張のドキュメントを参照してください。JavaScirpt特定のトラブルシューティングについては[JavaScript language topic](/docs/languages/javascript.md#intellisense)を参照できます。

**Q: メソッドと変数の提案が表示されないのはなぜですか？**

![image of IntelliSense showing no useful suggestions](images/intellisense/missing_typings.png)

**A:** この問題はJavaScriptに型定義(typings)ファイルが見つからないことが原因です。[TypeSearch](https://microsoft.github.io/TypeSearch)を利用して、型定義ファイルのパッケージが特定のライブラリーで使用可能かどうかを確認できます。この問題の詳細は[JavaScript 言語のトピック](/docs/languages/javascript.md#intellisense)にあります。その他言語については拡張機能のドキュメントを参照してください
