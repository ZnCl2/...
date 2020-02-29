
class About {
  TAG = "About";

  lang;

  constructor() {
    let self = this;

    lilframe.getLanguageFileAsJsonObject("langs/en-main.json", (lang) => {
      self.lang = lang;

      lavatube.render("templates/about.html", {
        lang: lang
      }, () => {


      });
    });

    lavatube.onMethod({
      onToggleLanguages: (languageElem) => {
        languageElem.querySelector(".dropup-content").classList.toggle("show");
      },


    });

  } // constructor


}