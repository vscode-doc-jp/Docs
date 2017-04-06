---
title: Extension Manifest - package.json
MetaDescription: At the core of Visual Studio Code's extensibility model is an extension (plug-in) manifest file where your extension declares its extension type(s), activation rules and runtime resources.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---



全てのVisual Studio Code拡張機能には、拡張機能フォルダのルートにマニフェストファイル`package.json`が必要です。

## Fields

Name | Required | Type | Details
---- |:--------:| ---- | -------
`name` | Y | `string` | 拡張機能の名称です。スペースなしの小文字でなければなりません。
`version` | Y | `string` | [SemVer](http://semver.org/lang/ja//)に従います。
`publisher` | Y | `string` | 拡張機能の[公開者名](/docs/extensions/publish-extension.md#publishers-and-personal-access-tokens)です。
`engines` | Y | `object` | 拡張機能とVS Codeバージョンの互換性です。`vs code`を含む最小バージョンを指定します。`*`を指定することはできません。例: `^0.10.5`を指定したなら`^0.10.5`以降に互換性があることを示します。
`license` | | `string` | [npm's documentation](https://docs.npmjs.com/files/package.json#license)を参照してください。ルートに`LICENSE`ファイルを配置した場合は値を`"SEE LICENSE IN <filename>"`にすることを推奨します。
`displayName` | | `string`| Marketplaceで使用する拡張機能の表示名です。
`description` | | `string` | 短くまとめた拡張機能の説明です。
`categories` | | `string[]` | 拡張機能のカテゴリーを指定します。値は`[Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, Other]`を利用可能です。
`keywords` | | `array` | 検索に役立つ**Keywords**を指定します。
`galleryBanner` | | `object` | アイコンに合うようにMarketplaceのフォーマット(主にバナー)を指定します。詳細は下記を参照してください。
`preview` | | `boolean` |MarketplaceのラベルにPreviewフラグを設定します。
`main` | | `string` | 拡張機能のエントリーポイントを指定します。
[`contributes`](/docs/extensionapi/extension-points.md) | | `object` | 拡張機能の[コントリビューション](/docs/extensionapi/extension-points.md)を指定するオブジェクトです。
[`activationEvents`](/docs/extensionapi/activation-events.md) | | `array` | 拡張機能を[ロードするタイミング](/docs/extensionapi/activation-events.md)を指定します。
`badges` | | `array` | Marketplaceのサイドバーに表示するバッジの配列です。例: バッジの画像URLを示す`url`、バッジのリンク先`href`と`description`
`markdown` | | `string` | MarketplaceのMarkdownレンタリングエンジンを制御します。`github`(既定)か`standard`のいずれかを指定します。
`dependencies` | | `object` | 拡張機能に必要なランタイムNode.js依存関係を指定します。[npm's `dependencies`](https://docs.npmjs.com/files/package.json#dependencies)と同じです。
`devDependencies` | | `object` | 拡張機能に必要なデベロップメントNode.js依存関係を指定します。[npm's `devDependencies`](https://docs.npmjs.com/files/package.json#devdependencies)と同じです。
`extensionDependencies` | | `array` | 拡張機能IDの配列を指定します。VS Code内に指定した拡張機能がなければこれらをインストールします。このIDは常に`${publisher}.${name}`です。例: `vscode.csharp` (編集メモ:Extension Packで主に使用します。
`scripts` | | `object` | [npm's `scripts`](https://docs.npmjs.com/misc/scripts)と同じですが[extra VS Code specific fields](/docs/extensions/publish-extension.md#pre-publish-step)を使用できます。
`icon` | | `string` | 128x128pxアイコンへのファイルパスを指定します。

また[npm's `package.json` reference](https://docs.npmjs.com/files/package.json)を確認してください。

## Example

次に完全な`package.json`を示します。

```json
{
    "name": "spell",
    "displayName": "Spelling and Grammar Checker",
    "description": "Detect mistakes as you type and suggest fixes - great for Markdown.",
    "icon": "images/spellIcon.svg",
    "version": "0.0.19",
    "publisher": "seanmcbreen",
    "galleryBanner": {
        "color": "#0000FF",
        "theme": "dark"
    },
    "license": "SEE LICENSE IN LICENSE.md",
    "bugs": {
        "url": "https://github.com/Microsoft/vscode-spell-check/issues",
        "email": "smcbreen@microsoft.com"
    },
    "homepage": "https://github.com/Microsoft/vscode-spell-check/blob/master/README.md",
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/vscode-spell-check.git"
    },
    "categories": [
        "Linters", "Languages", "Other"
    ],
    "engines": {
        "vscode": "^1.0.0"
    },
    "main": "./out/extension",
    "activationEvents": [
        "onLanguage:markdown"
    ],
    "contributes": {
        "commands": [
            {
                "command": "Spell.suggestFix",
                "title": "Spell Checker Suggestions"
            }
        ],
        "keybindings": [
            {
                "command": "Spell.suggestFix",
                "key": "Alt+."
            }
        ]
    },
    "badges": [
        {
            "url": "https://david-dm.org/Microsoft/vscode-spell-check.svg",
            "href": "https://david-dm.org/Microsoft/vscode-spell-check",
            "description": "Dependency Status"
        }
    ],
    "scripts": {
        "vscode:prepublish": "tsc -p ./",
        "compile": "tsc -watch -p ./"
    },
    "dependencies": {
        "teacher": "^0.0.1"
    },
    "devDependencies": {
        "vscode": "^1.0.0"
    }
}
```

## Marketplace Presentation Tips

ここでは[VS Code Marketplace](https://marketplace.visualstudio.com/VSCode)の見栄えをよくするヒントと推奨事項を説明しています。

常に最新の`vsce`を使用できるように`npm install -g vsce`を使用してください。

拡張機能のルートフォルダに`README.md`ファイルを置くことで、その内容をMarketplaceの拡張機能ページ本文に含めます。`REAMDE.md`内では相対パスの画像リンクを使用可能です。

次に例を示します:

1. [Spell-Checker](https://marketplace.visualstudio.com/items/seanmcbreen.Spell)
2. [MD Tools](https://marketplace.visualstudio.com/items/seanmcbreen.MDTools)


適切な表示名と説明を入力します。これはMarketplaceと製品の表示において重要です。これら文字列はVS Codeのテキスト検索にも使用されるため、関連するワードを使用することで多くに役立ちます。

```json
    "displayName": "Spelling and Grammar Checker",
    "description": "Detect mistakes as you type and suggest fixes - great for Markdown.",
```

アイコンと対比的なバナーの色は、Marketplaceのヘッダーを綺麗にします。`theme`属性にはフォントの色`dark`か`light`を指定できます。

```json
    "icon": "images/spellIcon.svg",
    "galleryBanner": {
        "color": "#5c2d91",
        "theme": "dark"
    },
```

あなたが設定できるオプションリンク(`bugs`, `homepage`, `repository`)があります。これはMarketplaceの**Resources**セクション下に表示します。

```json
    "license": "SEE LICENSE IN LICENSE.md",
    "bugs": {
        "url": "https://github.com/Microsoft/vscode-spell-check/issues"
    },
    "homepage": "https://github.com/Microsoft/vscode-spell-check/blob/master/README.md",
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/vscode-spell-check.git"
    }
```

Marketplace Resources link | package.json attribute
-----------------|-----------------------
Issues | `bugs:url`
Repository | `repository:url`
Homepage | `homepage`
License | `license`

拡張機能のために`category`を指定します。同じ`category`内の拡張機能は、Marketplaceで見つけやすいようにタグ分けされます。

>**Note:** あなたの拡張機能にあった値を指定してください。使用できる値は次の通りです。`[Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, Other]`

```json
    "categories": [
        "Linters", "Languages", "Other"
    ],
```

>**Tip:** [Extension Manifest Editor](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.extension-manifest-editor)を使うと、Marketplaceに公開されたときの`README.md`と`package.json`のメタデータがどのように見えるかをプレビューできます。

## Combining Extension Contributions

`yo code`ジェネレーターを使うとTextMateテーマ、カラライザー、スニペットを簡単にパッケージ化して新しい拡張機能を作成できます。これを実行したとき、ジェネレータはオプションに沿ってそれぞれ完全な独立型の拡張機能パッケージを作成します。しかし、複数のコントリビューションを組み合わせた拡張機能のほうが便利です。たとえば、新しい言語のサポートを追加する場合は、ユーザーにカラライザーとスニペット、さらにはデバッグサポートの両方の言語定義を提供したいと考えると思います。

拡張機能のコントリビューションを結合するには、既存の拡張マニフェスト`package.json`を編集して、新しいコントリビューションと関連ファイルを追加するだけです。

次は、LaTexの言語定義(言語識別とファイル拡張)、カラライザー(`grammar`)、スニペットを含む拡張マニフェストです。

```json
{
    "name": "language-latex",
    "description": "LaTex Language Support",
    "version": "0.0.1",
    "publisher": "someone",
    "engines": {
        "vscode": "0.10.x"
    },
    "categories": [
        "Languages",
        "Snippets"
    ],
    "contributes": {
        "languages": [{
            "id": "latex",
            "aliases": ["LaTeX", "latex"],
            "extensions": [".tex"]
        }],
        "grammars": [{
            "language": "latex",
            "scopeName": "text.tex.latex",
            "path": "./syntaxes/latex.tmLanguage"
        }],
        "snippets": [{
            "language": "latex",
            "path": "./snippets/snippets.json"
        }]
    }
}
```

`categories`属性がMarketplace上で見つけやすいように、`Languages`と`Snippets`の両方を含んでいることに注目してください。

>**Tip:** マージしたコントリビューションが同じ識別子を使用していることを確認してください。上記の例では、言語識別子に"latex"を使用しています。これによりVS Codeは、カラライザー (`grammar`) とスニペットがLaTeX言語用であり、LaTeXファイルを編集するときにアクティブになることを知ることができます。

## Extension Packs

また'Extension Packs'で別の拡張機能を含めることが可能です。Extension Packは、拡張機能を一緒にインストールできるセットのことです。これにより、お気に入りの拡張機能をほかのユーザーと共有したり、PHP開発のような特定シナリオ用の拡張機能セットを作成して、開発の準備を早める手助けできます。

Extension Packは他のコントリビューションを含めることができます。これは`package.json`ファイル内の`extensionDependencies`属性を使って表現します。

次の例ではPHP用のExtension Packにデバッガ、言語サービスおよびフォーマッタを含みます:

```json
  "extensionDependencies": [
      "felixfbecker.php-debug",
      "felixfbecker.php-intellisense",
      "Kasik96.format-php"
  ]
```

これによりExtension Packをインストールすると、VS Codeはその拡張機能の依存関係もインストールするようになりました。

なおExtension Packは`Extension Packs`のカテゴリーに分類する必要があります。

```json
  "categories": [
      "Extension Packs"
  ],
```

Extension Packには`yo code` Yeoman generatorを使用できます。オプションでVS Codeインスタンスに現在インストールされている拡張機能をパックに含めることも可能です。このように、お気に入りの拡張機能でExtension Packを簡単に作成し、Marketplaceに公開して他のユーザーと共有することができます。

## 便利なNodeモジュール

VS Code拡張機能の作成に役立つNode.jsモジュールがnpmjsにあります。これらを拡張機能の`dependencies`に含めることができます。

* [vscode-nls](https://www.npmjs.com/package/vscode-nls) - 外部化とローカライズのサポート
* [vscode-uri](https://www.npmjs.com/package/vscode-uri) - VS Codeとその拡張機能で使用されるURIの実装
* [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) - コメントを無視してJSONを処理する寛容なパーサー
* [request-light](https://www.npmjs.com/package/request-light) - 軽量のNode.jsリクエスト ライブラリ（プロキシサポートあり）
* [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) - VS Code拡張機能のためのテレメトリレポートの統一
* [vscode-languageclient](https://www.npmjs.com/package/vscode-languageclient) - [language server protocol](https://github.com/Microsoft/language-server-protocol)に準じた言語サーバーを簡単に統合

## 次のステップ

VS Codeの拡張モデルの詳細については次のトピックを試してください:

* [Contribution Points](/docs/extensionapi/extension-points.md) - VS Code contribution points reference
* [Activation Events](/docs/extensionapi/activation-events.md) - VS Code activation events reference
* [Extension Marketplace](/docs/getstarted/extension-gallery.md) - Read more about the VS Code Extension Marketplace
