
## About this little project

The goal was to distribute source code on ZeroNet with some useful stuff similar to GitHub, for example syntax highlighting and markdown support. 

ZeroSources only list static files using the ZeroNet API, there is no userdata/dynamic content.

The archive creation is not perfect, but you can simply copy the sources from the ZeroNet data/zite directory.

In this example, I found funny to display the files of ZeroSources itself, but you should create a subdirectory like "sources" and change the config root directory to this one. 

If you have suggestions, contact me on ZeroMail: [archzenvald@zeroid.bit](http://127.0.0.1:43110/Mail.ZeroNetwork.bit/?to=archzenvald).

## Installation & Configuration

Just clone the zite.

Configuration is in the `js/cfg.js` file.

## Design

The design is not perfect, especially for the markdown display, but it should be easy to change it the way you want it.

ZeroSources style is in `design.css`, the rest is related to jstree, highlightjs and showdownjs.

## Issues
### Missing language syntax highlighting

Make your own language pack on the highlightjs site.


