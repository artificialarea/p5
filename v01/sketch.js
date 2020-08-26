/* eslint-disable indent */

// convention: declare first, assign and init later.

// declare...
// noise object
let mrNoisy;      
// DOM element              
let playButton, stopButton, chooseNoise, setVolume;    

// assign & init...
function setup() {

    // p5 sound object
    mrNoisy = new p5.Noise();
    mrNoisy.amp(0.1);
    
    // controls
    chooseNoise = createSelect();
    chooseNoise.position(60, 10);
    chooseNoise.option('white');
    chooseNoise.option('pink');
    chooseNoise.option('brown');
    chooseNoise.changed(() => {
        mrNoisy.setType(chooseNoise.value());
    });

    setVolume = createSlider(0, 1, 0.1, 0);     // createSlider(min, max, [value], [step])
    setVolume.position(130, 10);
    setVolume.input(() => {
        mrNoisy.amp(setVolume.value(), 0.01);   // amp([vol], [slewTime], [tFromNow])
        // console.log(setVolume.value());
    });

    playButton = createButton('play');
    playButton.position(10, 10);
    playButton.mousePressed(() => mrNoisy.start());  
    // note: chained methods variant
    stopButton = createButton('stop').position(10, 40).mousePressed(() => mrNoisy.stop());
}

// my intial attempt used default draw function
// before learning .input() event listener method (above)
// function draw() {
//     mrNoisy.amp(setVolume.value() / 100);   // amplitude between 0 and 1.0
// }
