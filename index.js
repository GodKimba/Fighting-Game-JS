const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas size
canvas.width = 1024;
canvas.height = 576;

// Calling Canvas and setting the x(0) and y(0) as to where to start the canvas 'draw' and setting the size to be the size of the canvas variables
c.fillRect(0, 0, canvas.width, canvas.height);