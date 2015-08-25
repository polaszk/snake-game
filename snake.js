$(document).ready(function() {
  var canvas = $("#board")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#board").width();
  var h = $("#board").height();
  var d;
  var food;
  var score;
  var snake;

  function init() {
    direction = "right";
    create_snake();
    create_food();
    score = 0;

    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }
  init();

  function create_snake() {
    var length = 5;
    snake = [];
    for(var i = length-1; i>=0; i--) {
      snake.push({x: i, y:0});
    }
  }

  function create_food() {
    food = {
      x: Math.round(Math.random()*(w-10)/10),
      y: Math.round(Math.random()*(h-10)/10),
    };
  }

  function paint() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    var nx = snake[0].x;
    var ny = snake[0].y;

    if(direction == "right") nx++;
    else if(direction == "left") nx--;
    else if(direction == "up") ny--;
    else if(direction == "down") ny++;

    if(nx == -1 || nx == w/10 || ny == -1 || ny == h/10 || check_collision(nx, ny, snake)) {
      init();
      return;
    }

    if(nx == food.x && ny == food.y) {
      var tail = {x: nx, y: ny};
      score++;
      create_food();
    } else {
      var tail = snake.pop();
      tail.x = nx; tail.y = ny;
      }

    snake.unshift(tail);

    for(var i = 0; i < snake.length; i++) {
      var c = snake[i];
      paint_cell(c.x, c.y);
    }

    paint_cell(food.x, food.y);
    var score_text = "Score: " + score;
    ctx.fillText(score_text, 5, h-5);
  }

  function paint_cell(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x*10, y*10, 10, 10);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*10, y*10, 10, 10);
  }

  function check_collision(x, y, array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x == x && array[i].y == y)
       return true;
    } return false;
  }

  $(document).keydown(function(e) {
    var key = e.which;
    if(key == "37" && direction != "right") direction = "left";
    else if(key == "38" && direction != "down") direction = "up";
    else if(key == "39" && direction != "left") direction = "right";
    else if(key == "40" && direction != "up") direction = "down";
  })
})
