const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Canvas size
canvas.width = 1024;
canvas.height = 576;

// Calling Canvas and setting the x(0) and y(0) as to where to start the canvas 'draw' and setting the size to be the size of the canvas variables
c.fillRect(0, 0, canvas.width, canvas.height);

// Creating rectangles as enemy's

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    // basically a function within the class that will be fired any time we create an object in this class, using brackets so that we can pass the arguments of the functions as objects letting them being called like and/or, no need to keep track of what comes first
    this.position = position; // this is basically like self in python
    this.velocity = velocity;
    this.height = 150;
  }
  draw() {
    c.fillStyle = "red"; // Filling the rectangle with the color red, and because it is inside draw is gonna select the c object
    c.fillRect(this.position.x, this.position.y, 50, this.height); // Creating a new sprite with fillRect, so... a rectangle. Associated with this.position
  }
  update() {
    // function to incresse what's in it each frame
    this.draw();
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
        this.velocity.y += gravity
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
});

enemy.draw();

console.log(player);

function animate() {
  // infinite loop that keep animating frame by frame
  window.requestAnimationFrame(animate);
  c.fillStyle = "black"; // clearing the canvas from the red enemy draw with black, each frame
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
        player.velocity.x = 1 // moving one pixel for every frame with loop over
        break
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        player.velocity.x = 0 
        break
    }
    console.log(event.key)
})