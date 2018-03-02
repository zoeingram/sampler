// TODO: add sounds to each ID
// TODO: looping functionality
// TODO: recording functionality
// TODO: make images move through lanes * speed
var canvas;
var canWidth;
var img;
var x1 = -10;
var y1 = 0;

var y2 = 80;
var y3 = 0;

var x2 = 10;
var x3 = 120;

var currentImg;
var currentNode = null;
var imgW;
var imgH;
var buttonClass = 'number';
var result;

function setup() {
  canvas = createCanvas(windowWidth / 7, windowHeight);
  canvas.parent('sidebar');
  canvas.position(0, 0);
}

function draw() {
  strokeWeight(2);
  canWidth = canvas.width;
  noFill();
  // console.log(mouseX, mouseY)
  rect(2, 30, canWidth - 5, canvas.height);
}

function mouseClicked() {
  if ($(currentNode).attr('class') == buttonClass) {
    var laneNumber = currentNode.context.innerHTML;
    findImageUrlLocal(currentNode);
    passAndRenderImage(result, laneNumber);
  }
}

function findImageUrlLocal(node) {
  var imageURL = node.parent().css('background-image');
  var imgRegEx = /(https?:\/\/.*\.(?:png))/i;
  result = imgRegEx.exec(imageURL)[0];
  result = result.substring(result.indexOf("0/") + 1);
}

function determineSideSizes(resultImg, min, max) {
  var factor = Math.random() * (max - min) + min;
  imgW = resultImg.width * factor;
  imgH = resultImg.height * factor;
}


function passAndRenderImage(result, lane) {
  loadImage(result, function(img) {
    if (lane == 1) {
      determineSideSizes(img, 0.2, 0.35);
      image(img, x1, y1, imgW, imgH);
    } else if (lane == 2) {
      determineSideSizes(img, 0.35, 0.45);
      image(img, x2, y2, imgW, imgH);
    } else {
      determineSideSizes(img, 0.45, 0.6);
      image(img, x3, y3, imgW, imgH);
    }
  });
}

$(document).ready(function() {
    $(document).click(function(event) {
        currentNode = $(event.target);
    });
});
