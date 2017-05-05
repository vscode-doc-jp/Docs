---
title: CSS, Sass and Lessサポート
MetaDescription: Find out how Visual Studio Code can support your CSS, Sass and Less development.
commitid: 1f68e5e21c25890c3261c4f7c6203c8bb8a4ffe3
---

Visual Studio Codは、スタイルシートでCSS `.css`、 Sass `.scss`、 Less `.less`による編集を標準でサポートしています。拡張機能をインストールすることでより多くの機能性を得ることができます。

## IntelliSense

セレクター、プロパティ、値のサポートをしています。`kb(editor.action.triggerSuggest)`を使用して、提案リストを表示してください。

![IntelliSense in CSS](images/css/intellisense.png)

Proposals contain extensive documentation, including a list of browsers that support the property. 選択項目でこれを確認するには`kb(toggleSuggestionDetails)`を使用します。

## Emmet

`kb(editor.emmet.action.expandAbbreviation)`を押すとEmmet略語を展開します。

>**Tip:** 使用可能な略語については [Emmet cheat sheet](https://docs.emmet.io/cheat-sheet) のCSSセクションを参照してください。

CSS Emmetを他の言語で使用したい場合は、Emeet構文プロファイル(`html`, `css`など)を `emmet.syntaxProfiles` [設定](/docs/getstarted/settings.md)に関連付けることで可能です。その際の設定には[language id](/docs/languages/overview.md#language-id) を使用してください。

たとえば、JavaScript内でCSSのEmmet略語を使用するには、次のようにします:

```json
{
    "emmet.syntaxProfiles": {
        "javascript": "css"
     }
}
```

また[User Defined Snippets](/docs/userguide/userdefinedsnippets.md)もサポートしています。

## シンタックスとカラープレビュー

入力時に、構文の強調表示と色のプレビューを提供します。

![Syntax and color](images/css/color.png)

>**Note:** `.colorDecorators.enable`[設定](/docs/getstarted/settings.md)でカラープレビュ－を無効化できます。
>```json
>    "css.colorDecorators.enable": false
>```

## 構文の検証とLint

現在のサポートバージョンは、CSS 2.1以上、Sass 3.2以上、Less 2.3以上です。

> **注意: 各`.validate`を変更することで検証を無効化できます。ユーザーまたはワークスペース[設定](/docs/getstarted/settings.md)で次のように無効化してください。
>```json
>    "css.validate": false
>```

## ファイル内のシンボルに移動

`kb(workbench.action.gotoSymbol)`を押してください。

## ホバー

セレクターまたはプロパティにカーソルを合わせると、CSSルールに一致するHTMLスニペットを表示します。

![Hover in CSS](images/css/hover.png)

## 定義に移動と全ての参照検索

これは、同一ファイル内でのSassとLessの変数をサポートしています。また、[W3C 勧告案](https://drafts.csswg.org/css-variables/)による[CSS変数](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)もサポートしています。

>**Note:** ファイル参照('imports')等はサポートしていません。

## SassとLess LessをCSSに変換

VS Codeは[task runner](/docs/userguide/tasks.md)を利用してSassとLessのTranspilerと統合できます。`.scss`か`.less`を`.css`に変換する際にこれを利用できます。これをシンプルなSass/Lessファイルで確認します。

### Step 1: SassもしくはLessのTranspilerをインストール

このチュートリアルでは [node-sass](https://www.npmjs.com/package/node-sass)か[less](https://www.npmjs.com/package/less)のいずれかを使用してみましょう。

> **注意：[NPM](https://www.npmjs.com/)のみインストール済みであれば、このチュートリアルを完了させるために[Node.js](https://nodejs.org)も[インストール](https://nodejs.org/en/download/)する必要があります。インストール後は新しく開いた端末(コマンドプロント)から`npm`が利用可能になります。

```
npm install -g node-sass less
```

### Step 2: 簡単なSassもしくはLessの作成

空のフォルダに`styles.scss`か`styles.less`ファイルを作成したら、VS Codeでそのフォルダーを開きます。ファイルに次のコードを追記します:

```scss
$padding: 6px;

nav {
  ul {
    margin: 0;
    padding: $padding;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: $padding 12px;
    text-decoration: none;
  }
}
```

なおLessを利用する場合は、上記で`$padding`を `@padding`に変更してください。

>**Note:** 今回の例は非常に簡単なものでした。ですから2つの書き方は似たものになりました。より高度な編集の場合、構文と構造は大きく異なるものになることに注意してください。

### Step 3: tasks.jsonを作成

次の手順は、タスクを構成することです。セットアップには **コマンドパレット**を`kb(workbench.action.showCommands)` で開いて **Configure Task Runner** を入力したら `kbstyle(Enter)` で選択します。次に表示される選択ダイアログで`Others`を選択してください。

これは、サンプルの`tasks.json`を`.vscode`フォルダーに作成します。ファイルには、任意のコマンドを実行するサンプルが入っているので、これをLess/Sass用に設定を変更します:

```json
// Sass configuration
{
    "version": "0.1.0",
    "command": "node-sass",
    "isShellCommand": true,
    "args": ["styles.scss", "styles.css"]
}
```

```json
// Less configuration
{
    "version": "0.1.0",
    "command": "lessc",
    "isShellCommand": true,
    "args": ["styles.less", "styles.css"]
}
```

VS codeはSass/LessファイルをCSSに変換するタスクであることと、外部タスクランナーが`node-sassか `lessc`であると解釈します。実行するコマンドは`node-sass styles.scss styles.css`か`lessc styles.less styles.css`になります。

### Step 4: ビルドタスクを実行

今回のファイル内で唯一のコマンドですから`kb(workbench.action.tasks.build)`(**Run Build Task**)を押すだけで実行できます。サンプルのSass/Lessファイルにはコンパイル上の問題はありません。ですからタスクを実行すれば、それに対応する `styles.css`を作成します。

>**Note:** もしビルドに失敗した場合や"An output directory must be specified when compiling a directory"といったエラーメッセージが表示された場合`tasks.json`のファイル名がディスク上のファイル名と一致するようにしてください。コマンドラインから`node-sass styles.scss styles.css`でビルドテストができるはずです。

## Sass/Lessの自動コンパイル

それでは、Sass/Lessコンパイルを自動化してみましょう。同じようにタスクを利用しますが、いくつかの変更を施します。

### Step 1: Gulpとプラグインをインストール

[Gulp](http://gulpjs.com/)を使用してコンパイルを自動化するタスクを作成します。また、[gulp-sass](https://www.npmjs.com/package/gulp-sass)プラグインを使用して少し作成を簡単にします。Lessの場合 [gulp-less](https://www.npmjs.com/package/gulp-less)を使用してください。

gulpはグローバル (`-g`)とローカル両方にインストールする必要があります:

```
npm install -g gulp
npm install gulp gulp-sass gulp-less
```

> **Note:** `gulp-sass`と`gulp-less`は、先ほど使った`node-sass`と`lessc`のGulplプラグインです。また、SassとLessプラグインは他にも多くあります。

インストールの成功を`gulp -v`と入力してテストできます。このコマンドを実行すればグローバル(CLI)とローカル両方のバージョンを表示するはずです。

### Step 2: シンプルなGulp taskを作成

VS Codeを前と同じフォルダーで開き、ルートに`gulpfile.js`を作成します。

`gulpfile.js`ファイルに次のコードを追記します:

```javascript
// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('*.scss', ['sass']);
})
```

```javascript
// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['less'], function() {
    gulp.watch('*.less', ['less']);
})
```

ここで起こっていること

1. `default`のgulpタスクは、起動時に`sass`または`less`のタスクを一度実行します。
2. ワークスペースルートのSass/Lessファイルの変更を監視します。
3. 変更されたSass/Lessファイルをそれぞれのコンパイラ`gulp-sass`や`gulp-less`で実行します。
4. 作成された各CSSファイルに、元のSass/Lessファイル名を付けます。その後これらのファイルを同じディレクトリーに配置します。

### Step 3: tasks.jsonを実行し続けるように変更

VS Codeとタスクを完全に統合するには、作成したファイルをさらに変更する必要があります。`isBackground`をtrueに設定して、ファイルの変更をバックグラウンド処理しながらタスクを実行し続けるようにしてみましょう。

タスク構成を次のように変更します:

```json
{
    "version": "0.1.0",
    "command": "gulp",
    "isShellCommand": true,
    "tasks": [
        {
            "taskName": "default",
            "isBuildCommand": true,
            "showOutput": "always",
            "isBackground": true
        }
    ]
}
```

### Step 4: ビルドタスクを実行

このタスクは `isBuildCommand`とマークされているので、`kb(workbench.action.tasks.build)` (**Run Build Task**)を押すだけで実行できます。 今回は編集したことでタスクは実行し続けます。他のLess/Sassファイルを作成および変更した場合でも、同じように動作します。また、[自動保存](/docs/userguide/codebasics.md#saveauto-save) を有効にすると、より合理的なものにすることができます。

タスクを停止したい場合は**コマンドパレット**(`kb(workbench.action.showCommands)`)で**Tasks: Terminate Running Task**を実行してください。

## CSS、Sass、Lessの設定

文法チェックは[User and Workspace Settings](/docs/getstarted/settings.md)で設定できます。

`validate`の設定を変更すると、標準の検証を無効化できます。別のLintを使用する場合これを設定してください。

Id|Description|Default
---|------------|----
css.validate | cssすべての検証を有効または無効にします | true
less.validate | lessすべての検証を有効または無効にします| true
scss.validate | sassすべての検証を有効または無効にします | true

CSSのオプションを設定するには、idの接頭辞として `css.lint.`を使用してください。Sassであれば`scss.lint.`といった具合です。

文法検証を有効にする場合は`warning`または`error`に設定してください、`ignore`を指定すると無効になります。文法検証は入力時実行します。

Id|Description|Default
---|------------|----
validate | すべての検証を有効または無効にします | true
compatibleVendorPrefixes | ベンダー固有のプレフィックスを使用する場合は、他のすべてのベンダー固有のプロパティも必ず含めてください | ignore
vendorPrefix | ベンダー固有のプレフィックスを使用する場合は、標準のプロパティも含めます | warning
duplicateProperties | 重複するスタイル定義を使用しないでください | ignore
emptyRules | 空の規則セットを使用しないでください | warning
importStatement | 複数の Import ステートメントを同時に読み込むことはできません | ignore
boxModel | パディングまたは枠線を使用する場合は幅または高さを使用しないでください | ignore
universalSelector | ユニバーサル セレクター (*) を使用すると処理速度が低下することが分かっています | ignore
zeroUnits | 0 の単位は必要ありません  | ignore
fontFaceProperties | @font-face 規則で 'src' プロパティと 'font-family' プロパティを定義する必要があります | warning
hexColorLength | 16 進数の色には、3 つまたは 6 つの 16 進数が含まれる必要があります | error
argumentsInColorFunction | 正しくないパラメーターの数 | error
unknownProperties | 不明なプロパティ。 | warning
ieHack | IE ハックは、IE7 以前をサポートする場合にのみ必要です` | ignore
unknownVendorSpecificProperties | 不明なベンダー固有のプロパティ。 | ignore
propertyIgnoredDueToDisplay | Warn when using a property that is ignored due to the display. たとえば、'display: inline' の場合、width、height、margin-top、margin-bottom、および float のプロパティには効果がありません
important | !important は使用しないでください。これは CSS 全体の特定性が制御不能になり、リファクタリングが必要なことを示しています。 | ignore
float | 'float' は使用しないでください。float を使用すると、レイアウトの一部が変更されたときに CSS が破損しやすくなります。. | ignore
idSelector | セレクターには ID を含めないでください。これらの規則と HTML の結合が密接すぎます。| ignore

## 次のステップ

次を見てください:

* [Configure Tasks](/docs/userguide/tasks.md) - Dig into Tasks to help you transpile your Sass and Less to CSS.
* [Basic Editing](/docs/userguide/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - Move quickly through your source code.
* [HTML](/docs/languages/html.md) - CSS is just the start, HTML is also very well supported in VS Code.

## よくある質問

**Q: カラーピッカーを提供していますか?**

**A:** いいえ提供していません。いいえ、しかしMarketplaceにはカラーピッカーをサポートする拡張機能があります。

**Q: インデント構文のSass(.sass)シンタックスをサポートしますか ?**

**A:** いいえ、しかしMarketplaceにはインデント構文のSassをサポートする拡張機能があります。
