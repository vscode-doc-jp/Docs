---
title: コマンドライン
MetaDescription: Visual Studio Code command line options. Learn to control VS Code startup.
commitid: 8f449295b321510871e357b12f9aaa6070944db3
---

Visual Studio Codeではエディターの起動方法を制御できる強力なコマンドラインインターフェイスを用意しています。ファイルの比較、拡張機能のインストール、表示言語の変更でさえも起動時に設定できます。

## コマンドラインからの起動 <a id="launching-from-the-command-line"></a>

コマンドラインからVS Codeを起動するとファイル、フォルダーまたはプロジェクトを素早く開くことができます。 フォルダのコンテキスト内でVS Codeを開くことがよくあると思います。これは次で行えます:

```
code .
```

Visual Studio Code Insidersビルドを使用している場合は次を入力します:

```
code-insiders .
```

>**Tip:** 私たちは[Setup](/docs/setup/mac.md)トピックで、ターミナル内からVS Codeを起動するMacユーザー向けの手順を紹介しています。WindowsとLinuxではインストール時に`PATH`環境変数を追加できます。

場合によってはファイルを開いたり作成したりすることもあります。なお指定されたファイルが存在しない場合、VS Codeはそれらを作成します:

```
code index.html style.css readme.md
```

>**Tip:** 半角スペースによってファイル名を区切れば複数指定できます。

## 追加のコマンドライン引数 <a id="additional-command-line-arguments"></a>

VS Codeを起動するときに`code`に追加できるコマンドライン引数は次のとおりです:

| Argument                      | Description                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `-h` or `--help`              | 使用方法を表示します。                                                                                                     |
| `-v` or `--version`           | VS Codeのバージョン(例: 1.12.2)とGitHubのコミットIDを表示します。                                                                      |
| `-n` or `--new-window`        | 以前のセッションを復元する代わりに、新しいコードセッションを強制します。(既定)                                                                   |
| `-r` or `--reuse-window`      | 最後のアクティブ ウィンドウでファイルまたはフォルダーを強制的に開きます。                                                                           |
| `-g` or `--goto`              | *file:line[:character]*と一緒に使用することで、特定の行と位置でファイルを開きますこの引数はOSによってはファイル名に`:`を含むことを許容するものがあるので提供しています。 |
| *file*                        | ファイルを指定してひらく。ファイルが存在しない場合は、作成して編集済みとして記録します。各ファイル名をスペースで区切って複数のファイルを指定することができます。              |
| *file:line[:character]*       | ファイルを特定の行か文字を指定して開く。この方法で複数のファイルを指定できますが、*file:line[:character]*の前に `-g`引数を指定する必要があります。        |
| *folder*                      | 開くフォルダーの名前。複数のフォルダーを指定できます。各フォルダーにはインスタンスが存在します。                                                          |
| `-d` or `--diff`              | ファイルの差分エディターを開きます。引数に、2つのファイルパスが必要です。                                                                        |
| `-w` or `--wait`              | 現在のウィンドウを閉じるまでコマンド待機します。                                                                                         |
| `--locale`                    | VS Codeの[表示言語](/docs/getstarted/locales.md)(locale)を指定して起動します。(例: `en-US`  `zh-TW)                           |
| `--user-data-dir <dir>`       | ユーザーデータを保存するディレクトリーを指定します。ルートとして実行する場合に便利です。                                                               |
| **Extensions**                |
| `--install-extension <ext>`   | 拡張機能をインストールします。引数として完全な拡張機能名`publisher.extension`を指定します。                                              |
| `--uninstall-extension <ext>` | 拡張機能をアンインストールします。引数として完全な拡張機能名`publisher.extension`を指定します。                                            |
| `--disable-extensions`        | インストール済みのすべての拡張機能を無効にします。拡張機能を`Extensions: Show Installed Extensions`で表示しますが、アクティブになることはありません。         |
| `--extensions-dir <dir>`      | 拡張機能のルートパスを指定します。                                                                                               |
| `--list-extensions`           | インストール済み拡張機能の一覧を表示します。                                                                                       |
| `--show-versions`             | `--list-extensions`と一緒に使うことで、インストールされている拡張機能のバージョンを表示します。                                                   |
| `--enable-proposed-api <ext>` | 拡張機能に対してProposed API(提案API)機能を有効にします。引数として完全な拡張機能名`publisher.extension`を指定します。                 |
| **Performance**               |
| `-p, --performance`           | **Developer: Startup Performance**コマンドを有効にして起動します。                                                                |
| `--disable-gpu`               | GPUハードウェアアクセラレーションを無効にします。                                                                                          |
| `--verbose`                   | 詳細出力で表示します(`--wait`を含みます)                                                                                       |
| `--prof-startup`              | 起動時にCPUプロファイラを実行します。                                                                                             |

ファイルとフォルダーの両方に対して絶対パスまたは相対パスを使用できます。相対パスは`code`を実行するコマンドプロンプトの現在のディレクトリーからのパスです。

コマンドラインで複数のファイルを指定すると、VS Codeは単一のインスタンスのみを開きます。

## URLでVS Codeを開く <a id="opening-vs-code-with-urls"></a>

WindowsとmacOSでは、プラットホームのURL処理メカニズムを使用してプロジェクトやファイルを開くこともできます。次のようなURLの形式を使用してください:

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

> Note: URLを解析してリダイレクトできるブラウザーやファイルエクスプローラーなどのアプリケーション内でこのURL使用できます。たとえばWindowsでは、Windows Explorerに`vscode://` で直接渡したり、コマンドラインには`start vscode://file/FULL/PATH/TO/FILE`を渡したりすることができます。

## 次のステップ

次を見てください:

* [Basic Editing](/docs/userguide/codebasics.md) - Learn the basics of the VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - VS Code lets you quickly understand and move through your source code.
