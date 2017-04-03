---
title: 拡張機能リファレンス
MetaDescription: Learn the details of Visual Studio Code's rich extensibility (plug-in) model.  This documentation describes the various extension points, activation rules and specific feature APIs (e.g. working with documents and editors).
commitid: 97b7ae9996f77dd4aa822fe8908c50863c4410d9
---

このドキュメントのこのセクションでは、VS Code拡張機能の様々な機能について詳しく説明します。[extensions](/docs/extensions/overview.md)の見直しだけではなく、['Hello World'](/docs/extensions/example-hello-world.md)の例をより深く掘り下げることによる価値があります。

VS Code拡張機能を使用するもっとも簡単な方法は[Extension Marketplace](/docs/userguide/extension-gallery.md)を使用することです。ですから最初の拡張機能をビルドしたら、他人がインストールできるように[published](/docs/extensions/publish-extension.md)を使用してください。

## Extensibility Reference Documents

ドキュメントでは次のトピックをカバーしています:

Topic|Description
-----|-----------
**[package.json Extension Manifest](/docs/extensionapi/extension-manifest.md)**|全てのVisual Studio Code拡張機能には、拡張機能フォルダのルートにマニフェストファイル`package.json`が必要です。このドキュメントでは、そのファイルの構造と必須フィールドの概要について説明します。
**[Contribution Points](/docs/extensionapi/extension-points.md)**|`package.json`をベースにして、貢献できる追加の拡張ポイントがいくつかあります。例: command, theme, debugger
**[Activation Events](/docs/extensionapi/activation-events.md)**|VS Code拡張機能を任意のタイミングでアクティブにします。このドキュメントでは `package.json`でサポートしているActivationオプションの概要について説明します。例: 特定のファイルタイプがロードされたとき、コマンドが起動されたときなど
**[API vscode namespace](/docs/extensionapi/vscode-api.md)**|完全なVS Code名前空間APIリファレンスを確認します。
**[API complex commands](/docs/extensionapi/vscode-api-commands.md)**|VS CodeのComplex Command APIリファレンスを確認します。
**[Debugging API](/docs/extensionapi/api-debugging.md)**|デバッガをVS Codeに統合する方法の詳細を学びます。
**[API samples](https://github.com/Microsoft/vscode-extension-samples)**|VS Code拡張機能APIのサンプルコードを確認します。

## Language Extension Guidelines

[Language Extension Guidelines](/docs/extensionapi/language-support.md)トピックでは、VS Codeで利用可能な様々な言語機能(コードの提案や動作、フォーマット、名前の変更など)と、それらを実装する方法についてのガイダンスを提供しています。
