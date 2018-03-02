// TODO: add sounds to each ID
// TODO: looping functionality
// TODO: recording functionality
// TODO: make images move through lanes * speed
var canvas;
var canWidth;
var img;
var x1 = 10;
var y1 = 50;
var y2 = 50;
var y3 = 50;
var x2 = 85;
var x3 = 149;
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

function determineSize(resultImg) {
  console.log(resultImg);
  var randomNum = Math.random(1, 2);
  imgW = resultImg.width * randomNum;
  imgH = resultImg.height * randomNum;
}

function resizeImage(resultImg) {

}

function passAndRenderImage(result, lane) {
  loadImage(result, function(img) {
    determineSize(img);
    if (lane == 1) {
      image(img, x1, y1, imgW, imgH);
    } else if (lane == 2) {
      image(img, x2, y2, imgW, imgH);
    } else {
      image(img, x3, y3, imgW, imgH);
    }
  });
}

$(document).ready(function() {
    $(document).click(function(event) {
        currentNode = $(event.target);
    });
}); // End document ready
