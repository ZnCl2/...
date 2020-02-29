var readline = require('readline');
var mastodon = require('mastodon-api');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var instanceName;
var baseUrl;

// 入力を受けてトークンを作成
rl.question('追加するインスタンス名を入力してください。例：social,cloud,etc... \n> ', ans1 => {
  instanceName = ans1.trim();
  rl.question('追加するインスタンスのURLを入力してください。例：https://mastodon.cloud \n> ', ans2 => {
    baseUrl = ans2.trim();
    createAccessToken(baseUrl);
  });
});

// アクセストークンを取得し保存
function createAccessToken(baseUrl){

  mastodon.createOAuthApp(baseUrl + '/api/v1/apps', 'うどん大国', 'read write follow')
      .catch(err => console.error(err))
      .then((res) => {

          clientId = res.client_id;
          clientSecret = res.client_secret;

          return mastodon.getAuthorizationUrl(clientId, clientSecret, baseUrl);
      })
      .then(url => {
          console.log('ブラウザで以下のURLを開き、このクライアントを認証してください。');
          console.log(url);
          return new Promise((resolve) => {
              rl.question('認証後、表示されたコードを入力してください。 \n> ', code => {
                  resolve(code);
                  rl.close();
              });
          })
      })
      .then(code => mastodon.getAccessToken(clientId, clientSecret, code, baseUrl))
      .catch(err => console.error(err))
      .then(accessToken => {
        console.log('アクセストークンが発行されました。');
        // 保存
        writeJson(instanceName,baseUrl,accessToken);
  })
};

// JSONで保存
function writeJson(inputName,inputURL,inputToken){

  var fs = require('fs');
  var accountConfig = JSON.parse(
    fs.readFileSync(__dirname + '/../../account.json', 'utf8', function (err, text) {
      if(err){
        console.log('text file:' + text);
        console.log('error:' + err);
      }
    })
  );
  var createAccount = {
    instanceName: inputName,
    instanceURL: inputURL,
    accessToken: inputToken
  };
  accountConfig.account.push(createAccount);
  fs.writeFile(__dirname + '/../../account.json', JSON.stringify(accountConfig, null, '    '));
  console.log(__dirname + '/../../account.jsonに保存しました。');
};
