var Media = function() {
    
    var MediaEntry = function( filename ) {
        
        this.remove = function() {
            
            this.wrap.removeChild( this.span );
            this.wrap.parentNode.removeChild( this.wrap );
            _Media.remove( this.filename );
            
        };
        
        this.handleEvent = function( event ) {
            
            event.stopPropagation();

            if ( event.type === 'click' && event.target === this.wrap ) {
            
                _Media.show( event.target.dataset.filename );
                
            } else if ( event.type === 'click' && event.target === this.span ) {
            
                this.remove();
                
            }
            
        };
        
        this.checkType = function() {
            
            var flag = 0;
            
            for ( var i=0 ; i< _Media.settings.length ; i++ ) {
                
                if ( _Media.settings[i].name === 'cover_image' && _Media.settings[i].value.indexOf( this.filename ) !== -1 ) {
                    
                    this.wrap.classList.add( 'coverImage' );
                    flag = flag +1;
                    
                }
                
            }
            
            for ( var i=0 ; i<_Media.posts.length ; i++ ) {
                
                var body = _Media.posts[i].body;
                var feat = _Media.posts[i].featuredImage;
                
                if ( body.indexOf( this.filename ) !== -1 ) {
                    
                    this.wrap.classList.add( 'used' );
                    flag = flag +1;
                    
                }
                
                if ( feat.indexOf( this.filename ) !== -1 ) {
                    
                    this.wrap.classList.add( 'featuredImage' );
                    flag = flag +1;
                    
                }
                
            }
            
            if ( flag === 0 ) {
                
                this.wrap.classList.add( 'unused' );
                
            }
            
        };
        
        this.append = function() {
            
            this.wrap = appendDom({ tag: 'DIV', class: 'mediaEntry all', parent: _Media.containerElem });
            this.span = appendDom({ tag: 'SPAN', title: 'Delete this media', parent: this.wrap });

            this.wrap.style.backgroundImage = "url('../media/" + filename + "')";

            this.wrap.dataset.filename = filename;

            this.wrap.addEventListener( 'click', this );
            this.span.addEventListener( 'click', this );
            
            this.checkType();
            
        };
        
        this.prepend = function() {
            
            this.wrap = document.createElement('DIV');
            this.wrap.setAttribute( 'class', 'mediaEntry all unused' );
            
            _Media.containerElem.insertBefore( this.wrap, _Media.containerElem.children.item(1) );
            
            this.span = appendDom({ tag: 'SPAN', title: 'Delete this media', parent: this.wrap });
            
            this.wrap.style.backgroundImage = "url('../media/" + filename + "')";

            this.wrap.dataset.filename = filename;

            this.wrap.addEventListener( 'click', this );
            this.span.addEventListener( 'click', this );
            
        };
        
        var _MediaEntry = this;
        
        this.filename = filename;
        
        this.wrap = null;
        this.span = null;
        
    };
    
    this.remove = function( filename ) {
        
        page.cmd( 'fileDelete', [ '/media/' + filename ], function(result) {

            if ( result === 'ok' ) {
                    
                page.cmd( 'fileDelete', [ '/media/' + filename + '.piecemap.msgpack' ], function(result) {});
                
                page.cmd("sitePublish", [ "stored" ], function() {});
                
            } else {
                
                page.cmd('wrapperNotification', ['error', 'Error. Message: ' + result]);
                
            }

        });
        
    };
    
    this.uploadNewImage = function( event ) {
        
        var file        = event.target.files[0];
        var ext         = file.name.split('.').pop();
        var fileName    = Date.now() + '.' + ext;

        page.cmd( 'bigfileUploadInit', [ 'media/' + fileName, file.size ], function( result ) {
            
            var formdata = new FormData();
            formdata.append( fileName, file );
            
            var req = new XMLHttpRequest();
            
            req.onload = function( response ) {
                
                page.cmd("sitePublish", [ "stored" ], function() {});
                
                page.cmd('wrapperNotification', ['done', 'The selected image was uploaded successfully', 4000]);
                
                var entry = new MediaEntry( fileName );
                entry.prepend();
                
            };
            
            req.withCredentials = true;
            req.open( "POST", result.url );
            req.send( formdata );
            
        });
        
    };
    
    this.view = function( value ) {

        var blocks = document.querySelectorAll('.mediaEntry');
        
        for ( var i=0 ; i<blocks.length ; i++ ) {
            
            if ( blocks[i].classList.contains( value ) === false ) {
                
                blocks[i].style.display = 'none';
                
            } else {
                
                blocks[i].style.display = 'block';
                
            }
            
        }
        
        if ( value === 'unused' ) {
            
            this.delAllElem.style.display = 'block';
            
        } else {
            
            this.delAllElem.style.display = 'none';
            
        }
        
    };
    
    this.startUnusedDeletion = function() {
        
        var unused = document.querySelectorAll('.unused');
        var count = 0;
        
        for ( var i=0 ; i<unused.length ; i++ ) {
            
            var filename = unused[i].dataset.filename;
            
            while ( unused[i].firstChild ) {
        
                unused[i].removeChild( unused[i].firstChild );

            }

            unused[i].parentNode.removeChild( unused[i] );
            
            page.cmd( 'fileDelete', [ '/media/' + filename ], function(result) {
                
                if ( result === 'ok' ) {
                    
                    page.cmd( 'fileDelete', [ '/media/' + filename + '.piecemap.msgpack' ], function(result) {});
                    
                    count = count + 1;
                    
                } else {
                
                    page.cmd('wrapperNotification', ['error', 'Error. Message: ' + result]);

                }
                
                if ( count === unused.length ) {
                    
                    page.cmd("sitePublish", [ "stored" ], function() {});
                    
                    page.cmd('wrapperNotification', ['done', 'All unused images were deleted successfully', 4000]);
                    
                }
                
            });
            
        }
        
    };
    
    this.handleEvent = function( event ) {

        if ( event.type === 'click' ) {
            
            if ( event.target === this.delAllElem ) {
                
                var r = confirm('Are you sure you want to permanently delete all unused media? This action is irreversible');
                
                if ( r === true ) {
                
                    this.startUnusedDeletion();
                    
                }
                
            } else {

                this.hide();
                
            }

        } else if ( event.type === 'keydown' ) {

            if ( event.key === "Escape" || event.key === "Esc" || event.keyCode === 27 ) {
                
                this.hide();
                
            }

        } else if ( event.type === 'input' ) {
            
            this.uploadNewImage( event );

        } else if ( event.type === 'change' ) {
            
            this.view( event.target.value );

        }

    };
    
    this.show = function( filename ) {
        
        this.showImgElem.style.backgroundImage = "url('../media/" + filename + "')";
        this.showElem.style.display = 'block';
        
    };
    
    this.hide = function() {
        
        this.showElem.style.display = 'none';
        
    };
    
    this.inform = function( filename ) {
        
        this.filenames.push( filename );
        
    };
    
    this.populate = function() {
        
        this.filenames.sort();
        
        page.cmd( "fileGet", ["/data/admin/posts.json"], function( content ) {
            
            content = parseJsonFile( content, 'posts.json' );
            
            _Media.posts = content.posts;
            
            page.cmd( "fileGet", ["/data/admin/settings.json"], function( content ) {
                
                content = parseJsonFile( content, 'posts.json' );
            
                _Media.settings = content.settings;
        
                for ( var i=_Media.filenames.length-1 ; i>=0 ; i-- ) {

                    var entry = new MediaEntry( _Media.filenames[i] );
                    entry.append();

                }
            
            });
            
        });
        
    };
    
    var _Media = this;
    
    this.filenames = [];
    this.posts = null;
    this.settings = null;
    
    this.containerElem  = document.getElementById('media');
    this.showElem       = document.getElementById('imageShow');
    this.showImgElem    = document.getElementById('imageShowImg');
    this.uploadElem     = document.getElementById('inputNewMedia');
    this.selectElem     = document.getElementById('selectViewMedia');
    this.delAllElem     = document.getElementById('delUnused');
    
    this.showElem.addEventListener( 'click', this );
    this.uploadElem.addEventListener( 'input', this );
    this.selectElem.addEventListener( 'change', this );
    this.delAllElem.addEventListener( 'click', this );
    document.body.addEventListener( 'keydown', this );
    
};




var site_info       = null;
var media           = new Media();
var sidebarInit     = new Sidebar();

page.cmd( "siteInfo", [], function( info ) {
    
    site_info = info;
    
    sidebarInit.populate( info );
    
    if ( info.settings.own !== true ) {
                
        window.location.href = window.location.origin + '/' + info.address + '/auth.html';
        
    }
    
});

page.cmd( 'fileList', ['/media'], function(result) {

    for ( var i=0 ; i<result.length ; i++ ) {

        if ( result[i].indexOf( 'piecemap.msgpack' ) === -1 ) {
            
            media.inform( result[i] );

        }

    }
    
    media.populate();

});