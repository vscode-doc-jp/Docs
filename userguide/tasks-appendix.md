---
title: Tasks Appendix
MetaDescription: Additional info for using task runners in Visual Studio Code.
commitid: cb7fea9ffdf45442cba2666b4855d70339685bba
---

これは[タスク](/docs/userguide/tasks.md)の追加情報です

## Schema for tasks.json

次の interface が tasks.json ファイルの schema を定義しています。

```typescript

interface TaskConfiguration extends BaseTaskConfiguration {

    /**
     * タスクのバージョン情報
     */
    version: "0.2.0";

    /**
     * Windows 固有の構成
     */
    windows?: BaseTaskConfiguration;

    /**
     * Mac 固有の構成
     */
    osx?: BaseTaskConfiguration;

    /**
     * Linux 固有の構成
     */
    linux?: BaseTaskConfiguration;
}

interface BaseTaskConfiguration {

    /**
     * タスクの種類
     * "shell" タイプのタスクはシェル内で実行します (例: bash, cmd, powershell)
     */
    type: "shell" | "process";

    /**
     * 実際に実行されるコマンド
     * 外部プログラムまたはシェルコマンドを指定できます
     */
    command: string;

    /**
     * グローバルコマンドがバックグラウンドタスクであるかどうか指定します
     */
    isBackground?: boolean;

    /**
     * コマンドが実行されるときに使用するコマンドオプション (省略可)
     */
    options?: CommandOptions;

    /**
     * コマンドに渡す引数 (省略可)
     */
    args?: string[];

    /**
     * presentation(いわゆるユーザーインターフェイスでの表示方法)オプション
     */
    presentation?: PresentationOptions;

    /**
     * グローバルコマンドが実行された場合に使用する問題マッチャー (例:タスクが定義されていないとき)
     * tasks.json ファイルには global problemMatcher プロパティー または tasks プロパティのいずれかを含めることができます
     * 両方を含めることはできません
     */
    problemMatcher?: string | ProblemMatcher | (string | ProblemMatcher)[];

    /**
     * 利用可能なタスクの構成
     * tasks.json ファイルには global problemMatcher プロパティーまたは tasks プロパティのいずれかを含めることができます
     * 両方を含めることはできません
     */
    tasks?: TaskDescription[];
}


/**
 * 外部プログラムまたはシェルに渡すオプション
 */
export interface CommandOptions {

    /**
     * 実行されるプログラムまたはシェルの作業ディレクトリ
     * これを省略すると Ticino のルートが使用されます
     */
    cwd?: string;

    /**
     * 実行されるプログラムまたはシェルの環境
     * これを省略すると親のプロセス環境が使用されます
     */
    env?: { [key:string]:string; };

    /**
      * タスクの種類が `shell` のときのシェルの構成
      */
     shell: {

        /**
        * 使用するシェル
        */
        executable: string;

        /**
        * コマンドモードで実行するために実行可能なシェルに渡される引数
        * (例: bash: ['-c'] もしくは cmd.exe ['/S', '/C'])
        */
        args?: string[];
    }
}

/**
 * タスクの説明
 */
interface TaskDescription {

    /**
     * タスクの名前
     */
    taskName: string;

    /**
     * タスクの種類
     * "shell" タイプのタスクはシェル内で実行します (例: bash, cmd, powershell)
     */
    type: "shell" | "process";

    /**
     * 実行するコマンド
     * 種類が "shell" のときは、コマンドに渡された追加の引数を含む完全なコマンドでなければなりません
     */
    command: string;

    /**
     * 実行されるコマンドをバックグランドで実行し続けるかどうか
     */
    isBackground?: boolean;

    /**
     * コマンドに渡す追加の引数
     * 種類が "process" のときに使用しなければなりません
     */
    args?: string[];

    /**
     * タスクの属するグループを定義します
     */
    group?: "build" | "string";

    /**
     * presentation(いわゆるユーザーインターフェイスでの表示方法)オプション
     */
    presentation?: PresentationOptions;

    /**
     * タスク出力をキャプチャするのに使用する問題マッチャー
     */
    problemMatcher?: string | ProblemMatcher | (string | ProblemMatcher)[];
}

interface PresentationOptions {

    /**
     * タスク出力をユーザーインターフェイスで表示するかどうかを制御します
     * 既定は "always" です
     */
    reveal?: "never" | "silent" | "always";

    /**
     * タスクに関連付けられたコマンドがユーザーインターフェイスにエコーされるかどうかを制御します
     */
    echo?: boolean;

    /**
     * タスク出力のパネルにフォーカスするかどうかを制御します
     */
    focus?: boolean;

    /**
     * タスクパネルの使用方法を、そのタスク専用(dedicated)、共有(shared)、常に新しいパネル(new)のいずれかに制御します
     * 既定は `shared` です
     */
    panel?: "shared" | "dedicated" | "new";
}

/**
 * ビルド出力で問題を検出する問題マッチャーの説明
 */
interface ProblemMatcher {

    /**
     * 使用する基本問題マッチャーの名前
     * 指定するとこの基本問題マッチャーがテンプレートとして使用され
     * ここで指定されたプロパティは基本問題マッチャーのプロパティを置き換えます
     */
    base?: string;

    /**
     * 生成された VS Code problem の owner
     * 通常は、問題が言語サービスまたは 'external' によって生成されたものとマージされる場合の、VS Code 言語サービスの識別子
     * 省略したときの 既定は 'external' です
     */
    owner?: string;

    /**
     * 問題マッチャーによって生成された VS Code problem の重大度
     *
     * 有効値:
     *   "error": エラーとして生成
     *   "warning": 警告として生成
     *   "info": 情報として生成
     *
     * この値はパターンに severity match group を指定していないとき使用されます
     * 省略したときは"error" です
     */
    severity?: string;

    /**
     * 問題パターンで報告されたファイル名の読み方を定義します
     * 有効値:
     *  - "absolute": ファイル名を常に絶対的に扱います
     *  - "relative": ファイル名を現在のワーキング ディレクトリと相対的に扱います (既定)
     *  - ["relative", "path value"]: ファイル名を常に指定したパス値と相対的に扱います
     */
    fileLocation?: string | string[];

    /**
     * 事前に定義した問題パターンの名前、問題パターンのインライン定義、複数行問題に一致する問題パターンの配列
     */
    pattern?: string | ProblemPattern | ProblemPattern[];

    /**
     * バックグラウンド タスク (Guplの監視タスクなど) がアクティブなときを検出するのに使用する追加情報
     */
    background?: BackgroundMatcher;
}

/**
 * バックグラウンド タスクの開始と終了を追跡するための記述
 */
interface BackgroundMatcher {

    /**
     * true に設定すると wathcer はタスクの開始時にアクティブモ モードになります
     * これは beginPattern で一致する行を発生させるのと同じ働きです
     */
    activeOnStart?: boolean;

    /**
     * 出力に一致したとき、バックグランド タスクの開始が通知されます
     */
    beginsPattern?: string;

    /**
     * 出力に一致したとき、バックグランド タスクの終了が通知されます
     */
    endsPattern?: string;
}

interface ProblemPattern {

    /**
     * 実行されたタスクのコンソール出力で問題を見つける正規表現
     */
    regexp: string;

    /**
     * ファイル名の match group index
     */
    file: number;

    /**
     * 問題の位置の match group index
     * 有効な位置のパターン: (line), (line,column), (startLine,startColumn,endLine,endColumn)
     * 省略すると (line,column) プロパティが使用されます
     */
    location?: number;

    /**
     * ソースファイル内の問題行の match group index
     * location を指定したときのみ省略できます
     */
    line?: number;

    /**
     * ソースファイル内の問題列の match group index
     */
    column?: number;

    /**
     * ソースファイル内の問題最終行の match group index
     *
     * 既定は未定義です 最終行はキャプチャされません
     */
    endLine?: number;

    /**
     * ソースファイル内の問題最終列の match group index
     *
     * 既定は未定義です 最終列はキャプチャされません
     */
    endColumn?: number;

    /**
     * 問題の重大度の match group index
     *
     * 既定は未定義です 問題マッチャーの重大度が使用されます
     */
    severity?: number;

    /**
     * 問題コードの match group index
     *
     * 既定は未定義です コードはキャプチャされません
     */
    code?: number;

    /**
     * メッセージの match group index
     * 既定は 0 です
     */
    message: number;

    /**
     * 複数行問題マッチャーの最後の問題パターンが、行に一致する限りループするかどうかを制御します
     * 複数行問題マッチャーの最後の問題パターンでのみ有効です
     */
    loop?: boolean;
}
```
