var player = null;
var player_path = null;
var asteroids = [];

function gameStart()
{
    console.log(game_canvas);
    
    player = new Rectangle();
    player.left = game_canvas.offsetWidth*start_x - player_width/2;
    player.right = game_canvas.offsetWidth*start_x + player_width/2;
    player.top = game_canvas.offsetHeight*start_y - player_height/2;
    player.bottom = game_canvas.offsetHeight*start_y + player_height/2;
    player_path = new Path.Rectangle(player);
    drawPlayer();

    //set player direction
    window.setInterval(movePlayer, 300);

    //move player
    window.setInterval(function(){
        if(curr_control == "left") { window.moveLeft();}
        else { window.moveRight();}
    }, 15);

    //spawn asteroids
    window.setInterval(spawnAsteroid, asteroid_spawn_rate*1000);

    //update and draw asteroids
    window,setInterval(drawAsteroids, 15);
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

window.gameStart = gameStart;
window.drawPlayer = drawPlayer;
window.moveLeft = moveLeft;
window.moveRight = moveRight;