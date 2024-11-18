(() => {
    const app = Application.currentApplication()
    app.includeStandardAdditions = true

    let selectedFolder = ''

    // フォルダ選択ダイアログを表示する関数
    function selectFolder() {
        try {
            app.activate()
            selectedFolder = app.chooseFolder({
                withPrompt: "検索対象のフォルダを選択してください",
                defaultLocation: app.pathTo("home folder")
            }).toString()
        } catch (error) {
            if (error.errorNumber !== -128) { // -128はユーザーがキャンセルした場合のエラー
                console.log('エラーが発生しました: ' + error)
            }
        }
    }

    // GUIの作成
    const dialog = app.displayDialog("ファイル名検索", {
        buttons: ["キャンセル", "検索"],
        defaultButton: "検索",
        cancelButton: "キャンセル",
        withIcon: "note",
        withTitle: "ファイル検索アプリ",
        defaultAnswer: "",
        withTitle: "検索する文字列を入力してください"
    })

    if (dialog.buttonReturned === "検索") {
        const searchTerm = dialog.textReturned
        selectFolder()

        if (selectedFolder && searchTerm) {
            const command = `find "${selectedFolder}" -name "*${searchTerm}*"`
            try {
                const result = app.doShellScript(command)
                const files = result.split('\r').filter(file => file.trim() !== '') // 空のファイル名を除去
                
                if (files.length > 0) {
                    // 結果を表示
                    const chosenFile = app.chooseFromList(files, {
                        withPrompt: "検索結果",
                        multipleSelectionsAllowed: false
                    })

                    if (chosenFile && chosenFile[0]) {
                        app.doShellScript(`open "${chosenFile[0]}"`)
                    }
                } else {
                    // 見つからなかった場合のダイアログ
                    app.displayAlert("見つかりませんでした")
                }
            } catch (error) {
                console.log('検索エラー: ' + error)
            }
        } else {
            app.displayAlert('フォルダと検索文字列を入力してください。')
        }
    }
})()