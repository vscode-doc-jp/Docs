---
title: テーマ
MetaDescription: Changing the color theme in Visual Studio Code. You can use color themes provided by VS Code, the community or create your own new themes.  TextMate .tmTheme files are supported.
commitid: 376b3af6621b565b0e76f35f9afadbf4d949be68
status: old
---

## 配色テーマ <a id="color-themes"></a>

配色テーマを使用することで好みや作業環境に合わせたVS Codeの背景、テキスト、言語構文の色に変更できます。VS Codeは大きく分けてlight、dark、high contrastテーマをサポートしています。

![Preview themes from the Command Palette](images/themes/themes_hero.gif)

## 配色テーマを選択 <a id="selecting-the-color-theme"></a>

現在の配色テーマは、[設定](/docs/getstarted/settings.md)で構成します。

```javascript
  // ワークベンチで使用する配色テーマを指定します。
  "workbench.colorTheme": "Default Dark+"
}
```

ただし、直接編集する必要はありません。配色テーマ選択を使用して、テーマをプレビューしながら選択する方が簡単です。

1. **ファイル**(**Code**>)>**基本設定**>**配色テーマ**でテーマ選択を開きます。
2. カーソルキーを使用して配色テーマをプレビューします。
3. 配色テーマを選択して、`kbstyle(Enter)`で確定します。

![Themes in the Command Palette](images/themes/colorthemes.png)

> **Tip:** 既定ではユーザー設定に設定するので、すべてのワークスペースで適用します。しかし、ワークスペース特定の配色テーマを選択することも可能です。これには、ワークスペース設定で配色テーマを構成してください。

## Marketplaceから配色テーマを入手 <a id="color-themes-from-the-marketplace"></a>

VS Codeで初めからいくつかの配色テーマを用意しています。

その他多くのテーマは、コミュニティーによってVS Code [Marketplace](/docs/userguide/extension-gallery.md)にアップロードされています。使いたいものをインストールしたのち再起動して、新しいテーマを利用可能にします。

> **Tip:** テーマを検索するには、Extension ビュー(`kb(workbench.view.extensions)`)で`theme`を検索します。





## 既存のTextMateテーマを使用する <a id="using-existing-textmate-themes"></a>

既存のTextMateカラーテーマ (.tmTheme) をVS Codeに追加できます。例えば[Color Sublime](http://colorsublime.com/)にはいくつものTextMateテーマが用意されています。詳細についてExtension Authoringセクションの[Adding a new Theme](/docs/extensions/themes-snippets-colorizers.md#adding-a-new-theme)を参照してください。

## アイコンテーマ <a id="icon-themes"></a>

ファイルアイコンのテーマは拡張機能によって提供され、気に入ったものをユーザーが選択できます。ファイルアイコンはファイルエクスプローラーとタブ付き見出しに表示します。

## ファイルアイコンのテーマ選択 <a id="selecting-the-file-icon-theme"></a>

現在のファイル アイコンのテーマは、ユーザー[設定](/docs/getstarted/settings.md)に設定します。

```javascript
  // ワークベンチで使用するアイコンのテーマを指定します。
  "workbench.iconTheme": null
}
```

直接`settings.json`を編集する必要はありません。アイコン ファイルテーマ選択を使用して、テーマをプレビューしながら選択する方が簡単です。

1. **ファイル**(**Code**>)>**基本設定**>**ファイルアイコンのテーマ**でアイコン選択を開きます。
2. カーソルキーを使用してファイル アイコンのテーマをプレビューします。
3. ファイル アイコンのテーマを選択して、`kbstyle(Enter)`で確定します。

既定では、ファイル アイコン セットは設定されていないため、ファイル エクスプローラーにアイコンを表示しません。ですがファイル アイコンを一度設定すれば、次回VS Code起動時から適用して表示します。

VS Codeでは **Minimal** と **Seti** の2つを用意しています。もっと多くアイコンテーマをインストールするには、アイコンテーマ選択で **Find more in the Marketplace...** を選択します。

また、[VS Code Marketplace](https://marketplace.visualstudio.com/vscode/Themes)でテーマを探すこともできます。

## 独自のファイル アイコンのテーマを作成 <a id="usingcreating-your-ow-file-icon-theme"></a>

アイコン(SVGが好ましい)から独自のファイル アイコンのテーマを作成できます。詳細についてExtension Authoringセクションの[Adding a new Theme](/docs/extensions/themes-snippets-colorizers.md#adding-a-new-theme)を参照してください。

## 次のステップ

テーマはVS Codeカスタマイズの1つにすぎません。VS Codeのカスタマイズと拡張性について、次のトピックで詳細を参照してください:

* [Settings](/docs/getstarted/settings) -  Learn how to configure VS Code to your preferences through user and workspace settings.
* [Snippets](/docs/userguide/userdefinedsnippets.md) - Add additional snippets to your favorite language.
* [Extending Visual Studio Code](/docs/extensions/overview.md) - Learn about other ways to extend VS Code.
* [Themes, Snippets, and Colorizers](/docs/extensions/themes-snippets-colorizers.md) - You can package themes, snippets and language colorizers for use in VS Code.
