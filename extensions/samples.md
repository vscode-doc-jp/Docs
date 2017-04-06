---
title: Extension Examples
MetaDescription: Learn from existing Visual Studio Code extension examples.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

## 基本

私たちは拡張機能のコアコンセプトの概念を2つのチュートリアルでカバーしています:

* **[Your First Extension](/docs/extensions/example-hello-world.md)** -  拡張機能のコアコンセプトをチュートリアルで説明します。
* **[Word Count Extension](/docs/extensions/example-word-count.md)** - 最後に行う別のチュートリアルです。

## サンプル

Sample|Description|Type|In Marketplace
------|-----------|----|---------
**[Word Count](https://github.com/Microsoft/vscode-wordcount)**|編集イベントで更新するMarkdownファイルの文字数をステータスバーに表示します。[walkthrough](/docs/extensions/example-word-count.md)|[Extension](/docs/extensions/example-hello-world.md)|Y
**[MDTools](https://github.com/Microsoft/vscode-MDTools)**|一般的なテキスト処理に基づいて選択や更新を行います。例:ToUpper, HTMLEncode, ...|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Decorator](https://github.com/Microsoft/vscode-extension-samples/tree/master/decorator-sample)**|テキストエディターでボーダー、カラーおよびカスタムカラーを使用して概要ルーラーを追加する方法を示します。|[Extension](/docs/extensions/example-hello-world.md)|N
**[Preview Html](https://github.com/Microsoft/vscode-extension-samples/tree/master/previewhtml-sample)**|`vscode.previewHtml` [command](/docs/extensionapi/vscode-api-commands.md#commands)を使用して仮想ドキュメントを作成する方法を示します。|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Document Content Provider](https://github.com/Microsoft/vscode-extension-samples/tree/master/contentprovider-sample)**|APIコマンドを使用する方法と、`TextDocumentContentProvider`APIを使用して_virtual_ドキュメントを作成する方法を示します。|[Extension](/docs/extensions/example-hello-world.md)|Y
**[TSLint](https://github.com/Microsoft/vscode-tslint)**|TSLintに基づいてTypeScriptを検証します。|[Language Server](/docs/extensions/example-language-server.md)|Y
**[Spelling and Grammar Checker](https://github.com/Microsoft/vscode-spell-check)**|設定可能なMarkdownのスペルと文法チェッカーです。外部WEBサービスを呼び出し、アクティベーションのサポートと辞書を追加してエラーマッピングを行います。設定ファイルの変更をリアルタイムで監視します。|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Mock Debugger](https://github.com/Microsoft/vscode-mock-debug)**|デバッガをビルドしてテストするのに役立ちます。|[Debuggers](/docs/extensions/example-debuggers.md)|Y
**[Go Language Support](https://github.com/microsoft/vscode-go)**|[Go Lang](https://golang.org/) の豊富なサポートです。IntelliSense、Debug、Peek、Rename、Syntax ...|[Extension](/docs/extensionapi/vscode-api.md#languages)|Y

## ツール

Tool|Purpose
----|-------
**[Extension Generator](/docs/extensions/yocode.md)**|拡張機能実装を手助けするための[Yeoman](http://yeoman.io/)ジェネレーターです。これにより、開発環境を動作するために必要なすべての初期構成(API、関連モジュール)を作成しします。ジェネレーターのソースコードは、[ここ](https://github.com/Microsoft/vscode-generator-code)で公開しています。
**[Debugging Extensions](/docs/extensions/debugging-extensions.md)**|私たちは拡張機能の開発、デバッグ、ローカルテストを簡単に行うための努力を行っています。
**[Publishing Tool](/docs/extensions/publish-extension.md)**|利用可能な拡張機能があるなら[extension Marketplace](/docs/userguide/extension-gallery.md)でそれを共有しましょう。それを行うシンプルなコマンドラインツールがあります。そのソースコードを[ここ](https://github.com/Microsoft/vsce)で確認できます。

## チュートリアル

Tutorial|Description
--------|-----------
**[Node.js](https://github.com/Microsoft/vscode-samples)**|Node.js Express [トライアル](/docs/nodejs/nodejs-tutorial.md)

## 次のステップ

* [Extension Marketplace](/docs/userguide/extension-gallery.md) - Learn more about VS Code's public extension Marketplace.
