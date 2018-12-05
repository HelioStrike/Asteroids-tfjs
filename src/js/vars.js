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
var curr_control = "left";
var train_btn = document.getElementById("train");
var loss_text = document.getElementById("loss");
var EPOCHS = 30;

var start_x = 0.5;
var start_y = 0.8;
var player_width = 50;
var player_height = 50;
var player_speed = 6;
var game_canvas = document.getElementById("gameCanvas");
console.log(game_canvas);