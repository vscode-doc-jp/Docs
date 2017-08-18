---
title: Windows で Visual Studio Code を起動する
MetaDescription: Get Visual Studio Code up and running on Windows
commitid: 8f449295b321510871e357b12f9aaa6070944db3
---

## インストール

1. Windows 用の [Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534107) を入手します。
2. ダウンロードを完了したら、インストーラー (VSCodeSetup-version.exe) を実行します。これには 1 分ほどかかります。
3. デフォルトでは 64 bit の場合 `C:\Program Files\Microsoft VS Code` にインストールされます。

Zip archive は~~[こちら](/docs/?dv=winzip)~~

>**Note:** 起動には .NET Framework 4.5.2 が必要です。Windows 7 を利用している場合には [.NET Framework 4.5.2](https://www.microsoft.com/en-us/download/details.aspx?id=42643) がインストールされていることを確認してください。

>**Tip:** オプションで `%PATH%` に Visual Studio Code を追加するので、コンソールから 'code.' を入力してそのフォルダーで VS  Code を開くようにできます。ただしコンソールでの環境変数の変更を有効にするにはインストール後にコンソールを再起動する必要があります。

## アップデート

VS Code は毎月[新しいリリース](/updates)を提供しています。もし新しい更新が利用可能になれば VS Code は自動更新をサポートします。新しい更新の準備が整えば VS Code でプロントが表示しますので、それに沿って更新します(更新に準備は必要ありません)。 更新を手動で行いたい場合は [How do I opt out of auto-updates](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) を参照してください。

## 次のステップ

VS Code のインストールが終わったら、次のトピックは VS Code の詳細を確認するのに役立ちます:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## よくある質問

### インストーラーのトラブル

まずインストーラーの代わりに~~[zip file](/docs/?dv=winzip)~~を試してください。この場合には VS Code を **Program Files** に解凍します(解凍場所は自由)。

>**Note:** Zip ファイルによるインストールの場合には[新しいリリース](/updates)ごとに手動で更新する必要があります。

### アイコンが不足しています

Win7, 8 のマシンに VS Code をインストールしました。なぜ一部のアイコンがワークベンチやエディターに表示されませんか?

VS Code のアイコンは [SVG](https://ja.wikipedia.org/wiki/Scalable_Vector_Graphics) によって実現しています。ですから .SVG は `image/svg+xml` と関連付けられている必要があります。私たちはこれを修正するオプションを検討していますが現在は以下の回避策を試してください:

コマンドプロントによる修正:

1. 管理者コマンドプロントを開く
2. `REG ADD HKCR\.svg /f /v "Content Type" /t REG_SZ /d image/svg+xml` を入力

レジストリエディター(regedit)による修正:

1. `regedit` を実行
2. `HKEY_CLASSES_ROOT` を開く
3. `.svg` を検索
4. `Content Type`の値を`image/svg+xml` に設定
5. `regedit` を終了
