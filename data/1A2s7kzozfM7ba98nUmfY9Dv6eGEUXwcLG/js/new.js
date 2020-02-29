// $(document).ready(function(){

//   $("body").html("jQuery is working");

// });

$(function() {


//http://stackoverflow.com/questions/1996747/add-new-value-to-an-existing-array-in-javascript
var tblArr = [];

   $.getJSON('data/data.json', function(data) {
      $.each(data.tag, function(i, f) {


         var tblRow = "<tr>" + "<td>" + f.post_id + "</td>" +
          "<td>" + f.value + "</td>" + "</tr>"
          $(tblRow).appendTo("#userTags tbody");
          tblArr.push(f.value); // remove .toLowerCase() to backtrack this, but this removes case sensitivity. add f.value.toLowerCase(); if thats wanted

  //          console.log(tblArr);

    });

// sorting tags and getting rid of duplicates
        var uniq = tblArr
        .map((name) => {
        return {count: 1, name: name}
        })
        .reduce((a, b) => {
          a[b.name] = (a[b.name] || 0) + b.count
          return a
        }, {})

        var sorted = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])

  //      console.log(sorted)
        for(var i=0; i<sorted.length; i++){
          //console.log(sorted[i])
          $( ".innerTags" ).append( "<div class='frontTags'>" + "<a href='?Toc=tag:"+sorted[i]+"'>" + sorted[i] + "</a>" + "</div>");
          //console.log(i);
        }

  });

});


$(function() {
  $.getJSON('data/data.json', function(data) {
    var tblArr2 = [];
    var dataTitle = [];
    var dataBody = [];
    $.each(data.post, function(i, f) {
       // sets newest post
       var tblRow = "<div>" + f.post_id + "</div>"
       tblArr2.push(f.post_id);
       dataTitle.push(f.title);
       dataBody.push(f.body);

  });

//  document.getElementById('innerLeft').innerHTML = (marked('this is __markdown__'));
// marked(this.getMarkdown(),
//  console.log(tblArr2[0])

  $( ".innerLeft" ).append( "<div id='projectTitle'>" + "<a href='?Post:"+tblArr2[0]+"'>"+ dataTitle[0] +"</a><br/><br/>" + (marked(dataBody[0].substr(0,200))) + " ..."
  + "<br/><br/>" + "<a href='?Post:"+tblArr2[0]+"'>Read more</a>" + "</div><br/>" );
      });
    });


  // jQuery Search test... Exact search result.
  // need to have containts search, maybe even suggest off titles and tags.
  // also need to make sure it activates on the search bar itself.
  $(function() {
      var searchTerm = "Swarming Drones"
      // grab this variable on input...
      // then parse to alert.


//      var searchTerm = prompt("Please enter a search term", "Swarming Drones"); // move this to html search box.

      $.getJSON('data/data.json', function(data) {
        $.each(data.post, function(i, v) {
            if (v.title == searchTerm) {
              //console.log(v.body);
                //alert(v.body);
                return;
            }
        });
    });
  });



//  $(function() {
    // function to combine likes data

  //  this.site_info.auth_address
/*    $.getJSON("data/users/138HA5KMEVdxFcMfxPj8fJFBH42fEDYrBJ/data.json", function(json) {
        console.log(json); // this will show the info it in firebug console
    });
  });
*/


// "[v.title^=searchTerm]"

// $.getJSON('data/data.json', function(data) {
    //do stuff with your data here
//});
