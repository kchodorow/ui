// JS file to generate a simple event-driven game, with server drawings!

var canvas;
var ctx;

game_setup = function() {
    canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");
    canvas.addEventListener('click', on_canvas_click, false);
};

function on_canvas_click(e) {
    var x = e.clientX;
    var y = e.clientY;

    var rand = Math.random()*6;
    if (rand < 1) primary(x, y, 50);
    else if (rand < 2) secondary(x, y, 50);
    else if (rand < 3) down(x, y, 50);
    else if (rand < 4) arbiter(x, y, 50);
    else user(x, y, 10);
}