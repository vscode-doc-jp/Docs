---
title: Linux で VS Code を実行する
MetaDescription: Get Visual Studio Code up and running on Linux.
commitid: 8f449295b321510871e357b12f9aaa6070944db3
---

## インストール <a id="installation"></a>

### Debian と Ubuntu <a id="debian-and-ubuntu-based-distributions"></a>

Debian / Ubuntu のディストリビューションで最も簡単にインストールする方法は [.deb package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760868) をダウンロードしてソフトウェアセンターからインストールするか、次のコマンドラインからインストールする方法です:

```bash
sudo dpkg -i <file>.deb
sudo apt-get install -f # Install dependencies
```

.deb パッケージをインストールすると apt リポジトリーと署名キーが自動的にインストールされ、パッケージシステムのメカニズムを使用して自動更新が有効になります。なお 32-bit や .tar.gz でも利用できます。~~[download page](/Download)~~

リポジトリとキーは次のスクリプトを使用して手動でインストールすることもできます:

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

インストールしたら、パッケージキャッシュを更新してインストールします:

```bash
sudo apt-get update
sudo apt-get install code # or code-insiders
```

### RHEL と Fedora と CentOS ディストリビューション

現在 yum リポジトリーに VS Code の安定版 64-bit が用意されています。次のスクリプトでキーとリポジトリをインストールしてください:

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
```

次にパッケージキャッシュを更新し、`dnf` (Fedora 22以降) を使用してインストールします:

```bash
dnf check-update
sudo dnf install code
```

古い `yum` を使用する場合:

```bash
yum check-update
sudo yum install code
```

### openSUSE と SLE

上記の yum リポジトリーは openSURE と SLE OS でも動作します。次のスクリプトでキーとリポジトリをインストールしてください:

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/zypp/repos.d/vscode.repo'
```

インストールしたら、パッケージキャッシュを更新してインストールします:

```bash
sudo zypper refresh
sudo zypper install code
```

### Arch Linux 用の AUR パッケージ

コミュニティーが管理している Arch User Repository(AUR) [package for VS Code](https://aur.archlinux.org/packages/visual-studio-code) があります。

### .rpm パッケージを手動でインストール

[.rpm package (64-bit)](https://go.microsoft.com/fwlink/?LinkID=760867) をダウンロードしてインストールすることもできますが、上記のリポジトリがインストールされていない限り自動更新は機能しません。一度ダウンロードしたパッケージは、`dnf` などのパッケージマネージャーを使用してインストールすることができます:

```bash
sudo dnf install <file>.rpm
```

32-bitや.tar.gzでも利用できます。~~[download page](/Download)~~

## アップデート

VS Code は毎月[新しいリリース](/updates)を提供しています。VS Code リポジトリーを正しくインストールできていれば、他のパッケージと同じ方法で自動更新するはずです。

## Node.js

Node.js とは JavaScript アプリケーションをビルド、実行するためのプラットホームおよびランタイムのことです。また Node.js モジュールのパッケージマネージャーである [NPM](https://www.npmjs.com/) も含まれます。ドキュメントでは Node.js と NPM を頻繁に利用し、VS Code のツールは Node.jsを必要とします(例: [extension generator](/docs/extensions/yocode.md))。

Linux に Node.js をインストールする場合は [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager) を参照して、Linux ディストリビューションに合わせた Nnode.js のパッケージとインストール手段を確認します。

JavaScript と Node.js の詳細については [Node.js tutorial](/docs/nodejs/nodejs-tutorial.md) を参照してください。

## 既定のテキストエディターに VS Code を設定

### xdg-open

次のコマンドで、`xdg-open` によって使用される (`text/plain`) を開くときに使用する既定のテキストエディターを設定できます:

```bash
xdg-mime default code.desktop text/plain
```

### Debian alternatives システム

Debian ディストリビューションでは、MIME タイプを気にすることなく [alternatives system](https://wiki.debian.org/DebianAlternatives) を使用して、既定の**エディタ**を設定できます。次を実行して code を選択してください:

```bash
sudo update-alternatives --set editor /usr/bin/code
```

## 次のステップ

VS Code のインストールが終わったら、次のトピックは VS Code の詳細を確認するのに役立ちます:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## よくある質問

### Azure VM の問題

"Running without the SUID sandbox "エラーとは何ですか?

気にしなくて平気です。無視してください。

### Debian とファイルの削除

Debian OS の VS Code エクスプローラーからファイルを削除するときにエラーを表示する場合は、 VS Code が使用するごみ箱を実装していない可能性があります。

この問題を解決するには次のコマンドを実行してください:

```bash
sudo apt-get install gvfs-bin
```

### ENOSPC エラー

このエラーは VS Code の file watcher にハンドルが不足していることを示します。現在の監視対象数上限を次のコマンドで表示します:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

`/etc/sysctl.conf` の最後に次のテキストを追加して、監視対象数上限を増やします:

```bash
fs.inotify.max_user_watches=524288
```

新しい値は `sudo sysctl -p` を実行して適用してください。[Arch Linux](https://www.archlinux.org/) では少し異なる動作をすることに注意してください。 [view this page for advice](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers)

監視可能なファイルの最大数は 524288 ですが、特にメモリーが制限される環境ではその数を減らすことをお勧めします。各ファイル監視は [540bytes(32bit) ~ 1kB(64bit)](https://stackoverflow.com/a/7091897/1156119) 消費します。ですから524288 wathces すべてを消費すると仮定すれば、上限が 256MB(32bit)  か 512MB(64bit) になると仮定できます。

### Ubuntu で中国語を表示しません

現在修正中です。それまでは次の方法で回避してください。 **ファイル** > **基本設定** > **設定** を選択したら、次のように `editor.fontFamily` を設定します。

```json
    "editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

### Package git is not installed

インストール時に表示するこのエラーは、一般に古いパッケージマネージャーを使っていることが原因です。更新して再度インストールしてください:

```bash
# For .deb
sudo apt-get update

# For .rpm (Fedora 21 and below)
sudo yum update

# For .rpm (Fedora 22 and above)
sudo dnf update
```

### Ubuntu で code bin コマンドはウィンドウを最前面に表示しません

VS Code が既にディレクトリーを開いているときに Ubuntu で 'code .' を実行しても VS Code を最前面で表示しません。これは OS 昨日の `ccsm` を使用して無効にできます。

```bash
# Install
sudo apt-get update
sudo apt-get install compizconfig-settings-manager

# Run
ccsm
```

**General** > **General Options** > **Focus & Raise Behaviour** に移動して "Focus Prevention Level" を "Off" に設定します。これは OS レベルの設定で、VS Code だけでなくすべてのアプリケーションに適用する設定であることに注意してください。
