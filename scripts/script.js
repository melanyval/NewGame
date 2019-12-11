var myGameArea = {
    canvas: document.createElement("canvas"),
    frames: 0,

    start: function() {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0])
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
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    // check if the game should stop
    // checkGameOver();
  }


  class Component {

    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
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
    }


  } // this is where the Component class ends
  function checkGameOver() {
    var crashed = myObstacles.some(function(obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (crashed) {
      myGameArea.stop();
    }
  }

  function updateObstacles() {

    console.log('this is the x speed', player.speedX)
    console.log('this is the y speed', player.speedY)

    for (i = 0; i < myObstacles.length; i++) {

      console.log(myObstacles[i].x)

      if (player.x < myObstacles[i].x) {
        myObstacles[i].x -= 1;
      } 
      if (player.y < myObstacles[i].y){
        myObstacles[i].y -= 1;
      }      
      if (player.x > myObstacles[i].x) {
        myObstacles[i].x += 1;
      } 
      if (player.y > myObstacles[i].y){
        myObstacles[i].y += 1;
      }

      myObstacles[i].update();
    }


    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      var x = myGameArea.canvas.width;
      var minHeight = 20;
      var maxHeight = 200;
      var height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      var minGap = 50;
      var maxGap = 200;
      var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Component(10, 10, "green", x, height));
      // myObstacles.push(
      //   new Component(10, x - height - gap, "green", x, height + gap)
      // );
    }
  };

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

  var player = new Component(30, 30, "red", 0, 110);

  myGameArea.start();