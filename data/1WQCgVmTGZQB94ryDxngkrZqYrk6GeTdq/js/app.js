/**
 * Page Object Model.
 *
 */
class Page extends ZeroFrame {

    /**
     * Gets the site information.
     *
     * @return the site information.
     */
    get siteInfo() {
        return this._siteInfo;
    }


    /**
     * Sets the site information.
     */
    set siteInfo(siteInfo) {
        this._siteInfo = siteInfo;
    }


    /**
     * Gets the heroes.
     *
     * @return the heroes.
     */
    get heroes() {
        return this._heroes;
    }


    /**
     * Sets the heroes.
     */
    set heroes(heroes) {
        this._heroes = heroes;
    }


    /**
     * Gets the current logged in user.
     */
    get user() {
        return this._user;
    }


    /**
     * Sets the current logged in user.
     */
    set user(user) {
        this._user = user;
    }


    onOpenWebsocket() {
        const self = this;

        this.cmd("siteInfo", [], function (response) {
            self.siteInfo = response;

            let outDiv = document.getElementById("out");
            outDiv.innerHTML = `
                Page address: ${self.siteInfo.address}<br>
                Modified: ${new Date(self.siteInfo.content.modified*1000)}
            `;
        });

        this.cmd("getHeroes", [], function (response) {
            // In case the plugin is not installed locally
            if (response) {
                self.heroes = response.message;

                let helloDiv = document.getElementById("hello");
                helloDiv.innerHTML = self.heroes;
            }
        });

        this.login();
        this.loadHeroes();
    }


    onRequest(command, message) {
        if (command === "setSiteInfo") {
            const user = message.params.cert_user_id;

            if (user) {
                this.user = user;

                let userDiv = document.getElementById("user");
                userDiv.innerHTML = this.user;
            }

            this.siteInfo = message.params;

            if (message.params.event[0] === "file_done") {
                this.loadHeroes();
            }
        }
        else {
            this.log("Unknown incoming message: ", command)
        }
    }


    /**
     * Performs log in.
     */
    login() {
        this.cmd("certSelect", {
            accepted_domains: [
                "zeroid.bit"
            ]
        });
        return false;
    }


    /**
     * Gets all collection of heroes from the site's database,
     * and then populate the view accordingly.
     */
    loadHeroes() {
        this.cmd("dbQuery", [
            "SELECT * FROM heroes LEFT JOIN json USING (json_id) ORDER BY created_at"
        ], heroes => {
            const heroesTable = document.getElementById("heroesTable");
            heroesTable.innerHTML = "";

            if (!!heroes) {
                heroesTable.innerHTML += `
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Hero's Name</th>
                        <th>Added By</th>
                        <th></th>
                      </tr>
                    </thead>
                `;
            }

            heroes.forEach((hero, i) => {
                heroesTable.innerHTML += `
                    <tr>
                      <td>${i + 1}.</td>
                      <td>${hero.name}</td>
                      <td>${hero.cert_user_id}</td>
                      <td>
                        <button
                          class="btn btn-default"
                          type="button"
                          onclick="return page.deleteHero('${hero.cert_user_id}', ${hero.created_at})">
                            Delete
                        </button>
                      </td>
                    </tr>
                `;
            });
        });
    }


    /**
     * Saves user's data.
     *
     * @param data Data to save.
     */
    saveUserData(data) {
        const authAddress = this.siteInfo.auth_address;
        const dataPath = `data/users/${authAddress}/data.json`;
        const contentPath = `data/users/${authAddress}/content.json`;

        const rawJson = unescape(encodeURIComponent(JSON.stringify(data, undefined, '\t')));
        this.cmd("fileWrite", [
            dataPath,
            btoa(rawJson)
        ], response => {
            if (response === "ok") {
                document.getElementById("name").value = "";

                this.cmd("siteSign", {
                    "inner_path": contentPath
                }, () => {
                    this.loadHeroes();

                    // In case the site is not seeded by others yet
                    if (this.siteInfo.peers > 1) {
                        this.cmd("sitePublish", {
                            "inner_path": contentPath,
                            "sign": false
                        });
                    }
                });
            }
            else {
                this.cmd("wrapperNotification", [
                    "error",
                    "File write error: #{response}"
                ]);
            }
        });
    }


    /**
     * Adds a hero.
     */
    addHero() {
        if (!this.user) {
            this.cmd("wrapperNotification", [
                "error",
                "Please login first"
            ]);
            return;
        }

        const name = document.getElementById("name").value;

        if (!name) {
            this.cmd("wrapperNotification", [
                "error",
                "Hero's name cannot be empty"
            ]);
            return;
        }

        const authAddress = this.siteInfo.auth_address;
        const dataPath = `data/users/${authAddress}/data.json`;
        const contentPath = `data/users/${authAddress}/content.json`;

        this.cmd("fileGet", {
            "inner_path": dataPath,
            "required": false
        }, data => {
            if (data) {
                data = JSON.parse(data);
            }
            else {
                data = {
                    "heroes": []
                };
            }

            data.heroes.push({
                "name": name,
                "created_at": Date.now()
            });

            this.saveUserData(data);
            this.log("Hero added");
        });
        return false;
    }


    /**
     * Deletes a hero.
     *
     * @param {string} jsonId User.
     * @param {number} createdAt Creation timestamp.
     */
    deleteHero(jsonId, createdAt) {
        if (!jsonId || !createdAt) {
            this.cmd("wrapperNotification", [
                "error",
                "No hero selected"
            ]);
            return;
        }

        if (this.user !== jsonId) {
            this.cmd("wrapperNotification", [
                "error",
                "You can only delete a hero you added"
            ]);
            return;
        }

        const authAddress = this.siteInfo.auth_address;
        const dataPath = `data/users/${authAddress}/data.json`;
        const contentPath = `data/users/${authAddress}/content.json`;

        this.cmd("fileGet", {
            "inner_path": dataPath,
            "required": false
        }, data => {
            if (data) {
                data = JSON.parse(data);
            }
            else {
                data = {
                    "heroes": []
                };
            }

            for (let i = 0; i < data.heroes.length; i ++) {
                const hero = data.heroes[i];

                if (hero.created_at === createdAt) {
                    data.heroes.splice(i, 1);
                    break;
                }
            }

            this.saveUserData(data);
            this.log("Hero deleted");
        });
    }

}


page = new Page();
