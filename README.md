# findFilesJXA
[JXA] ファイル検索のためのJXA  
入力されたテキストを含むファイルを、指定したフォルダ内で検索します。  
検索マッチしたファイルは一覧で表示され、ダブルクリックで開くことができます。  
JXA（JavaScript for Automation）を利用しているため、MacOSでのみ動作します。

## インストール方法
1. スクリプトエディタを起動
2. 言語を「JavaScript」に変更
3. findFilesJXA.jsのコードをコピーしてスクリプトエディタにペースト
4. アプリケーションとして保存

## 使い方
1. アプリケーションを起動
2. 検索したい文字列を入力
3. 検索対象となるフォルダを選択
4. 検索マッチしたファイルが一覧表示される
5. ダブルクリックで任意のファイルを開く

## プログラムの詳細
`find`コマンドに`-name`オプションを付けて実行しています。  
検索文字列は`\*{文字列}\*`に整形し、フルパスに該当文字列が含まれればすべてマッチさせます。

## ライセンス
MIT License

## 著作権
@UskeS
