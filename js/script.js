var canvas;
var ctx;
var width;
var height;

function draw() {
	canvas = document.getElementById('canvaspalette');
	ctx = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;
	//Checking for support
	if(ctx) {
		//Draw only the outline of canvas element; 
		ctx.strokeRect(0, 0, width, height);
		for(var i=0;i<6;i++) {
			for(var j=0;j<6;j++) {
				ctx.fillStyle = 'rgb(0, '+ i*50 +','+ j*50 +')';
				ctx.fillRect(j*(width/6), i*(height/6), width/6, height/6);				
			}
		}
	} else {
		//code for unsupported browsers
		alert("Your browser does not support canvas Element");
	}
	//add event listerner to catch the colour in context where the user is clicked
	//It will click the pickColour function on mouse click
	canvas.addEventListener('click', pickColour);
}


function pickColour(event) {
	var x = event.layerX;
	var y = event.layerY;
	var pixel = ctx.getImageData(x,y,1,1);
	var data = pixel.data;
	//Colour from the Palentte has been picked and stored in variable rgb
	var rgb = 'rgb(' + data[0] + ',' + data[1] +',' + data[2] + ')';

	var x = document.getElementsByClassName("box");
	var k=0;

	//Getting the property from propertySelect 
	var property = document.getElementById("propertySelect").value;

	for (i = 0; i < x.length; i++) {
		if(property === 'color') {
			x[i].style.color = rgb;
		} else if (property === 'background') {
			x[i].style.background = rgb;
		}
	}
}


function generatePane(lines) {
	var code = '';
	var x = document.getElementsByClassName("box");
	var oldColor = "";
	var oldBackground = "";
	if(x.length > 0) {
		oldColor = x[0].style.color;
		oldBackground = x[0].style.background;
	}
	for(var i=1;i<=lines;i++) {
		for(var j=1;j<=i;j++) {
			code = code + '<div class="box">' + 'line' + j + '</div>';
		}
	}
	document.getElementById("generatedCode").innerHTML = code;

	//Getting the property from propertySelect 
	var property = document.getElementById("propertySelect").value;
	
	//Getting all the classes names box
	var x = document.getElementsByClassName("box");
	var k=0;
	var i = 0;
	while(x.length != k) {
		for(j=0;j<i;j++) {
			x[k].style.fontSize = 200 - (i*10) + "%";
			x[k].style.width = 100/i + "%";
			if(property === 'color') {
				if(oldColor === "") {
					x[k].style.color = "rgb(0, 200, 0)";					
				} else {
					x[k].style.color = oldColor;
				}
			} else if (property === 'background') {
				if(oldBackground === "") {
					x[k].style.background = "rgb(0, 200, 0)";					
				} else {
					x[k].style.background = oldBackground;
				}				
			}
			k++;
		}
		i++;
	}
}

function highlightPalette() {
	draw();
	var x = document.getElementsByClassName("box");
	var rgb;

	//Getting the property from propertySelect 
	var property = document.getElementById("propertySelect").value;
	if(x.length == 0) {
		return;
	}
	if(property === 'color') {
		rgb = x[0].style.color;
	} else if (property === 'background') {
		rgb = x[0].style.background;
	}
	
	var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
	var match = matchColors.exec(rgb);
	if (match !== null) {
		ctx.fillStyle = '#fff';
		ctx.clearRect((match[3]/50) * (width/6),(match[2]/50) * (height/6),width/6,height/6);
		ctx.strokeRect((match[3]/50) * (width/6),(match[2]/50) * (height/6),width/6,height/6);
		ctx.fillStyle = rgb;
		ctx.fillRect((match[3]/50) * (width/6),(match[2]/50) * (height/6),width/6,height/6);
	}
}