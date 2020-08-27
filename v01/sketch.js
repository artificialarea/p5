/* eslint-disable indent */

// convention: declare first, assign and init later.

// declare...
// noise object
let mrNoisy;      
// DOM elements             
let playButton, stopButton, chooseNoise, setVolume, toggleOnOff;  
let fft;

// assign & init...
function setup() {
    createCanvas(400, 400)

    // p5 sound object
    mrNoisy = new p5.Noise();
    // mrNoisy.setType('brown');
    mrNoisy.amp(0.1);

    // FFT (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
    fft = new p5.FFT();
    
    // controls
    chooseNoise = createSelect();
    chooseNoise.position(90, 30);
    chooseNoise.option('white');
    chooseNoise.option('pink');
    chooseNoise.option('brown');
    chooseNoise.changed(() => {
        mrNoisy.setType(chooseNoise.value());
    });

    setVolume = createSlider(0, 1, 0.1, 0);     // createSlider(min, max, [value], [step])
    setVolume.position(160, 30);
    setVolume.input(() => {
        mrNoisy.amp(setVolume.value(), 0.01);   // amp([vol], [slewTime], [tFromNow])
        // console.log(setVolume.value());
    });

    toggleOnOff = createButton('play');
    toggleOnOff.position(30, 30);
    toggleOnOff.mousePressed(() => {
        if (mrNoisy.started) {
            mrNoisy.stop();
            toggleOnOff.html('play');   // [fn2]
        } else {
            mrNoisy.start();
            toggleOnOff.html('stop');
        }
    });

    // for spectrum points
    stroke(255);
    
}

function draw() {   // draw constantly re-renders at ~60fps 
    background(10);
    let spectrum = fft.analyze();       
    for (let i = 0; i < spectrum.length; i++) {
        // map points relative to the dimensions of the canvas
        point(map(i, 0, spectrum.length, 0, width), map(spectrum[i], 0, 255, height, 0))
        // syntax: point(x, y)
        // syntax: map(value, start1, stop1, start2, stop2, [withinBounds])

        // point(i, spectrum[i]);  // earlier, prior to map [f3]
    }
}

// FOOTNOTES

// [fn1] Instructor Dan was keen at this point to focus on DOM elements (and manipulation) instead of relying on p5 canvas and the draw() function or animate to handle events. DOM elements are far less taxing; they don't need to be redrawn 60 times a second or spamming your audio objects with parameters that you're constantly setting in the draw function

// [fn2] As there appeared to be no property in p5 to change innerHTML text of an element, I was resorting to Vanilla JS function >> function changeText(text) { document.querySelector('button').innerHTML = text; }
// ... but turns out there actually is an `.html()` method in p5. It's not easily found in their documentation, buried as a method within the `p5.Element` base class: https://p5js.org/reference/#/p5.Element

// [f3] Note the x,y position of point() in draw() is relative to canvas element, whereas the position of other elements in setup are absolute to browser window.document.
    

