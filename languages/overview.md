---
title: プログラミング言語
MetaDescription: In Visual Studio Code we have support for all common languages including smart code completion and debugging.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

## いくつものプログラミング言語サポート

Visual Studio Codeでは主要なプログラミング言語をほとんどサポートしています。例えばJavaScript、TypeScript、CSS、HTMLまた他の言語拡張を [VS Code Marketplace](https://marketplace.visualstudio.com/vscode/Languages)で探して取り入れることが可能です。

## 言語固有のドキュメント

VS Code docでは、サポートしている一般的な言語について概要をまとめています。[C++](/docs/languages/cpp.html) - [C&#35;](/docs/languages/csharp.html) - [CSS](/docs/languages/css.html) - [Dockerfile](/docs/languages/dockerfile.html) - [Go](/docs/languages/go.html) - [HTML](/docs/languages/html.html) - [JavaScript](/docs/languages/javascript.html) - [JSON](/docs/languages/json.html) - [Less](/docs/languages/css.html) -
[Markdown](/docs/languages/markdown.html) - [PHP](/docs/languages/php.html) - [Python](/docs/languages/python.html) - [Sass](/docs/languages/css.html) - [T-SQL](/docs/languages/tsql.html) - [TypeScript](/docs/languages/typescript.html).

リンク先でその言語をVS Codeで使用する方法の概要を紹介しています。ここにない場合でもほとんどの言語拡張のREADMEで、機能の要約が得られることがよくあります。

## VS Codeの言語機能

言語と拡張機能によって、サポートの豊かさが異なることに注意してください。

* シンタックスハイライトとブラケットマッチング
* 高性能な補完(IntelliSense)
* Lintとcorrection
* コードナビゲーション (定義へ移動 , 全ての参照検索)
* デバッグ
* リファクタリング

## ファイルの言語変更

VS Codeはファイル拡張子に基づいて言語モードを選択します。言語モードを変更する場合は、ステータスバー右にある言語モードの選択をクリックしてください。これにより言語選択モードをドロップダウンに表示します。

![Language Selector](images/overview/languageselect.png)

>**Tip**: **言語モードの変更** (`kb(workbench.action.editor.changeLanguageMode)`)コマンドから識別子を確認できます。

## Language Id

VS Codeは現在の言語モードを確定するために、特定の識別子と言語モードを関連付けます。

言語識別子は言語の名前の小文字表記であることが多いです。ですが例えば、`Markdown`が`markdown`でないことに注意してください。なお未知の言語ファイルは`plaintext`として扱われます。

インストール済みの言語と識別子を**言語モードの変更** (`kb(workbench.action.editor.changeLanguageMode)`) で確認できます。

![language identifiers](images/overview/language-identifiers.png)

## 言語にファイル拡張子を追加

`files.associations`[設定](/docs/getstarted/settings.md)で既存の言語に新しいファイル拡張子を設定することができます。

次の例は `php`言語識別子に`myphp`ファイル拡張子を追加します:

```json
    "files.associations": {
        "*.myphp": "php"
    }
```

IntelliSense (`kb(editor.action.triggerSuggest)`)で利用可能な識別子を表示するのを確認してください。

![language id IntelliSense](images/overview/language-id-intellisense.png)

## 次のステップ

このドキュメントでVS Codeが貴方の気になる言語サポートをしていることを知りました。

* [Code Navigation](/docs/userguide/editingevolved.md) - Peek and Go to Definition and more
* [Debugging](/docs/userguide/debugging.md) - This is where VS Code really shines

## よくある質問

**Q: 私が言語サービスを提供することはできますか?**

**A:** Yes you can! もちろんです [VS Code Extension Authoring](/docs/extensions/overview.md)ドキュメントの [example language server](/docs/extensions/example-language-server.md)を確認してください。

**Q: 完全な言語サービスを作成しなくても既存のTaxtMateで代用できますか? **

**A:** はいTextMate colorizersを通して好きな言語サポートを追加することもできます。[Themes, Snippets, and Colorizers](/docs/extensions/themes-snippets-colorizers.md) でVS Code用にTextMate .tmLanguage構文ファイルを統合する方法を確認してください。

**Q: 言語にファイル拡張子を追加することができますか?**

**A:** はい `files.associations`[設定](/docs/getstarted/settings.md)でグローバルでもワークスペース内でも拡張子を追加することで可能です。

PHPにより多くのファイル拡張子を関連付ける例です:

```json
"files.associations": {
    "*.php4": "php",
    "*.php5": "php"
}
```

必要に応じて、言語に完全なファイルパスを設定することも可能です。次の例は`somefoloder`内のすべてのファイルをPHPに関連付けます:

```json
"files.associations": {
    "**/somefolder/*.*": "php"
}
```

認識方式が、ファイルのフルパスに`/`が含まれる[glob pattern](https://en.wikipedia.org/wiki/Glob_%28programming%29)であることに注意してください。また当然ですが、ファイル名も一致する必要があります。
