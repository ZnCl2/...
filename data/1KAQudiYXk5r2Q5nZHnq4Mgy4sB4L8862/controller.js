const lilframe = new LilFrame(debug=true);
const userframe = new UserFrame(lilframe, debug=true);
const lavatube = new LavaTube(lilframe, debug=true);


lavatube.onHref((href) => dealWithIt());
dealWithIt();

function dealWithIt() {

  // clear renderer content
  lavatube.clearRenderer();

  switch (lavatube.attribute("do")) {

    case "about": {
      new About();

      break;
    }

    case lavatube.emptyOrUndefined:
    default: {

      lilframe.onReady(() => {
        lilframe.isLoggedIn((statement) => {

          new Main();

        });
      });

      break;

    }

  }

}
