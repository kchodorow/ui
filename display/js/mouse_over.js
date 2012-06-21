// simple JS file to experiment with mousing over a server

var canvas;
var ctx;
var servers = {};

mouse_over_setup = function() {
    canvas = document.getElementById("layer1");
    background = canvas.getContext("2d");

    canvas2 = document.getElementById("layer2");
    foreground = canvas2.getContext("2d");
    //canvas2.addEventListener("mousemove", on_canvas_mouseover, false);

    canvas3 = document.getElementById("layer3");
    most_foreground = canvas3.getContext("2d");
    canvas3.addEventListener("mousemove", on_canvas_mouseover, false);


    x = canvas.width/2;
    y = canvas.height/2;
    r = 50;

    // draw server(s)
    servers["a"] = { "x" : x, "y" : y, "r" : r, "on" : false};

    primary(x, y, r, background);
};


on_canvas_mouseover = function(e) {
    var x = e.clientX;
    var y = e.clientY;

    // check if mouse was over server
    for (server in servers) {

		// calculate distance from click
		diffX = x - servers[server]["x"];
		diffY = y - servers[server]["y"];
		distance = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2)) - 5;
		// is it within radius?
		if (distance <= servers[server]["r"]) {
			// check if that server is set to "true" for mouseover
			if (!servers[server]["on"]) {
			// make a shadow under server, and a sound
			document.getElementById("mouse_over_sound").innerHTML = "<embed src='click.wav' hidden=true autostart=true loop=false>";
			servers[server]["on"] = true;
			// draw the drop shadow
			foreground.beginPath();
			foreground.arc(servers[server]["x"], servers[server]["y"], servers[server]["r"], 0, 360, false);
			foreground.strokeStyle = "red";
			foreground.fillStyle = "rgba(10, 10, 10, 1)";
			foreground.lineWidth = 10;
			foreground.shadowColor = "black";
			foreground.shadowBlur = servers[server]["r"] + 50;
			foreground.fill();
			foreground.shadowBlur = 0;
			//canvas.width = canvas.width;
			primary(servers[server]["x"], servers[server]["y"], servers[server]["r"], most_foreground);
	    	}
	    }
		else {
			canvas2.width = canvas2.width;
			servers[server]["on"] = false;
		}
	}
};
