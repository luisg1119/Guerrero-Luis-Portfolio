// Hold a global reference to the div#main element.  Initially assign it ... somewhere useful :)
main = document.getElementById("main");

// Initially position a circle based on a given angle.
var positionCircle = function(c, angle, div) {
	var xPos = main.getBoundingClientRect().right;
	var yPos = main.getBoundingClientRect().top;
	var x =  150* Math.sin(degToRadians(angle));
	var y =  150* Math.cos(degToRadians(angle));
	
	if(a == 0) {
		c.style.left = xPos + "px";
		c.style.top = (yPos + 150) + "px";
	}
	if(angle <= 90) {
		c.style.left = x + xPos + "px";
		c.style.top = y + yPos + "px";
	}
	else if(angle <= 180) {
		c.style.left = x + xPos + "px";
		c.style.top = y + yPos + "px";
	}
	else if(angle <= 270) {
		c.style.left = x + xPos + "px";
		c.style.top = y + yPos + "px";
	}
	else {
		c.style.left = x + xPos + "px";
		c.style.top = y + yPos + "px";
	} 
}

// Move a circle based on the distance of the approaching mouse
var moveCircle = function(circle, dx, dy) {
	dx = dx/20; 
	dy = dy/20; 
	move = circle.getBoundingClientRect();
	circle.style.top = move.top + dy +"px";
	circle.style.left = move.left + dx +"px";
}

// Look at all the circle elements, and figure out if any of them have to move.
var checkMove = function() {
    var posX = window.event.clientX;
    var posY = window.event.clientY;
	for (i = 0; i<15; i++){
		var div = document.getElementById("c"+i);
		var xPos = div.getBoundingClientRect().left;
		var yPos = div.getBoundingClientRect().top;
		var x = (xPos-posX);
		var y = (yPos-posY);
		var d = Math.sqrt((x*x)+(y*y));
		if (d <= 100){
			moveCircle(div,x,y);
		}
	}
}
	
// Set up the initial circle of circles.
var setup = function() {
	main = document.getElementById("main");
	var angle;
	for(a = 0; a < 15; a++) {
		var div = document.createElement("div");
			angle = a*24;
			div.setAttribute('class', 'circle');
			div.setAttribute('id', 'c'+a)
			document.body.appendChild(div);
			div.style.position = "absolute";
			positionCircle(div,angle);
	}
}

function degToRadians(degrees) {
	return degrees * (Math.PI / 180);
}

window.addEventListener('load', function() {
  setup();
	  // Add an event listener to pick up the mouse movements and call checkMove
	  window.addEventListener('mousemove', checkMove);

});

