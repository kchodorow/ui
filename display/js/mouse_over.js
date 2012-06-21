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

    message = document.getElementById("layer4");
    messageLayer = message.getContext("2d");


    x = canvas.width/2;
    y = canvas.height/2;
    r = 25;

    // draw server(s)

    var randomnumber;
    var xval, yval;
    for(var i = 0; i < 10; i++) {
		randomnumber = Math.floor(Math.random()*4);
		xval = Math.floor(Math.random()*800);
		yval = Math.floor(Math.random()*600);

		if(randomnumber === 0) {
			servers[i] = { "x" : xval, "y" : yval, "r" : r, "on" : false, "type" : "primary"};
			primary(xval, yval, r, background);
		}
		else if (randomnumber == 1) {
			servers[i] = { "x" : xval, "y" : yval, "r" : r, "on" : false, "type" : "secondary"};
			secondary(xval, yval, r, background);
		}
		else if (randomnumber == 2) {
			servers[i] = { "x" : xval, "y" : yval, "r" : r, "on" : false, "type" : "arbiter"};
			arbiter(xval, yval, r, background);
		}
		else if (randomnumber == 3) {
			servers[i] = { "x" : xval, "y" : yval, "r" : 10, "on" : false, "type" : "user"};
			user(xval, yval, 10, background);
		}
    }
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
			//document.getElementById("mouse_over_sound").innerHTML = "<embed src='click.wav' hidden=true autostart=true loop=false>";
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
			messageLayer.fillStyle = "black";
			messageLayer.rect(x, y, 24, 24);
			messageLayer.fill();
			if(servers[server]["type"] == "primary")
				primary(servers[server]["x"], servers[server]["y"], servers[server]["r"], most_foreground);
			else if(servers[server]["type"] == "arbiter")
				arbiter(servers[server]["x"], servers[server]["y"], servers[server]["r"], most_foreground);
			else if(servers[server]["type"] == "user")
				user(servers[server]["x"], servers[server]["y"], servers[server]["r"], most_foreground);
			else if(servers[server]["type"] == "secondary")
				secondary(servers[server]["x"], servers[server]["y"], servers[server]["r"], most_foreground);
	    	}
	    }
		else {
			if(servers[server]["on"]){
				canvas2.width = canvas2.width;
				message.width = message.width;
				servers[server]["on"] = false;
			}
		}
	}
};
