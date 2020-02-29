base.href = document.location.href.replace("/media", "").replace("index.html", "").replace(/[&?]wrapper=False/, "").replace(/[&?]wrapper_nonce=[A-Za-z0-9]+/, "")

$menu_left = document.getElementById('menu_left_container');
$menu_scrim = document.getElementById('scrim');
$main = document.getElementById('main');
menu_state = 1;


window.onload = function () {
    if (window.innerWidth <= 1280) {
        $menu_left.style.display = 'none';
        $menu_scrim.style.width = '100%';
    } else {
        if (menu_state == 1) {
            $menu_left.style.display = 'block';
        }
    }
};


window.onresize = function () {
    if (window.innerWidth <= 1280) {
        $menu_left.style.display = 'none';
        $menu_scrim.style.width = '100%';
    } else {
        if (menu_state == 1) {
            $menu_left.style.display = 'block';
            $main.style.width = 'calc(100% - 240px)';
            $main.style.marginLeft = '240px';
            $menu_scrim.style.width = '240px';
        }
    }
};

function showhide() {

    if ($menu_left.style.display === 'none') {
        $menu_left.style.display = 'block';
        $menu_left.style.zIndex = '49';
        if (menu_state == 1) {
            if (window.innerWidth >= 1280) {
                $main.style.width = 'calc(100% - 240px)';
                $main.style.marginLeft = '240px';
            }
        }
    } else {
        $menu_left.style.display = 'none';
        if (menu_state == 1) {
            if (window.innerWidth >= 1280) {
                $main.style.width = '100%';
                $main.style.marginLeft = '0px';
            }
        }
    }
}
;