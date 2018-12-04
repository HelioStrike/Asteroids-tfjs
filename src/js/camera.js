var width = 224;
var height = 224;

var streaming = false;
var video = null;
var startbutton = null;
var left_canvas = null;
var right_canvas = null;

function startup() {
    video = document.getElementById("video");
    startbutton = document.getElementById("startbutton");
    left_canvas = document.getElementById("left-control");
    right_canvas = document.getElementById("right-control");
    
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        function(stream) {
            video.srcObject = stream;
            video.play();
        }
    ).catch(function(err) {
        console:log("err: " + err);
    });

    video.addEventListener('canplay', function(ev) {
        if(!streaming) {
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            left_canvas.setAttribute("width", width);
            left_canvas.setAttribute("height", height);
            right_canvas.setAttribute("width", width);
            right_canvas.setAttribute("height", height);
            streaming = true;
        }
    });

    clearphoto();
}

function clearphoto() {
    var context = left_canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, left_canvas.width, left_canvas.height);

    context = right_canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, right_canvas.width, right_canvas.height);
}

function takepicture(ucanvas) {
    var context = ucanvas.getContext('2d');
    if(width && height) {
        ucanvas.width = width;
        ucanvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var img = new Image();
        img.src = ucanvas.toDataURL('image/png').replace('image/png','image/octet-stream');
        return tf.fromPixels(video);
    } else {
        clearphoto();
    }
}