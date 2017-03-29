---
title: コマンドライン
MetaDescription: Visual Studio Code command line options. Learn to control VS Code startup.
commitid: 97b7ae9996f77dd4aa822fe8908c50863c4410d9
---

Visual Studio Codeでは強力なコマンドラインインターフェイスにより、エディターの起動方法を制御できます。ファイルの比較、拡張機能インストール、表示言語の変更を起動時オプションで行えます。

## コマンドラインからの起動

コマンドラインからVS Codeを起動するとファイル、フォルダーまたはプロジェクトを素早く開くことができます。 フォルダのコンテキスト内でVS Codeを開くことがよくあると思います。これを行う最善の方法は、次のように入力することです:

```
code .
```

>**Tip:** 私たちは[Setup](/docs/setup/mac.md)トピックで、ターミナル内からVS Codeを起動するMacユーザー向けの手順を紹介しています。WindowsとLinuxではインストール時に`PATH`環境変数を追加します。

場合によってはファイルを開いたり作成したりすることもあります。なお指定されたファイルが存在しない場合、VS Codeはそれらを作成します：

```
code index.html style.css readme.md
```

>**Tip:** ファイル名を空白で区切れば、複数指定することができます。

## 追加のコマンドライン引数

VS Codeを起動するときに`code`に追加できるコマンドライン引数は次のとおりです:

Argument|Description
------------------|-----------
`-h` or `--help` | 使用法を印刷します。
`-v` or `--version` | バージョンを印刷します。
`-n` or `--new-window`| 新しいコード インスタンスを強制します。
`-r` or `--reuse-window` | 最後のアクティブ ウィンドウにファイルまたはフォルダーを強制的に開きます。
`-g` or `--goto` | *file:line:character?*と一緒に使用することで特定の行と任意の文字位置でファイルを開きます。この引数はOSによってはファイル名に`:`を含むことを許容するものがあるので提供しています。
*file* | ファイルを指定してひらく。ファイルが存在しない場合は、作成して編集済みとしてマークします。各ファイル名をスペースで区切って複数のファイルを指定することができます。
*file:line:character?* | ファイルを任意の行か文字を指定して開く。この方法で複数のファイルを指定できますが、* file：line：character？*の前に `-g`引数を指定する必要があります。
*folder* | 開くフォルダーの名前。複数のフォルダーを指定できます。
`-d` or `--diff` | ファイルの差分エディターを開きます。引数として2つのファイルパスが必要です。
`--locale` | VS Codeの表示言語(locale)を指定して起動します。サポートされる言語: `en-US`, `zh-TW`, `zh-CN`, `fr`, `de`, `it`, `ja`, `ko`, `ru`, `es`
`--disable-extensions` | インストール済みのすべての拡張機能を無効にします。拡張機能を`Extensions: Show Installed Extensions`で表示しますが、アクティブになることはありません。
`--list-extensions` | インストール済み拡張機能の一覧を表示します。
`--install-extension` | 拡張機能をインストールします。引数として、完全な拡張機能名 `publisher.extension`を指定します。
`--uninstall-extension` | 拡張機能をアンインストールします。引数として完全な拡張機能名`publisher.extension`を指定します。
`-w` or `--wait` | 現在のウィンドウを閉じるまでコマンド待機します

(※オリジナルより)

ファイルとフォルダーの両方に対して、絶対パスまたは相対パスを使用できます。相対パスは`code`を実行するコマンドプロンプトの現在のディレクトリーからのパスです。

コマンドラインで複数のファイルまたはフォルダーを指定すると、VS Codeは単一のインスタンスのみを開きます。

## URLでVS Codeを開く

WindowsとmacOSでは、プラットホームのURL処理メカニズムを使用してプロジェクトやファイルを開くこともできます。次のようなURLフォーマットにしたがってください:

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
vscode://file/FULL/PATH/TO/FILE?LINE:COLUMN
```

## 次のステップ

次を見てください:

* [Basic Editing](/docs/userguide/codebasics.md) - Learn the basics of the VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - VS Code lets you quickly understand and move through your source code.
