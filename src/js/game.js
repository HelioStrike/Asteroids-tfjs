var game_intervals = [];
var player = null;
var player_path = null;
var asteroids = [];

var score = 0;
var score_text = new PointText(new Point(60, 50));
score_text.justification = 'center';
score_text.fontSize = 20;
score_text.fillColor = 'black';
score_text.content = 'Score: ' + score;    

var game_over_text = new PointText(new Point(game_canvas.offsetWidth/2, game_canvas.offsetHeight/2));
game_over_text.justification = 'center';
game_over_text.fontSize = 30;

function gameStart()
{
    
    player = new Rectangle();
    player.left = game_canvas.offsetWidth*start_x - player_width/2;
    player.right = game_canvas.offsetWidth*start_x + player_width/2;
    player.top = game_canvas.offsetHeight*start_y - player_height/2;
    player.bottom = game_canvas.offsetHeight*start_y + player_height/2;
    player_path = new Path.Rectangle(player);
    drawPlayer();

    //set player direction
    game_intervals.push(window.setInterval(movePlayer, 300));

    //move player
    game_intervals.push(window.setInterval(function(){
        if(curr_control == "left") { moveLeft();}
        else { moveRight();}
    }, 15));

    //spawn asteroids
    game_intervals.push(window.setInterval(spawnAsteroid, asteroid_spawn_rate*1000));

    //update and draw asteroids
    game_intervals.push(window,setInterval(drawAsteroids, 15));

    //draw score
    game_intervals.push(window,setInterval(drawScore, 1000));

    //check game over
    game_intervals.push(window,setInterval(checkGameOver, 200));
}

function drawPlayer()
{
    player_path.remove();
    player_path = new Path.Rectangle(player);
    player_path.fillColor = '#e9e9ff';
    player_path.selected = true;
}

function moveLeft()
{
    player.left -= player_speed;
    if(player.left < 0) player.left = 0;
    player.right = player.left + player_width;
    drawPlayer();
}

function moveRight()
{
    player.right += player_speed;
    if(player.right > game_canvas.offsetWidth) player.right = game_canvas.offsetWidth;
    player.left = player.right - player_width;
    drawPlayer();
}

function movePlayer() {
    var pix = tf.reshape(tf.fromPixels(video), [1,224,224,3]);
    var ans = model.predict(pix).dataSync();
    console.log(ans);
    if(ans[0] > ans[1]) {
        left_canvas.className = "currmove";
        right_canvas.className = "";
        curr_control = "left";
    } else {
        left_canvas.className = "";
        right_canvas.className = "currmove";
        curr_control = "right";
    }
}

function spawnAsteroid() {
    asteroids.push([Math.floor(Math.random()*game_canvas.offsetWidth), 0, Math.floor(Math.random()*90),
         new Rectangle(), new Path.Rectangle(new Rectangle())]);
}

function drawAsteroids() {
    for(var i = 0; ; i++) {
        if(i >= asteroids.length) { break;}
        if(asteroids[i][1] >= game_canvas.offsetHeight + asteroid_height/2) { asteroids.splice(i, 1); i--;}
    }

    for(var i = 0; i < asteroids.length; i++) {
        asteroids[i][1] += asteroid_speed;
        asteroids[i][2] += asteroid_rotate_speed;

        asteroids[i][3].left = asteroids[i][0] - asteroid_width/2;
        asteroids[i][3].right = asteroids[i][0] + asteroid_width/2;
        asteroids[i][3].top = asteroids[i][1] - asteroid_height/2;
        asteroids[i][3].bottom = asteroids[i][1] + asteroid_height/2;

        asteroids[i][4].remove();
        asteroids[i][4] = new Path.Rectangle(asteroids[i][3]);
        asteroids[i][4].rotate(asteroids[i][2]);
        asteroids[i][4].fillColor = '#ff6961';
    }
}

function drawScore() {
    score += 1;
    score_text.content = 'Score: ' + score;    
}


function checkGameOver() {
    for(var i = 0; i < asteroids.length; i++) {
        if(player_path.intersects(asteroids[i][4])) { gameOver(); break;}
    }
}

function gameOver() {
    game_over_text.content = "Game Over!!! Score: " + score;
    while(game_intervals.length > 0) { clearInterval(game_intervals[0]); game_intervals.splice(0, 1);}
}

window.gameStart = gameStart;