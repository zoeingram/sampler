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
var x1 = 0;
var y1 = 0;
var x2 = 66;
var x3 = 133;
var currentImg;
var currentNode;
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
    if(currentImg) {
      putImageInLane1(currentImg);
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
    passImage(result);
}



function passImage(result) {
  currentImg = loadImage(result);

}

function putImageInLane1(currentImg) {
  image(currentImg, x1, y1, 50, 100);
}

function iteratePosition() {
  y1 +=40;
}



$(document).ready(function() {
    var currentValue;

    $(document).click(function(event) {
        currentNode = $(event.target);
        determineLane(currentNode);
        currentNode.blur();
        iteratePosition();
        console.log(y1)
    });

}); // End document ready
