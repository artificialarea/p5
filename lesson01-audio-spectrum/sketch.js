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
    createCanvas(400, 200);

    // p5 sound object
    mrNoisy = new p5.Noise();
    // mrNoisy.amp(0);

    // FFT (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.
    fft = new p5.FFT();
    
    // controls
    chooseNoise = createSelect();
    chooseNoise.position(90, 30).style('font-family', 'courier');
    chooseNoise.option('white');
    chooseNoise.option('pink');
    chooseNoise.option('brown');
    chooseNoise.changed(() => {
        mrNoisy.setType(chooseNoise.value());
    });

    // setVolume = createSlider(0, 1, 0.1, 0);  // syntax: createSlider(min, max, [value], [step])
    setVolume = createSlider(-60, 0, -30, 1);   // [f4] 60dB: -60dB -> 0dB
    setVolume.position(160, 30);
    setVolume.input(() => {
        // [f4] convert decibles to amplitude
        // formula: amplitude = 10^(decibles/20) // syntax: pow(base, exponent)
        // pow(10, setVolume.value()/20)    
        if (setVolume.value() > -56) {
            mrNoisy.amp(    // syntax: amp([vol], [slewTime], [tFromNow])
                pow(10, setVolume.value()/20),
                0.01
            );
        } else {    
            // ^^ slightly hacky conditional required 
            // to temper decibles to sound as if at absolute zero 
            // syntax: map(value, start1, stop1, start2, stop2, [withinBounds])
            mrNoisy.amp(map(setVolume.value(), -60, -56, 0, 0.00016), 0.1); 
        }
    });

    mrNoisy.amp(pow(10, setVolume.value()/20), 0.01);

    toggleOnOff = createButton('play');
    toggleOnOff.position(30, 30);
    toggleOnOff.mousePressed(() => {
        if (mrNoisy.started) {
            mrNoisy.stop();
            toggleOnOff.html('play');   // [f2]
        } else {
            mrNoisy.start();
            toggleOnOff.html('stop');
        }
    });

    // for spectrum points
    stroke(255);
    
}

function draw() {   // draw constantly re-renders at ~60fps 
    background(80);
    let spectrum = fft.analyze();       
    for (let i = 0; i < spectrum.length; i++) {
        // map points relative to the dimensions of the canvas
        // syntax: point(x, y)
        point(map(log(i), 0, log(spectrum.length), 0, width), map(spectrum[i], 0, 255, height, 0))    // [f4]
        // syntax: map(value, start1, stop1, start2, stop2, [withinBounds])

        // point(i, spectrum[i]);  // earlier, prior to map [f3]
    }
}

// FOOTNOTES

// [f1] Instructor Dan Tramte was keen at this point to focus on DOM elements (and manipulation) instead of relying on p5 canvas and the draw() function or animate to handle events. DOM elements are far less taxing; they don't need to be redrawn 60 times a second or spamming your audio objects with parameters that you're constantly setting in the draw function

// [f2] As there appeared to be no property in p5 to change innerHTML text of an element, I was resorting to Vanilla JS function >> function changeText(text) { document.querySelector('button').innerHTML = text; }
// ... but turns out there actually is an `.html()` method in p5. It's not easily found in their documentation, buried as a method within the `p5.Element` base class: https://p5js.org/reference/#/p5.Element

// [f3] Note the x,y position of point() in draw() is relative to canvas element, whereas the position of other elements in setup are absolute to browser window.document.
    
// [f4] Compensating for Logarithmic Hearing. https://youtu.be/GLOZMmT5Oz4 
// Concerning the human perception of sound, the ear and the brain interprets loudness not on the linear intensity scale, but on a logarithmic scale in units of decibles. So need to choose a range of decibles for our dynamic range slider. Decided somewhat arbitrarily on 60 dB, so the range of the slider is from -60bB -> 0dB. Afterward we then compute decibles back into amplitude. 
// [f5] Also have to do similiar accomodations for frequency (scale sounds)

