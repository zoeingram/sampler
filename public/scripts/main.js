// TODO: add sounds to each ID
// TODO: looping functionality
// TODO: recording functionality
// TODO: make images move through lanes * speed
var canvas;
var canWidth;
var img;
var x1 = 5,
    x2 = 60,
    x3 = 135;
var y1 = 20,
    y2 = 20,
    y3 = 20;

var currentImg;
var currentNode = null;
var imgW;
var imgH;
var buttonClass = 'number';
var result;

var soundFile;
var soundFiles = ['files'];
var loop1;
var loop2;
var loop3;
var soundLoadLoop;


function preload() {
  for(var i = 1; i <= 12; i++) {
    soundLoadLoop = loadSound('/sounds/o' + i + '.wav');
    soundFiles.push(soundLoadLoop);
  }
}


function setup() {
  canvas = createCanvas(windowWidth / 7, windowHeight);
  canvas.parent('sidebar');
  canvas.position(0, 0);
}

function draw() {
  strokeWeight(2);
  canWidth = canvas.width;
  noFill();
  // line(canWidth/3, 0, canWidth/3, canvas.height)
  // line(canWidth - canWidth/3, 0,canWidth - canWidth/3, canvas.height)
  rect(2, 30, canWidth - 5, canvas.height);
}

function mouseClicked() {
  if ($(currentNode).attr('class') == buttonClass) {
    var laneNumber = currentNode.context.innerHTML;
    var indexVal = determineIDIndex(currentNode);
    findImageUrlLocal(currentNode);
    findSoundPath(result)
    passAndRenderImage(result, laneNumber);
    playLoop(soundFile, laneNumber, indexVal);
  }
}

function findImageUrlLocal(node) {
  var imageURL = node.parent().css('background-image');
  var imgRegEx = /(https?:\/\/.*\.(?:png))/i;
  result = imgRegEx.exec(imageURL)[0];
  result = result.substring(result.indexOf("0/") + 1);
}

function findSoundPath(node) {
  soundFile = node.substring(node.indexOf('/o') + 1);
  soundFile = soundFile.substr(0, soundFile.length -3) + 'wav';
}

function determineIDIndex(node) {
  var idIndex = $(node).parent().attr('id');
  idIndex = idIndex.substring(idIndex.indexOf('o') + 1);
  idIndex = parseInt(idIndex);
  return idIndex;
}

function determineSideSizes(resultImg, min, max) {
  var factor = Math.random() * (max - min) + min;
  imgW = resultImg.width * factor;
  imgH = resultImg.height * factor;
}


function generateX (min, max) {
  return Math.random() * (max - min) + min;
}

function passAndRenderImage(result, lane) {
  loadImage(result, function(img) {
    if (lane == 1) {
      determineSideSizes(img, 0.14, 0.23);
      x1 = generateX(3, 12);
      image(img, x1, y1, imgW, imgH);
      y1+=60;
    } else if (lane == 2) {
      determineSideSizes(img, 0.24, 0.35);
      x2 = generateX(55, 75);
      image(img, x2, y2, imgW, imgH);
      y2+=60;
    } else {
      determineSideSizes(img, 0.35, 0.43);
      x3 = generateX(125, 150)
      image(img, x3, y3, imgW, imgH);
      y3+=60;
    }
  });
}

function playLoop(sound, lane, index) {
  if (lane == 1) {
    loop1 = soundFiles[index];
    loop1.loop();
  } else if (lane == 2) {
   //play sound 2 and loop
   // mySound.stop()
  } else {
   //play sound 3 and loop
  }

}

$(document).ready(function() {
    $(document).click(function(event) {
        currentNode = $(event.target);
    });
});
