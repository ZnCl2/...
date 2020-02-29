[**\[Home\]**](javascript:updatePage('?u=Index.md')) \| [**\[Libraries\]**](javascript:updatePage('?u=Libraries.md'))

We're back after 3 years! ZeroNet fixed the cross site issue (finally).

# LibCDN

LibCDN is a Content Distribution Network for ZeroNet. We serve popular JS, CSS, and more!

If you didn't add this site manually then one of your other sites did! Good on them, and you! Don't worry: This site doesn't take much room at all. In fact, the required files are only about 15KB.

##### **Pros:**

-   Save space (all those jQuery libraries on the network add up!)
-   Much better seeding (and thus better library load speed!)
-   Promote new libraries (I'd really like to see some designed for ZeroNet)
-   Reduce clutter in site directories
-   more?

##### **Cons:**

-   Partial centralization (You have to trust that I don't modify libraries (I don't))
-   Possible breaking (Unlikely because libraries aren't deleted)
-   more?

### Features:

-   Large Library - LibCDN has many popular libraries and is always adding.
-   Fast Loading - The web page part of the site is very minimal. Most of it is generated dynamically. So the user won't have to worry about LibCDN hogging space.

### In order to get this to work:

You must check to see if your library has loaded. If it hasn't, you must use the api to request to add my site as the example shows.

`var api = new ZeroFrame();
 if (!window.jQuery) {
    api.cmd("wrapperNotification", ["error", "jQuery didn't load. Please allow us to add the CDN that serves it.", 10000]);
    api.cmd("wrapperPermissionAdd", "Merger:CDN", function() {
        //Try to add LibCDN
        api.cmd("mergerSiteAdd", "1LibCDNvZoxnBSYKLHF8XbBujPxYRePQSp");
        api.cmd("wrapperNotification", ["done", "Please refresh your page to continue.", 1000000]);
      });
 }`
This is due to ZeroNet not allowing me to directly add sites anymore (security improvement).

If you find this idea interesting, revolutionary, or just want to help me out, please drag the 0 to the left and help distribute all files! This will make the CDN stronger and faster for everyone!

### Changelog / MOTD:

> ##### **November 28, 2019:**
>
> _Work continued on this project. Expect some new updates soon!_
>
> ##### **February 16, 2017:**
>
> _Added Handlebars_
>
> ##### **February 15, 2017:**
>
> _Added Async_
>
> ##### **February 12, 2017:**
>
> _Added Vue.JS_
>
> ##### **February 10, 2017:**
>
> _Caching to increase performance. Users can now click on files to copy the link to clipboard._
