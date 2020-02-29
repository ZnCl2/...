(function() {
  var Product,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Product = (function(_super) {
    __extends(Product, _super);

    function Product() {
        this.data;
        //Countrys from: https://raw.githubusercontent.com/umpirsky/country-list/master/data/en_US/country.json
        this.countrys = JSON.parse('{"AF":"Afghanistan","AX":"\u00c5land Islands","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua & Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AC":"Ascension Island","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia & Herzegovina","BW":"Botswana","BR":"Brazil","IO":"British Indian Ocean Territory","VG":"British Virgin Islands","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","IC":"Canary Islands","CV":"Cape Verde","BQ":"Caribbean Netherlands","KY":"Cayman Islands","CF":"Central African Republic","EA":"Ceuta & Melilla","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo - Brazzaville","CD":"Congo - Kinshasa","CK":"Cook Islands","CR":"Costa Rica","CI":"C\u00f4te d\u2019Ivoire","HR":"Croatia","CU":"Cuba","CW":"Cura\u00e7ao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DG":"Diego Garcia","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HN":"Honduras","HK":"Hong Kong SAR China","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","XK":"Kosovo","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macau SAR China","MK":"Macedonia","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar (Burma)","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","KP":"North Korea","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestinian Territories","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn Islands","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"R\u00e9union","RO":"Romania","RU":"Russia","RW":"Rwanda","WS":"Samoa","SM":"San Marino","ST":"S\u00e3o Tom\u00e9 & Pr\u00edncipe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia & South Sandwich Islands","KR":"South Korea","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","BL":"St. Barth\u00e9lemy","SH":"St. Helena","KN":"St. Kitts & Nevis","LC":"St. Lucia","MF":"St. Martin","PM":"St. Pierre & Miquelon","VC":"St. Vincent & Grenadines","SD":"Sudan","SR":"Suriname","SJ":"Svalbard & Jan Mayen","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syria","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad & Tobago","TA":"Tristan da Cunha","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks & Caicos Islands","TV":"Tuvalu","UM":"U.S. Outlying Islands","VI":"U.S. Virgin Islands","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VA":"Vatican City","VE":"Venezuela","VN":"Vietnam","WF":"Wallis & Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}');
    }
      
    Product.prototype.init = function() {
        this.addRoute();
        this.registerHelperCountrySelect();
        this.registerHelperProductImage();
        this.registerHelperCountryName();
    };
      
    Product.prototype.addRoute = function() {
        var _this = this;
        
        //Add Product View
        my_site.routes.push({
            regex: /add-product/,
            cb: function(match){
                _this.showAdd();
            }
        });
        
        //View Product View
        my_site.routes.push({
            regex: /product=([0-9]{1,4})&vendor=([13][a-km-zA-HJ-NP-Z0-9]{26,33})/,
            cb: function(match){
                _this.showView(match[1], match[2]);
            }
        });
        
        //My Products View
        my_site.routes.push({
            regex: /my-products/,
            cb: function(match){
                _this.showMyProducts();
            }
        });
    };
      
    Product.prototype.showAdd = function() {
        var _this = this;
        Render.addOnce((function(_this){
            _this.compile('content', {}, 'tmpl-add-product');
        })(Render));
        Render.start();

        jQuery('form#product-add').validator();
        
        if( typeof this.showAddHasEventListner == 'undefined' ){
            this.showAddHasEventListner = true;
            jQuery(document).on('submit', 'form#product-add',function(e){                
                if( !e.isDefaultPrevented() ){
                    //form is validated
                    e.preventDefault();
  
                    var paramObj = {};
                    jQuery.each(jQuery('form#product-add').serializeArray(), function(_, kv) {
                        paramObj[kv.name] = kv.value;
                    });
                    
                    _this.add(paramObj.sku, paramObj.name, paramObj.description, paramObj.country, paramObj.category, paramObj.image_base64, paramObj.max_qty, paramObj.price);
                }
            });
            
            jQuery(document).on('change', 'form#product-add #image',function(e){
                var imageObj = this;
                if ( imageObj.files && imageObj.files[0] && imageObj.files[0].size<=10000 && imageObj.files[0].type.split('/')[0]=='image' ) {
                    var FR = new FileReader();
                    FR.onload = function(e) {
                        jQuery('form#product-add #image_base64').val(e.target.result);
                    };       
                    FR.readAsDataURL( imageObj.files[0] );
                }else{
                    jQuery('form#product-add #image_base64').val('');
                    jQuery('form#product-add #image_base64').parents('.form-group').addClass('has-error');
                }
            });
        }

        return true;
    };
      
    Product.prototype.showView = function(product_id, vendor) {
        var _this = this;
        
        Render.addOnce((function(_this){
            my_site.cmd("dbQuery", ["SELECT * FROM products WHERE product_id = " + parseInt(product_id) + " AND vendor='" + vendor + "' LIMIT 1"], function (res) {
                _this.compile('content', res[0], 'tmpl-view-product');
            });
        })(Render));
        Render.start();
        return true;
    };
      
    Product.prototype.showMyProducts = function() {
        var _this = this;
        Render.addOnce((function(_this){
            my_site.cmd("dbQuery", ["SELECT * FROM products WHERE vendor = '" + my_site.site_info.auth_address + "'"], function (res) {
                _this.compile('content', {
                    items: res
                }, 'tmpl-category');
            });
        })(Render));
        Render.start();

        return true;
    };
      
    Product.prototype.registerHelperCountrySelect = function() {
        var _this = this;
        
        Handlebars.registerHelper('country-select', function() {
            var subTemplate = Handlebars.compile($("#tmpl-country-select").html());
            
            return new Handlebars.SafeString(subTemplate({
                items: _this.countrys
            }));
        });
    };
      
    Product.prototype.registerHelperProductImage = function() {
        var _this = this;
        
        Handlebars.registerHelper('product-image', function(base64) {
            var subTemplate = Handlebars.compile($("#tmpl-product-image").html());
            var placeholder = 'data:image/png;base64,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om+++YbWXHNNN7d3NQIdkHv1CYMMKXDDDTfQ8ccfP1ERw/rCCy/Q+uuvT3fffTcdccQRU6q99NJL6dxzz6Wff/6ZdthhB3r33Xfd53xzYAjXWWedgeq8+OKLtNNOO00Z88QTT9Duu+9OH330EW2wwQZTPlt77bXpk08+oUUWWYROOOEE4nx712OPPUZ77rmn+6s36IDckHtRipcCn332Ga277rp04YUX0nnnnUdvvvkm7bXXXnT++ec7qG677Tbipz3/+e+//3YxV155ZVpttdXoxhtvpDPPPNPdFBjG3XbbjZZcckl6+umnabHFFuu7/h9//EHbbbede0LzTeT333+no446ivjnzzzzjLtp7L///vTII4/QvHnzXIylllqKfvrpJwf6VlttRffccw8deuihdNZZZ9Htt9/ucp41a5Yf6IDcyxcYZEwBhnjXXXelL774YmI7fuyxx9J3331HDz74IB155JF00EEH0cEHHzyl8h6wRx99NJ122mnuM47FNwkG74ILLqBNNtmETjrpJBoZGaFbbrmFXnnlFbr44osdlPxn3pLzdd9999GJJ55I77//Pj3++OMO+Jtuumma0scccwx9//339PDDD9Oiiy5KP/74I2244Yb06KOPuuPG0Cc6IDfmXpTjrQCD8+mnn9K2227r5jDADOt6663nYOMn5/PPP0/LLLMM/fLLL3TFFVe4JzA/3UdHR90TlSHj6+OPP3bb/Q8//NDdOPgJ/+yzz7onMj/Fn3rqKdpxxx3dmZ7nLL744m4ex+SdA5/Hb731VjruuONcDrwtv+iii9xNYIUVViC+Aa200kp05ZVXTuTKOfD8fffddzDogNzbExhoXIG3336bDj/8cPfUHBsbc3Dxtn7LLbekSy65xAHMT/gzzjjD/cdn+VdffXUCdH4ht9lmm9Edd9zhzu6XXXaZO8vzxX8+55xzpijY7XbdcYHhfuCBB+iAAw6gww47zN0cOAbvBE4++WT6559/iHPbe++96cADD6Ttt9/e3WT4hR2P55vU6aefPjPogNy4c1GelwIMNp/B7733XndWP/XUU2m55ZZzc/mtOz+RGTq+eAxvx3mbvvPOOztAt9hiC/fZl19+SWuttZa7IfCTnePyeZ7fqPPZu/cmn8G9/PLL3XuAPfbYg66//nq3g+CL3+IzwHzW5+uDDz5w23M+Dlx77bXujM65Mrt8U+Edwtlnn+1uAH237oDcywMYZFwBBpmfvgzTddddN+XrMT6n85mZt+/8NRhffD7mM/nLL79Mu+yyy8S2mT9744033BtwPmvz12+Tn+jXXHMNnXLKKQ5ifkrz+Z+35nyO7118A7jzzjvdlr/T6bgf81dt/Bafdxh8TOAbwFVXXeU+e+6551xuM57RAblx96I8bwUYXH7Lzedn3or/9ddfbi4/xflczk9oBuyQQw6hr776yo3dZ599HGx8Vr766quJvy7j79/3228/2nTTTenmm29253p+yffSSy/RDz/84Obwn1dddVV3HODzP+8IeLvfuzbeeGO3Deef80s7vinwdv/JJ59053d+gccx+as4fpLzjoBvDO+99567sUx5ogNybw9gYAUK3H///Q7ihS9+ufXQQw+5N+J8Du5d/Oabn/x8E+AXd/yC7K677nIfM3y8A+AXdfyyjc/z/DKNgeUXavzZnDlzJrb6k9fkmwzvBPjrPs6HXxDyxdt+fgs/e/Zs93fe5nMsvvgowDsL3pXwmX0C9G63O8I/wAUFoIC/AvyU56+y+Ltx/q24hS/+zTmGm39Tjb/rjnF9++23Lgyf8XvvB3px+UjB379zLryT4Isf4J1OZ3xkbGxsvLfvj5EIYkABKCBLAb7h/AfXlpEicknvGAAAAABJRU5ErkJggg==';
            
            if(typeof base64 !== 'string') base64 = placeholder;
            else if(base64.substring(0, 11)!=='data:image/') base64 = placeholder;
            else if(base64.substring(0, 14)==='data:image/svg') base64 = placeholder;
            
            return new Handlebars.SafeString(subTemplate({
                image: base64
            }));
        });
    };
      
    Product.prototype.registerHelperCountryName = function(code) {
        var _this = this;
        
        Handlebars.registerHelper('country-name', function(code) {
            var subTemplate = Handlebars.compile($("#tmpl-country-name").html());
            var name = _this.countrys[code];
            
            return new Handlebars.SafeString(subTemplate({
                name: name,
                code: code
            }));
        });
    };

    Product.prototype.add = function(sku, name, description, country, category, image, max_qty, price, cb) {
        User.getData(function(data){
            data.products.push({
                product_id: data.next_product_id++,
                sku: sku,
                name: name,
                description: description,
                country: country,
                category: parseInt(category),
                image: image,
                max_qty: parseInt(max_qty),
                price: parseFloat(price),
                vendor: my_site.site_info.auth_address,
                date_added: new Date()
            });
            
            User.publishData(data);
            
            return true;
        });
    };

    return Product;

  })(Class);

  window.Product = new Product();
  if(typeof window.modules == 'undefined') window.modules = [];
  window.modules.push( window.Product )
    
}).call(this);