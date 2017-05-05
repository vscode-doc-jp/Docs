---
title: Language Identifiers
MetaDescription: In Visual Studio Code we have support for all common languages including smart code completion and debugging.
commitid: 1f68e5e21c25890c3261c4f7c6203c8bb8a4ffe3
---

VS Codeでは、各言語モードに固有の言語識別子があります。識別子は、たとえばファイル拡張子を言語に関連付ける場合など、設定を除いてユーザーが見ることはほとんどありません。

```json
    "files.associations": {
        "*.myphp": "php"
    }
```

正確に識別を一致するためのケーシング事項('Markdown' != 'markdown')

言語識別子は、新しい言語機能を追加するときや言語サポートを置き換えるときに、VS Code拡張機能の開発者にとって不可欠になります。


すべての言語は`languages`構成オプションを通じて*id*を定義します:

```json
    "languages": [{
        "id": "java",
        "extensions": [ ".java", ".jav" ],
        "aliases": [ "Java", "java" ]
    }]
```

言語サポートは、言語識別子を利用して追加します:

```json
    "grammars": [{
        "language": "groovy",
        "scopeName": "source.groovy",
        "path": "./syntaxes/Groovy.tmLanguage"
    }],
    "snippets": [{
        "language": "groovy",
        "path": "./snippets/groovy.json"
    }]
```

```typescript
languages.registerCompletionItemProvider('php', new PHPCompletionItemProvider(), '.', '$')
```

## 新しい識別子のガイドライン <a href="new-identifier-guidelines"></a>

新しい言語識別子を定義するときは、次のガイドラインを使用してください:

- 小文字のプログラミング言語名を使用します。
-  Marketplaceで他の拡張機能を検索して、言語識別子が既に使用されているかどうかを確認します。

## 既知の言語識別子 <a href="known-language-identifiers"></a>

次に既知のすべての言語識別子を示します:

Language | Identifier
-------- | ----------
Windows Bat | `bat`
BibTeX | `bibtex`
Clojure | `clojure`
Coffeescript | `coffeescript`
C | `c`
C++ | `cpp`
C# | `csharp`
CSS | `css`
Diff | `diff`
Dockerfile | `dockerfile`
F# | `fsharp`
Git | `git-commit` and `git-rebase`
Go | `go`
Groovy | `groovy`
Handlebars | `handlebars`
HTML | `html`
Ini | `ini`
Java | `java`
JavaScript | `javascript`
JSON | `json`
LaTeX | `latex`
Less | `less`
Lua | `lua`
Makefile | `makefile`
Markdown | `markdown`
Objective-C | `objective-c`
Objective-C++ | `objective-cpp`
Perl | `perl` and `perl6`
PHP | `php`
Powershell | `powershell`
Pug | `jade`
Python | `python`
R | `r`
Razor (cshtml) | `razor`
Ruby | `ruby`
Rust | `rust`
Sass | `scss` (syntax using curly brackets), `sass` (indented syntax)
ShaderLab | `shaderlab`
Shell Script (Bash) | `shellscript`
SQL | `sql`
Swift | `swift`
TypeScript | `typescript`
TeX | `tex`
Visual Basic | `vb`
XML | `xml`
XSL | `xsl`
YAML | `yaml`
