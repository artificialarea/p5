/* eslint-disable indent */

// conventions : global declarations upfront, 
// then do global assignments in `setup` function

let mrNoisy;                    // noise object
let playButton, stopButton;     // DOM element

function setup() {
    // assign & init p5 sound object
    mrNoisy = new p5.Noise('brown');
    mrNoisy.amp(0.1);

    // assign & init buttons
    playButton = createButton('play');
    playButton.position(10, 10);
    playButton.mousePressed(() => mrNoisy.start());  
    // chained methods variant
    stopButton = createButton('stop').position(60, 10).mousePressed(() => mrNoisy.stop());
}
