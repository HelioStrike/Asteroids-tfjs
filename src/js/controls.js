startup();

left_canvas.addEventListener('click', function(ev) {
    takepicture(this);
    ev.preventDefault();
}, false);

right_canvas.addEventListener('click', function(ev) {
    takepicture(this);
    ev.preventDefault();
}, false);
