
//sets up camera and canvas
function startup() {
    video = document.getElementById("video");
    startbutton = document.getElementById("startbutton");
    left_canvas = document.getElementById("left-control");
    right_canvas = document.getElementById("right-control");
    
    //plays video
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

//clears canvases
function clearphoto() {
    var context = left_canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, left_canvas.width, left_canvas.height);

    context = right_canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, right_canvas.width, right_canvas.height);
}

//returns snapshot tensor of camera
function takepicture(ucanvas) {
    var context = ucanvas.getContext('2d');
    if(width && height) {
        var pix = tf.fromPixels(video);
        tf.toPixels(pix, ucanvas);
        return pix;
    } else {
        clearphoto();
    }
}