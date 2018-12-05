//vars
var width = 224;
var height = 224;

var streaming = false;
var video = null;
var startbutton = null;
var left_canvas = null;
var right_canvas = null;
var left_control = null;
var right_control = null;
var train_btn = document.getElementById("train");
var loss_text = document.getElementById("loss");
var EPOCHS = 30;