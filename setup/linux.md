---
title: LinuxでVisual Studio Codeを起動する
MetaDescription: Get Visual Studio Code up and running on Linux.
commitid: 97b7ae9996f77dd4aa822fe8908c50863c4410d9
---

## インストール

### DebianとUbuntuディストリビューション

Debian/Ubuntuディストリビューションでインストールするもっとも簡単な方法は、[.deb package (64-bit)](http://go.microsoft.com/fwlink/?LinkID=760868)をソフトウェアセンタからダウンロードしてインストールすることです。

```bash
sudo dpkg -i <file>.deb
sudo apt-get install -f # Install dependencies
```

.debパッケージをインストールすると、aptリポジトリーと署名キーを自動的にインストールして、通常の方式と同じように自動更新が有効になります。32-bitや.tar.gzでも利用できます。~~[download page](/Download)~~

リポジトリとキーは次のスクリプトを使用して、手動でインストールすることもできます:

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] http://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

そうしたらパッケージキャッシュを更新して、パッケージからインストールします:

```bash
sudo apt-get update
sudo apt-get install code # or code-insiders
```

### RHEL, FedoraとCentOSディストリビューション

現在yumレポジストリにVS Code安定版64-bitを準備しています。次のスクリプトでキーとリポジトリをインストールしてください:

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
```

そうしたらパッケージキャッシュを更新して、パッケージからインストールします:

```bash
yum check-update
sudo yum install code
```
### openSUSEとSLEディストリビューション

上記のyumレポジストリは、openSUREとSLE OSでも動作します。次のスクリプトでキーとリポジトリをインストールしてください:

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/zypp/repos.d/vscode.repo'
```

そうしたらパッケージキャッシュを更新して、パッケージからインストールします:

```bash
sudo zypper refresh
sudo zypper install code
```

### .rpmパッケージを手動でインストール

[.rpm package (64-bit)](http://go.microsoft.com/fwlink/?LinkID=760867)をダウンロードしてインストールすることもできますが、上記のリポジトリーがある場合を除き自動更新は機能しません。ダウンロードしたパッケージは、パッケージマネージャー(たとえばyum)を使ってインストールできます。

```bash
sudo yum install <file>.rpm
```

32-bitや.tar.gzでも利用できます。~~[download page](/Download)~~

## アップデート

VS Codeは毎月[新しいリリース](/updates)を提供しています。VS Codeレポジストリを正しくインストールできていれば、他のパッケージと同じ方法で自動更新するはずです。

## Node.js

Node.jsとはJavaScriptアプリケーションをビルド、実行するためのプラットホームおよびランタイムのことです。またNode.jsモジュールのパッケージマネージャーである[NPM](https://www.npmjs.com/)を含みます。ドキュメントではNode.jsとNPMを頻繁に利用し、VS Code toolはNode.jsを必要とします(例: [extension generator](/docs/extensions/yocode.md))

LinuxにNode.jsをインストールする場合[Installing Node.js via package manager](https://nodejs.org/en/download/package-manager)を参照して、Linuxディストリビューションに合わせたNnode.jsのパッケージとインストール手段を確認してください。

JavaScriptとNode.jsの詳細を知りたくなったら、VS CodeでNode.jsを実行してデバッグする方法[Node.js tutorial](/docs/nodejs/nodejs-tutorial.md)で確認してください。

## 既定のテキストエディターにVS Codeを設定

### xdg-open

次のコマンドで、`xdg-open`でテキストファイル(`text/plain`)を開くときに使用する既定のテキストエディターを設定します:

```
xdg-mime default code.desktop text/plain
```

### Debian alternativesシステム

Debianのディストリビューションでは、MIMEタイプを気にすることなく[alternatives system](https://wiki.debian.org/DebianAlternatives)を使用して、既定の**エディタ**を設定できます。これを設定するには、以下を実行してcodeを選択します:

```
sudo update-alternatives --set editor /usr/bin/code
```

## 次のステップ

VS Codeをインストールし終えたら、次のトピックでVS Codeの詳細を学ぶことができます。

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## よくある質問

### Azure VMの問題

"Running without the SUID sandbox"エラーとは何ですか?

気にしなくて平気です。無視してください。

### Debianとファイルの削除

Debian OSのVS Codeエクスプローラーからファイルを削除するときにエラーを表示する場合は、 VS Codeが使用するごみ箱を実装していない可能性があります。

この問題を解決するために次のコマンドを実行します:

```bash
sudo apt-get install gvfs-bin
```

### ENOSPCエラー

このエラーを表示したときVS Code file watcherはハンドルが不足していることを示します。現在の監視対象数上限を次のコマンドで表示します:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

`/etc/sysctl.conf`に次の文をファイルの最後に追加することで、監視対象数上限を増やします:

```
fs.inotify.max_user_watches=524288
```

新しい値は`sudo sysctl -p`を実行して適用してください。[Arch Linux](https://www.archlinux.org/)は少し異なる動作をすることに注意してください。[view this page for advice](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers)

監視可能なファイルの最大数は524288ですが、特にメモリーが制限されている環境にいる場合は、その数を減らすことをお勧めします。各ファイル監視は[540bytes(32bit) ~ 1kB(64bit)](http://stackoverflow.com/a/7091897/1156119)消費します。ですから524288 wathcesすべてを消費すると仮定すれば、上限が256MB(32bit)か512MB(64bit) になると仮定できます。

### Ubuntu版で中国語を表示しません

現在修正中です。その間次の方法で回避してください。**ファイル** > **基本設定** > **設定**を選択したら、次のように`editor.fontFamily`を設定します。

```json
    "editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

### Package git is not installed

インストール時に表示するこのエラーは、一般に古いパッケージマネージャーを使っていることが原因です。更新して、再度インストールしてください:

```bash
# For .deb
sudo apt-get update

# For .rpm (Fedora 21 and below)
sudo yum update

# For .rpm (Fedora 22 and above)
sudo dnf update
```

### code binコマンドは、ウィンドウをUbuntuの最前面に表示しない

VS Codeがすでにディレクトリーを開いているときUbuntuで 'code .'を実行すると、VS Codeを最前面で表示しません。これはOSの機能である`ccsm`を使用して無効にできます。

```
# Install
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# Run
ccsm
```

**General** > **General Options** > **Focus & Raise Behaviour**に移動して"Focus Prevention Level"を"Off"に設定します。これはOS levelの設定で、VS Codeだけでなくすべてのアプリケーションに適用する設定であることに注意してください。
