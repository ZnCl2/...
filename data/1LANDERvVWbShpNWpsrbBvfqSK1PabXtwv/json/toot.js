// 読み込み時の処理
document.addEventListener("DOMContentLoaded", () => {

  // アカウントリストを生成
  createAccountList();

  // ****Toot時の動作を定義****
  document.getElementById("tootForm").onsubmit = () => {

    // 選択したアカウントのIndexを取得
    var accountIndex = getSelectAccountIndex();
    // 選択したアカウントのオブジェクトを取得
    var mastodon = createMastodonObj(accountIndex);

    // Toot内容を取得
    var inputText = document.getElementById('tootText');

    // 何も入力されていない場合,500文字以上の場合は何もしない
    if(inputText.value == "" || inputText.value.length > 500){
      return false;
    }

    // Toot
    mastodon.post('statuses', {status: inputText.value}, function (err, data, res) {
        if (err){
          console.log(res);
          inputText.value = "投稿に失敗しました。";
        } else {
          // テキストをクリア
          inputText.value = "";
        }
    });

    return false;
  };

});

// 選択したアカウントのIndexを取得
function getSelectAccountIndex(){
  var selectAccount = document.getElementById('selectAccount');
  var selectOptions = document.getElementById('selectAccount').options;
  return accountIndex = selectOptions.item(selectAccount.selectedIndex).value;
}

// アカウントのコンボボックスを作成
// importがうまくいかないのでひとまずここで
function createAccountList(){
  // アカウント情報読み込み
  var fs = require('fs');
  var accountConfig = JSON.parse(
    fs.readFileSync(__dirname + '/../../account.json', 'utf8', function (err, text) {
      if(err){
        console.log('text file:' + text);
        console.log('error:' + err);
      }
    })
  );

  var selectAccount = document.getElementById('selectAccount');

  // リスト生成
  for(var i=0; i < accountConfig.account.length; i++){
    var accountList = document.createElement("option");
    accountList.value = i;
    accountList.innerText = accountConfig.account[i].instanceName;
    selectAccount.appendChild(accountList);
  }
}

// 選択したアカウントの情報をもったオブジェクトを取得
// importがうまくいかないのでひとまずここで
function createMastodonObj(index){

  var mastodonAPI = require('mastodon');

  // アカウント情報読み込み
  var fs = require('fs');
  var accountConfig = JSON.parse(
    fs.readFileSync(__dirname + '/../../account.json', 'utf8', function (err, text) {
      if(err){
        console.log('text file:' + text);
        console.log('error:' + err);
      }
    })
  );

  // インスタンスのURL
  var baseUrl = accountConfig.account[index].instanceURL;

  var mastodon = new mastodonAPI({
      access_token: accountConfig.account[index].accessToken,
      timeout_ms: 60 * 1000,
      api_url: baseUrl + '/api/v1/'
  });

  return mastodon;
}
