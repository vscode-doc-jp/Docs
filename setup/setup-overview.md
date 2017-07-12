---
title: セットアップ
MetaDescription: Get Visual Studio Code up and running.
commitid: cb7fea9ffdf45442cba2666b4855d70339685bba
---

Visual Studio Codeの起動と実行は素早く簡単です。そのダウンロードサイズは小さく、数分でインストールしてVS Codeを試すことができます。

## クロスプラットホーム <a id="cross-platform"></a>

VS CodeはMac、LinuxおよびWindows上で動作する無料のコードエディターです。

次のOS別のガイドにしたがってください:

* [Mac](/docs/setup/mac.md)
* [Linux](/docs/setup/linux.md)
* [Windows](/docs/setup/windows.md)

VS Codeは使用可能なハードウェアおよびプラットホームとそのバージョンで実行する必要があります。[システム要件](/docs/supporting/requirements.md)を参照して、コンピューターをサポートしているかどうかを確認してください。

## 定例アップデート <a id="update-cadence"></a>

VS Codeは、新機能と重要なバグ修正を含む新しいバージョンを[毎月](/updates)リリースします。ほとんどのプラットホームは自動更新をサポートしており、新しいリリースが入手可能になった時点でインストールするように促します。**ヘルプ**>**更新の確認..** を実行して手動でアップデートを確認することもできます。

>Note: 自分のタイミングでVS Codeを更新したい場合は[自動更新の無効化](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) ができます。

## Insider Nightly Build <a id="nsiders-nightly-build"></a>

新しい機能やバグ修正を早期に試したくなったら、[Insiders build](/insiders)をインストールできます。Insiderは月例の安定ビルドとは別にインストールを構築して、同じコンピューター上でそれぞれ自由に動作します。Insider BuildはVS Code開発チームが日々作成したものと同じです。新しい機能を試してフィードバックをいただき本当に感謝しています。

## 追加コンポーネント <a id="additional-components"></a>

VS Codeとはエディターでありsmall footprint(場所を取らない)ことに自信を持っています。何でもかんでも詰め込んだ従来のIDEとは異なり、気になる技術に合わせたインストール調整が可能です。VS Codeをカスタマイズする方法については、プラットホームガイドを参照してから[追加コンポーネント](/docs/setup/additional-components.md)を一読してください。

## 拡張機能

VS Codeの[拡張機能](/docs/userguide/extension-gallery.md)は、サードパーティーによる追加のサポートを可能にします:

* 言語 - [C++](/docs/languages/cpp.md), [C#](/docs/languages/csharp.md), [Go](/docs/languages/go.md), [Python](/docs/languages/python.md)
* ツール - [ESLint](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint), [JSHint](https://marketplace.visualstudio.com/items/dbaeumer.jshint) , [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell), [Visual Studio Team Services](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team)
* デバッガ - [Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [PHP XDebug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug).
* キーマップ - [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim), [Sublime Text](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings), [IntelliJ](https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings), [Emacs](https://marketplace.visualstudio.com/items?itemName=hiro-sun.vscode-emacs), [Atom](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings), [Visual Studio](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vs-keybindings), [Eclipse](https://marketplace.visualstudio.com/items?itemName=alphabotsec.vscode-eclipse-keybindings)

拡張機能はVS CodeのUI、コマンド、タスクへ統合しているため、VS Codeの共通インターフェイスに沿って様々なテクノロジーで簡単に操作できます。その一例を[Marketplace](https://marketplace.visualstudio.com/vscode)で確認してください

## プロキシサーバーのサポート <a id="proxy-server-support"></a>

多くの企業ではプロキシサーバーを通すため、直接インターネットにつなげることができません。プロキシサーバーの管理者は、[Marketplace](https://marketplace.visualstudio.com/vscode)へのアクセスを制限し[拡張機能](/docs/userguide/extension-gallery.md)のインストールを禁止できます。

プロキシサーバーを経由する環境で作業する場合は、次のいずれかの方法で設定を構築してください:

* OS環境設定で`http_proxy`と`https_proxy`を構築する

```bash
    SET http_proxy=https://10.203.0.1:5187/
```

* ユーザー[設定](/docs/getstarted/settings.md)(**ファイル** or **Code** > **基本設定**> **設定**)で `http.proxy`を構築する

```json
    "http.proxy": "https://10.203.0.1:5187/"
```

認証プロキシの場合

```json
    "http.proxy": "https://userid:password@10.203.0.1:5187/"
```

また、プロキシサーバーが自己署名証明書を使用している場合は`"http.proxyStrictSSL": false`に設定します。

>**Note:** VS Codeはhttpおよびhttpsプロキシをサポートしますが、SOCKSプロキシをサポートしません。

## 次のステップ

VS Codeをセットアップし終えたら、以下のトピックでVS Codeの詳細を学ぶことができます:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/userguide/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - Move quickly through your source code.
* [Debugging](/docs/userguide/debugging.md) - Debug your source code directly in the VS Code editor.

早速何かを試したい場合は[Node.js tutorial](/docs/nodejs/nodejs-tutorial.md)のチュートリアルを試してください。数分でWebアプリケーションをデバッグできます。

## よくある質問

**Q: VS Codeのシステム要件は何ですか？**

**A:** [システム要件](/docs/supporting/requirements.md)を参照してください。

**Q: VS Code本体のサイズは？**

**A:** VS Codeのダウンロードサイズは100MB未満で、200MBのディスクを消費します。ですからすぐにVS Codeをインストールして使用可能です。

**Q: 新しいプロジェクトを作成して実行するにはどうすればいいですか？**

**A:** VS Codeには従来の*新規プロジェクト 作成**またはプロジェクトテンプレートは実装されていません。ですから、開発の興味対象に応じて [追加コンポーネント](/docs/setup/additional-components.md)と足組を構成する必要があります。そこで、[Yeoman](http://yeoman.io/)や[NPM](https://www.npmjs.com/) を使用すると、 テンプレート、およびツールを使用してプロジェクトを作成できます。

**Q: VS Codeのバージョンはどこで確認できますか？**

**A:** LinuxとWindowsでは **[ヘルプ]** > **バージョン情報**。Macでは **Code** > **About Visual Studio Code** で確認します。

**Q: VS Codeが破損しているとメッセージを出します**

**A:** VS Codeはおそらく拡張機能による本体ファイルの変更を検出しました。VS Codeを再インストールすることで、影響を受けたファイルを再設置します。詳細については[FAQ topic](/docs/supporting/faq.md#installation-appears-to-be-corrupt) を参照してください。
