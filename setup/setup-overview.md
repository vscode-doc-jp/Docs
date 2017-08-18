---
title: セットアップ
MetaDescription: Get Visual Studio Code up and running.
commitid: 8f449295b321510871e357b12f9aaa6070944db3
---

Visual Studio Code の起動と実行は素早く簡単です。そのダウンロードサイズは小さく数分でインストールして VS Code を試すことができます。

## クロスプラットホーム <a id="cross-platform"></a>

VS Code は Mac, Linux, Windows 上で動作する無料のコードエディターです。

次の OS 別ガイドにしたがってください:

* [Mac](/docs/setup/mac.md)
* [Linux](/docs/setup/linux.md)
* [Windows](/docs/setup/windows.md)

VS Code は使用可能なハードウェアおよびプラットホームとそのバージョンで実行する必要があります。[システム要件](/docs/supporting/requirements.md)を参照してコンピューターがサポートされているかどうかを確認してください。

## 定例アップデート <a id="update-cadence"></a>

VS Code は新機能と重要なバグ修正を含む新しいバージョンを[毎月](/updates)リリースします。ほとんどのプラットホームは自動更新をサポートしており、新しいリリースが入手可能になった時点でインストールするように促します。**ヘルプ**>**更新の確認..** を実行して手動でアップデートを確認することもできます。

>Note: 自分のタイミングで VS Code を更新したい場合は[自動更新の無効化](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) ができます。

## Insider Nightly Build <a id="nsiders-nightly-build"></a>

新しい機能やバグ修正を早期に試したくなったら [Insiders build](/insiders) をインストールできます。Insider は月例の安定ビルドとは別にインストールを構築して同じコンピューター上でそれぞれ自由に動作します。Insider Build は VS Code 開発チームが日々作成したものと同じです。新しい機能を試してフィードバックをいただき本当に感謝しています。

## 追加コンポーネント <a id="additional-components"></a>

VS Code とはエディターであり small footprint(場所を取らない) ことに自信を持っています。何でもかんでも詰め込んだ従来の IDE とは異なり気になる技術に合わせたインストール調整が可能です。VS Code をカスタマイズする方法については、プラットホームガイドを参照してから[追加コンポーネント](/docs/setup/additional-components.md)を一読してください。

## 拡張機能 <a id="extension"></a>

VS Code の[拡張機能](/docs/userguide/extension-gallery.md)はサードパーティーによる追加のサポートを可能にしています:

* 言語 - [C++](/docs/languages/cpp.md), [C#](/docs/languages/csharp.md), [Go](/docs/languages/go.md), [Python](/docs/languages/python.md)
* ツール - [ESLint](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint), [JSHint](https://marketplace.visualstudio.com/items/dbaeumer.jshint) , [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell), [Visual Studio Team Services](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team)
* デバッガ - [Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [PHP XDebug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug).
* キーマップ - [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim), [Sublime Text](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings), [IntelliJ](https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings), [Emacs](https://marketplace.visualstudio.com/items?itemName=hiro-sun.vscode-emacs), [Atom](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings), [Visual Studio](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vs-keybindings), [Eclipse](https://marketplace.visualstudio.com/items?itemName=alphabotsec.vscode-eclipse-keybindings)

拡張機能は VS Code の UI. コマンド, タスクへ統合されるため、VS Code の共通インターフェイスに沿って様々なテクノロジーで簡単に操作できます。その一例を [Marketplace](https://marketplace.visualstudio.com/vscode)できます。

## 次のステップ

VS Code をセットアップし終えたら次のトピックで VS Code の詳細を学ぶことができます:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/userguide/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - Move quickly through your source code.
* [Debugging](/docs/userguide/debugging.md) - Debug your source code directly in the VS Code editor.
* [Proxy Server Support](/docs/setup/network.md) - Configure your proxy settings.

早速何かを試したい場合は [Node.js tutorial](/docs/nodejs/nodejs-tutorial.md) のチュートリアルを試してください。数分で Web アプリケーションをデバッグできます。

## よくある質問

**Q: VS Code のシステム要件は何ですか？**

**A:** [システム要件](/docs/supporting/requirements.md)を参照してください。

**Q: VS Code 本体のサイズは？**

**A:** VS Code のダウンロードサイズは 100MB 未満で 200MB のディスクを消費します。ですからすぐに VS Code をインストールして使用可能です。

**Q: 新しいプロジェクトを作成して実行するにはどうすればいいですか？**

**A:** VS Code には従来の*新規プロジェクト 作成**やプロジェクト テンプレートは実装されていません。ですから、開発の興味対象に応じて[追加コンポーネント](/docs/setup/additional-components.md)と足組を構成する必要があります。そこで [Yeoman](http://yeoman.io/)や[NPM](https://www.npmjs.com/) を使用することで、 テンプレート、およびツールを使用してプロジェクトを作成できます。

**Q: VS Code のバージョンはどこで確認できますか？**

**A:** Linux と Windows では **[ヘルプ]** > **バージョン情報**。Mac では **Code** > **About Visual Studio Code** で確認します。

**Q: VS Code が破損しているとメッセージを出します**

**A:** VS Code はおそらく拡張機能による本体ファイルの変更を検出しました。VS Code を再インストールすることで影響を受けたファイルを再設置します。詳細については [FAQ topic](/docs/supporting/faq.md#installation-appears-to-be-corrupt) を参照してください。
