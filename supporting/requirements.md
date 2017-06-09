---
title: システム要件
MetaDescription: Visual Studio Code hardware and platform (operating system) requirements.
commitid: 42757495f4d9a4a7a959e45a7eb459c388b04aaf
---

## ハードウェア

Visual Studio Codeのダウンロードサイズは100MB未満で、200MBのディスク領域を消費します。このサイズは今日のハードウェア上で簡単に実行可能です。

推奨環境:

* 1.6GHz以上のプロセッサー
* 1GBのRAM

## プラットホーム

VS Codeは次のプラットホームでテストしています:

* OS X Yosemite
* Windows 7 (with .NET Framework 4.5.2), 8.0, 8.1 および 10 (32-bit and 64-bit)
* Linux (Debian): Ubuntu Desktop 14.04, Debian 7
* Linux (Red Hat): Red Hat Enterprise Linux 7, CentOS 7, Fedora 23

### Windowsの追加要件

起動には.NET Framework 4.5.2が必要です。Win7を利用している場合には[.NET Framework 4.5.2](https://www.microsoft.com/en-us/download/details.aspx?id=42643)がインストールされていることを確認してください。

### Linuxの追加要件

* GLIBCXX version 3.4.15 以降
* GLIBC version 2.15 以降

現在知られている問題は[FAQ](faq)を参照してください。
