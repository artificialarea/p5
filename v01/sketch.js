
// create new p5 object
let mrNoisy = new p5.Noise();

function setup() {
  createCanvas(400, 400);
  mrNoisy.setType('brown'); // 3 types: white (default), pink, and brown.
  mrNoisy.amp(0.1);
  mrNoisy.start();
}

function draw() {
  background(220);
}