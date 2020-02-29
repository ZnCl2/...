tiddlywiki --verbose  --load heeg.html --rendertiddlers [!is[system]] $:/core/templates/static.tiddler.html static text/plain --rendertiddler $:/_sitemap static/sitemap.xml text/vnd.tiddlywiki  --rendertiddler $:/theeg.template.css  static/static.css text/vnd.tiddlywiki --rendertiddler $:/boot/Yandex_Metrika_Counter.js    static/Yandex_Metrika_Counter.js text/plain --rendertiddler $:/_heeg.js   static/heeg.js text/plain  && ^
xcopy images output\static\images /s /e /C /Y /d /i && ^
copy heeg.html output\static\ && ^
copy .htaccess output\static\ && ^
copy favicon.ico output\static\


