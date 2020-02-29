let i = 0;

function növel() {
    i++;
    document.getElementById("számláló").innerHTML = "számláló: " + i;
}

function csökkent() {
    i--;
    document.getElementById("számláló").innerHTML = "számláló: " + i;
}

function megnyit() {
    window.open("https://www.w3schools.com");
}