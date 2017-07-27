---
title: Visual Studio Code FAQ
MetaDescription: Our docs contain a Common Questions section. Here are items that don't fit in the other topics.
commitid: cb7fea9ffdf45442cba2666b4855d70339685bba
---

私たちのドキュメントには、特定のトピックについて必要に応じて**よくある質問**のセクションを設けています。そのトピックに当てはまらない項目をここにまとめました。

ここであなたの質問に対する回答が見つからない場合には [reported issues](https://github.com/microsoft/vscode/issues) や [Updates](/updates) を確認してください。

## VS CodeとVS Communityの違いは何ですか？

Visual Studio Codeはデバッグ、タスク、バージョンコントロールなどによる開発をサポートする合理化されたコードエディターです。開発者が迅速なCcode-Build-Debugに必要なツールだけを提供することを目的としており、複雑なワークフローはフル機能を持ったIDEにおいてきました。VS Codeの詳細な目標については [Why VS Code](/docs/getstarted/whyvscode.md) を参照してください。

## どのOSをサポートしますか？

Mac、Linux、Windowsで動作します。サポートしているバージョンについては[システム要件](/docs/supporting/requirements.html)を参照してください。プラットホーム別の詳細については[SETUP](/docs/setup/setup-overview.html)を参照してください。

## VS Codeは無料ですか？

はいVS Codeは無料の[オープンソース](https://github.com/microsoft/vscode)エディターです。

##  VS Codeのバージョンはどこで確認できますか？*

バージョン情報ダイアログで確認することができます。

Macでは、 **Code** > **About Visual Studio Code** へ移動します。

WIndowsとLinuxでは **ヘルプ** > **バージョン情報** へ移動します。

またVS Codeのバージョン番号の見方は 'major.minor.release' です。

## VS Codeの自動更新をどこで無効化しますか？

既定の設定では新しいアップデートがリリースされたときMacとWindowsで自動更新するよう設定されています。自動で更新を入手したくない場合は `update.channel` を `default` から `none` に設定することができます。

**ファイル** > **基本設定** > **設定** に移動して `update.channel` の値を "none" で追加してください。

```json
    "update.channel": "none"
```

なおVS Codeを以前のバージョンに戻したいときは、現在のバージョンをアンインストールし[Updates](/updates)から特定バージョンのダウンロードをインストールしてください。

(編集メモ: [有志](https://github.com/satokaz/tips/blob/master/vscode/Previous-Releases.md)によってダウンロードリンクがまとめられています。

>**Note:** LinuxではVS Codeリポジトリを正しくインストールできていれば、他のパッケージと同じ方法で自動更新するはずです。詳細は[Installing VS Code on Linux](/docs/setup/linux.md#updates)を参照してください。

## Licensing

### ライセンスの場所

VS Codeのインストール場所から`resources\app`フォルダーの下にVS Codeのライセンス、サードパーティー製品についての通知、[Chromium](https://www.chromium.org) オープンソースクレジットがあります。VS Codeの `ThirdPartyNotices.txt`、Chromiumの `Credits_*.html` そしてVS Codeの  `LICENSE.txt` は `resources\app` の下で利用できます。ローカライズされた `LICENSE.txt` は `resources\app\licenses` にあります。

### なぜVisual Studio Codeはvscode(GitHub repo) と違うライセンスなのですか？

なぜVisual Studio Codeとvscodeが異なるライセンスを持っているのかについては  [issue #60](https://github.com/Microsoft/vscode/issues/60#issuecomment-161792005) を参照してください。

(編集メモ: 内容を簡単にまとめると
Chrome OpenJDK Xamarin Studio IntelliJなどもブランド製品と公開コードのライセンスは異なっている。これをVS Codeにも適応させようと思った。

この仕組みの理由は簡単に言ってしまえば、MSから提供するVS Code(ブランド製品)と公開コードによって作られるvscodeは異なるからだ。例えば、フィードバックシステム、テレメトリレポート、ロゴ、名前などがブランド製品とは異なっている。こうした違いにライセンスを適応させたり違いをはっきりさせたりするため、ライセンスが異なっている。

最後に「Visual Studio Code」を「VS Code」と略したことでvscodeレポジトリと名前が似たことを謝罪します。これが混乱の原因になったことでしょう。

## VS Codeのプレリリース版をどこでテストできますか？

新しいVS Code機能を早く体験したいですか？"Insiders" ビルドをインストールすることでVS Codeのプレリリース版を試すことができます。Insiderは通常のVS Codeとは別にインストールを行い、設定、構成、拡張機能は独立しています。Insiderは夜間に更新するので、前日のバグ修正、機能更新を試すことができます。

InsiderビルドはInsidersの~~[download page](/insiders)~~で入手してください。

## VS Codeはフォルダーを開くと応答しなくなります

フォルダーを開いたときVS Codeはプロジェクトファイルを検索して追加ツールを提供します(例えばステータスバーのソリューションピッカー)。沢山のファイルとフォルダーを開くとき、検索にCPUリソースを大量に使うため応答が遅くなる場合があります。私たちは将来的に改善するつもりですが、今は設定によりエクスプローラーからフォルダーを除外することで検索量を減らして対応します。

```json
    "files.exclude": {
        "**/largeFolder": true
    }
```

## `csharp-o` 拡張が見つかりませんか？

起動時に `csharp-o` 拡張機能が見つからないというエラーが発生した場合には、以下のインストールディレクトリーを削除して解決することができます。

```
C:\Program Files (x86)\Microsoft VS Code\resources\app\extensions\csharp-o
```

## VS Codeのメインウィンドウは空白ですか？

Visual Studio Codeで使うElectronにはいくつかのGPUハードウェアアクセラレーション問題があります。真っ白なウィンドウが表示される場合には`--disable-gpu` を追加して起動してください。こうすることでGPUアクセラレーションを無効化することができます。

```bash
code --disable-gpu
```

## VS Codeが破損しているようです

VS Codeはインストールファイルの変更を検出するバックグラウンドチェックを行います。これは拡張機能がVS Codeファイルを変更することによって、問題の再現性が低下する可能性があるからです。変更を阻止しようとしているわけではありませんが、変更したことによりサポートされないバージョンを実行しているという意識を高めたいと考えています。VS Codeを再インストールすることで、変更ファイルを置き換え警告が消えます。

## クラッシュレポートを無効にする方法

クラッシュレポートを無効化するには **ファイル** > **基本設定** > **設定** に移動して次を設定します。

```json
    "telemetry.enableCrashReporter": false
```

**Important Notice**: オプションを有効にするには、再起動が必要です。

## テレメトリレポートを無効にする方法

VS Codeは利用状況データとエラーを収集しMicorosoftの製品とサービスを改善するレポートを送信します。[プライバシーに関する声明](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409)をよく確認してください。

あなたがMicrosoftにデータを送りたくない場合 `telemetry.enableTelemetry` を `false` に設定することができます。

**ファイル** > **基本設定** > **設定** に移動して次を設定します。

```json
    "telemetry.enableTelemetry": false
```

**Important Notice**: このオプションを有効にするには、再起動が必要です。拡張機能の中にはアドオンテレメトリを送信し、この設定を適用しない場合があります。

>**Note:** VS Code は Microsoft製やサードパーティー製の拡張機能をインストールするオプションを提供しています。これらの拡張機能は、独自のデータ収集をしている可能性があり `telemetry.enableTelemetry` によって制御されません。拡張機能のテレメトリレポートを確認するには、そのマニュアルを確認してください。

## 技術サポート

[Stack Overflow](https://stackoverflow.com/questions/tagged/vscode) で質問や回答の検索が可能です。また [GitHub repository](https://github.com/Microsoft/vscode/blob/master/CONTRIBUTING.md) に問題と機能のリクエストを直接届けることもできます。

サポートエンジニアに直接連絡したくなったら [Microsoft assisted support team](https://support.microsoft.com/en-us/assistedsupportproducts) に連絡してください。
