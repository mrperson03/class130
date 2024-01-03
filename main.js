song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
InnumberleftwristY = 0;
remove_decimals = 0;
volume = 0;

function preload() {
  song = loadSound('music.mp3');
}

function setup() {
  canvas = createCanvas(350, 350);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
  if(results.length > 0) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    console.log("leftwristx = " + leftwristX + "leftwristy = " + leftwristY);
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("rightwristx = " + rightwristX + "rightwristy = " + rightwristY);

  }
}

function modelLoaded() {
  console.log("posenet is initialized");
}

function draw() {
    background("white")
    image(video, 0, 0, 350, 350)

    fill("#FF0000");
    stroke("FF0000");

    if(scoreRightWrist > 0.0) {

      circle(rightwristX, rightwristY, 20);

      console.log(scoreRightWrist , rightwristY)

    if(rightwristY > 0 && rightwristY <= 100) {
      document.getElementById("speed1").innerHTML = "speed = 0.5x";
      song.rate(0.5);
    }
    else if(rightwristY > 100 && rightwristY <= 200) {
      document.getElementById("speed1").innerHTML = "Speed = 1x";
      song.rate(1);
    }
    else if(rightwristY > 200 && rightwristY <=300) {
      document.getElementById("speed1").innerHTML = "speed = 1.5x";
      song.rate(1.5);
    }
    else if(rightwristY > 300 && rightwristY <= 400) {
      document.getElementById("speed1").innerHTML = "speed = 2x";
      song.rate(2);
    }
    else if(rightwristY > 400 && rightwristY <= 500) {
      document.getElementById("speed1").innerHTML = "speed = 2.5x";
      song.rate(2.5);
    }
    }

    if(scoreLeftWrist > 0.2) {
      circle(leftwristX, leftwristY, 20);
      InnumberleftwristY = Number(leftwristY);
      remove_decimals = floor(InnumberleftwristY);
      volume = remove_decimals/500;
      document.getElementById("volume").innerHTML = "volume =" + volume;
      song.setVolume(volume);
      results[0].pose.keypoints[9].score;
  }
    }


function play1() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}