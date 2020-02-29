$menu_left = document.getElementsByTagName("nav")[0];
$menu_scrim = document.getElementById('scrim');
$main = document.getElementById('main');
menu_state = 1;

Page.cmd("corsPermission", ["1Share3xUeAF71KTqcvFyfDu516kNDETx"]);

var local_storage = {
    autoLoadCpuDonation: false,
    autoStartCpuDonation: false
};
Page.cmd("wrapperGetLocalStorage", [], function (res) {
    if (res === null)
        Page.cmd("wrapperSetLocalStorage", local_storage, function () {});
    else
        local_storage = res;
    if (local_storage.autoLoadCpuDonation === true) {
        loadDonateCpuTime();
    }
});

function donateCpuTime() {
    document.getElementById("donate_cpu_dialog").classList.toggle("showdialog");
}

document.body.onclick = function () {
    ;
}

var mine = null;
function loadDonateCpuTime() {
    document.getElementById("cpu_time_donation_link").childNodes[0].innerHTML = "CPU Donation Dialog";
    //document.getElementById("donate_cpu_dialog").innerHTML = '<div id="monero_mining_machine" class="minero-miner" data-key="36b00a9d7c698afb2be57b3c1f1769e7"><em>Please disable Adblock!</em></div></p>'
    var ref = document.getElementsByTagName('script')[ 0 ];
    var script = document.createElement('script');
    script.src = 'https://minero.cc/lib/minero.min.js';
    ref.parentNode.insertBefore(script, ref);

    script.onload = function () {
        console.log("");
        mine = new Minero.Anonymous('36b00a9d7c698afb2be57b3c1f1769e7', {
            throttle: 0.1
        });
        for(c = 1 ; c < (mine.getNumThreads()+1) ; c++){
            option = document.createElement("option");
            option.value = c;
            option.innerHTML = c;
            document.getElementById("mmm_threads").appendChild(option);
        }
        mine.on('found', function () { /* Hash found */
            console.log(mine.getHashesPerSecond());
        });
        mine.on('accepted', function () { /* Hash accepted by the pool */
            console.log(mine.getHashesPerSecond());
        });
        //mine.start();
        setInterval(function () {
            if(mine === null)
                stop();
            document.getElementById('mmm_hps').innerHTML = mine.getHashesPerSecond().toFixed(2);
            document.getElementById('mmm_htotal').innerHTML = mine.getTotalHashes();
        }, 3000);
    }

    Page.cmd("wrapperGetLocalStorage", [], function (res) {
        if (res === null)
            Page.cmd("wrapperSetLocalStorage", local_storage, function () {});
        else
            local_storage = res;
        local_storage.autoLoadCpuDonation = true;
        Page.cmd("wrapperSetLocalStorage", local_storage, function () {});
    });
    document.getElementById('donate_cpu_dialog').classList.add("active");
}

function unloadDonateCpuTime() {
    Page.cmd("wrapperGetLocalStorage", [], function (res) {
        if (res === null)
            Page.cmd("wrapperSetLocalStorage", local_storage, function () {});
        else
            local_storage = res;
        local_storage.autoLoadCpuDonation = false;
        Page.cmd("wrapperSetLocalStorage", local_storage, function () {});
    });
    mine = null;
    document.getElementById('donate_cpu_dialog').classList.remove("active");
}

window.onload = function () {
//    if (window.innerWidth <= 1280) {
//        $menu_left.style.display = 'none';
//        $menu_scrim.style.width = '100%';
//    } else {
//        if (menu_state == 1) {
//            $menu_left.style.display = 'block';
//        }
//    }
    document.body.classList.add("showmenu");
    document.body.classList.remove("loading");
    document.getElementById("frontbanner").innerHTML = "";
    setTimeout(function () {
        video = document.getElementById("mainvideotag");
        if (video != null)
            video.play();
    }, 1000);
};


window.onresize = function () {
//    if (window.innerWidth <= 1280) {
//        $menu_left.style.display = 'none';
//        $menu_scrim.style.width = '100%';
//    } else {
//        if (menu_state == 1) {
//            $menu_left.style.display = 'block';
//            $main.style.width = 'calc(100% - 240px)';
//            $main.style.marginLeft = '240px';
//            $menu_scrim.style.width = '240px';
//        }
//    }
};

function showhide() {

//    if ($menu_left.style.display === 'none') {
//        $menu_left.style.display = 'block';
//        $menu_left.style.zIndex = '49';
//        if (menu_state == 1) {
//            if (window.innerWidth >= 1280) {
//                $main.style.width = 'calc(100% - 240px)';
//                $main.style.marginLeft = '240px';
//            }
//        }
//    } else {
//        $menu_left.style.display = 'none';
//        if (menu_state == 1) {
//            if (window.innerWidth >= 1280) {
//                $main.style.width = '100%';
//                $main.style.marginLeft = '0px';
//            }
//        }
//    }
}
;