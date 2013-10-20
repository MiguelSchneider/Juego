var debug = false;

var world, walls = [], balls = [], canvasDebug = document.getElementById('canvasDebug');

// Shotcurts Box2dWeb

var b2Vec2 = Box2D.Common.Math.b2Vec2, 
b2BodyDef = Box2D.Dynamics.b2BodyDef, 
b2Body = Box2D.Dynamics.b2Body, 
b2FixtureDef = Box2D.Dynamics.b2FixtureDef, 
b2World = Box2D.Dynamics.b2World, 
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, 
b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, 
b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
world = new b2World(new b2Vec2(0, 20), true);


// Size of canvas
var _cw = canvasDebug.width; 
var _ch = canvasDebug.height;


// Touch positions
var posX = null;//= _cw*.5;
var posY = null; //= _ch*.2;
var posXf = null;
var posYf = null;

// Frames per Second
var FPS = 60;

// Define the canvas
var canvaselem = document.getElementById("canvasDebug");
var context = canvaselem.getContext("2d");
var fixture = new b2FixtureDef;

//var wallImage = new Image();
var initImage = new Image();
//var floorImage = new Image();

var BackgroundImage = null;//new Image();

var myTimer;
var stars = 0;

var LEVEL = 0;
var MAX_BALLS = 3;
var launchedBalls=-1;

var ball={
	CenterX:null,
	CenterY:null
}



var debugDraw = new b2DebugDraw();
// Objeto de visualizaciÃ³n de depuraciÃ³n

// -1: Initial position of launching ball
// 0: white space
// 1: wall
// 2: block
// 3: stars

var Levels = new Array (
		[


		
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, -1, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 3, 0, 0, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],

		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, -1, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 3, 0, 0, 0, 2, 0, 2, 1], 
		 [1, 0, 1, 0, 2, 0, 2, 0, 2, 1], 
		 [1, 0, 0, 0, 2, 0, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],



		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, -1, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 0, 2, 1], 
		 [1, 0, 0, 0, 2, 0, 2, 0, 2, 1], 
		 [1, 0, 0, 0, 2, 0, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 3, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 2, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 2, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		]
		,

		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, -1, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 3, 0, 0, 0, 0, 0, 2, 1], 
		 [1, 1, 1, 0, 0, 0, 0, 3, 2, 1], 
		 [1, 0, 0, 0, 0, 0, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 3, 3, 3, 3, 3, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, -1, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 3, 0, 0, 0, 0, 0, 2, 1], 
		 [1, 1, 1, 0, 0, 0, 0, 3, 2, 1], 
		 [1, 0, 0, 0, 2, 0, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 2, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 3, 2, 2, 3, 3, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		]
		
);

var gameObjects = new Array (
			{
				imgsrc : "images/1.png",
				imgsize : 30,
				bodysize : null,
				type : "wall",
				dynamic : false
			},
			{
				imgsrc : "images/2.png",
				imgsize : 30,
				bodysize : null,
				type : "block",
				dynamic : true
			},
			{
				imgsrc : "images/3.png",
				imgsize : 30,
				bodysize : null,
				type : "star",
				dynamic : true
			}			

			);

//////////////////////
//////////////////////
//
// INIT
//
//////////////////////
//////////////////////


function init() {

	function loadImages(sources, callback) {
		var images = {};
		var loadedImages = 0;
		var numImages = 0;

		for(var src in sources) {
			numImages++;
		}

		for(var src in sources) {
			images[src] = new Image();
			images[src].onload = function() {
				if(++loadedImages >= numImages) {
					callback(images);
				}
			};
			images[src].src = sources[src];
		}
	}

	function createBackground(wallImage) {
		var node = world.GetBodyList();
		context.fillStyle = '#aaFFaa';
		context.fillRect(0, 0, 300, 16*30);
		while(node) {
			var b = node;
			node = node.GetNext();
			if(b.m_userData)
				switch (b.m_userData.type) {
					case "wall":
						context.save();
						var x = b.m_userData.bodysize[0] * 30;
						var y = b.m_userData.bodysize[1] * 30;
						var w = b.m_userData.bodysize[2] * 30;
						var h = b.m_userData.bodysize[3] * 30;
						context.drawImage(wallImage, (x - w), (y - h));
						context.restore();
						break;
				}
		}

		//console.log("Level: "+Levels[LEVEL]);
		//console.log("Center is at: "+Levels[LEVEL].indexOf(-1));

		var i,j;
		for( i = 0; i < Levels[LEVEL].length; i++) 
			for( j = 0; j < Levels[LEVEL][i].length; j++) {
				//console.log(Levels[LEVEL][i][j]);
				if (Levels[LEVEL][i][j]=='-1') {
					ball.CenterX=j;
					ball.CenterY=i;
				}
			}
		//console.log("Center in="+ball.CenterX+"  "+ball.CenterY);

		context.save();
		context.globalAlpha = 0.4;
		context.drawImage(initImage,ball.CenterX*30-15, ball.CenterY*30-15);
		context.restore();


		var image = new Image();
		image.src = canvasDebug.toDataURL("image/png");
		return image;
	}

	var wallImage = new Image();
	wallImage.src = "images/1.png";
	initImage.src = "images/emotion.png";


	var imagesToLoad = {}; //declare object

    for (var i = 1; i <= 3; i++) {
    	var im='images/'+i+'.png';
    	imagesToLoad[i]=im;
    }

	loadImages(imagesToLoad, function() {
		BackgroundImage = createBackground(wallImage);
	});


	fixture.density = 10;
	fixture.friction = 0.5;
	fixture.restitution = 0.9;

	fixture.shape = new b2PolygonShape;

	debugDraw.SetSprite(canvasDebug.getContext("2d"));
	debugDraw.SetDrawScale(30);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

	if(debug)
		world.SetDebugDraw(debugDraw);	
}


//////////////////////
//////////////////////
//
// CREATE LEVEL
//
//////////////////////
//////////////////////

function createLevel(level) {
	function clone(s) {
		for(p in s)
		this[p] = ( typeof (s[p]) == 'object') ? new clone(s[p]) : s[p];
	}	
	for(var i = 0; i < level.length; i++) {
		for(var j = 0; j < level[i].length; j++) {
			if (level[i][j]>0) {
				var wallDef = new b2BodyDef;
				if (gameObjects[level[i][j]-1].dynamic)
					wallDef.type = b2Body.b2_dynamicBody;
				else
					wallDef.type = b2Body.b2_staticBody;
				wallDef.position.Set(j+.5, i+.5);
				fixture.shape.SetAsBox(.5, .5);

				var a = new Array(j+.5, i+.5, .5, .5);
				var NewData = new clone(gameObjects[level[i][j]-1]);
				NewData.bodysize = a.slice(0);
				wallDef.userData = NewData;

				var wall = world.CreateBody(wallDef);
				wall.CreateFixture(fixture);
				//walls.push(wall);
			}
		}
	}
}

//////////////////////
//////////////////////
//
// LOOP
//
//////////////////////
//////////////////////

function loop() {

		world.Step(1 / FPS, 10, 10);
		// Avanzamos la escena

		if(debug)
			world.DrawDebugData();
		else {
		}
		context.drawImage(BackgroundImage, 0,0);


		if(posXf != null) {
			context.strokeStyle = "#00FF00";
			context.beginPath();
			// context.moveTo(posX, posY);
			posX=ball.CenterX;
			posY=ball.CenterY;
			context.moveTo(ball.CenterX*30, ball.CenterY*30); 
			context.lineTo(posXf, posYf);
			context.stroke();

		}

		world.ClearForces();

		var node = world.GetBodyList();
		stars = 0;

		movingObjects=0;


		while(node) {
			var b = node;
			node = node.GetNext();
			
			if(b.m_userData) {
				/*
				if (node)
				if (!node.IsAwake())
					movingObjects++;
				*/
				switch (b.m_userData.type) {
					case "star":
						stars++;
					case "ball":
						var edge = b.GetContactList();
						while(edge) {
							var other = edge.other;

							if(other.m_userData.type == "star") {
								world.DestroyBody(other);
							}
							edge = edge.next;
						}
					case "block":
						var position = b.GetPosition();

						var imgObj = new Image();
						imgObj.src = b.m_userData.imgsrc;

						context.save();
						context.translate(position.x * 30, position.y * 30);
						context.rotate(b.GetAngle());
						context.translate(-position.x * 30, -position.y * 30);
						context.drawImage(imgObj, position.x * 30 - 15, position.y * 30 - 15);
						context.restore();
					break;
				}

			}
		}

		if (stars == 0 ) {
			if (myTimer)
				clearInterval(myTimer);
			document.getElementById("passedLevel").style.display='';
			return true;
		} else return false;
}


function runLevel(Next_Level) {
	launchedBalls=-1;
	LEVEL = Next_Level;
	window.dispatchEvent(new CustomEvent("starsFinished", {"detail":{"NEW_LEVEL":Next_Level}}));
	return true;
}

//////////////////////
//////////////////////
//
// RUN
//
//////////////////////
//////////////////////


window.addEventListener("starsFinished", function(e) { run(e) });

function run(e){
	document.getElementById("main").style.display='none';
	NEW_LEVEL= e.detail.NEW_LEVEL;
	document.getElementById("level").innerHTML="Level: "+NEW_LEVEL;
	if (stars ==0) {
		if (myTimer)
			clearInterval(myTimer);
		var node = world.GetBodyList();
		while(node) {
			var b = node;
			node = node.GetNext();
			world.DestroyBody(b);
		}
		init();
		if (NEW_LEVEL < Levels.length) {
			createLevel(Levels[NEW_LEVEL]);
		}
		else {
			document.getElementById("final").style.display='';
				
			NEW_LEVEL=0; LEVEL=0;
			document.getElementById("level").innerHTML="Level: "+NEW_LEVEL;
			createLevel(Levels[NEW_LEVEL]);
			

		}
		myTimer= setInterval(function() {loop();}, 1000 / FPS);
	}
	window.dispatchEvent(new CustomEvent("processBalls", {"detail":{"BALLS":MAX_BALLS}}));


}


window.addEventListener("processBalls", function(e) { processBalls(e) });

function processBalls(e) {


	var BALLS= e.detail.BALLS;
	if (BALLS == MAX_BALLS) {
		launchedBalls=-1;
	}
	console.log("Balls from Event="+BALLS);
	console.log("Launched Balls="+launchedBalls);

	//console.log("Launched Balls (INIT)= "+launchedBalls);
	launchedBalls++;
	//console.log(launchedBalls);
	if (launchedBalls > MAX_BALLS) {
		document.getElementById("failedLevel").style.display='';
		launchedBalls=0;
		clearInterval(myTimer);
		var node = world.GetBodyList();
		while(node) {
			var b = node;
			node = node.GetNext();
			world.DestroyBody(b);
		}
		init();
		createLevel(Levels[LEVEL]);
		myTimer= setInterval(function() {loop();}, 1000 / FPS);
	} 

	var ballDiv=document.getElementById("balls");
	ballDiv.innerHTML="";
	for (i=0; i<MAX_BALLS - launchedBalls; i++) {
		var im = new Image;
		im.src = "images/emotion.png";
		ballDiv.appendChild(im);
	}
	console.log("MAX-Launched=",MAX_BALLS - launchedBalls);	
}
//run({"detail":{"NEW_LEVEL":LEVEL}});



//////////////////////
//////////////////////
//
// TOUCH EVENTS
//
//////////////////////
//////////////////////

function beginDrag(e) {
    e.preventDefault();
    //console.log("LAUNCHING BALL");
	window.dispatchEvent(new CustomEvent("processBalls", {"detail":{"BALLS":0}}));

}

function dragging(e) {
	if (e.changedTouches) {
		posXf = e.changedTouches[0].pageX - this.offsetLeft;
		posYf = e.changedTouches[0].pageY - this.offsetTop;
	} else {
		posXf = e.pageX;
		posYf = e.pageY;
	}
}

function endDrag(e){
	if (e.changedTouches) {
		posXf = e.changedTouches[0].pageX - this.offsetLeft;
		posYf = e.changedTouches[0].pageY - this.offsetTop;
	} else {
		posXf = e.pageX;
		posYf = e.pageY;
	}

	var difX = posXf - posX*30-15;
	var difY = posYf - posY*30-15;
	var ballDef = new b2BodyDef;
	ballDef.type = b2Body.b2_dynamicBody;
	
	//console.log ("CENTER XY= "+ posX + "Y="+posXf);
	//console.log ("CANVAS CENTER XY= ", _cw * 0.5 / 30, _ch * 0.2 / 30);
	//ballDef.position.Set(_cw * 0.5 / 30, _ch * 0.2 / 30);
	ballDef.position.Set(posX, posY);


	//ballDef.position.Set(ball.CenterX, ball.CenterY);
	
	// context.drawImage(initImage,ball.CenterX*30-15, ball.CenterY*30-15);


	var data = {
		imgsrc : 'images/emotion.png',
		//imgsize: imgsize,
		//bodysize: scale,
		type : "ball"
	}
	ballDef.userData = data;

	var fixture = new b2FixtureDef;
	fixture.density = 10;
	fixture.friction = 0.5;
	fixture.restitution = 0.3;
	fixture.shape = new b2CircleShape(15 / 30);
	// Establecemos el radio (1m=30px)

	var ball = world.CreateBody(ballDef)
	ball.CreateFixture(fixture);

	var velocityFactor = .1;

	ball.SetLinearVelocity(new b2Vec2(difX * velocityFactor, difY * velocityFactor))

	//balls.push(ball);
	posXf = null;
	posYf = null;




}

canvasDebug.addEventListener('touchstart', beginDrag, false);
canvasDebug.addEventListener('touchmove', dragging, false);
canvasDebug.addEventListener('touchend', endDrag, false);

canvasDebug.addEventListener('mousedown', beginDrag, false);
canvasDebug.addEventListener('mousemove', dragging, false);
canvasDebug.addEventListener('mouseup', endDrag, false);
/*

// FPS counter
var lastFrame = window.mozPaintCount;
setInterval(function() {
	document.getElementById("FPS").innerHTML = window.mozPaintCount - lastFrame;
	lastFrame = window.mozPaintCount;
}, 1000);
*/
