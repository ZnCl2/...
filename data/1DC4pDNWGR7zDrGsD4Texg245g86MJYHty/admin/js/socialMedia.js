var SocialMedia = function() {
    
    this.createEntry = function( type ) {
        
        var wrap    = appendDom({ tag: 'DIV', class: 'userSocialMedia', parent: this.formElem });
        var header  = appendDom({ tag: 'DIV', class: 'header', parent: wrap });
        var label   = appendDom({ tag: 'LABEL', class: this.data[type].cssClass, text: this.data[type].name, parent: header });
        var span    = appendDom({ tag: 'SPAN', class: 'delSocMedEntry', title: 'Delete this entry', parent: header });
        var input   = appendDom({ tag: 'INPUT', class: 'inputSocMed', type: 'text', placeholder: 'eg: ' + this.data[type].eg, parent: wrap });
        
        span.addEventListener( 'click', this );
        
        input.dataset.type = type;
        
        return input;
        
    };
    
    this.removeEntry = function( target ) {
            
        target.removeEventListener( 'click', this );
        
        var entry = target.parentNode.parentNode;

        while ( entry.firstChild ) {

            entry.removeChild( entry.firstChild );

        }

        entry.parentNode.removeChild( entry );

    };
    
    this.save = function() {
    
        var socialMenus = {
            socialMenus: []
        };
        
        var socialMenuBlocks = document.querySelectorAll('.inputSocMed');
        
        for ( var i=0 ; i<socialMenuBlocks.length ; i++ ) {
        
            socialMenus.socialMenus.push({
                type: socialMenuBlocks[i].dataset.type,
                target: socialMenuBlocks[i].value
            });

        }
    
        socialMenus = JSON.stringify(socialMenus, null, 4);
        
        page.cmd( "fileWrite", [ "/data/admin/socialMenus.json", base64Encode( socialMenus ) ], function() {
            
            page.cmd("sitePublish", [ "stored" ], function() {

                page.cmd('wrapperNotification', ['done', 'Your social media entries were saved', 4000]);

            });
            
        });
        
    };
    
    this.handleEvent = function( event ) {
        
        if ( event.type === 'click' && event.target.parentNode === this.availSocialMediaRowElem ) {
            
            this.createEntry( event.target.dataset.type );
            
        } else if ( event.type === 'click' && event.target.classList.contains( 'delSocMedEntry' ) ) {
            
            this.removeEntry( event.target );
            
        } else if ( event.type === 'click' && event.target === this.saveElem ) {
            
            event.preventDefault();
            
            this.save();
            
        }
        
    };
    
    this.populateAvail = function() {
        
        for ( var prop in this.data ) {
            
            var elem = appendDom({
                tag: 'SPAN',
                title: this.data[prop].htmlTitle,
                class: this.data[prop].cssClass,
                parent: this.availSocialMediaRowElem
            });
            
            elem.dataset.type = prop;
            
            elem.addEventListener( 'click', this );
            
        }
        
    };
    
    this.populate = function( data ) {
        
        for ( var i=0 ; i<data.length ; i++ ) {
            
            var input = this.createEntry( data[i].type );
            input.value = data[i].target;
            
        }
        
    };
    
    var _SocialMedia = this;
    
    this.data = {
        facebook: {
            name: 'Facebook',
            cssClass: 'fb',
            htmlTitle: 'Add a Facebook account or page',
            eg: 'https://www.facebook.com/Clean-Code-2595816443790087/'
        },
        twitter: {
            name: 'Twitter',
            cssClass: 'tw',
            htmlTitle: 'Add a Twitter account',
            eg: 'https://twitter.com/cleanCodeWeb'
        },
        github: {
            name: 'GitHub',
            cssClass: 'gh',
            htmlTitle: 'Add a GitHub account',
            eg: 'https://github.com/cleancodetech'
        },
        zeromail: {
            name: 'ZeroMail',
            cssClass: 'zl',
            htmlTitle: 'Add a ZeroMail email',
            eg: 'gtat314'
        },
        zerome: {
            name: 'ZeroMe',
            cssClass: 'zm',
            htmlTitle: 'Add a ZeroMe account',
            eg: 'http://127.0.0.1:43110/Me.ZeroNetwork.bit/?Profile/1MoonP8t4rk9QamBUPh5Aspkwa1Xhf5ux2/1H2ao62jz8FK62H4VtDwHT1VW7hsyabqqX/gtat314@zeroid.bit'
        },
        reddit: {
            name: 'reddit',
            cssClass: 're',
            htmlTitle: 'Add a reddit account',
            eg: 'https://www.reddit.com/user/gtat314'
        }
    };
    
    this.availSocialMediaRowElem = document.getElementById('availSocialMediaRow');
    this.formElem = document.getElementById('userSocialMediaAll');
    this.saveElem = document.getElementById('saveMenus');
    
    this.saveElem.addEventListener( 'click', this );
    
    this.populateAvail();
    
};




var site_info       = null;
var sociaMedia      = new SocialMedia();
var sidebarInit     = new Sidebar();

page.cmd( "siteInfo", [], function( info ) {
    
    site_info = info;
    
    sidebarInit.populate( info );
    
    if ( info.settings.own !== true ) {
                
        window.location.href = window.location.origin + '/' + info.address + '/auth.html';
        
    }
    
});

page.cmd( "fileGet", ["/data/admin/socialMenus.json"], function( content ) {
    
    content = parseJsonFile( content, 'socialMenus.json' );
    
    sociaMedia.populate( content.socialMenus )
    
});