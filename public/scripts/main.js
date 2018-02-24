// TODO: render images in canvas
// TODO: add sounds to each ID
// TODO: looping functionality
// TODO: recording functionality
// TODO: make images move through lanes * speed
// TODO: download song after recording has ended
// TODO: START / STOP


var canvas;
var canWidth;
var img;
var x1 = 10;
var y1 = 0;
var y2 = 0;
var y3 = 0;
var x2 = 85;
var x3 = 149;
var currentImg;
var currentNode;

var it = 0;
function setup() {
    canvas = createCanvas(windowWidth / 7, windowHeight);
    canvas.parent('sidebar');
    canvas.position(0, 0);
}

function draw() {
    strokeWeight(2);
    canWidth = canvas.width;
    noFill();
    rect(2, 30, canWidth - 5, canvas.height );

}

function mousePressed() {
  if (currentNode.context.innerHTML == 1) {
      putImageInLane1(currentImg);
  }
  if (currentNode.context.innerHTML == 2) {
    putImageInLane2(currentImg);
  }
  if (currentNode.context.innerHTML == 3) {
    putImageInLane3(currentImg);
  }
}
function determineLane(node) {
    var nodeValue = node.context.innerHTML;
    if (nodeValue.length < 2) { // Only call functions if button is hit
        findImageURL(node);
        if (nodeValue === '1') { // DO sound stuff her
        } else if (nodeValue === '2') { // DO sound stuff here
            console.log("hits 2");
        } else if (nodeValue === '3') { // DO sound stuff here
            console.log("hits 3");
        } else {
            console.log("did not hit value");
        }
    }
}

function findImageURL(node) {
    var imageURL = node.parent().css('background-image');
    var imgRegEx = /(https?:\/\/.*\.(?:png))/i;
    var remove = "http://localhost:5000"; // Replace with static image URL when deployed
    var result = imgRegEx.exec(imageURL)[0];
    result = result.replace(remove, '');
    var prefix = result.substring(0, 8);
    result = result.replace(prefix, '');
    result = prefix + "small/" + result;
    passImage(result);
}

function upIterator() {
  iterator++;
}

function passImage(result) {
  currentImg = loadImage(result);
}

function putImageInLane1(currentImg) {
  image(currentImg, x1, y1);
  y1+=40;
}

function putImageInLane2(currentImg) {
  image(currentImg, x2, y2);
  y2+=40;
}

function putImageInLane3(currentImg) {
  image(currentImg, x3, y3);
  y3+=40;
}





$(document).ready(function() {
    var currentValue;

    $(document).click(function(event) {
        currentNode = $(event.target);
        determineLane(currentNode);
        currentNode.blur();

    });

}); // End document ready
