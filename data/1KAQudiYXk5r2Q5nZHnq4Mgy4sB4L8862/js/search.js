

class Search {
  TAG = "Search";

  lang;

  clickedOnInputTitle = false;
  editing = false;

  // will be edited from outside by onSelectSong fun
  playing = {};

  currentContainerView;
  DEFAULT_LIMIT = 5; // limit to show files

  CONTAINER_VIEW_SEARCHING = "continer.view.searching";
  CONTAINER_VIEW_SEE_ALL = "continer.view.see.all";

  showingAllResults = 0;
  showPerShowMore = 20;


  constructor(lang, searchWord, onRenderedCallback = null) {
    let self = this;

    self.lang = lang;
    self.searchWord = searchWord;

    if (searchWord === "") {
      lavatube.renderArea("container", "templates/search-empty.html", {
        lang: self.lang
      }, () => {

        self.currentContainerView = self.CONTAINER_VIEW_SEARCHING;

        if (onRenderedCallback != null) {
          onRenderedCallback();
        }
      });
    } else {
      lilframe.getSongListBySearch(self.searchWord, (lst) => {
        lavatube.renderArea("container", "templates/search.html", {
          lang: self.lang,
          searchWord: self.searchWord,
          items: lst,
          playing: self.playing,
          present: "present-fast"
        }, () => {
          if (onRenderedCallback != null) {
            onRenderedCallback();
          }
        });
      }, self.DEFAULT_LIMIT);
    }


    lavatube.onMethod({
      onSeeAll: () => {

        self.showingAllResults = self.showPerShowMore;

        lilframe.getSongListBySearch(self.searchWord, (lst) => {
          lavatube.renderArea("container", "templates/see-all.html", {
            lang: self.lang,
            items: lst,
            playing: self.playing,
            present: "present-fast"
          }, () => {
            self.currentContainerView = self.CONTAINER_VIEW_SEE_ALL;

            // if we have less than we can show then remove this button
            if (lst.length < self.showingAllResults) {
              // remove show more button
              document.querySelector("#show-more-search-results").remove();
            }

          });
        }, self.showingAllResults);
      },

      onShowAllResults: () => {

        lilframe.getSongListBySearch(self.searchWord, (lst) => {
          lavatube.renderArea("container", "templates/search.html", {
            lang: self.lang,
            searchWord: self.searchWord,
            items: lst,
            playing: self.playing,
            present: "present-fast"
          }, () => {
            self.currentContainerView = self.CONTAINER_VIEW_SEARCHING;
          });
        }, self.DEFAULT_LIMIT);

      },

      onShowMoreResults: () => {
        lilframe.getSongListBySearch(self.searchWord, (lst) => {

          let addToSearchResult = (i) => {
            lavatube.addToArea("search-results", "templates/search-song.html", {
              lang: self.lang,
              playing: self.playing,
              item: lst[i]
            }, () => {

              if (i +1 >= lst.length) {
                self.showingAllResults = lst.length;

                // remove show more button
                document.querySelector("#show-more-search-results").remove();

              } else if (i +1 >= self.showingAllResults + self.showPerShowMore) {
                self.showingAllResults += self.showPerShowMore;
              } else {
                addToSearchResult(i +1);
              }

            });
          };

          if (self.showingAllResults < lst.length) {
            addToSearchResult(self.showingAllResults);
          }

        });
      },

    });

  } // constructor

  reload (searchWord = null) {
    let self = this;
    let present = "";

    if (searchWord != null) {

      // if we had empty search word before and we r updating to new one then show present fast animation
      if (self.searchWord.length === 0 && searchWord.length > 0) {

        present = "present-fast"
      } else if (searchWord.length === 0 && self.searchWord.length > 0) {
        present = "present-fast"
      }

      // if we r searching something other then show less at first
      if (self.searchWord !== searchWord) {
        self.showingAllResults = self.showPerShowMore;
      }

      self.searchWord = searchWord;
    }

    if (self.searchWord === "") {
      lavatube.renderArea("container", "templates/search-empty.html", {
        lang: self.lang
      });
    } else {

        switch (self.currentContainerView) {

          case self.CONTAINER_VIEW_SEARCHING: {
            lilframe.getSongListBySearch(self.searchWord, (lst) => {
              lavatube.renderArea("container", "templates/search.html", {
                lang: self.lang,
                searchWord: self.searchWord,
                items: lst,
                playing: self.playing,
                present: present
              });
            }, self.DEFAULT_LIMIT);

            break;
          }

          case self.CONTAINER_VIEW_SEE_ALL: {
            lilframe.getSongListBySearch(self.searchWord, (lst) => {
              lavatube.renderArea("container", "templates/see-all.html", {
                lang: self.lang,
                items: lst,
                playing: self.playing,
                present: present
              }, () => {

                // if we have less than we can show then remove this button
                if (lst.length < self.showingAllResults) {
                  // remove show more button
                  document.querySelector("#show-more-search-results").remove();
                }

              });
            }, self.showingAllResults);

            break;
          }
        }

    }
  }

}