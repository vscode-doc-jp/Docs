---
title: 追加コンポーネントとツール
MetaDescription: Setting up additional components to use with Visual Studio Code.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

VS Codeは小さなインストールで、ほとんどの開発ワークフローで共有するコンポーネントが最小単位で含むよう設計されています。エディタ、ファイル管理、ウィンドウ管理および環境設定などの基本的な機能がその例です。またJavaScript/TypeScript言語サービスとNode.jsデバッガもその一部です。

大規模でがっちりした開発ツール(IDE)の操作に慣れている場合、操作の筋書を完全にサポートしていないに驚くでしょう。たとえば**File**>**New Project**にはプリインストールされたプロジェクトテンプレートがありません。VS Codeのユーザーは特定のニーズに応じて、追加コンポーネントをインストールする必要があるのです。

## よく使われるコンポーネント

よくインストールされるコンポーネントを下に紹介します:

- [Git](https://git-scm.com/download) - VS CodeはGitによるソースコード管理をサポートしていますが、別途でGitをインストールする必要があります。
- [Node.js (NPM)](https://nodejs.org/) - JavaScriptアプリケーションをビルド、実行するためのプラットホームおよびランタイム。
- [TypeScript](http://typescriptlang.org) - `tsc`コンパイラーでTypeScriptをJavaScriptにコンパイル。

また上記のコンポーネントは、今後のマニュアルやチュートリアルでよく使用します。

## VS Codeの拡張機能

VS Codeを[拡張機能](/docs/userguide/extension-gallery.md)を通して拡張することができます。便利ないくつもの拡張機能は[Marketplace](https://marketplace.visualstudio.com/VSCode)でコミュニティーが公開しています。

(編集メモ: 本来ならここに人気拡張が8個表示されますが、実装が面倒)



## 追加のツール

Visual Studio Codeは既存の[ツールチェーン](https://ja.wikipedia.org/wiki/ツールチェーン)と統合しています。次のツールは開発経験を強化します。

- [Yeoman](http://yeoman.io/) - アプリケーションの足場作成**File** > **New Project**のコマンドラインバージョン
- [generator-aspnet](https://www.npmjs.com/package/generator-aspnet) -**ASP.NET Core**の足場を構築するYeomanジェネレーター
- [generator-hottowel](https://github.com/johnpapa/generator-hottowel) - A Yeoman gene - **AngularJS** を素早く作成するYeomanジェネレーター
- [Express](http://expressjs.com/) - Node.js向けの**Jade**フレームワーク
- [Gulp](http://gulpjs.com/) - Tasksと簡単に統合できるストリーミング タスク ランナー
- [Mocha](http://mochajs.org/) - Node.jsで動作するJavaScriptテストフレームワーク
- [Bower](https://bower.io/) - クライアント側のパッケージマネージャー

>**Note:** これらほとんどのツールはNode.jsとNPMパッケージマネージャーをインストールして使用する必要があります。

## 次のステップ

* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation around VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.
* [Languages](/docs/languages/overview.md) - VS Code supports many programming languages out-of-the-box as well as many more through community created extensions.
