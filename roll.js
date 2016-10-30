//roll.js - made by Jack Mandelkorn
var sprites = [];
var bColor = "rgba(255, 255, 255, 1)";
var fps = 30;
var snapping = false;

var xCenter = 0;
var yCenter = 0;

var masterCanvas = document.getElementsByClassName("rolljs-canvas")[0];
var loop = setInterval(function(){ render(); },(1000 / fps));

function render() {
  var masterCanvas = document.getElementsByClassName("rolljs-canvas")[0];
  var c = masterCanvas.getContext("2d");
  var sprite;
  c.fillStyle=bColor;
  c.fillRect(0, 0, masterCanvas.width, masterCanvas.height);
  if (snapping === true) {
    for (var i = 0; i < sprites.length; i++) {
      c.drawImage(sprites[i].img, Math.floor((masterCanvas.width / 2) - (sprites[i].width / 2) + sprites[i].x - xCenter + 0.5), Math.floor((masterCanvas.height / 2) - (sprites[i].height / 2) - sprites[i].y + yCenter + 0.5), Math.floor(sprites[i].width + 0.5), Math.floor(sprites[i].height));
    }
  }
  else {
    for (var i = 0; i < sprites.length; i++) {
      c.drawImage(sprites[i].img, ((masterCanvas.width / 2) - (sprites[i].width / 2) + sprites[i].x - xCenter), ((masterCanvas.height / 2) - (sprites[i].height / 2) - sprites[i].y + yCenter), sprites[i].width, sprites[i].height);
    }
  }
}

function HalfSprite(source) {
  this.x = 0;
  this.y = 0;
  if (source) {
    this.img = new Image();
    this.img.src = source;
  }
  else {
    this.img = null;
  }
  this.width = 0;
  this.height = 0;
}

function Sprite(source,entwidth,entheight,xpos,ypos,entname) {
  if (source) {
    this.img = new Image();
    this.img.src = source;
  }
  else {
    this.img = null;
  }
  if (xpos) {
    this.x = xpos;
  }
  else {
    this.x = 0;
  }
  if (ypos) {
    this.y = ypos;
  }
  else {
    this.y = 0;
  }
  if (entwidth) {
    this.width = entwidth;
  }
  else {
    this.width = 0;
  }
  if (entheight) {
    this.height = entheight;
  }
  else {
    this.height = 0;
  }
  if (entname) {
    this.name = entname;
  }
  sprites.push(this);
}

function moveSprite(num,xpos,ypos,time) {
  if (time) {
    var tempx = sprites[num].x;
    var tempy = sprites[num].y;
    var sprite = sprites[num];
    var i = 0;
    var itotal = Math.floor((time * (fps/1000)) + 0.5);
    var movement = setInterval(function(){
      sprite.x = (((xpos - tempx) / itotal) * i) + tempx;
      sprite.y = (((ypos - tempy) / itotal) * i) + tempy;
      if (i === itotal) {
        sprite.x = xpos;
        sprite.y = ypos;
        clearInterval(movement);
      }
      else {
        i++;
      }
    },1000/fps);
  }
  else {
    sprites[num].x = xpos;
    sprites[num].y = ypos;
  }
}

function viewport(xpos,ypos) {
  xCenter = xpos;
  yCenter = ypos;
}

function setFPS(newFPS) {
  fps = newFPS;
  clearInterval(loop);
  loop = setInterval(function(){ render(); },(1000 / fps));
}

function snap(truth) {
  snapping = truth;
}

function getSprite(num) {
  return sprites[num];
}

function devTools() {
  (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})();
}

function sizeSprite(num,entwidth,entheight,time) {
  if (time) {
    var tempw = sprites[num].width;
    var temph = sprites[num].height;
    var sprite = sprites[num];
    var i = 0;
    var itotal = Math.floor((time * (fps/1000)) + 0.5);
    var movement = setInterval(function(){
      sprite.width = (((entwidth - tempw) / itotal) * i) + tempw;
      sprite.height = (((entheight - temph) / itotal) * i) + temph;
      if (i === itotal) {
        sprite.width = entwidth;
        sprite.height = entheight;
        clearInterval(movement);
      }
      else {
        i++;
      }
    },1000/fps);
  }
  else {
    sprites[num].width = entwidth;
    sprites[num].height = entheight;
  }
}

function getSpritesByName(entName) {
  var res = [];
  for (var i = 0; i < sprites.length; i++) {
    if (sprites[i].name.includes(entName)) {
      res.push(i);
    }
  }
  return res;
}

function touching(num1,num2) {
  var s1 = sprites[num1];
    s1.top = s1.y + (s1.height / 2);
    s1.bottom = s1.y - (s1.height / 2);
    s1.left = s1.x - (s1.width / 2);
    s1.right = s1.x + (s1.width / 2);
  var s2 = sprites[num2];
    s2.top = s2.y + (s2.height / 2);
    s2.bottom = s2.y - (s2.height / 2);
    s2.left = s2.x - (s2.width / 2);
    s2.right = s2.x + (s2.width / 2);
  if (((s1.top > s2.top && s2.top > s1.bottom) || (s1.top > s2.bottom && s2.bottom > s1.bottom)) && ((s1.right > s2.right && s2.right > s1.left) || (s1.right > s2.left && s2.left > s1.left))) {
    return true;
  }
  else {
    return false;
  }
}

function onTouching(num1,num2,execute) {
  var test = setInterval(function(){
    if (touching(num1,num2)) {
      (execute)();
      clearInterval(test);
    }
  },1000/fps);
}

function setBackground(r,g,b,a) {
  if (r === false) {
    bColor = "rgba(0,0,0,0)";
  }
  else {
    bColor = ("rgba(" + r + "," + g + "," + b + "," + a + ")");
  }
}
