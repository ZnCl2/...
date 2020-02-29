var Theme = function() {
    
    this.loadSiteInfo = function() {
        
        page.cmd( "siteInfo", [], function( info ){
            
            document.getElementById('top_bar_blog_title').textContent   = info.content.title;
            document.getElementById('top_bar_blog_title').href          = '/' + info.address;
    
            if ( info.settings.own === true ) {
                
                _Theme.own = true;
                
                var sidebarAdmin = document.createElement('A');
                sidebarAdmin.href = '/' + info.address + '/admin/';
                sidebarAdmin.id = 'sidebar_link_admin';
                sidebarAdmin.textContent = 'Admin Panel';
                document.getElementById('sidebar').appendChild( sidebarAdmin );

            }
            
            if ( _Theme.pageType === 'archive' ) {
            
                var blogTitle = document.createElement("DIV");
                blogTitle.id = 'blog_title';
                blogTitle.textContent = info.content.title;
                _Theme.headerElem.appendChild( blogTitle );

                var blogDescription = document.createElement("DIV");
                blogDescription.id = 'blog_description';
                blogDescription.textContent = info.content.description;
                _Theme.headerElem.appendChild( blogDescription );

                var moreButton = document.createElement("A");
                moreButton.id = 'mainAnchor';
                moreButton.innerHTML = '&#9660; more';
                moreButton.setAttribute( 'href', '#content' );
                _Theme.headerElem.appendChild( moreButton );
                
            }
            
            _Theme.footerDescriptionElem.textContent = info.content.description;
            
            if ( _Theme.own === true ) {
        
                _Theme.loadAdminSiteMenus();
                _Theme.loadAdminSiteSocialMenus();
                _Theme.loadAdminSiteSettings();

            } else {

                _Theme.loadSiteMenus();
                _Theme.loadSiteSocialMenus();
                _Theme.loadSiteSettings();

            }
    
            if ( _Theme.pageType === 'archive' ) {

                _Theme.loadSitePosts( 0, 5 );

            } else if ( _Theme.pageType === 'post' ) {

                _Theme.postId = parseInt( new URLSearchParams( window.location.search ).get('id') );

                _Theme.loadSitePostById( _Theme.postId );

            }
            
        });
        
    };
    
    this.loadSiteMenus = function() {
        
        page.cmd( "dbQuery", [ "SELECT * FROM menus" ], function( menus ) {

            _Theme.populateSiteMenus( menus );

        });
        
    };
    
    this.loadAdminSiteMenus = function() {
        
        page.cmd( "fileGet", ["/data/admin/menus.json"], function( content ) {
    
            content = content || "";

            try {
                content = JSON.parse(content);
            } catch(e) {
                content = {
                    menus: []
                };
            }
            
            _Theme.populateSiteMenus( content.menus );

        });
        
    };
    
    this.loadSiteSocialMenus = function() {
        
        page.cmd( "dbQuery", [ "SELECT * FROM socialMenus" ], function( socialMenus ) {
            
            _Theme.populateSiteSocialMenus( socialMenus );

        });
        
    };
    
    this.loadAdminSiteSocialMenus = function() {
        
        page.cmd( "fileGet", ["/data/admin/socialMenus.json"], function( content ) {
    
            content = content || "";

            try {
                content = JSON.parse(content);
            } catch(e) {
                content = {
                    socialMenus: []
                };
            }
            
            _Theme.populateSiteSocialMenus( content.socialMenus );

        });
        
    };
    
    this.loadSiteSettings = function() {
        
        page.cmd( "dbQuery", [ "SELECT * FROM settings" ], function( settings ) {
            
            var settingsNice = {};
        
            for ( var i=0 ; i<settings.length ; i++ ) {

                settingsNice[ settings[i].name ] = settings[i].value;

            }

            _Theme.populateSiteSettings( settingsNice );

        });
        
    };
    
    this.loadAdminSiteSettings = function() {
        
        page.cmd( "fileGet", ["/data/admin/settings.json"], function( content ) {
    
            content = content || "";

            try {
                content = JSON.parse(content);
            } catch(e) {
                content = {
                    settings: []
                };
            }
            
            var settingsNice = {};
        
            for ( var i=0 ; i<content.settings.length ; i++ ) {

                settingsNice[ content.settings[i].name ] = content.settings[i].value;

            }
            
            _Theme.populateSiteSettings( settingsNice );

        });
        
    };
    
    this.loadSitePosts = function( start, end ) {
        
        this.postsEnd = this.postsEnd + end;
        
        if ( _Theme.own === true ) {
        
            page.cmd( "fileGet", ["/data/admin/posts.json"], function( content ) {
                
                content = content || "";

                try {
                    content = JSON.parse(content);
                } catch(e) {
                    content = {
                        posts: []
                    };
                }
                
                content.posts.sort( function( a, b ) {
                    
                    return b.date_added - a.date_added;
                    
                });
                
                var postsUsed = content.posts.slice( start, start + end );
                
                _Theme.setSitePosts( postsUsed );
                
                if ( content.posts.length > _Theme.postsEnd ) {

                    _Theme.createMorePostsButton();

                }
                
            });
            
        } else {
            
            page.cmd( "dbQuery", [ "SELECT * FROM posts ORDER BY date_added DESC LIMIT " + start + "," + end ], function( posts ) {

                _Theme.setSitePosts( posts );

                page.cmd( "dbQuery", [ "SELECT COUNT(*) AS count FROM posts" ], function( data ) {

                    if ( data[0].count > _Theme.postsEnd ) {

                        _Theme.createMorePostsButton();

                    }

                });

            });
            
        }
        
    };
    
    this.loadSitePostById = function( postId ) {
        
        if ( _Theme.own === true ) {
            
            page.cmd( "fileGet", ["/data/admin/posts.json"], function( content ) {
                
                content = content || "";

                try {
                    content = JSON.parse(content);
                } catch(e) {
                    content = {
                        posts: []
                    };
                }
                
                content.posts.forEach( function( post ) {
                    
                    if ( post.id === postId ) {
                        
                        _Theme.setSitePostById( post );
                        
                    }
                    
                });
                
            });
            
        } else {
        
            page.cmd( "dbQuery", [ "SELECT * FROM posts WHERE id = :id", { id: postId } ], function( posts ) {

                _Theme.setSitePostById( posts[0] );

            });
            
        }
        
    };
    
    this.populateSiteMenus = function( menus ) {
        
        if ( menus.length > 0 ) {
            
            var menuTitle = document.createElement("DIV");
            menuTitle.id = 'menu_title';
            menuTitle.textContent = 'Main Menu';
            this.menusWrapperElem.appendChild( menuTitle );

        } else {

            return false;

        }

        for ( var i=0 ; i<menus.length ; i++ ) {

            var menu = document.createElement("A");
            menu.setAttribute( 'class', 'menu_entry' );
            menu.setAttribute( 'href', menus[i].target );
            menu.setAttribute( 'title', menus[i].title );
            menu.setAttribute( 'target', '_blank' );
            menu.textContent = menus[i].title;
            this.menusWrapperElem.appendChild( menu );

        }
        
    };
    
    this.populateSiteSocialMenus = function( socialMenus ) {
        
        if ( socialMenus.length > 0 ) {
            
            var menuTitle = document.createElement("DIV");
            menuTitle.id = 'menu_title';
            menuTitle.textContent = 'Social Menus';
            _Theme.menusWrapperElem.appendChild( menuTitle );

        } else {

            return false;

        }

        for ( var i=0 ; i<socialMenus.length ; i++ ) {

            var menu = document.createElement("A");
            menu.setAttribute( 'class', 'menu_social_entry ' + socialMenus[i].type );
            menu.setAttribute( 'href', socialMenus[i].target );
            _Theme.menusWrapperElem.appendChild( menu );

            var footer_menu = document.createElement("A");
            footer_menu.setAttribute( 'class', 'footer_social_entry ' + socialMenus[i].type );
            footer_menu.setAttribute( 'href', socialMenus[i].target );
            _Theme.footerSocialWrapperElem.appendChild( footer_menu );

            if ( socialMenus[i].type === 'zeromail' ) {

                menu.setAttribute( 'href', '/Mail.ZeroNetwork.bit/?to=' + socialMenus[i].target );

                footer_menu.setAttribute( 'href', '/Mail.ZeroNetwork.bit/?to=' + socialMenus[i].target );

            }

        }
        
    };
    
    this.handleEvent = function( event ) {
        
        if ( event.target === this.menusButtonElem ) {
            
            this.menusWrapperElem.style.left = '0vw';
            
        } else if ( event.target === this.closeMenusButtonElem ) {
            
            this.menusWrapperElem.style.left = '-30vw';
            
        } else if ( event.target === this.morePostsElem ) {
            
            this.loadSitePosts( this.postsEnd, 5 );
            
        } else if ( event.type === 'click' && event.target.classList.contains( 'post_header' ) ) {
            
            window.location.href = 'post.html?id=' + event.target.dataset.postid;
            
        } else if ( event.type === 'click' && event.target.classList.contains( 'menu_entry' ) ) {
            
            page.cmd( "wrapperOpenWindow", [ event.target.href, '_blank' ] );
            
        } else if ( event.target === this.footerLinkElem ) {
            
            event.preventDefault();

            page.cmd( "wrapperOpenWindow", [ event.target.href, "_blank" ] );
            
        } else if ( event.target.tagName === "A" ) {
            
            event.preventDefault();

            page.cmd( "wrapperOpenWindow", [ event.target.href, "_blank" ] );
            
        } else if ( event.type === 'click' && event.target === this.assistElem ) {
            
            event.preventDefault();
            
            this.assist();
            
        }
        
    };
    
    this.assist = function() {

        page.cmd( "optionalHelpAll", [ 'Enable' ], function( result ) {

            if ( result === true ) {

                page.cmd('wrapperNotification', ['done', 'Thank you for your assistance', 4000]);

            }

        });
        
    };
    
    this.getPostText = function( content ) {
        
        return content.replace(/<(?:.|\n)*?>/gm, '');
        
    };
    
    this.getMediaPathCss = function( filename ) {
        
        return 'url("media/' + filename + '")';
        
    };
    
    this.setSitePostById = function( post ) {
        
        var dateOrig = new Date( post.date_added ).toString();
        var dateData = dateOrig.split( " " );
        
        document.getElementById('header').style.backgroundImage = this.getMediaPathCss( post.featuredImage );
        
        var postHeader = document.createElement("DIV");
        postHeader.id = 'post_header';
        this.headerElem.appendChild( postHeader );
        
        var postDate = document.createElement("DIV");
        postDate.id = 'post_date';
        postDate.textContent = dateData[1] + ' ' + dateData[2] + ' ' + dateData[3];
        postDate.setAttribute( 'title', dateOrig );
        postHeader.appendChild( postDate );
        
        var postTitle = document.createElement("DIV");
        postTitle.id = 'post_title';
        postTitle.textContent = post.title;
        postHeader.appendChild( postTitle );
        
        this.postWrapperElem.innerHTML = post.body;
        
        var postLinks = document.querySelectorAll( '#posts a' );
        
        for ( var j=0 ; j<postLinks.length ; j++ ) {

            postLinks[j].addEventListener( 'click', this );

        }
        
    };
    
    this.populateSiteSettings = function( settings ) {
        
        if ( this.pageType === 'archive' ) {
        
            document.getElementById('header').style.backgroundImage = this.getMediaPathCss( settings.cover_image );
            
        }
        
    };
    
    this.setSitePosts = function( posts ) {
        
        for ( var i=0 ; i<posts.length ; i++ ) {
            
            var box = document.createElement("DIV");
            box.setAttribute( 'class', 'post' );
            this.postWrapperElem.appendChild( box );
            
            var post_header = document.createElement("DIV");
            post_header.setAttribute( 'class', 'post_header' );
            post_header.dataset.postid = posts[i].id;
            box.appendChild( post_header );
            
            var post_title = document.createElement("DIV");
            post_title.setAttribute( 'class', 'post_title' );
            post_header.appendChild( post_title );
            
            var post_date = document.createElement("DIV");
            post_date.setAttribute( 'class', 'post_date' );
            post_header.appendChild( post_date );
            
            var post_content = document.createElement("DIV");
            post_content.setAttribute( 'class', 'post_content' );
            box.appendChild( post_content );
            
            var dateOrig = new Date( posts[i].date_added ).toString();
            var dateData = dateOrig.split( " " );
            
            post_header.style.backgroundImage = this.getMediaPathCss( posts[i].featuredImage );
            post_title.textContent = posts[i].title;
            post_date.textContent = dateData[1] + ' ' + dateData[2] + ' ' + dateData[3];
            post_date.setAttribute( 'title', dateOrig );
            post_content.innerHTML = this.getPostText( posts[i].body ).substr( 0, 200 ) + '...';
            
            var post_permalink = document.createElement("A");
            post_permalink.setAttribute( 'class', 'post_permalink' );
            post_permalink.textContent = 'Read more';
            post_permalink.setAttribute( 'href', 'post.html?id=' + posts[i].id );
            post_content.appendChild( post_permalink );
            
            post_header.addEventListener( 'click', this );
            
        }
        
        if ( this.morePostsElem !== null ) {
            
            this.morePostsElem.parentNode.appendChild( this.morePostsElem );
            
        }
        
    };
    
    this.createMorePostsButton = function() {
        
        if ( this.morePostsElem !== null ) {
            
            return false;
            
        }
        
        this.morePostsElem = document.createElement("BUTTON");
        this.morePostsElem.id = 'more_posts_button';
        this.morePostsElem.textContent = 'LOAD MORE POSTS';
        this.postWrapperElem.appendChild( this.morePostsElem );
        
        this.morePostsElem.addEventListener( 'click', this );
        
    };

    var _Theme = this;
    
    this.pageType = null;
    
    if ( window.location.href.indexOf( 'post.html' ) !== -1 ) {
        
        this.pageType = 'post';
        
    } else {
        
        this.pageType = 'archive';
        
    }
    
    this.postsEnd = 0;
    this.morePostsElem = null;
    this.postId = null;
    this.own = false;
    
    this.headerElem = document.getElementById('header');
    this.postWrapperElem = document.getElementById('posts');
    this.menusWrapperElem = document.getElementById('menu');
    this.menusButtonElem = document.getElementById('menu_button');
    this.closeMenusButtonElem = document.getElementById('close_menu');
    this.footerDescriptionElem = document.getElementById('footer_description');
    this.footerSocialWrapperElem = document.getElementById('footer_social_buttons');
    this.footerLinkElem = document.getElementById('footer_sig_link');
    this.assistElem = document.getElementById('sidebar_assist');
    
    this.menusButtonElem.addEventListener( 'click', this );
    this.closeMenusButtonElem.addEventListener( 'click', this );
    this.footerLinkElem.addEventListener( 'click', this );
    
    if ( this.assistElem !== null ) {
        
        this.assistElem.addEventListener( 'click', this );
        
    }
    
    this.loadSiteInfo();
    
};

var page = new ZeroFrame();
var themeInit = new Theme();

window.onscroll = function() {
    
    if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
    ) {

        document.getElementById('top_bar').style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        document.getElementById('top_bar').style.lineHeight = '6vh';
        document.getElementById('top_bar').style.fontSize = '3vh';
        document.getElementById('menu_button').style.width = '6vh';
        document.getElementById('menu_button').style.height = '6vh';

    } else if (
        document.body.scrollTop == 0 ||
        document.documentElement.scrollTop == 0
    ) {

        document.getElementById('top_bar').style.backgroundColor = 'rgba(0, 0, 0, 0)';
        document.getElementById('top_bar').style.lineHeight = '8vh';
        document.getElementById('top_bar').style.fontSize = '4vh';
        document.getElementById('menu_button').style.width = '8vh';
        document.getElementById('menu_button').style.height = '8vh';

    }
    
};

window.onload = function() {
    
    document.body.addEventListener( 'click', function( event ) {
        
        if ( event.type === 'click' && event.target.tagName === 'A' ) {
            
            if ( event.target.getAttribute( 'href' ).startsWith( '#' ) === true ) {
                
                event.preventDefault();

                document.querySelector('#content').scrollIntoView({
                    behavior: 'smooth'
                });
                
            }
            
        }
        
    });

};