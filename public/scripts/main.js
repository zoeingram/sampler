var canvas;
var canWidth;
var img;
var x1 = 5,
    x2 = 60,
    x3 = 130;
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
var soundFilesA = ['files1'];
var soundFilesB = ['files2'];
var soundFilesC = ['files3'];

var loop1;
var loop2;
var loop3;
var soundLoadLoopA, soundLoadLoopB, soundLoadLoopC;

var state = false;

function preload() {
  for(var i = 1; i <= 32; i++) {
    soundLoadLoopA = loadSound('/sounds/o' + i + 'a.wav');
    soundFilesA.push(soundLoadLoopA);
  }
  for(var i = 1; i <= 32; i++) {
    soundLoadLoopB = loadSound('/sounds/o' + i + 'b.wav');
    soundFilesB.push(soundLoadLoopB);
  }
  for(var i = 1; i <= 32; i++) {
    soundLoadLoopC = loadSound('/sounds/o' + i + 'c.wav');
    soundFilesC.push(soundLoadLoopC);
  }
}

function setup() {
  canvas = createCanvas(windowWidth / 7, windowHeight);
  canvas.parent('sidebar');
  canvas.position(0, 0);
  canvas.id('sidebarCanvas');
}

function draw() {
  strokeWeight(2);
  canWidth = canvas.width;
  noFill();
  rect(2, 30, canWidth - 5, canvas.height);
}

function mouseClicked() {
  if ($(currentNode).attr('class') == buttonClass) {
    var value = $(currentNode);
    var currentState = $(value).attr('data-on');
    var laneNumber = value.context.innerHTML;
    var indexVal = determineIDIndex(value);
    if (currentState == 'false') {
      $(value).attr('data-on', 'true');
      findImageUrlLocal(value);
    var path = findSoundPath(result, laneNumber);
      passAndRenderImage(result, laneNumber);
      console.log(path)
      playLoop(path, laneNumber, indexVal)
    } else if (currentState == 'true') {
      $(value).attr('data-on', 'false');
      stopLoop(value, laneNumber, indexVal)
    } else {
      console.log("blah");
    }
  }
}


function findImageUrlLocal(node) {
  var imageURL = node.parent().css('background-image');
  var imgRegEx = /(https?:\/\/.*\.(?:png))/i;
  result = imgRegEx.exec(imageURL)[0];
  result = result.substring(result.indexOf("0/") + 1);
}

function findSoundPath(node, laneNumber) {
  var ext;
  if (laneNumber == 1) {
    ext = 'a';
  } else if (laneNumber == 2) {
    ext = 'b';
  } else {
    ext = 'c';
  }

  soundFile = node.substring(node.indexOf('/o') + 1);
  soundFile = soundFile.substr(0, soundFile.length -4) + ext + '.wav';
  return soundFile;
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
  console.log(sound)
  if (lane == 1) {

    loop1 = soundFilesA[index];
    loop1.loop();
  } else if (lane == 2) {
    loop2 = soundFilesB[index];
    loop2.loop();
  } else {
    loop3 = soundFilesC[index];
    loop3.loop();
  }
}

function stopLoop(sound, lane, index) {
  if (lane == 1) {
    loop1 = soundFilesA[index];
    loop1.stop();
  } else if (lane == 2) {
    loop2 = soundFilesB[index];
    loop2.stop();
  } else {
    loop3 = soundFilesC[index];
    loop3.stop();
  }
}


$(document).ready(function() {
  var composition, dataURL;
    $(document).click(function(event) {
        currentNode = $(event.target);
    });

    $('#outro').on('click', function() {
      composition = document.getElementById('sidebarCanvas');
      dataURL = composition.toDataURL();
      var visComp = new Image();
      visComp.src = dataURL;
      $(visComp).attr('id', 'printComp');
      $('#printme').append(visComp);
    });
});
