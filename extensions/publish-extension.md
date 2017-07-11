---
title: 拡張機能の公開
MetaDescription: Learn how to publish Visual Studio Code extensions to the public Marketplace and share them with other developers.
commitid: 42757495f4d9a4a7a959e45a7eb459c388b04aaf
---

## vsce - 公開ツールのリファレンス

[vsce](https://github.com/Microsoft/vsce)は[Extension Marketplace](/docs/userguide/extension-gallery.md)に拡張機能を公開するために使用するコマンドラインツールです。拡張機能をローカルに読み込んだりemailやUNCのドライブを経由して共有することもできます。

## インストール <a id="installation"></a>

[Node.js](https://nodejs.org/)がインストールされていることを確認します。次に以下を実行します:

```
npm install -g vsce
```

## 使い方 <a id="usage"></a>

コマンドラインから直接`vsce`コマンドを使用します。たとえば、拡張機能を素早く公開する方法は次の通りです:

```
$ vsce publish
Publishing uuid@0.0.1...
Successfully published uuid@0.0.1!
```

使用可能なすべてのコマンドの参考文献は`vsce --help`を実行して入手できます。

## 拡張機能の公開 <a id="publishing-extensions"></a>

Visual Studio Codeでは、Marketplaceのサービスに[Visual Studio Team Services](https://www.visualstudio.com/products/visual-studio-team-services-vs)を活用します。つまり、拡張機能の認証、ホスティング、管理はこれを通じて提供されます。

`vsce`は[Personal Access Tokens](https://www.visualstudio.com/en-us/news/2015-jul-7-vso.aspx)を使用してのみ拡張機能を公開できます。拡張機能を公開するには少なくとこれを1つ作成する必要があります。

### Personal Access Tokenを入手 <a id="get-a-personal-access-token"></a>

まず、[Visual Studio Team Services](https://www.visualstudio.com/en-us/get-started/setup/sign-up-for-visual-studio-online)アカウントを持っていることを確認します。

次の例でアカウントの名前は`monacotools`です。アカウントのホームページから(例: `https://monacotools.visualstudio.com`)、**Security**ページに移動します:

![Security page](images/publish-extension/publishers1.png)

新しいPersonal Access Tokenを作成するには**Add**をクリックします。

![Add personal access token](images/publish-extension/publishers2.png)

Personal Access Tokenに説明をつけ、必要に応じて有効期間を1年間に延長し、すべてのアカウントでアクセスできるようにして、権限を**all scopes**に設定します。

![Personal access token details](images/publish-extension/publishers3.png)

移動先では、新しく作成したPersonal Access Tokenが表示されます。**Copy**はパブリッシャーを作成するために必要です。

### パブリッシャーを作成 <a id="create-a-publisher"></a>

**パブリッシャー**とは、Visual Studio Code Marketplaceに拡張機能を公開できるユーザーのことです。すべての拡張機能は拡張機能の[`package.json` ファイル](/docs/extension/extension-manifest.md)に`publisher`名が要求されます。

一度[Personal Access Token](/docs/extensions/publish-extension.md#get-a-personal-access-token)を入手すれば、`vsce`を利用して新しいパブリッシャーを作成できます。

```bash
vsce create-publisher (publisher name)
```

`vsce`はパブリッシャーを将来参照できるように、Personal Access Tokenを記憶します。

**Note:** あるいは、次のセクションで説明するように、https://marketplace.visualstudio.com/manage でパブリッシャーを作成して、`vsce`でログインします。

### パブリッシャーにログイン <a id="login-to-publisher"></a>

作成済みのパブリッシャーを`vsce`で使用するには、次を使用してください:

```bash
vsce login (publisher name)
```

`create-publisher`コマンドと同様に、`vsce`はPersonal Access Tokenを要求したのち今後のコマンドのためにこれを記憶します。

オプションのパラメータ`-p <token>`を使用することで、発行とPersonal Access Tokenの入力を同時に行うこともできます。

```bash
vsce publish -p <token>
```

## 拡張機能のバージョンの自動インクリメント <a id="autoincrementing-the-extension-version"></a>

公開時に[SemVer](http://semver.org/)と一致する値を指定することで、拡張機能のバージョンを更新することができます:`major`、`minor`、`patch`

たとえば、拡張機能のバージョンを1.0.0から1.1.0に更新したいなら、`minor`を指定します。

```bash
vsce publish minor
```

これにより拡張機能の `package.json`で [version](/docs/extension/extension-manifest.md#fields)属性が変更されます。

また、コマンドラインで完全なSemVerを指定することもできます:

```bash
vsce publish 2.0.1
```

## 拡張機能のパッケージング <a id="packaging-extensions"></a>

Marketplaceに拡張機能を公開せずに、拡張機能をパッケージ化することができます。拡張機能は常に`.vsix`ファイルへパッケージ化されます。次のようにしてください:

```bash
vsce package
```

この操作は拡張機能を`.vsix`ファイルにパッケージ化し、現在のディレクトリーに配置します。`.vsix`ファイルはVisual Studio Codeにインストールすることが可能です。詳細は[Install from a VSIX](/docs/userguide/extension-gallery.md#install-from-a-vsix)を参照してください。

### 非公開的に共有する <a id="sharing-privately-with-others"></a>

拡張機能をプライベートで共有したいのであれば、拡張機能のパッケージ化ファイル`.vsix`を送ることでできます。

## VIsual Studio Codeの互換性

拡張機能を作成するときは、Visual Studio Codeとの互換性を記述する必要があります。これは`package.json`内の`engine.vscode`のフィールドで行うことができます:

```json
{
  "engines": {
    "vscode": "^1.8.0"
  }
}
```

`1.8.0`値はVS Code `1.8.0`としか互換性がないことを意味します。`^1.8.0`値はVS Code `1.8.0`とそれ以降に互換性があることを意味し、`1.8.1`、`1.9.0`を含むということです。


`engine.vscode`フィールドを使用することで、依存するAPIに合わせて拡張機能がインストールされるようにすることができます。この仕組みは、安定版リリースとInsiderで機能します。


たとえばVS Codeの最新の安定版が`1.8.0`で、`1.9.0`の開発中に新しいAPIが導入されたInsiderリリースの`1.9.0-insider`で利用可能になったとします。このAPIの恩恵を受けるバージョンを拡張機能で公開するには、バージョンの依存性を`^1.9.0`で示す必要があります・新しい拡張機能はVS Code`1.9.0`以上にのみインストールされます。つまり現在のすべてのInsiderユーザーはこれを入手でき、安定版のユーザーはバージョンが`1.9.0`になったときに更新を入手します。

## 高度な使い方 <a id="advanced-usage"></a>

### Marketplaceの統合 <a id="marketplace-integration"></a>

Visual Studio Marketplaceで拡張機能の見た目をカスタマイズすることができます。例については[Go extension](https://marketplace.visualstudio.com/items/lukehoban.Go)を参照してください。

Marketplace上の拡張機能の見栄えをよくするヒントをいくつか紹介します:

- 拡張機能のルートにある`README.md`ファイルを利用して、Marketplaceページの内容を入力します。`vsce`はREADMEのリンクを2通りの方法で変更できます:
  - `package.json`にGitHubの公開リポジトリの`repository`フィールドを追加すると、`vsce`はこれを自動的に検出しそれに応じてリンクを調整します。
  - `vsce package`を実行しているとき`--baseContentUrl`と`--baseImagesUrl`フラグを使用することで、動作を上書きしたり設定したりすることができます。次に、パッケージ化された`.vsix`ファイルを`vsce publish`の引数として拡張機能に渡して拡張機能を公開します。
- 拡張機能のルートにある`LICENSE`ファイルはライセンスの内容として使用されます。
- 拡張機能のルートにある`CHANGELOG.md`ファイルは変更履歴の内容として使用されます。
- `package.json`の`galleryBanner.color`に16進数を設定することでバナーの背景色を設定できます。
- `icon`を`package.json`の`128px`のPNGファイルへの相対パスに設定することで、アイコンを設定できます。

また[Marketplace Presentation Tips](/docs/extension/extension-manifest.md#marketplace-presentation-tips)も参照してください。

### `.vscodeignore` <a id="vscodeignore"></a>

`.vscodeignore`ファイルを作成して、拡張機能のパッケージからファイルを除外することができます。このファイルでは各行ごとに[glob](https://github.com/isaacs/minimatch)パターンで書き込めます。

例えば:

```
**/*.ts
**/tsconfig.json
!file.ts
```

実行時に不必要なファイルをすべて無視する必要があります。たとえばTypeScriptで書かれた拡張機能では、`**/*.ts`ファイルをすべて無視する必要があります。

**Note:** `devDependencies` に登録されている開発依存関係は自動的に無視されるので、`.vscodeignore`ファイルに追加する必要はありません。

### 公開前のステップ <a id="prepublish-step"></a>

マニフェストファイルに公開前のステップを追加することが可能です。このコマンドは拡張機能がパッケージ化されるたびに呼び出されます。

```json
{
    "name": "uuid",
    "version": "0.0.1",
    "publisher": "joaomoreno",
    "engines": {
        "vscode": "0.10.x"
    },
    "scripts": {
        "vscode:prepublish": "tsc"
    }
}
```

これにより、拡張機能をパッケージ化するとき[TypeScript](https://www.typescriptlang.org/)コンパイラーが呼び出されます。

## 次のステップ

* [Extension Marketplace](/docs/userguide/extension-gallery.md) - Learn more about VS Code's public extension Marketplace.
* [Testing Extensions](/docs/extensions/testing-extensions.md) - Add tests to your extension project to ensure high quality.

## よくある質問

**Q: 拡張機能を公開しようとすると403 Forbidden(または401 Unauthorized)エラーがでます。**

**A:** PAT(Personal Access Token)を作成するときに間違えやすいものとして、アカウントフィールドのドロップダウンで`all accessible accounts`を選択しないことです。またAuthorizedスコープを`All scopes`に設定して、拡張機能が公開されるようにする必要があります。

**Q: `vsce`ツールで発行を取り下げることができません。**

**A:** extension IDもしくはパブリッシャーの名前を変更した可能性があります。またツールを使用しなくても、Marketplaceの[管理ページ](https://marketplace.visualstudio.com/manage)で直接拡張機能を管理することができます。パブリッシャーの管理ページからは拡張機能のアップデートや公開の解除が行えます。

**Q: vsceがファイル属性を保持しないのはなぜですか？**

**A:** Windowsから拡張機能をビルドして公開する場合、拡張機能のパッケージに含まれるすべてのファイルにPOSIX属性、つまりexecutable bit(実行ビット?)がないことに注意する必要があります。いくつかの`node_modules`依存関係は正しく機能させるためにこれらの属性を当てにします。LinuxとOS Xから公開するときは期待通りに動作します。
