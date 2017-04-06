---
title: Complex Commands Reference
MetaDescription: Visual Studio Code extensions (plug-ins) complex commands Reference.
commitid: 49a1336d8b6540c91f2be83be49c254f368663d4
---

このドキュメントではVisual Studio Code Complex Commandの指定方法を説明します。これはパラメーターを必要とし、値を返すのでComplex Command(直訳: 複合コマンド)と呼びます。これを`executeCommand`APIと組み合わせて使用してください。

HTML文書をプレビューする方法の例を次に示します:

```javascript
let uri = Uri.parse('file:///some/path/to/file.html');
let success = await commands.executeCommand('vscode.previewHtml', uri);
```

## Commands

`vscode.executeWorkspaceSymbolProvider` - すべてのworkspace symbol providerを実行します。

* _query_ 検索文字列
* _(returns)_ SymbolInformation-instancesの配列に解決します。


`vscode.executeDefinitionProvider` - すべてのdefinition providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ シンボルのポジション
* _(returns)_ Location-instancesの配列に解決します。

`vscode.executeImplementationProvider` - すべてのimplementation providersを実行します。

* _uri_ テキストドキュメントのUri
* _position_ シンボルのポジション
* _(returns)_ Location-instanceの配列に解決します。


`vscode.executeHoverProvider` - すべてのhover providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ シンボルのポジション
* _(returns)_ Hover-instancesの配列に解決します。


`vscode.executeDocumentHighlights` - document highlight providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ テキストドキュメント内の位置
* _(returns)_ DocumentHighlight-instancesの配列に解決します。


`vscode.executeReferenceProvider` - reference providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ テキストドキュメント内の位置
* _(returns)_ Location-instancesの配列に解決します。


`vscode.executeDocumentRenameProvider` -  rename providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ テキストドキュメント内の位置
* _newName_ 新しいシンボル名
* _(returns)_ WorkspaceEditに解決します。


`vscode.executeSignatureHelpProvider` - signature help providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ テキストドキュメント内の位置
* _triggerCharacter_ (optional) signature helpをトリガーする文字(`,` や`(`など)
* _(returns)_ SignatureHelpに解決します。


`vscode.executeDocumentSymbolProvider` - document symbol providerを実行します。

* _uri_ テキストドキュメントのUri
* _(returns)_ SymbolInformation-instancesの配列に解決します。


`vscode.executeCompletionItemProvider` - completion item providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ テキストドキュメント内の位置
* _triggerCharacter_ (optional) completionをトリガーする文字(`,`や`(`など)
* _(returns)_ CompletionList-instanceに解決します。


`vscode.executeCodeActionProvider` - code action providerを実行します。

* _uri_ テキストドキュメントのUri
* _range_ テキストドキュメントの選択範囲
* _(returns)_ Command-instancesの配列に解決します。


`vscode.executeCodeLensProvider` - CodeLens providerを実行します。

* _uri_ テキストドキュメントのUri
* _(returns)_ CodeLens-instancesの配列に解決します。


`vscode.executeFormatDocumentProvider` -  document format providerを実行します。

* _uri_ テキストドキュメントのUri
* _options_ フォーマットオプション
* _(returns)_ TextEditsの配列に解決します。


`vscode.executeFormatRangeProvider` - range format providerを実行します。

* _uri_ テキストドキュメントのUri
* _range_ テキストドキュメントの選択範囲
* _options_ フォーマットオプション
* _(returns)_ TextEditsの配列に解決します。


`vscode.executeFormatOnTypeProvider` - document format providerを実行します。

* _uri_ テキストドキュメントのUri
* _position_ テキストドキュメント内の位置
* _ch_ 入力された文字
* _options_ フォーマットオプション
* _(returns)_ TextEditsの配列に解決します。


`vscode.executeLinkProvider` - document link providerを実行します。

* _uri_ テキストドキュメントのUri
* _(returns)_ DocumentLink-instancesの配列に解決します。


`vscode.previewHtml` - エディター ビューでリソースのHTMLレンタリングをします。

* _uri_ プレビューするリソースのUri
* _column_ (optional) プレビューする列
* _label_ (optional) 他人が理解できるプレビューのタイトル


`vscode.openFolder` - newWindow引数に応じて、現在のウィンドウまたは新しいウィンドウでフォルダーを開きます。newWindowパラメーターがtrueに設定されていない限り、同じウィンドウで現在の拡張機能ホストプロセスを閉じて、指定したフォルダーで新しいウィンドウを作成します。

* _uri_ (optional) 開くフォルダーのUriです。指定しない場合は、ネイティブのダイアログがユーザーにフォルダーを訪ねます。
* _newWindow_ (optional) 新しいウィンドウまたは同じウィンドウでフォルダーを開くかを指定します。既定では同じウィンドウで開きます。


`vscode.startDebug` - デバッグ セッションを開始します。

* _configuration_ (optional) 使用する'launch.json'内デバッグ構成の名前。または、使用するconfiguration jsonオブジェクトです。


`vscode.diff` - (内容を確認する)差分エディターで提供されたリソースを開きます。

* _left_ 差分エディターの左側リソース
* _right_ 差分エディターの右側リソース
* _title_ (optional) 他人が理解できる差分エディターのタイトル


`vscode.open` - エディターで提供されたリソースを開きます。テキスト、バイナリファイルまたはhttp(s) URLを指定できます。

* _resource_ 開くリソース
* _column_ (optional) 開く行


`cursorMove` - ビュー内の論理位置にカーソルを移動します。

* _Cursor move argument object_

  この引数を渡すことのできるプロパティ値のペア:

  * 'to': カーソルを移動する論理位置値で、必須項目です。
    ```
    'left', 'right', 'up', 'down'
    'wrappedLineStart', 'wrappedLineEnd', 'wrappedLineColumnCenter'
    'wrappedLineFirstNonWhitespaceCharacter', 'wrappedLineLastNonWhitespaceCharacter'
    'viewPortTop', 'viewPortCenter', 'viewPortBottom', 'viewPortIfOutside'
    ```
  * 'by': 移動する単位です。デフォルトは 'to'値に基づいて計算されます。
    ```
    'line', 'wrappedLine', 'character', 'halfLine'
    ```
  * 'value': 移動する単位の数です。デフォルトは '1'です。
  * 'select': 'true'ならテキストを選択します。デフォルトは'false'です。


`editorScroll` - 指定した方向にエディターをスクロールします。

* _Editor scroll argument object_

  この引数を渡すことのできるプロパティ値のペア:

  * 'to': 移動する方向値で、必須項目です。
    ```
    'up', 'down'
    ```
  * 'by': 移動する単位です。デフォルトは 'to'値に基づいて計算されます。
    ```
    'line', 'wrappedLine', 'page', 'halfPage'
    ```
  * 'value': 移動する単位の数です。デフォルトは '1'です。
  * 'revealCursor': 'true'を指定すると、ビューポートの外側にある場合にカーソルを表示します。


`revealLine` - 指定した論理位置で与えられた行を明確にします。

* _Reveal line argument object_

  この引数を渡すことのできるプロパティ値のペア:

  * 'lineNumber': 行番号値で、必須項目です。
  * 'at': 行を明確にする論理位置です。
    ```
    'top', 'center', 'bottom'
    ```


`editor.unfold` - エディター内のコンテンツを展開します。

* _Unfold editor argument_

  この引数を渡すことのできるプロパティ値のペア:

  * 'level': 展開するレベルの番号


`editor.fold` - エディター内のコンテンツを折りたたみます。

* _Fold editor argument_

  この引数を渡すことのできるプロパティ値のペア:

  * 'levels': 折りたたむレベルの番号
  * 'up': 'true'の場合、与えられたレベルの番号以上のものを折りたたむ


`editor.action.showReferences` - ファイル内のある位置で参照を表示します。

* _uri_ 参照を表示するテキストドキュメント
* _position_ 表示する位置
* _locations_ 場所の配列


`moveActiveEditor` - アクティブなエディターをタブかグループで移動します。

* _Active editor move argument_

  引数のプロパティ:

  * 'to': 移動先を指定する文字列値
  * 'by': 移動方法を指定する文字列値です。タブまたはグループを指定します。
  * 'value': 移動する位置または絶対位置を指定する数値

# HTMPプレビューを使用した作業

## Styling
HTML表示するbody要素には、次のCSSクラスの中で、現在使用しているものにしたがって動的に色付けを行います: `vscode-light`、`vscode-dark`、`vscode-high-contrast`

## Links
ドキュメントに含まれるリンクはVS Codeで処理します。`file`リソースと[virtual](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L3295)リソースをサポートし、`command`スキームを使用してコマンドを起動します。JSONでエンコードされた引数を渡すには、command-uriのクエリ部分を使用します。ですからURLエンコードする必要が有ることに注意してください。

次のスニペットは_previewHtml_コマンドを呼び出してURIを渡すcommand-linkを定義します:

```javascript
  let href = encodeURI('command:vscode.previewHtml?' + JSON.stringify(someUri));
  let html = '<a href="' + href + '">Show Resource...</a>.';
```

## Security Tips
拡張機能の製作者は、HTMLプレビューを使用する場合、悪意のコンテンツからユーザーを保護する責任があります。主な危険性は、攻撃者がHTMLプレビューを使用してスクリプトを実行したり、その他悪意の攻撃を実行する悪質なワークスペースを作成可能ということです。通常のWebセキュリティーの最善慣行に加えて、ユーザーを保護するための具体的なヒントやトリックをいくつか紹介します。

### Sanitizing Content
最初の防衛線として、プレビュー用のHTMLを作成するとき、ワークスペース設定やユーザーシステム上のファイルからのすべての入力を適切にサニタイズ(処理)します。HTMLコンテンツの場合は、安全なタグと属性のホワイトリストを使用することを検討してください。[sanitize-html](https://www.npmjs.com/package/sanitize-html)のようなライブラリーがこれを手助けします。

### Disabling Scripts
プレビューでJavaScriptを実行する必要がない場合は、スクリプトの実行を完全に無効にすることで、セキュリティーをさらに強化することができます。これを実行する方法の1つは、信頼できないコンテンツを`iframe`の中に`sandbox`属性を設定して読み込むことです。この場合、コンテンツは `srcdoc`属性を使用して読み込みます:

```html
<iframe sandbox srcdoc="<!DOCTYPE html>..."></iframe>
```

プレビューで画像などのローカルリソースを読み込む必要があるなら、代わりに`sandbox="allow-same-origin"`の使用を試してください:

```html
<iframe sandbox="allow-same-origin" srcdoc="<!DOCTYPE html>..."></iframe>
```

`sandbox="allow-same-origin"`は`iframe`内のスクリプト実行を無効にしますが、スタイルシートや画像など、ユーザーシステムからのリソースを読み込むことができます。通常プレビューがそれを絶対必要としない限り、ローカルリソースへのアクセスを無効化することが最善です。

### Using a Content Security Policy
プレビューの機能がスクリプトに依存する場合は、[Content Security Policy (CSP)](https://developer.mozilla.org/ja/docs/Web/Security/CSP)を使用して、信頼できないコンテンツからのスクリプトを無効にすることを検討してください。

例として、、ユーザーのローカルシステムからのイメージ作成とスタイルシートを許可して、すべてのスクリプトを無効にするCSPを次に示します:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src *; style-src 'self'; script-src 'none';">
  <title>...</title>
</head>
<body>
  Content
</body>
</html>
```

スクリプトを選択的に有効化するには、動的に生成した[nonce](https://developers.google.com/web/fundamentals/security/csp/)を使用して、特定の信頼できるスクリプトをホワイトリストに登録することがいい方法です。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src *; style-src 'self'; script-src 'nonce-123456';">
  <title>...</title>
</head>
<body>
  Content
  <script nonce="123456" src="file:///path/to/extension/my_trusted_script.js"></script>
</body>
</html>
```
