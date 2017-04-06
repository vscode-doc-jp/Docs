---
title: Yo Code - Extension Generator
MetaDescription: Easily create Visual Studio Code extensions and customizations with the Yo Code generator.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

私達は[Yeoman generator](https://github.com/Microsoft/vscode-generator-code)を提供し、拡張機能の公開を手助けしています。

## ジェネレーターのインストール

YeomanとVS Code拡張機能ジェネレーターをコマンドプロントから入手します:

```bash
npm install -g yo generator-code
```

## Yo Codeの実行

Yeomanは、カスタマイズに必要な情報や拡張機能プロントを作成するために必要な手順を順を追って説明します。

ジェネレーターを起動するには、コマンドプロントで次を実行します:

```bash
yo code
```

![yo code output](images/yocode/yocode.png)

## ジェネレーターオプション

ジェネレーターは新しい拡張機能のひな形を作成したり、既存のTextMate定義ファイルに基づいて言語、テーマ、スニペットに使用する拡張機能を作成したりできます。

### New Extension in TypeScript

"hello world"コマンドを実装する拡張機能を作成します。入門として作成してみてください。

* 拡張機能の識別子を求められます。現在のディレクトリーにその名前でフォルダーを作成します。
* ソース、テスト、出力フォルダーを含むディレクトリーを構築します。
* `package.json`ファイルと拡張機能のメインファイルをテンプレートとして出力します。
* ```launch.json`と`tasks.json`を設定して、F5で拡張機能をデバッグしたり、アタッチしたりできるようにします。
* オプションでGitリポジトリーを設定します。

作成したフォルダーでVS Codeを開きます。このフォルダーに、次の手順のクイックガイド`vsc-extension-quickstart.md`ファイルがあります。またこの拡張機能は、拡張機能API用のIntelliSenseが機能するようにセットアップ済みです。

### New Extension in JavaScript

JavaScriptでも上と方法は同じです。この拡張機能は、拡張機能API用のIntelliSenseが機能するようにセットアップ済みです。

### New Color Theme

TextMateに基づいて新しい配色テーマを提供する拡張機能を作成します。

* TextMate(.tmTheme)の場所をURLかファイルパスで求められます。このファイルは作成した拡張機能にインポートされます。
* テーマ名とベーステーマ(light or dark)が求められます。
* 拡張機能の識別子を求められます。現在のディレクトリーにその名前でフォルダーを作成します。

作成したフォルダーでVS Codeを開き、拡張機能を実行して新しいテーマをテストします。
次の手順のクイックガイド`vsc-extension-quickstart.md`を確認してください。

### New Language Support

新しい言語カラライザーを提供する拡張機能を作成します。

* TextMate(.tmLanguage, .plist or .json)の場所をURLかファイルパスで入力するように求められます。このファイルは作成した拡張機能にインポートします。新しい文法を作成する場合は、空のままにしてこれをスキップします。
* 拡張機能の識別子を求められます。現在のディレクトリーにその名前でフォルダーを作成します。

作成したフォルダーをVS Codeで開いて、拡張機能を実行して新しいカラライザーをテストします。次の手順のクイックガイド`vsc-extension-quickstart.md`を確認してください。作成済みの言語構成ファイルを確認して、その言語がどのようなスタイルやコメントを使用するかなどの構成オプションを定義します。

### New Code Snippets

新しいコードスニペットを提供する拡張機能を作成します。

* TextMateスニペット(.tmSnippet)かSublimeスニペット(.sublime-snippet)の場所をURLかファイルパスで入力するように求められます。これらは、VS Codeスニペットファイルに変換されます。
* スニペットを適用する言語を求められます。
* 拡張機能の識別子を求められます。現在のディレクトリーにその名前でフォルダーを作成します。

作成したフォルダーをVS Codeで開いて、拡張機能を実行して新しいスニペットをテストします。次の手順のクイックガイド`vsc-extension-quickstart.md`を確認してください。

## 拡張機能フォルダ

拡張子をロードするには、あなたのVSコード拡張フォルダ `.vscode / extensions`にファイルをコピーする必要があります。

拡張機能を読み込むには、ファイルをVS Codeの拡張機能フォルダ`.vscode/extensions`にコピーする必要があります。プラットホーム別に次のフォルダーにあります:

* **Windows** `%USERPROFILE%\.vscode\extensions`
* **Mac** `~/.vscode/extensions`
* **Linux** `~/.vscode/extensions`

VS Codeを実行するたびに拡張機能を読み込む場合は、プロジェクト('side loading')を`.vscode/extensions`の下の新しいフォルダにコピーします。例: `~/.vscode/extensions/myextension`.

## 次のステップ

* [Publishing Tool](/docs/extensions/publish-extension.md) - Learn how to publish your extensions to the VS Code Marketplace.
* [Hello World](/docs/extensions/example-hello-world.md) - Try the 'Hello World' walkthrough to build your first extension.
* [Additional Extension Examples](/docs/extensions/samples.md) - Take a look at our list of example extension projects.

## よくある質問

**Q: Windows 10の`yo code`ジェネレーターで矢印キーが反応しません**

**A:** `yo`でYeoman起動して、`Code`を選択してください。

![yo workaround](images/yocode/yo-workaround.png)
