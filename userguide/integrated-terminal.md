---
title: 統合ターミナル
MetaDescription: Visual Studio Code has an integrated terminal so you can work in the shell of your choice without leaving the editor.
commitid: cb7fea9ffdf45442cba2666b4855d70339685bba
---

Visual Studio Code内でワークスペースのルートの統合ターミナルを開くことができます。これはコマンドラインのタスクを実行するためにウィンドウを切り替えたり、既存ターミナルの状態を変更する必要がないので、非常に便利です。

ターミナルを開くには:

* `kb(workbench.action.terminal.toggleTerminal)`を使用します。
* **表示** > **統合ターミナル** を使用します。
* **コマンドパレット**(`kb(workbench.action.showCommands)`) から **View:Toggle Integrated Terminal** コマンドを使用します。

![Terminal](images/integrated-terminal/integrated-terminal.png)

> **Note:** 今まで通りVS Codeの外で作業するときは、エクスプローラーで**Open in Command Prompt**コマンド(Mac Linuxでは**Open in Terminal**)を使用して外部のシェルを開いてください。

## 複数の端末を管理する <a id="managing-multiple-terminals"></a>

さまざまな場所を開く複数のターミナルを作成でき、その間を簡単に移動することができます。ターミナルのインスタンスは**ターミナル**パネル右上にあるプラスアイコンから追加するか`kb(workbench.action.terminal.new)`コマンドで追加できます。これによりドロップダウンメニューではこのエントリーが追加され、これらを切り替えることができるようになります。

![Multiple Terminals](images/integrated-terminal/terminal-multiple-instances.png)

ここではゴミ箱ボタンをおすことで、ターミナルのインスタンスを削除します。

>**Tip:** 複数のターミナルを大々的に使用する場合は、[キーバインドのセクション](/docs/userguide/integrated-terminal.md#key-bindings)で解説されている`focusNext`、`focusPrevious`、`kill`コマンドをキーバインドに追加して、それらの間の移動をキーボードのみで可能にすることができます。

## 構成 <a id="configuration"></a>

シェルはLinuxとOS Xで`$SHELL`、Windows 10ではPowerShellが旧Windowsではcmd.exeが使用されます。これらは[設定](/docs/getstarted/settings.md)で`terminal.integrated.shell.*`を設定するとで上書きされます。引数は`terminal.integrated.shellArgs.*`設定を使用してLinuxとOS Xのターミナルシェルに渡すことができます。

### Windows <a id="windows"></a>

現在WIndows上のシェルの構成は、正しい実行可能ファイルの場所と設定の更新が問題となります。一般的なコマンドシェルのリストと既定の場所を次のリストに示します:

```json
// 利用可能なら 64-bit cmd そうでなければ 32-bit
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\cmd.exe"
// 利用可能なら 64-bit PowerShell そうでなければ 32-bit
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe"
// Git Bash
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
// Bash on Ubuntu (on Windows)
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"
```

>**Note:** 統合ターミナルとして使用するには、シェルの実行可能ファイルがコンソールアプリケーションである必要があります。つまり`stdin/stdout/stderr`がリダイレクトできるということです。

>**Tip:** 統合ターミナルはVS Codeのパーミッションで実行されます。管理者(administrator)権限または違うパーミッションでシェルコマンドを実行するときは、ターミナル内で`runas.exe`といったplatform utilitiesを使用してください。

### Linux & OS X <a id="linux-os-x"></a>

通常`$SHELL`はUnix系システムで基本のシェルですから、おそらくこのシェルを変更したいとは思わないでしょう。これの回避策に起動時に引数をシェルに渡すことができます。

たとえばbashを(`.bash_profile`を実行する)ログインシェルとして実行するには`-l`引数を渡します:

```json
// Linux
"terminal.integrated.shellArgs.linux": ["-l"]
// OS X
"terminal.integrated.shellArgs.osx": ["-l"]
```

## ターミナルの表示設定 <a id="terminal-display-settings"></a>

統合ターミナルのフォント、行の高さは次の設定でカスタマイズできます:

* `terminal.integrated.fontFamily`
* `terminal.integrated.fontSize`
* `terminal.integrated.lineHeight`

## キーバインド <a id="key-bindings"></a>

**View: Toggle Integrated Terminal** コマンドは`kb(workbench.action.terminal.toggleTerminal)`にバインドされ、統合ターミナルのパネルを素早く切り替えることができます。

統合ターミナルで素早い移動に使用できるショートカットは次の通りです:

Key|Command
---|---
`kb(workbench.action.terminal.toggleTerminal)`|統合ターミナルの切り替え
`kb(workbench.action.terminal.new)`|新しいターミナルを作成
`kb(workbench.action.terminal.scrollup)`|スクロールアップ
`kb(workbench.action.terminal.scrolldown)`|スクロールダウン
`kb(workbench.action.terminal.scrollupPage)`|スクロールアップ(ページ)
`kb(workbench.action.terminal.scrolldownPage)`|スクロールダウン(ページ
`kb(workbench.action.terminal.scrollToTop)`|一番上にスクロール
`kb(workbench.action.terminal.scrollToBottom)`|一番下にスクロール
`kb(workbench.action.terminal.clear)`|ターミナルのクリア

その他ターミナルコマンドも利用可能で、好みのキーボードショートカットにバインドすることもできます。

次の通りです:

* `workbench.action.terminal.focus`: ターミナルにフォーカスこれは切り替えの様ですが、ターミナルを開いているとき非表示にするのではなくフォーカスします。
* `workbench.action.terminal.focusNext`: 次のターミナルにフォーカスします。
* `workbench.action.terminal.focusPrevious`: 前のターミナルにフォーカスします。
* `workbench.action.terminal.kill`：現在のターミナルインスタンスを削除します。
* `workbench.action.terminal.runSelectedText`: アクティブな端末で選択したテキストを実行します。

### 選択したテキストの実行 <a id="run-selected-text"></a>

`runSelectedText`コマンドを使用するにはエディター内でテキストを選択したのち、**コマンドパレット** (`kb(workbench.action.showCommands)`)を介して**Terminal: Run Selected Text in Active Terminal**を実行します。

![Run selected text](images/integrated-terminal/terminal_run_selected.png)

このターミナルは選択したテキストを実行しようとします。

![Run selected text result](images/integrated-terminal/terminal_run_selected_result.png)

アクティブなエディター内で選択済みのテキストがない場合は、ファイルすべての内容で実行します。これはスクリプトやバッチファイルの全体を実行する場合に便利です。ファイルを開いて **Terminal: Run Selected Text in Active Terminal**を実行してください。

### コピーアンドペースト <a id="copy-paste"></a>

コピペに使用するキーバインドはプラットホームの標準に従います:

* Linux: `kbstyle(Ctrl+Shift+C)`、`kbstyle(Ctrl+Shift+V)`
* Mac: `kbstyle(Cmd+C)`、`kbstyle(Cmd+V)`
* Windows: `kbstyle(Ctrl+C)`、`kbstyle(Ctrl+V)`

### 検索 <a id="find"></a>

統合ターミナルには`kb(workbench.action.terminal.focusFindWidget)`で起動できる基本的な検索機能があります。

LinuxやWindowsで`Ctrl+F`を実行したいとき、検索ウィジェットを表示するのではなく、シェルに文字を入力させたい場合は次のようにキーバインディングを削除するひつようがあります:

```js
{ "key": "ctrl+f", "command": "-workbench.action.terminal.focusFindWidget",
                      "when": "terminalFocus" },
```

### ターミナルセッションの名前を変更 <a id="rename-terminal-sessions"></a>

統合ターミナルセッションは**Terminal: Rename** (`workbench.action.terminal.rename`) コマンドを使用して名前を変更できます。新しい名前はターミナルセクションのドロップダウンで表示されます。

### 強制的にキーバインドをターミナルへ渡し通す <a id="forcing-key-bindings-to-pass-through-the-terminal"></a>

統合ターミナルにフォーカスがあるあいだ、キーストロークがターミナルに渡されるため多くのキーバインドは機能しません。`terminal.integrated.commandsToSkipShell`設定はこれを回避するのに使用できます。これにはシェルによるキーバインドの処理をスキップし、VS Codeのキーバインドシステムによって処理するようにしたいコマンドの配列を設定してください。既定では一般に使用されるキーバインドに加えすべてのターミナルのキーバインドを含んできます。

## よくある質問

### なぜ端末にフォーカスがあるときショートカット X が機能しないのですか？

現在のターミナルは多くのキーバインディングを隠してVisual Studio Codeが反応するのを防ぎます。例としてLinuxとWindowsの `kbstyle(F1)` **コマンドパレットを開く** や `kbstyle(Ctrl+P)` **Quick Open** などが挙げられます。これは、端末プログラムとキーバインドの両方またはいずれか一方に反応する可能性があるため必要なのです。特定のキーバインディングが端末によって処理されるのを防ぐブラックリストを作成する計画があります([#7269](https://github.com/Microsoft/vscode/issues/7269) を参照してください)。

### Windowsで統合ターミナルはcode 1で終了しました

これはWindowsをアップグレードした際に自動的に起こりやすい互換性モードで、VS Codeを実行したときに起こることがあります。解決には実行可能ファイルを右クリックしてプロパティを選択し、互換性のタブで"互換性モードで実行する"のチェックを外してください。

### WindowsのターミナルでCmderを使用することはできますか？

可能です。VS Codeで[Cmder](http://cmder.net/)コンソールエミュレータを使用するにはcmderのパスに次の内容で`vscode.bat`を作成する必要があります:

```bat
@echo off
SET CMDER_ROOT=C:\cmder (your path to cmder)
"%CMDER_ROOT%\vendor\init.bat"
```

次にVS Codeのユーザー設定で次を`settings.json`に追加します:

```json
"terminal.integrated.shell.windows": "C:\\WINDOWS\\sysnative\\cmd.exe",
"terminal.integrated.shellArgs.windows": ["/K", "C:\\cmder\\vscode.bat"]
```

Note: 上記の例はWindows 64bit上で32bitのVS Codeを使用しており、`sysnative`を使用する必要があります。64 bitのVS Codeを使用している場合は、`System32`を使用してください。
