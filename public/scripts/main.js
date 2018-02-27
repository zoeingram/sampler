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

function mousePressed() {

    if (currentNode != null) {
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

}

function determineLane(node) {
    var nodeValue = node.context.innerHTML;
    if (nodeValue.length < 2) { // Only call functions if button is hit
      var nodeID = node.parent()[0].id;
        findImageURL(node);
        if (nodeValue === '1') { // DO sound stuff her
          console.log(nodeID);
          // call the play function for 1 + ID
        } else if (nodeValue === '2') { // DO sound stuff here
            console.log("hits 2");
              // call the play function for 2 + ID
        } else if (nodeValue === '3') { // DO sound stuff here
            console.log("hits 3");
              // call the play function for 3 + ID
        } else {
            console.log("did not hit value");
        }
    }
}


function playLoop1(nodeID) {

}

// TODO Replace with static image URL when deployed
// TODO Upload all images to s3 bucket --> url prefix will be easier to remove
function findImageURL(node) {
    var imageURL = node.parent().css('background-image');
    var imgRegEx = /(https?:\/\/.*\.(?:png))/i;
    var remove = "http://localhost:5000";
    var result = imgRegEx.exec(imageURL)[0];
    result = result.replace(remove, '');
    var prefix = result.substring(0, 8);
    result = result.replace(prefix, '');
    result = prefix + "small/" + result;
    passImage(result);
}

function passImage(result) {
    currentImg = loadImage(result);
}

function determineSize(currentImg) {
  var randomNum = Math.random(2, 3);
  imgW = currentImg.width * randomNum;
  imgH = currentImg.height * randomNum;

}

function putImageInLane1(currentImg) {
    determineSize(currentImg);
    image(currentImg, x1, y1, imgW, imgH);
    y1 += 40;
}

function putImageInLane2(currentImg) {
    determineSize(currentImg);
    image(currentImg, x2, y2, imgW, imgH);
    y2 += 40;
}

function putImageInLane3(currentImg) {
    determineSize(currentImg);
    image(currentImg, x3, y3, imgW, imgH);
    y3 += 40;
}


$(document).ready(function() {
    var currentValue;

    $(document).click(function(event) {
        currentNode = $(event.target);
        determineLane(currentNode);
        currentNode.blur();

    });

}); // End document ready
