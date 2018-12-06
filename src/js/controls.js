startup();

function assignLeftControl(left) {
    left_control = takepicture(left);
}

function assignRightControl(right) {
    right_control = takepicture(right);
}

left_canvas.addEventListener('click', function(ev) {
    assignLeftControl(this);
    ev.preventDefault();
}, false);

right_canvas.addEventListener('click', function(ev) {
    assignRightControl(this);
    ev.preventDefault();
}, false);
