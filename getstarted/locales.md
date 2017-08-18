---
title: 表示言語
MetaDescription: How to change the display language (locale) of Visual Studio Code.
commitid: 8f449295b321510871e357b12f9aaa6070944db3
---

Visual Studio Code では次10ヵ国語の言語パックを提供しています。英語(米国)、簡体字中国語、繁体字中国語、フランス語、ドイツ語、イタリア語、日本語、韓国語、ロシア語、スペイン語です。なお言語パックは VS Code にすでに含まれるため追加インストールする必要はありません。

表示言語を既定でOSの言語に設定しますが言語がサポートされていない場合は英語(米国)を選択します。

## 利用可能な言語 <a id="available-locales"></a>

| Display Language    | Locale  |
| ------------------- | ------- |
| English (US)        | `en`    |
| Simplified Chinese  | `zh-CN` |
| Traditional Chinese | `zh-TW` |
| French              | `fr`    |
| German              | `de`    |
| Italian             | `it`    |
| Japanese            | `ja`    |
| Korean              | `ko`    |
| Russian             | `ru`    |
| Spanish             | `es`    |

## 言語設定 <a id="setting-the-language"></a>

表示言語を変更したい場合はコマンドラインで `--local` を使った起動で一時的に変更するか、**Configure Language** コマンドで永続的に変更します。次の例を確認してください。

起動オプション `--locale` オプションによるフランス語に設定する例:

```bash
code . --locale=fr
```

## 言語設定のコマンド <a id="configure-language-command"></a>

**Configure Language** コマンドは `Code\User` に `locale.json` を作成します。このファイルの `locale` 属性を上記の Local に設定することで言語を変更します。

`kb(workbench.action.showCommands)` を押してコマンドパレットを表示したら `config` と入力して `configure Language` でフィルターをかけてください。

![configure language command ](images/locales/configure-language-command.png)

`kbstyle(Enter)` で確定すれば `locale.json` と規定値をOSの言語で生成します。この値を IntelliSence(`kb(editor.action.triggerSuggest)`) を使用してサポートしている言語を選択します。

![locale IntelliSense](images/locales/locale-intellisense.png)

`locale.json` を保存したら VS Code を再起動して新しい表示言語を使用できます。

VS Code 設定による簡体字中国語に設定する例:

```json
{
    // Defines VS Code's display language.
    "locale":"zh-CN"
}
```

また **Configure Language** を再度実行することで `locale.json` は再度呼びだすことが可能です。

>**Note:** 変更した `locale` の値を適用するには VS Code を再起動する必要があります。
