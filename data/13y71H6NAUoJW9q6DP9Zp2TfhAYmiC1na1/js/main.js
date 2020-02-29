function escapeHTML(str)
{
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//recursive node filling
function buildNode(tree, jstree, path){
  var file = true;
  for(var node in tree){
    file = false;
    var subpath = path;
    if(subpath.length > 0)
      subpath += "/";
    subpath += node;

    var jsnode = {
      text: node,
      id: subpath,
      children: []
    }

    jstree.children.push(jsnode);
    buildNode(tree[node], jsnode, subpath);
  }

  if(file)
    jstree.icon = "jstree-file";
  else
    jstree.id = "@"+jstree.id;
}

var F = {
  READABLE: 1,
  PICTURE: 2,
  MARKDOWN: 3
}

var formats = {}

function load_format_cfg(list, flag){
  for(var i = 0; i < list.length; i++)
    formats[list[i]] = flag;
}

class Page extends ZeroFrame{
  setSiteInfo(site_info){
  }

  onOpenWebsocket(){
    this.cmd("siteInfo", [], function(site_info) {
      page.setSiteInfo(site_info)
    })

    this.showdown = new showdown.Converter();

    //parse url
    this.url = document.createElement("a");
    this.url.href = base.href;
    this.path = ""
    if(this.url.search.length > 0){
      this.path = this.url.search.substr(1);
      if(this.path[0] == "@"){ //subfolder root loading
        this.path = this.path.substr(1);
        cfg.root = this.path;
      }
    }
    this.preview = $("#preview");

    //load formats
    load_format_cfg(cfg.formats.readables, F.READABLE);
    load_format_cfg(cfg.formats.pictures, F.PICTURE);
    load_format_cfg(cfg.formats.markdowns, F.MARKDOWN);

    this.cmd("fileList", [cfg.root], function(list){
      //build tree from files list
      var tree = {}

      for(var i = 0; i < list.length; i++){
        var parts = list[i].split("/");
        var node = tree
        for(var j = 0; j < parts.length; j++){
          var part = parts[j];
          var nnode = node[part];
          if(!nnode){
            node[part] = {}
            nnode = node[part];
          }

          node = nnode;
        }
      }

      //build jstree
      var root = {
        text: "",
        id: "",
        state: {
          opened: true
        },
        children: []
      }
      
      buildNode(tree, root, "");

      page.tree = $("#tree").jstree({core: { data: [root] }}).bind("loaded.jstree",function(e,data){
        if(page.path)
          $("#tree").jstree("select_node",page.path);
      });
      page.tree.on("changed.jstree", function (e, data) {
        page.onOpenPath(data.selected[0]);
      });
    });
  }

  onRequest(cmd, message){
    if (cmd == "setSiteInfo")
      this.setSiteInfo(message.params)
    else
      this.log("Unknown incoming message:", cmd)
  }

  generateArchive(fullpath){
    var zip = new JSZip();
    this.cmd("fileList", [fullpath], function(list){
      for(var i = 0; i < list.length; i++){
        (function(i,path){
          page.cmd("fileGet", [fullpath+"/"+path,false,"base64"], function(data){
            if(data)
              zip.file(path, data, {base64: true});

            if(i == list.length-1){ //end
              zip.generateAsync({type:"base64"}).then(function(content){
                var a = document.createElement("a");
                a.href = "data:application/zip;base64,"+content;
                a.download = fullpath.replace("/","_")+".zip";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              });
            }
          });

        })(i,list[i]);
      }
    });
  }

  onOpenPath(path){
    if(this.locked)
      return false;

    this.locked = true;

    if(path[0] == "@"){ //folder access
      var fullpath = cfg.root;
      if(fullpath.length > 0)
        fullpath += "/"
      fullpath += path.substring(1);

      page.preview.html("<a href=\"?@"+fullpath+"\" title=\"explore from this subdirectory\">reference folder: "+fullpath+"</a><br />");

      //zip link
      var a = document.createElement("a");
      a.href = "#";
      a.innerHTML = "generate archive";
      a.title = "generate a zip file for the folder, not all files will work; copy directly from the ZeroNet site folder to avoid this problem"; 
      a.onclick = function(){
        page.generateArchive(fullpath);
      }
      page.preview.append($(a));

      page.locked = false;
    }
    else{ //file access
      //build full path
      var fullpath = cfg.root;
      if(fullpath.length > 0)
        fullpath += "/"
      fullpath += path;

      //extract extension
      var pos = fullpath.indexOf(".")
      var ext = null
      if(pos >= 0)
        ext = fullpath.substring(pos+1);
      if(ext == null) 
        ext = "";
      else
        ext = ext.toLowerCase();

      var format = formats[ext];
      if(format == null){ //second extraction, using last index of
        var pos = fullpath.lastIndexOf(".")
        var ext = null
        if(pos >= 0)
          ext = fullpath.substring(pos+1);
        if(ext == null) 
          ext = "";
        else
          ext = ext.toLowerCase();

        format = formats[ext];
      }

      page.preview.html("<a href=\""+fullpath+"\" target=\"_blank\" title=\"direct link\">"+fullpath+"</a>");
      page.preview.append("<br /><a href=\"?"+fullpath+"\" title=\"copy this link to reference to this file\">reference</a>");

      if(format == null){ //download no preview formats
        if(cfg.auto_download){
          var a = document.createElement("a");
          a.target = "_blank";
          a.href = fullpath;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }

        page.preview.append("<p>No preview available for this file format.</p>");

        page.locked = false;
      }
      else if(format == F.READABLE){ //readable format
        this.cmd("fileGet", [fullpath, false,"text"], function(data){
          page.preview.append("<pre><code>"+escapeHTML(data)+"</code></pre>");
          $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
          });
          page.locked = false;
        });
      }
      else if(format == F.MARKDOWN){
        this.cmd("fileGet", [fullpath, false,"text"], function(data){
          page.preview.append("<div>"+page.showdown.makeHtml(escapeHTML(data))+"</div>");
          page.locked = false;
        });
      }
      else if(format == F.PICTURE){
        page.preview.append("<img class=\"preview\" src=\""+fullpath+"\" />");
        page.locked = false;
      }
    }
  }
}

page = new Page()
