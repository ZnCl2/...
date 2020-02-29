Vue.use(Buefy.default)

var App = new Vue({
    el: "#app",
    data: {
        encrypted: true,
        showNavbar: false,
        loadedPaste: false
    },
    methods: {
        toggleEncrypted: function() {
            // Toggle encryption
            this.encrypted = !this.encrypted;
        },
        toggleNavbar: function () {
            // Show/hide navbar items on mobile
            this.showNavbar = !this.showNavbar;
        },
        paste: function() {
            if(this.loadedPaste) {
                window.location.href = window.location.href.split('?')[0];
            } else {
                // Call the createNewPaste method on our paste vue object
                paste.$emit('createNewPaste');
            }
        },
        loadPaste: function(pasteID) {
            this.loadedPaste = true;

            // Load the paste from the given pasteID
            loadPaste(pasteID)
                .then(paste_data => {
                    // Check we actually got content back
                    if (paste_data.length != 0) {
                        // Extract info about the paste
                        var author = paste_data[0];
                        var content = paste_data[1];

                        // Set the content of the paste area to the requested paste
                        document.getElementById('paste-area').value = content;

                        // Show a notification that paste content was loaded!
                        zeroFrame.cmd("wrapperNotification", ["done", "Paste loaded successfully!", 4000]);

                        /*
                        // TODO: Add the author's name
                        document.getElementById('paste-author').innerHTML = "Authored by " + author;
                        */
                    }
                });
        }
    }
});

// Gets a parameter from the URL
// i.e. ('p') http://127.0.0.1:43110/site.bit?p=hello -> hello
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// Check if we're coming from a new paste
// TODO: Use localstorage or something instead of url
var newPaste = getURLParameter('n');
if(newPaste) {
    // Pop up a modal giving the paste link
}

// Check if the user supplied a paste
// Paste IDs can be supplied in the URL with the 'p' param
var pasteID = getURLParameter('p');
if(pasteID) {
    console.log("Loading paste!");
    App.loadPaste(pasteID);
}

// Auto-resize the text file as more content is placed inside of it.
autosize(document.querySelector('textarea'));
