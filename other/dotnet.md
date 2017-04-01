---
title: .NET Core
MetaDescription: Visual Studio Code has great support for writing and debugging .NET Core applications.
commitid: 97b7ae9996f77dd4aa822fe8908c50863c4410d9
---

[.NET Core](https://docs.microsoft.com/en-us/dotnet/articles/welcome)はWindows, Linux, Macでサーバーアプリケーションを作成実行できる高速なモジュラープラットホームを提供します。C# IntelliSense(賢いコード補完)とデバッグを完全にサポートする強力な編集経験を得るために、C#拡張機能をもつVisual Studio Codeを利用してください。

## Getting Started

1. [.NET Core](https://microsoft.com/net/core) をインストール
2. VS Code Marketplaceから[C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)をインストール

## Hello World

.NET Coreを簡単な"Hello World"プログラムから始めるために、以下の手順を行います。

1.C# プロジェクトを初期化する

  * コマンドプロント(ターミナル)を開く。
  * C# プロジェクトを作成したいフォルダーに移動する。
  * `dotnet new`を実行する。
  * これによりフォルダーに"Hello World"プログラムの書かれた`Program.cs`を生成します。

2.`dotnet restore` を実行してビルドアセットを解決する

> Tip: MSBuild ベースの.NET Core Toolではproject.jsonの代わりに.csprojectプロジェクトファイルを作成しますが`dotnet`コマンドに変更ありません。[詳細](https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-tools-msbuild-alpha/)。

  * `restore`を実行して`project.json`ファイルで宣言した必須パッケージを入手する。
  * これによりプロジェクトフォルダーに新しい`project.lock.json`ファイルを表示します。
  * このファイルには迅速にリストアするために、プロジェクトの依存関係に関する情報が含まれています。
  * ここで、プロジェクトのビルドとデバッグに必要なアセットを追加するかどうかを尋ねる通知がウィンドウ上部に表示されます。Yesを選択を選択してください。

3.`dotnet run`で"Hello World"プログラムを実行する

セットアップのビデオチュートリアルをご覧ください。
[Windows](https://channel9.msdn.com/Blogs/dotnet/Get-started-with-VS-Code-using-CSharp-and-NET-Core) |  [macOS](https://channel9.msdn.com/Blogs/dotnet/Get-started-with-VS-Code-using-CSharp-and-NET-Core-on-MacOS) | [Linux](https://channel9.msdn.com/Blogs/dotnet/Get-started-with-VS-Code-Csharp-dotnet-Core-Ubuntu)

> Tip: C#の開発を続ける: [Debug with VS Code and .NET Core](https://docs.microsoft.com/en-us/dotnet/articles/csharp/getting-started/with-visual-studio-code#debug)

## 次のステップ

* [Basic Editing](/docs/userguide/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - Move quickly through your source code.
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET Core application.
* [Tasks](/docs/userguide/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings
* [.NET Core Docs](https://docs.microsoft.com/en-us/dotnet/articles/core/) - Visit the .NET Core docs for more information on this powerful cross-platform development solution.
