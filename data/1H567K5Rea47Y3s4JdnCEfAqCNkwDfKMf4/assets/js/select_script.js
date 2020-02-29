function Fav() {

    var fav_zites = {
        "1LtvsjbtQ2tY7SCtCZzC4KhErqEK3bXD4n": true,
        "19YiVATHsMPp6s2oUHZmuqGK6NS7f9XTSB": true,
        "1Mr5rX9TauvaGReB4RjCaE6D37FJQaY5Ba": true,
        "1HR2mJHeC1vs3XTTcX2X6BDcdRZZDNXZKV": true
    };



    var results_label = document.getElementById("results_label");
    var all_rows = document.getElementById("all_rows").getElementsByTagName("tr");
    var headers_row = document.getElementById("all_rows").getElementsByTagName("tr")[0].cloneNode(true);
    var new_rows_table = document.getElementById("selected table");
    new_rows_table.innerHTML = "";

    new_rows_table.appendChild(document.createElement("tbody"));
    new_rows_table.getElementsByTagName("tbody")[0].appendChild(headers_row);



    for (row1 = 0; row1 < all_rows.length; row1++) {
        if (all_rows[row1].getElementsByTagName("td").length >= 1) {// == 8) {
            var address_string1 = all_rows[row1].getElementsByTagName("td")[3].innerText;
            if (address_string1 in fav_zites) {
                var cloned_row = all_rows[row1].cloneNode(true);
                new_rows_table.getElementsByTagName("tbody")[0].appendChild(cloned_row);
            }


        }
    }

    results_label.innerText = (new_rows_table.getElementsByTagName("tr").length - 1) + " selected nodes.";

    var button_list = document.getElementById("buttons").getElementsByTagName("button")
    for (btn_Index = 0; btn_Index < button_list.length; btn_Index++) {
        button_list[btn_Index].style.backgroundColor = default_color1;
    }
    fav_button.style.backgroundColor = "Red";
}

function New() {


    var results_label = document.getElementById("results_label");
    var all_rows = document.getElementById("all_rows").getElementsByTagName("tr");
    var headers_row = document.getElementById("all_rows").getElementsByTagName("tr")[0].cloneNode(true);
    var new_rows_table = document.getElementById("selected table");
    new_rows_table.innerHTML = "";

    new_rows_table.appendChild(document.createElement("tbody"));
    new_rows_table.getElementsByTagName("tbody")[0].appendChild(headers_row);



    for (row1 = 0; row1 < all_rows.length; row1++) {
        if (all_rows[row1].getElementsByTagName("td").length >= 1) {
            if (all_rows[row1].getElementsByTagName("td")[all_rows[row1].getElementsByTagName("td").length - 1].innerText == "0 months") {
                var cloned_row = all_rows[row1].cloneNode(true);
                new_rows_table.getElementsByTagName("tbody")[0].appendChild(cloned_row);
            }
        }
    }

    results_label.innerText = (new_rows_table.getElementsByTagName("tr").length - 1) + " selected nodes.";

    var button_list = document.getElementById("buttons").getElementsByTagName("button")
    for (btn_Index = 0; btn_Index < button_list.length; btn_Index++) {
        button_list[btn_Index].style.backgroundColor = default_color1;
    }
    new_button.style.backgroundColor = "Red";
}

function All() {


    var results_label = document.getElementById("results_label");
    var all_rows = document.getElementById("all_rows").getElementsByTagName("tr");
    var headers_row = document.getElementById("all_rows").getElementsByTagName("tr")[0].cloneNode(true);
    var new_rows_table = document.getElementById("selected table");
    new_rows_table.innerHTML = "";

    new_rows_table.appendChild(document.createElement("tbody"));
    new_rows_table.getElementsByTagName("tbody")[0].appendChild(headers_row);



    for (row1 = 0; row1 < all_rows.length; row1++) {
        if (all_rows[row1].getElementsByTagName("td").length >= 1) { //== 8) {
            var cloned_row = all_rows[row1].cloneNode(true);
            new_rows_table.getElementsByTagName("tbody")[0].appendChild(cloned_row);
        }
    }

    results_label.innerText = (new_rows_table.getElementsByTagName("tr").length - 1) + " selected nodes.";

    var button_list = document.getElementById("buttons").getElementsByTagName("button")
    for (btn_Index = 0; btn_Index < button_list.length; btn_Index++) {
        button_list[btn_Index].style.backgroundColor = default_color1;
    }
    all_button.style.backgroundColor = "Red";

}


var new_button = document.getElementById("button_new_zites")
var all_button = document.getElementById("button_all_zites")
var fav_button = document.getElementById("button_fav_zites")
var default_color1 = new_button.style.backgroundColor;


New();

/*function my_function()  {


var new_node= document.createElement("button");
new_node.appendChild(document.createTextNode("New Zites"));
//new_node.innerText="New Zites";
document.getElementById("buttons_div").appendChild(new_node);

var my_rows= document.getElementsByTagName("tr");



    //alert(my_rows.length);
    //alert(my_rows[1].getElementsByTagName("td")[2].innerHTML);
    var x;

    for (x in my_rows) {
     //   alert(my_rows[x].cells[2].innerHTML);
    }

/*
   for (x in my_rows) {
        alert(x.childNodes.length);
       // alert(x.childNodes[1]);
    }  
}

//my_function();*/


