---
title: 表示言語
MetaDescription: How to change the display language (locale) of Visual Studio Code.
commitid: 42757495f4d9a4a7a959e45a7eb459c388b04aaf
---

Visual Studio Codeでは次10ヵ国語の言語パックを提供しています。英語(米国)、簡体字中国語、繁体字中国語、フランス語、ドイツ語、イタリア語、日本語、韓国語、ロシア語、スペイン語です。なお言語パックはVS Codeにすでに含まれるため、追加インストールする必要はありません。

表示言語を既定でOSの言語に設定しますが、言語がサポートされていない場合は英語(米国)を選択します。

## 利用可能な言語 <a id="available-locales"></a>

Display Language | Locale
-----------------|-------
English (US) | `en`
Simplified Chinese | `zh-CN`
Traditional Chinese | `zh-TW`
French | `fr`
German | `de`
Italian | `it`
Japanese | `ja`
Korean | `ko`
Russian | `ru`
Spanish | `es`

## 言語設定 <a id="setting-the-language"></a>

表示言語を変更したい場合はコマンドラインで`--local`を使った起動で一時的に変更するか、**Configure Language**コマンドで永続的に変更します。次の例を確認してください。

起動オプション `--locale` オプションによるフランス語に設定する例:

```bash
code . --locale=fr
```

## 言語設定のコマンド <a id="configure-language-command"></a>

** Configure Language **コマンドは`Code\User`に `locale.json`を作成します。このファイルの`locale`属性を前のLocalに設定することで言語を変更します。

`kb(workbench.action.showCommands)`を押してコマンドパレットを表示したら`config`と入力して`configure Language`でフィルターをかけてください。

![configure language command ](images/locales/configure-language-command.png)

`kbstyle(Enter)`で確定すれば`locale.json`と規定値をOSの言語で生成します。この値をIntelliSence(`kb(editor.action.triggerSuggest)`)を使用してサポートしている言語を選択します。

![locale IntelliSense](images/locales/locale-intellisense.png)

`locale.json`を保存したらVS Codeを再起動して新しい表示言語を使用できます。

VS Code設定による簡体字中国語に設定する例:

```json
{
    // Defines VS Code's display language.
    "locale":"zh-CN"
}
```

また**Configure Language**を再度実行することで `locale.json`は再度呼びだすことが可能です。

>**Note:** 変更した`locale`の値を適用するにはVS Codeを再起動する必要があります。
