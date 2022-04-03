const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Canvas size
canvas.width = 1024;
canvas.height = 576;

// Calling Canvas and setting the x(0) and y(0) as to where to start the canvas 'draw' and setting the size to be the size of the canvas variables
c.fillRect(0, 0, canvas.width, canvas.height);

// Creating rectangles as enemy's

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, color = "red" }) {
    // basically a function within the class that will be fired any time we create an object in this class, using brackets so that we can pass the arguments of the functions as objects letting them being called like and/or, no need to keep track of what comes first
    this.position = position; // this is basically like self in python
    this.velocity = velocity;
    this.width = 50
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    };
    this.color = color;
  }
  draw() {
    c.fillStyle = this.color; // Filling the rectangle with the color red, and because it is inside draw is gonna select the c object
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // Creating a new sprite with fillRect, so... a rectangle. Associated with this.position

    //attack box
    c.fillStyle = "green";
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
  }
  update() {
    // function to incresse what's in it each frame
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

// Player Sprite
const player = new Sprite({
  position: {
    // creating two new objects inside player Sprite, one as the position and the other as velocity
    x: 0,
    y: 0,
  },
  velocity: {
    // here velocity has two variables so that the player can move left, right, up and down
    x: 0,
    y: 10,
  },
});

player.draw();

// Enemy Sprite
const enemy = new Sprite({
  // Creating a enemy Sprite, far from where the player spawns
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
});

enemy.draw();

console.log(player);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

function animate() {
  // infinite loop that keep animating frame by frame
  window.requestAnimationFrame(animate);
  c.fillStyle = "black"; // clearing the canvas from the red enemy draw with black, each frame
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0; // to make sure the player stop moving when keys lifted up
  enemy.velocity.x = 0;

  // handles player movement
  if (keys.a.pressed && player.lastKey == "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey == "d") {
    player.velocity.x = 5;
  }
  // handles enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //detect for colision
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height
  ) {
    console.log("go");
  }
}

animate();

window.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    // enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
  // enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
  console.log(event.key);
});
