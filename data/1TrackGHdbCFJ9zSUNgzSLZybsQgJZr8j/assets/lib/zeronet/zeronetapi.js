(function () {
  class ZeroNetAPI extends ZeroFrame {
    //Информация о сайте
    getSiteInfo() {
      this.cmd("siteInfo", [], function (site_info) {
        console.log("getSiteInfo %o", site_info);
        //zeroNetAPI.onRequest("setSiteInfo", { params: site_info });
      });
    }

    //Вызов окна выбора сертификата пользователя
    selectUser() {
      this.cmd("certSelect", { accepted_domains: ["zeroid.bit"] });
      return false;
    }

    //Вывести уведомление с подтверждением.
    wrapperConfirm() {
      this.cmd("wrapperConfirm", ["Вы уверены, что хотите удалить это?", "delete"], (isConfirmed) => {
        if (isConfirmed) {
          console.log('Deleting post...');
        }
      });
    }

    //Вызов окна выбора сертификата пользователя
    wrapperOpenWindow() {
      this.cmd('wrapperOpenWindow', ['https://zeronet.io', '_blank', 'width=550,height=600,location=no,menubar=no']);
    }

    onOpenWebsocket() {
      zeroNetAPI.getSiteInfo();
      //zeroNetAPI.selectUser();
      //zeroNetAPI.wrapperConfirm();
      //zeroNetAPI.wrapperOpenWindow();

    }

    //Если что-то изменилось(пользователь) придёт сообщение
    onRequest(cmd, message) {
      console.log("onRequest %o - %o", cmd, message);
      switch (cmd) {
        case "setSiteInfo":
          //console.log("ZiteView %o - %o", ZiteView, ZiteView.$data);
          if (ZiteView.$data) {
            ZiteView.$data.certUserID = message.params.cert_user_id;
            ZiteView.$data.peersCount = message.params.peers;
            ZiteView.$data.contentModified = new Date(message.params.content.modified * 1000).toISOString("dd.MM.yyyy").replace(".000Z", "").replace("T", " ");
          }

          break;

        default:
          this.log("Unknown incoming message:", cmd);
          break;
      }

    }
  }


//      https://github.com/DaniellMesquita/The-Truth-about-ZeroNet-GitBook-/tree/a9a01a09bcd6ff5ba348785e14d2b2cacd9b9dad/downloads



//  zeroNetAPI = new ZeroNetAPI();

}).call(this);
