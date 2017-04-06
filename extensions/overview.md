---
title: Extending Visual Studio Code
MetaDescription: Visual Studio Code has a rich extensibility model for interacting with and adding to the tool.  Learn how to create your own extensions (plug-ins) for Visual Studio Code.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

もしVS Codeの拡張機能に興味があるなら、ここ情報は役に立つはずです。ここでは、VS Codeの拡張に関するドキュメント概要と、最初のVS Codeを作成する方法について説明します。VS Codeの拡張に関する設計アプローチに興味があれば、[ここ](/docs/extensionapi/patterns-and-principles.md)で詳しく確認できます。

既存の拡張機能を使用したい場合は、[Marketplace](/docs/getstarted/extension-gallery.md)トピックを確認してください。トピックでVS Code [Marketplace](https://marketplace.visualstudio.com/VSCode)から検索してインストールする方法を紹介しています。

全ての拡張機能はcontribution(登録)、activation (読み込み)およびVS Code拡張APIへのアクセスのコモンモデルを共有します。しかし拡張機能のうち言語サーバーとデバッガーは特殊です。これらは独自の追加プロトコルを使用しており、ドキュメントの独自のセクションで解説されます。

## 拡張機能

すべての拡張機能は共有拡張ホストプロセスで実行します。拡張機能のためのこの別プロセスは、VS Codeが完全な応答を維持することを保証します。

次のサポートを含みます:

* **Activation** - 特定のファイルタイプを検出したとき、コマンドパレットまたはキーの組み合わせでコマンドを選択したとき、拡張機能を呼び出します。
* **Editor** - 内容に対して、テキスト読み取り、操作、leverage選択(複数化)をします。
* **Workspace** - 開いているエディター、ステータスバー、情報メッセージなどにアクセスします。
* **Eventing** - オープン、クローズ、変更などエディターのサイクルイベントに接続します。
* **Evolved editing** - IntelliSense、Peek、Hover、Diagnosticsなどを含む豊富な言語サポートのプロバイダーを作成します。

拡張機能の基礎を学ぶ十分な2のチュートリアルがあります:

1. **[Hello World](/docs/extensions/example-hello-world.md)** - 基本的な拡張機能を作成し、拡張機能のフォルダー構造、マニフェストを理解し、起動の仕組みを学び、拡張機能を実行してデバッグしてローカルにインストールします。
2. **[Word Count](/docs/extensions/example-word-count.md)** - 特定のファイルタイプでアクティブ化し、ステータスバー更新、テキストエディターの変更に応答、ファイルを閉じたときの拡張機能の破棄を学びます。

また、拡張API全体で使用する共有プログラミングパターンについての説明[Extensibility Principles and Patterns](/docs/extensionapi/patterns-and-principles.md)も役立つはずです。

## Language Servers

言語サーバーを使用すると、拡張機能の専用プロセスを作成します。これはあなたの拡張機能が高コストのCPUまたはIOを集中的に実行して、他の拡張機能を遅くする可能性がある場合に有益な設計の選択です。ですから、ワークスペース内すべてのファイルに機能するタスクで一般的です。例:linterやstatic analysis suites

詳細は[language servers](/docs/extensions/example-language-server.md)をご覧ください。

## Debug Adapter

VS Codeは一般的なデバッガUIを実装しています。つまりデバッガの拡張機能やいわゆる"debug adapters"を実際のデバッガやランタイムに接続します。デバッグアダプターは、**VS Code Debug Protocol**を通じてVS Codeと通信する専用のプロセスであり、どの言語でも実装できます。

詳細は[debugger extensions](/docs/extensions/example-debuggers.mdをご覧ください。

---

VS Code拡張機能を使用するもっとも簡単な方法は[Extension Marketplace](/docs/userguide/extension-gallery.md)を使用することです。これらから便利な拡張機能を試してみると、開発機能を作成するアイディアを確認することもできます。

## Language Extension Guidelines

[Language Extension Guidelines](/docs/extensionapi/language-support.md)トピックは、拡張機能でサポートしたい言語機能を決定するのに役立ちます。 これはVS Codeで利用可能なさまざまな言語機能(コードの提案や動作、フォーマット、名前の変更など)と、言語サーバープロトコルを使用して実装する方法、または拡張機能から拡張APIを直接使用する方法を紹介しています。

## Themes, Snippets, and Colorizers

構文ハイライト、便利なスニペット、よくデザインされたカラーテーマなどの簡単な操作で、プログラミング言語の優れた編集経験を得ることができます。TextMateカスタマイズファイルはこのサポートを提供して、VS Codeはこれらを簡単にパッケージ化して再利用します。拡張機能では`.tmTheme`、`.tmSnippets`、`.tmLanguage`を直接利用できます。[Themes, Snippets, and Colorizers](/docs/extensions/themes-snippets-colorizers.md)トピックではTextMateファイルをインクルードする方法と、独自のテーマ、スニペット、言語色付け機能の作成方法に関するガイダンスを提供しています。

## Writing an Extension

Yeoman [extension generator](/docs/extensions/yocode.md)は、簡単な拡張機能のプロジェクト作成を非常に簡単にします。これらは初心者にも適しており、既存の拡張子機能[examples](/docs/extensions/samples.md)もあります。

拡張機能はTypeScriptかJavaScriptいずれかで書き込むことができます。VS Codeは、VS Code自体の中からすべての[develop, build, run, test and debug](/docs/extensions/debugging-extensions.md)が可能なファーストクラスの拡張機能開発環境を提供します。

## Testing Extensions

また、拡張機能の[テストの作成と実行](/docs/extensions/testing-extensions.md)に対しても十分なサポートを用意しています。VS Code APIを呼び出して、実行中のVS Codeインスタンスでコードをテストする統合テストを簡単に作成できます。

## 次のステップ

* [Your First Extension](/docs/extensions/example-hello-world.md) - Try creating a simple Hello World extension.
* [Extension API](/docs/extensionapi/overview.md) - Learn about the VS Code extensibility APIs.
* [Extension Examples](/docs/extensions/samples.md) - A list of extension samples you can review and build.
