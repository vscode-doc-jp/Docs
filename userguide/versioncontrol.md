---
title: バージョン管理
MetaDescription: Visual Studio Code has integrated Git support for the most common commands.
commitid: cb7fea9ffdf45442cba2666b4855d70339685bba
---

Visual Studio Codeではソースコントロールを統合しており、[Git](https://git-scm.com/)のサポートを初めから含んでいます。その他のソースコントロールは[拡張機能](/docs/userguide/extension-gallery.md)を通して利用可能です。

## SCMプロバイダーの切り替え  <a id="switch-scm-providers"></a>

既定でVS Codeは、Gitのソースコントロールプロバイダーが有効になっていますが、別のSCMプロバイダーをインストールして切り替えることができます。**ソースコントロール**ビューの**その他**(...)ボタンをクリックすることで、**SCMプロバイダーを切り替える**コマンドを表示できます。このコマンドは、**拡張機能**ビューから**Install Additional SCM Providers...**を実行して入手するSCMプロバイダーの一覧を表示します。

![switch SCM providers](images/versioncontrol/switch-scm-providers.png)

## Gitのサポート <a id="git-support"></a>

VS CodeにはGitのソースコントロールマネージャー(SCM)拡張機能が付属しています。ほとんどのソースコントロールUIとワークフローは、他のSCM拡張機能と共通しています。ですからGitサポートについて確認することは他のプロバイダーでの使い方を理解するのに役立ちます。

>**Note:** Gitを初めて利用するなら、[git-scm](https://git-scm.com/documentation)の[book](https://git-scm.com/book)、[video](https://git-scm.com/video/what-is-git)、[cheat sheets](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)が入門に役に立つことでしょう。このドキュメントはGitに慣れていることを前提としています。

![git overview](images/versioncontrol/overview.png)

>**Note:** VS CodeではPCにインストールされたGitを利用します。ですからまず[Gitをインストール](https://git-scm.com/download)する必要があります。少なくともバージョン`2.0.0`以上をインストールしてください。

>**Tip:** VS CodeはGitリポジトリで大きな効果を発揮します。もしGitのプライベートホストを持っていない場合は、無料の[Visual Studio Team Services](https://www.visualstudio.com/products/visual-studio-team-services-vs)をぜひ活用してください。[Click here to sign-up](https://go.microsoft.com/fwlink/?LinkID=307137&campaign=o~msft~code~vc)

左側にあるSCMアイコンは、現在のリポジトリー内の**変更の数**を表示します。これをクリックすると、現在のリポジトリー内にある変更を詳細表示します: **CHANGES**、**STAGED CHANGES**、**MERGE CHANGES**

各項目をクリックすることで**変更したファイル**内の詳細を表示します。ステージしていない変更は、右のエディターでもファイル編集できることに留意してください。

またVS Codeの左下には**リポジトリーの状態**を示すインジゲーターがあります。状態として**現在のブランチ**、**dirty indicators**そして**incoming and outgoing commits**を示します。ブランチから**チェックアウト**するには、このボタンを押してリストから任意の参照を選択してください。

> **Tip:** GitリポジトリのサブディレクトリをVS Codeで開くことができます。この場合でもGitは通常通り動作し、リポジトリ内のすべての変更を表示します。ただし現在のワークスペース外ファイル変更は、それを示すツールチップと共に表示します。

## Gitステータスバーの操作 <a href="git-status-bar-actions"></a>

チェックアウトしたブランチが上流ブランチに設定されているときは、ブランチインジゲーターの隣に**Synchronize changes**ボタンを表示します。**Synchronize Changes**はローカルリポジトリにリモートから変更をプルし、ローカルのコミットをアップストリームにプッシュします。

![git status bar sync](images/versioncontrol/git-status-bar-sync.png)

上流ブランチが設定されておらずGitリポジトリがリモートに設定されている場合**パブリッシュ**ボタンを有効にします。これにより、現在のブランチをリモートに公開します。

![git status bar publish](images/versioncontrol/git-status-bar-publish.png)

## コミット <a href="commit"></a>

**ステージング**と**ステージング解除**はファイルのコンテキスト操作か、D&Dによって行います。

コミットには、上部にあるテキストボックスにコミットメッセージを入力して`kbstyle(Ctrl+Enter)` (Mac: `kbstyle(⌘+Enter)`)を押します。一部変更をステージしたなら、それらの変更のみをコミットしますし、そうでない場合はすべての変更をコミットします。

私たちは段階的に行うコミット方式が良いワークフローになることを知っています。例えば先ほどの画像では`config.js`だけをコミットに含みます。次に、連続したコミット操作によって `vinyl-zip.js` `tests.js` の両方を別々にコミットすることでしょう。

より具体的な**コミット操作**はGitビュー上部の `...`メニューで確認できます。

## リポジトリをクローン <a id="cloning-a-repository"></a>

**コマンド パレット** (`kb(workbench.action.showCommands)`)で**Git: Clone**コマンドを使用するとGitリポジトリをクローンすることができます。その後リモートリポジトリーのURLと、ローカルリポジトリーを配置するディレクトリーを確認されます。

## ブランチとタグ <a href="branches-and-tags"></a>

**コマンドパレット** (`kb(workbench.action.showCommands)`)で**Git: Create Branch...**や**Git: Checkout to..**を使用して、VS Code内で直接ブランチを作成およびチェックアウトできます。

**Git: Checkout to...**を実行すると、現在のリポジトリー内のすべてのブランチまたはタグを含むドロップダウンが表示されます。

![Git checkout](images/versioncontrol/gitbranches.png)

**Git: Create Branch...**コマンドを使用することで、すぐに新しいブランチを作成できます。VS Codeでは新しいブランチ名を入力すれば、ブランチを作成しそれに切り替えます。

## リモート <a href="remotes"></a>

チェックアウトしたブランチが、リモートで[上流リンク](https://git-scm.com/book/ch3-5.html)であれば、 VS Codeは**プッシュ**、**プル**、**同期**の便利な操作を可能にします(**sync**は**push**のあと**pull**)。`...`メニュー でこれら操作を確認できます。

>**Tip:** VS Codeがその都度リモートに認証情報を問い合わせるのを避けるために、[set up a credential helper](https://help.github.com/articles/caching-your-github-password-in-git/)を設定するべきです。これを設定したくない場合は `git.autofetch`[設定](/docs/getstarted/settings.md)で自動フェチを無効にすることを検討してください。

## ガターインジケーター <a href="gutter-indicators"></a>

Gitリポジトリのフォルダーを開いて編集を始めたなら、VS Codeは便利な注釈ガターと概要ルーラーを追加します。

* 赤の三角 : 削除された行
* 緑のバー : 追加された行
* 青のバー : 変更された行

![Gutter indicators](images/editingevolved/gutter.png)

## マージの競合 <a href="merge-conficts"></a>

![Git merge](images/versioncontrol/merge.png)

競合はVS Codeによって認識できますので、マーカー提供して解決の手伝いをしようとします。解決したら競合するファイルをステージングして、変更をコミットします。

## 差分表示 <a href="viewing-diffs"></a>

私たちのGitツールはVS Code内で差分表示をサポートしています。

![A File Diff in VS Code](images/versioncontrol/diff.png)

>**Tip:** エクスプローラーか**OPEN EDITORS**リストで1つめのファイルを右クリックして**変更を開く**を選択します。その後2つ目のファイルを同じように選択することで、2つのファイルを比較することができます。あるいは`kb(workbench.action.showCommands)`を押して**File: Compare Active File With...**を選択して以前開いたファイルを表示することでも可能です。

## Git出力ウィンドウ <a href="git-output-window"></a>

VS CodeがどのようにGitを使用しているのか見ることができます。何か変なことが起きている場合や、興味がある場合に便利です:)

Git出力ウィンドウを表示するには **表示** > **出力** を表示してドロップダウンから**Git**を選択します。

## リポジトリーの初期化 <a href="initialize-a-repository"></a>

ワークスペースがGitの管理下にない場合は**Initialize git repository**コマンドを利用して簡単にGitリポジトリーを作成できます。VS Codeが既存のGitリポジトリーを検出しない場合「**このワークスペースはまだGitソース管理下にありません。**」を表示して、**Initialize git repository**コマンドを利用可能にします。

![Git initialize repository](images/versioncontrol/git-initialize.png)

**Initialize git repository**を実行するとGitリポジトリーに必要なメタデータファイルを作成して、ワークスペースファイルをステージされていない変更として表示します。

## Gitパッチ/差分モード <a href="git-pass/diff-mode"></a>

コマンドラインからVS Codeを起動する場合、現在のインスタンスを閉じるまでコマンド待機する`--wait`引数を設定できます。Gitの外部エディターとしてVS Codeを設定するときに便利です。

実行手順:

1. コマンドラインで`code --help`を実行できることを確認してください。
    * ヘルプを表示しない場合は、次を確認します
        * Mac: **コマンドパレット** から **Shell Command: Install 'Code' command in path** を選択
        * Windows: インストール時に**Add to PATH**を選択
        * Linux: インストールを新しい.debか.rpmパッケージで行ったか確認
2. コマンドラインから`git config --global core.editor "code --wait"`を実行してください。

`git config --global -e`を実行してGitを設定するエディターにVS Codeを使用できます。

![git config in VS Code](images/versioncontrol/gitconfig.png)

DiffツールとしてVS Codeを使うにはGitの設定に次を追加します。

```bash
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
```

これはVS Codeが受け取れる`--diff`オプションを活用して、2つのファイルを並べて比較します。

VS Codeをエディターとして使用できる例を以下に示します:

* `git rebase HEAD~3 -i` - インタラクティブなリベースを行う
* `git commit` - コミットメッセージに使う
* `git add -p` - `kbstyle(e)` によるインタラクティブな追加を行う
* `git difftool <commit>^ <commit>` - 差分エディターとして使う

## 次のステップ

* [Intro Video - Git Version Control](/docs/introvideos/versioncontrol.md) - An introductory video providing an overview of VS Code Git support.
* [Basic Editing](/docs/userguide/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/userguide/editingevolved.md) - Move quickly through your source code.
* [Debugging](/docs/userguide/debugging.md) - This is where VS Code really shines
* [Tasks](/docs/userguide/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings
* [SCM API](/docs/extensionapi/api-scm.md) - If you want to integrate another Source Control provider into VS Code, see our SCM API.

## よくある質問

**Q: リポジトリーを初期化しましたが`...`メニューがグレーのままです**

**A:** **プッシュ、プル、同期** するにはGitのoriginを設定する必要があります。レポから必要なURLを取得してください。URLを取得したら、コマンドライン操作をしてGit設定にURLを追加します。例えばVisual Studio Team Servicesの場合:

```bash
> git remote add origin https://<AccountName>.visualstudio.com/DefaultCollection/_git/<RepoName>
> git push -u origin master
```

**Q: Gitの代わりにTeam Foundation version control (TFVC) を使用しています。何をすべきですか？**

**A:**  [Visual Studio Team Services Extension](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team)を使用して、TFVCサポートを得てください。

**Q: なぜプル、プッシュ、同期が終わりませんか？**

これは大抵Gitに認証情報がなく、資格情報プロンプトを取得していないことを意味しています。

VS Codeなしで認証情報を登録して、リモートサーバーからプルとプッシュするには[credential helper](https://help.github.com/articles/caching-your-github-password-in-git/)を設定します

**Q: 2段階認証を登録したTeam ServicesアカウントでGitサインインするにはどうすればいいですか？**

**A:** [Git credential helpers](https://blogs.msdn.com/b/visualstudioalm/archive/2015/11/18/visual-studio-team-services-git-credential-manager-for-mac-and-linux.aspx) を使います。こちらからダウンロードしてください。
[Git Credential Manager for Mac and Linux](https://github.com/Microsoft/Git-Credential-Manager-for-Mac-and-Linux)
[Git Credential Manager for Windows](https://github.com/Microsoft/Git-Credential-Manager-for-Windows).

**Q: Visual Studio Codeを使用して、膨大な数のファイルがあるフォルダーのGitリポジトリーを誤って初期化しました。それによってVS Codeは反応しないかハングします。どうすればいいですか？**

**A:** まずVS Code終了し、コマンドプロントで次を実行します

```bash
code -n
```

これはVS Codeを新しいウィンドウで開きます。

次に(意図しないリポジトリーの初期化を削除したいと仮定し)、レポを初期化した大きなフォルダー内の`.git`サブフォルダーを探して削除します。なお`.git`は隠しフォルダーなのでこれを表示する必要があります。例えばWindowsのコマンドプロンプトで`dir .git /ah`を実行すると、特定のフォルダー内の`.git`という名前の隠しフォルダーを表示できます。初期フォルダーをどこに作成したかわからない場合は、ルートフォルダで`dir .git /ah /s` を実行してサブフォルダーを含む`.git`フォルダーを表示します。

**Q: GitHub DesktopをインストールしていますがVS CodeはこのGitを無視します**

**A:** VS Codeは`git.exe`が`PATH`(`$PATH` on Mac or Linux)にあることを期待します。ですが **GitHub Desktop**は独自にgitバイナリーを内包し、`git.exe`を`PATH`に登録しません。

次のいずれかを実行します:

* `PATH`に`git.exe`を登録してVS Codeを再起動する
* `git.path`[設定](/docs/getstarted/settings.md)で`git.exe`の場所を設定する

**GitHub Desktop for win**の場合、通常`git.exe`は`C:\Users\USERNAME\AppData\Local\GitHub\PortableGit_COMMITID\ming32\bin`にあります。AppData\Local\GitHubで`git.exe`を検索すると、バイナリーが見つかるはずです。

[git-scm](https://git-scm.com/)からGitをインストールすることもできますが、**GitHub Desktop**とは干渉しません。
