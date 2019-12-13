var myGameArea = {
    canvas: document.createElement("canvas"),
    frames: 0,
    score: 0,

    start: function() {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      document.body.append(this.canvas, document.body.childNodes[0])
      // call updateGameArea() every 20 milliseconds
      this.interval = setInterval(updateGameArea, 20); 
    }, 
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
    stop: function() {
        clearInterval(this.interval);
      },
    
  };

  var myObstacles = [];

  function updateGameArea() {
    // console.log(player.health)
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    boundaries();
    updateScore();
    // check if the game should stop
    checkGameOver();
  }


  class Component {

    constructor(health, width, height, color, x, y) {
      this.health = health;
      this.width = width;
      this.height = height;
      this.img = new Image();
      this.color = color
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
    }
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
  
    crashWith(obstacle) {
      return !(
        this.bottom() < obstacle.top() ||
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right()
      );
    }


    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
      }

  
    update() {
      var ctx = myGameArea.context;
      // ctx.fillStyle = "https://opengameart.org/sites/default/files/player_19.png";
      // ctx.fillStyle = ctx.createPattern("https://opengameart.org/sites/default/files/player_19.png", "no-repeat");
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      // We will probably use drawImage() instead of fillRect
    }


  } // this is where the Component class ends
  function checkGameOver() {
    var crashed = myObstacles.some(function(obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (player.health < 1) {
      myGameArea.stop();
    }
  }

  function updateScore(){
    // console.log(myGameArea.frames)
    let displayedScore = myGameArea.score.toFixed(0)
    if (myGameArea.frames % 50) {
      myGameArea.score += .02;
    }
    document.querySelector("body > div > p:nth-child(2) > span").innerHTML = displayedScore
    console.log(displayedScore);
  }

  function updateObstacles() {

    // console.log(player.health)

    // console.log('this is the x speed', player.speedX)
    // console.log('this is the y speed', player.speedY)

    for (i = 0; i < myObstacles.length; i++) {

      // console.log(myObstacles[i].x)

      if (player.x < myObstacles[i].x) {
        myObstacles[i].x -= .6;
      } 
      if (player.y < myObstacles[i].y){
        myObstacles[i].y -= .6;
      }      
      if (player.x > myObstacles[i].x) {
        myObstacles[i].x += .6;
      } 
      if (player.y > myObstacles[i].y){
        myObstacles[i].y += .6;
      }

      // console.log(player.x, player.y)
      // console.log(myObstacles[i].x, myObstacles[i].y)

      if (player.x < myObstacles[i].x 
        && player.x + 20 > myObstacles[i].x
        && player.y < myObstacles[i].y 
        && player.y + 20 > myObstacles[i].y
        ) {
        player.health--
        document.querySelector("body > div > p:nth-child(3) > span").innerHTML = player.health
        console.log(player.health)
      }
      // if (player.y < myObstacles[i].y && player.y + 20 > myObstacles[i].y) {
      //   player.health--
      //   console.log(player.health)
      // }


      myObstacles[i].update();
    
    }


    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      var x = myGameArea.canvas.width;
      var minHeight = 20;
      var maxHeight = 320;
      var height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      // var minGap = 50;
      // var maxGap = 200;
      // var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Component(1, 10, 10, "green", x, height));
      // myObstacles.push(
      //   new Component(10, x - height - gap, "green", x, height + gap)
      // );
    }
    else if (myGameArea.frames % 100 === 0) {
      console.log('spawned from somewhere else')
      var maxWidth = 400;
      var minWidth = 20;
      var y = myGameArea.canvas.height;
      var width = Math.floor(
        Math.random() * (maxWidth - minWidth + 1)
      );
      var randomX = Math.floor(Math.random() * 200) + 100
      myObstacles.push(new Component(1, 10, 10, "green", randomX, 300));
    }
  };

  function boundaries(){
    if (player.x < 0){
      player.x = 0
    }
    if (player.y < 0){
      player.y = 0
    }
    if (player.x > myGameArea.canvas.width - 20){
      player.x = myGameArea.canvas.width - 20
    }
    if (player.y > myGameArea.canvas.height -20){
      player.y = myGameArea.canvas.height - 20
    }
    
  }

  document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 38: // up arrow
            player.speedY = -3;
            break;
          case 40: // down arrow
            player.speedY = 3;
            break;
          case 37: // left arrow
            player.speedX = -3;
            break;
          case 39: // right arrow
            player.speedX = 3;
            break;
        }
      };

      document.onkeyup = function(e) {
        player.speedX = 0;
        player.speedY = 0;
      };

  var player = new Component(200, 20, 20, "black", 0, 110);



  myGameArea.start();