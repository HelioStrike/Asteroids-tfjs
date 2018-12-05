var player = null;
var player_path = null;

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

window.gameStart = gameStart;
window.drawPlayer = drawPlayer;
window.moveLeft = moveLeft;
window.moveRight = moveRight;