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




// Touch positions
var posX = null;
var posY = null; 
var posXf = null;
var posYf = null;

// Frames per Second
const FPS = 60;

// Define the canvas
var context = document.getElementById("canvasDebug").getContext("2d");
var debugDraw = new b2DebugDraw();
var fixture = new b2FixtureDef;


var BackgroundImage = null;
var ballImage = null;

var myTimer;
var stars = 0;

var LEVEL = 0;
const MAX_BALLS = 3;
var launchedBalls=-1;

var ball={
	CenterX:null,
	CenterY:null
}


// -1: Initial position of launching ball
// 0: white space
// 1: wall
// 2: block
// 3: stars

const Levels = new Array (
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
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 3, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 3, 0, 0, 0, 2, 0, 2, 1], 
		 [1, 0, 1, 0, 0, 0, 2, 0, 2, 1], 
		 [1, 0, 0, 0, 0, 0, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, -1, 0, 0, 1], 
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
		],
		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 1, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 1, 0, 3, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 1, 1, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, -1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 3, 0, 3, 0, 3, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 1, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 1, 0, 3, 0, 0, -1, 0, 1], 
		 [1, 0, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 1, 1, 1, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 3, 0, 3, 0, 3, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 3, 3, 3, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 3, 3, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 3, 3, 0, 0, 0, 0, 0, 1], 
		 [1, 2, 2, 2, 0, 0, 0, 0, 0, 1], 
		 [1, 2, 0, 2, 0, 0, 0, 0, 0, 1], 
		 [1, 2, 0, 2, 0, 0, 0, -1, 0, 1], 
		 [1, 2, 0, 2, 0, 0, 0, 0, 0, 1], 
		 [1, 1, 1, 1, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 3, 3, 3, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 2, 2, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 0, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		],
		[
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 3, 0, 0, 3, 0, 0, 0, 0, 1], 
		 [1, 1, 0, 0, 1, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 3, 2, 3, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 2, 2, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 3, 2, 1], 
		 [1, 0, 0, 0, 0, 0, 2, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 1, 1, 1, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
		 [1, 0, -1, 0, 0,0, 0, 0, 0, 1], 
		 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		]
		
);

var gameObjects = new Array (
			{
				type : "wall",
				description : "wall",
				imgsrc : "images/1.png",
				imgObj :  null,
				imgsize : 30,
				bodysize : null,
				density:10,
				friction: 0.5,
				restitution: 0.9,
				dynamic : false
			},
			{
				type : "block",
				description : "block",
				imgsrc : "images/2.png",
				imgObj : null,				
				imgsize : 30,
				bodysize : null,
				density:10,
				friction: 0.5,
				restitution: 0.9,
				dynamic : true
			},
			{
				type : "star",
				description : "star",
				imgsrc : "images/3.png",
				imgObj : null,
				imgsize : 30,
				bodysize : null,
				density:10,
				friction: 0.5,
				restitution: 0.9,
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
var audioControl=document.getElementById("menuAudio");
var audioStar=document.getElementById("starAudio");
var audioTouch=document.getElementById("touchAudio");

function initMenu() {
	function eventListener(event, I) {
		event.preventDefault();
		document.getElementById("menu").parentNode.style.visibility='hidden'; 
		audioControl.pause();
		audioControl.muted=true;
		//console.log(audioControl.paused);
		runLevel(I);
	}
	var initMenuDiv=document.getElementById("menu");
	initMenuDiv.parentNode.style.visibility="";

	//console.log("HERE");
	if (localStorage[0]){
		//console.log("Already created");
	} else {
		localStorage[0]=0;
	}
	audioControl.muted=false;
	audioControl.play();
	audioControl.loop=true;

	//console.log(initMenuDiv.getElementsByTagName('ul').length);
	if ((initMenuDiv.getElementsByTagName('ul')).length!=0) {
		var myNode = document.getElementById("menu");
			while (myNode.firstChild) {
			    myNode.removeChild(myNode.firstChild);
			}
	}
	if ((initMenuDiv.getElementsByTagName('ul')).length==0) {
		var ul = document.createElement('ul');
		for (var i=0;i<Levels.length;i++){
			if ((i%3)==0) {
				initMenuDiv.appendChild(ul);
				var ul = document.createElement('ul');
			}
			var li = document.createElement('li');
			var p=document.createElement('p');
			p.innerHTML = i;
			li.appendChild(p);
			li.style.opacity="0.3";

			if(localStorage[i] || (localStorage[i-1] && i<=Levels.length)) {
				(function (i) {
					li.addEventListener('touchend', function(event) { eventListener(event, i); }, false);
				}(i));
				(function (i) {
					li.addEventListener('mouseup', function(event) { eventListener(event, i); }, false);
				}(i));

				for (var j=0; j<localStorage[i]; j++) {
					var img = document.createElement('img');
					img.src="images/star_result_small.png";
					li.appendChild(img);
				}
				li.style.opacity="1.0";
			}

			ul.classList.add('mini_level');
			ul.appendChild(li);
		}
		initMenuDiv.appendChild(ul);
	}

}

function init() {
	var initImage = new Image();

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
			gameObjects[src].imgObj = images[src];

			//console.log(gameObjects[src].imgObj);
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

		var i,j;
		for( i = 0; i < Levels[LEVEL].length; i++) 
			for( j = 0; j < Levels[LEVEL][i].length; j++) {
				if (Levels[LEVEL][i][j]=='-1') {
					ball.CenterX=j;
					ball.CenterY=i;
				}
			}

		context.save();
		context.globalAlpha = 0.4;
		context.drawImage(initImage,ball.CenterX*30-15, ball.CenterY*30-15);
		context.restore();
		
		ballImage = new Image();
		ballImage=initImage;

		//var image = new Image(); 
		var image = document.createElement('img');
		
		//image.crossOrigin = 'anonymous'; 
		// image.onload = function(e) {
			image.src = canvasDebug.toDataURL("image/png");
			return image;
		//}
	}
/*	
	var wallImage = new Image();
	wallImage.src = "images/1.png";
*/
	initImage.src = "images/emotion.png";

	var imagesToLoad = {}; //declare object

    for (var i = 0; i < 3; i++) {
    	var index = i+1;
    	var im='images/'+index+'.png';
    	imagesToLoad[i]=im;
    	//console.log(gameObjects[i]);


    }

	loadImages(imagesToLoad, function() {
		var wallImage = gameObjects[0].imgObj;
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

	function clone(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
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

/*
				var NewData = new Object();
				NewData = eval(uneval(gameObjects[level[i][j]-1]));
				NewData.bodysize = a.slice(0);
				wallDef.userData = NewData;
*/

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
		else 
		if (BackgroundImage)
			context.drawImage(BackgroundImage, 0,0);

		// Draw the guide
		if(posXf != null) {
			context.strokeStyle = "#333333";
			context.lineWidth = 2;
			context.lineCap = 'round';
			context.beginPath();
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

				switch (b.m_userData.type) {
					case "star":
						stars++;
						break;
					case "ball":
						var edge = b.GetContactList();
						while(edge) {
							var other = edge.other;
							if(b.m_userData.type == "ball" && other.m_userData.type == "star" && edge.contact.IsTouching()) {
								world.DestroyBody(other);
								audioStar.muted=false;
								audioStar.play();
							} else {
								/*
								audioTouch.muted=false;
								audioTouch.play();
								*/
							}
							edge = edge.next;
						}
						break;
					case "block":

					break;
				}
				if (b.m_userData.type=="star" || b.m_userData.type=="ball" || b.m_userData.type=="block") {
									
						var position = b.GetPosition();

						var imgObj = new Image();
						imgObj.src = b.m_userData.imgsrc;

						if (!debug) {
							context.save();
							context.translate(position.x * 30, position.y * 30);
							context.rotate(b.GetAngle());
							context.translate(-position.x * 30, -position.y * 30);
							//context.drawImage(imgObj, position.x * 30 - 15, position.y * 30 - 15);
							//console.log(imgObj);
							switch (b.m_userData.type) {
								case "star":
									context.drawImage(gameObjects[2].imgObj, position.x * 30 - 15, position.y * 30 - 15);
									break;
								case "block":
									context.drawImage(gameObjects[1].imgObj, position.x * 30 - 15, position.y * 30 - 15);
									break;
								case "ball":
								//console.log(b.m_userData)
									context.drawImage(ballImage, position.x * 30 - 15, position.y * 30 - 15);
									break;
							}
							context.restore();
						}
					}

			}
		}
		if (checkAllBodiesStopped() && stars >0 && launchedBalls==MAX_BALLS){
			launchedBalls++;
			window.dispatchEvent(new CustomEvent("processBalls", {"detail":{"BALLS":0}}));
		}



		if (stars == 0 ) {
			if (myTimer)
				clearInterval(myTimer);

			document.getElementById("passedLevel_info").classList.add('info_move');
			
			document.getElementById("passedLevel").style.visibility='';

			localStorage[LEVEL]=MAX_BALLS - launchedBalls+1;
			//console.log("Inserted Level "+ LEVEL + "stars="+localStorage[LEVEL]);
			return true;
		} else return false;
}


function runLevel(Next_Level) {
	//console.log("RUNNING LEVEL: "+Next_Level);
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
	//initMenu();
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



function checkAllBodiesStopped() {
	var isAllBodiesStationary = true;

	var node = world.GetBodyList();
	while(node) {
		var b = node;
		node = node.GetNext();
		if (b.m_linearVelocity.LengthSquared() > 0.01) {
			isAllBodiesStationary = false;
			break;
		}
	}
	return isAllBodiesStationary;
}


window.addEventListener("processBalls", function(e) { processBalls(e) });

function processBalls(e) {


	var BALLS= e.detail.BALLS;
	if (BALLS == MAX_BALLS) {
		launchedBalls=-1;
	}
	//console.log("Balls from Event="+BALLS);
	//console.log("Launched Balls="+launchedBalls);

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
	//console.log("MAX-Launched=",MAX_BALLS - launchedBalls);	
}
//run({"detail":{"NEW_LEVEL":LEVEL}});



//////////////////////
//////////////////////
//
// TOUCH EVENTS
//
//////////////////////
//////////////////////
var dragStarted=false;

function beginDrag(e) {
	    e.preventDefault();
	    //if (dragStarted)
			// window.dispatchEvent(new CustomEvent("processBalls", {"detail":{"BALLS":0}}));
}
	

function dragging(e) {
	    e.preventDefault();
	    dragStarted = true;
		if (e.changedTouches) {
			posXf = e.changedTouches[0].pageX - this.offsetLeft;
			posYf = e.changedTouches[0].pageY - this.offsetTop;
		} else {
			posXf = e.pageX;
			posYf = e.pageY;
		}
}
function endDrag(e){
	    e.preventDefault();
	    if (dragStarted){
		    dragStarted = false;
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
			ballDef.position.Set(posX, posY);

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

			var ball = world.CreateBody(ballDef)
			ball.CreateFixture(fixture);

			var velocityFactor = .1;

			ball.SetLinearVelocity(new b2Vec2(difX * velocityFactor, difY * velocityFactor))

			posXf = null;
			posYf = null;
			window.dispatchEvent(new CustomEvent("processBalls", {"detail":{"BALLS":0}}));

	    }
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
