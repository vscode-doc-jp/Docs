---
title: WindowsでVisual Studio Codeを起動する
MetaDescription: Get Visual Studio Code up and running on Windows
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

## インストール

1. Windows用の[Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534107)を入手する
2. ダウンロードを完了したら、インストーラー(VSCodeSetup-version.exe)を実行します。これには1分ほどかかります
3. 既定で64bitの場合には `C:\Program Files (x86)\Microsoft VS Code` にインストールします

Zip archiveは~~[こちら](/docs/?dv=winzip)~~

>**Note:** 起動には.NET Framework 4.5.2が必要です。Win7を利用している場合には[.NET Framework 4.5.2](https://www.microsoft.com/en-us/download/details.aspx?id=42643)がインストールされていることを確認してください。

>**Tip:** オプションで`code`を環境変数に追加することが可能です。追加すればそのフォルダから簡単にVS Codeを呼び出せます。ただしコンソールで環境変数の変更を有効にするには、インストール後にコンソールを再起動する必要があります。

## アップデート

VS Codeは毎月[新しいリリース](/updates)を提供しています。もし新しい更新が利用可能になればVS Codeは自動更新します。新しい更新の準備が整えばVS Codeでプロントが表示しますので、それに沿って更新します(更新に準備は必要ありません)。 更新を手動で行いたい場合は、[How do I opt out of auto-updates](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) を参照してください。

## 次のステップ

VS Codeをインストールしてセットアップし終えたら、次のトピックでVS Codeの詳細を学ぶことができます:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## よくある質問

### インストーラーのトラブル

まずインストーラーの代わりに~~[zip file](/docs/?dv=winzip)~~を試してください。この場合にはVS Codeを**Program Files**に解凍します(解凍場所は自由)。

>**Note:** Zipファイルによるインストールの場合には、[新しいリリース](/updates)ごとに手動で更新する必要があります。

### アイコンが不足しています

Win7, 8のマシンにVS Codeをインストールしましたが、一部アイコンを表示しません

VS Codeのアイコンは[SVG](https://ja.wikipedia.org/wiki/Scalable_Vector_Graphics)によって実現しています。ですから、.SVGは `image/svg+xml` と関連付けられている必要があります。私たちはこれを修正するオプションを検討していますが、現在は次の回避策を試してください:

コマンドプロントによる修正:

1. 管理者コマンドプロントを開く
2. `REG ADD HKCR\.svg /f /v "Content Type" /t REG_SZ /d image/svg+xml`を入力

レジストリ エディター(regedit)による修正:

1. `regedit`を実行
2. `HKEY_CLASSES_ROOT`を開く
3. `.svg`を検索
4. `Content Type`の値を`image/svg+xml`に設定
5. `regedit`を終了
