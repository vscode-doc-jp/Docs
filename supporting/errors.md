---
title: よくあるエラーケース
MetaDescription: Several error conditions can easily be resolved by the user this page is designed to help un-block you.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

Visual Studio Codeで起こるエラーのいくつかは、回避したり解決したりすることが可能です。このトピックではよくあるエラーとその解決方法を説明します。

もし、これらの手段で問題が解決しないのなら未知のバグを発生させた可能性があります。[報告された問題](https://github.com/microsoft/vscode/issues)を確認して、他に同じ問題を抱えた人がいないか確認してください。

## 20002

>**Error:** Cannot find '/usr/bin/gnome-terminal' for launching your Node.js program

LinuxのVS CodeでNode.jsデバッガを使ってNode.jsを起動するには**gnome-terminal**が必要です。
gnome-terminalをインストールしていない場合、VS Codeデバッガはデバッグのためにプログラムを起動できません。

この問題を解決するには、次の2つの方法があります:

* `sudo apt-get install gnome-terminal`(Linux distribution)を実行してgnome-terminalをインストールします。
* Node.jsに`--debug`か`debug-brk`オプションを設定して、デバッグモードでプログラムを手動起動する。そのごVS Codeデバッガをport 5858にアタッチする。

## 20003

>**Error:** Attribute 'program' is not absolute; consider adding '${workspaceRoot}/' as a prefix to make it absolute.

VS code(release 0.10.11)より前は、起動設定で相対パスを使用できました。そのためVS Codeは暗黙的に絶対パスに変換してきました。

しかしこれには2つの問題があります:

- VS Codeは`program`、`cwd`、`outFiles`のような一般的な属性パスのみ変換します。ゆえに引数や環境変数に設定される相対パスは固定されず、この動作は不透明でした。
- VS Codeは`lunch.json`のパスは修正しました。しかし `tasks.json`を修正せず、この矛盾はわかりづらいものでした。

以上から0.10.11から起動設定パスの変更をしなくなりました。これにより、起動設定で相対パスを利用している場合は、相対パスの先頭に`${workspaceRoot}/`を付けて絶対パスに修正する必要があります。
