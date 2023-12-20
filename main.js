song1 = "";
song2 = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
song1_status="";
song2_status="";
scoreLeftWrist=0;
scoreRightWrist=0;
shades="";
leftEyeX="";
leftEyeY="";

function preload(){
    song1 = loadSound("Wish.mp3");
    song2 = loadSound("bee.mp3");
    shades = loadImage("shades.png");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    image(shades, leftEyeX-85, leftEyeY+50, 85,75)
    fill("red");
    stroke("red");
    
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if (scoreLeftWrist>0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(song2_status==false){
            song2.play();
            document.getElementById("song_name").innerHTML="Playing - Bee. by GroovyDominos52";
        }
    }

    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop()

        if (song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Playing - I Wish (Bonus 'Street' mix) by Skee-Lo";
        }
    }
}

function modelLoaded(){
    console.log("PoseNet is Initialized!");
}

function gotPoses(results){
    if (results.length>0) {
        console.log(results);

        leftEyeX = results[0].pose.leftEye.x;
        leftEyeY = results[0].pose.leftEye.y;
        console.log("leftEyeX = "+leftEyeX+" | leftEyeY = "+leftEyeY);
        
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+scoreRightWrist);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" | leftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" | rightWristY = "+rightWristY);
    }
}