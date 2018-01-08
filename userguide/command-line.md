---
title: コマンドライン
MetaDescription: Visual Studio Code command line options. Learn to control VS Code startup.
original: https://code.visualstudio.com/docs/editor/command-line
commitid: d957ba336aae16d4a6330875044372eae2bd1514
---
# Command Line Interface (CLI)

Visual Studio Code ではエディターの起動方法を制御できる強力なコマンドラインインターフェイスを用意しています。ファイルの比較、拡張機能のインストール、表示言語の変更でさえも起動時に設定できます。

**Note:** macOS のユーザーはまず `PATH` 環境変数に VS Code 実行可能ファイルを追加するコマンド (**Shell Command: Install 'code' command in PATH**) を実行する必要があります。詳細は [macOS Setup guide](/docs/setup/mac.md) を確認してください。

## コマンドラインから起動 <a id="launching-from-the-command-line"></a>

コマンドラインから VS Code を起動するとファイル、フォルダ、プロジェクトを素早く開くことができます。 フォルダのコンテキスト内で VS Code を開くことがよくあると思います。これを行うには、Stable と Insiders で次のコマンドのいずれかを入力します:

```bash
code .
または
code-insiders .
```

**Note**: Windows と Linux ではインストール時にシステム パスへ VS Code バイナリーの場所を追加します。インストール時に追加しなかった場合でも Path/$PATH 変数に手動で場所追加することができます。たとえば Windows では `Program Files\Microsoft VS Code\bin` の下に VS Code がインストールされます。プラットホーム固有の設定手順は  [Setup](/docs/setup/setup-overview.md) を参照してください。

## Core CLI オプション <a id="core-cli-options"></a>

コマンドラインで VS Code を `code` で起動するとき使用できるオプションの引数は次の通りです:

Argument|Description
------------------|-----------
`-h` or `--help` | 使用方法を表示します。
`-v` or `--version` | VS Code のバージョン (例: 1.12.2) と GitHub の commit ID を表示します。
`-n` or `--new-window`| 以前のセッションを復元する代わりに、新しいコードセッションを強制します。(既定)
`-r` or `--reuse-window` | 最後のアクティブ ウィンドウでファイルまたはフォルダーを強制的に開きます。
`-g` or `--goto` | *file:line[:character]* と一緒に使用することで特定の行と位置でファイルを開きますこの引数は OS によってはファイル名に`:`を含むことを許容するものがあるので提供されます。
`-d` or `--diff` | ファイルの差分エディターを開きます。引数に 2 つのファイルパスが必要です。
`-w` or `--wait` | 現在のウィンドウを閉じるまでコマンド待機します。
`--locale` | VS Code の[表示言語](/docs/getstarted/locales.md)(locale)を指定して起動します。(例: `en-US` `zh-TW)

## ファイルとフォルダーを開く <a id="opening-files-and-folders"></a>

場合によってはファイルを開いたり作成したりすることもあります。指定したファイルが存在しない場合 VS Code はそのファイルを作成します:

```bash
code index.html style.css readme.md
```

ファイルとフォルダーの両方に対して絶対パスまたは相対パスを使用できます。相対パスは`code`を実行するコマンドプロンプトの現在のディレクトリーからのパスです。

コマンドラインで複数のファイルを指定すると、VS Code は単一のインスタンスのみを開きます。

コマンドラインで複数のフォルダーを指定すると VS Code は各フォルダーを含む[マルチルート ワークスペース](/docs/editor/multi-root-workspaces.md)を作成します。

Argument|Description
------------------|-----------
*file* | ファイルを指定してひらく。ファイルが存在しない場合は、作成して編集済みとして記録します。各ファイル名をスペースで区切って複数のファイルを指定することができます。
*file:line[:character]* | ファイルを特定の行か文字を指定して開く。この方法で複数のファイルを指定できますが、*file:line[:character]* の前に `-g` 引数を指定する必要があります。
*folder* | 開くフォルダーの名前。複数のフォルダーを指定すると新しい[マルチルート ワークスペース](/docs/editor/multi-root-workspaces.md)が作成されます。

## 拡張機能 <a id="working-with-extensions"></a>

拡張機能のインストール、無効化などはコマンド ラインから行うことができます。

Argument|Description
------------------|-----------
`--install-extension <ext>` | 拡張機能をインストールします。引数として完全な拡張機能名`publisher.extension`を指定します。
`--uninstall-extension <ext>` | 拡張機能をアンインストールします。引数として完全な拡張機能名`publisher.extension`を指定します。
`--disable-extensions` | インストール済みのすべての拡張機能を無効にします。拡張機能を`Extensions: Show Installed Extensions`で表示しますが、アクティブになることはありません。
`--list-extensions` | インストール済み拡張機能の一覧を表示します。
`--show-versions` | `--list-extensions`と一緒に使うことで、インストールされている拡張機能のバージョンを表示します。
`--enable-proposed-api <ext>` | 拡張機能に対してProposed API(提案 API)機能を有効にします。引数として完全な拡張機能名`publisher.extension`を指定します。

## Advanced CLI オプション <a id="advanced-cli-options"></a>

ERRORの再現や高度な起動に役立つ CLI オプションが用意されています。

Argument|Description
------------------|-----------
`--extensions-dir <dir>` | 拡張機能のルートパスを指定します。
`--user-data-dir <dir>` | ユーザーデータを保存するディレクトリーを指定します。ルートとして実行する場合に便利です。
`-p, --performance` | **Developer: Startup Performance** コマンドを有効にして起動します。
`--disable-gpu` | GPUハードウェアアクセラレーションを無効にします。
`--verbose` | 詳細出力で表示します (`--wait`を含みます)
`--prof-startup` | 起動時にCPUプロファイラを実行します。
**Multi-root**|
`--add <dir>` | 最後にアクティブなウィンドウのマルチルート ワークスペースにフォルダーを追加します。

## URL で VS Code を開く <a id="opening-vs-code-with-urls"></a>

Windows や macOS ではプラットホームの URL 処理メカニズムを使用してプロジェクトやファイルを開くこともできます。次のような URL の形式を使用してください:

プロジェクトを開く

```
vscode://file/FULL/PATH/TO/PROJECT/
```

ファイルを開く

```
vscode://file/FULL/PATH/TO/FILE
```

行と列を指定してファイルを開く

```
vscode://file/FULL/PATH/TO/FILE:LINE:COLUMN
```

> **Note:** URL を解析してリダイレクトできるブラウザーやファイル エクスプローラーなどのアプリケーション内でこの URL 使用できます。たとえば Windows では Windows Explorer に `vscode://` で直接渡したり、コマンド ラインには `start vscode://file/FULL/PATH/TO/FILE` を渡したりすることができます。

## 次のステップ

次を見てください:

* [Basic Editing](/docs/editor/codebasics.md) - Learn the basics of the VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - VS Code lets you quickly understand and move through your source code.
