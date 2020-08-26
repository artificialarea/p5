/* eslint-disable indent */

// convention: declare first, assign and init later.

// declare...
// noise object
let mrNoisy;      
// DOM element              
let playButton, stopButton, chooseNoise, setVolume, toggleOnOff;    

// assign & init...
function setup() {

    // p5 sound object
    mrNoisy = new p5.Noise();
    mrNoisy.setType('brown');
    mrNoisy.amp(0.1);
    
    // controls
    chooseNoise = createSelect();
    chooseNoise.position(70, 10);
    chooseNoise.option('brown');
    chooseNoise.option('pink');
    chooseNoise.option('white');
    chooseNoise.selected('brown');
    chooseNoise.changed(() => {
        mrNoisy.setType(chooseNoise.value());
    });

    setVolume = createSlider(0, 1, 0.1, 0);     // createSlider(min, max, [value], [step])
    setVolume.position(140, 10);
    setVolume.input(() => {
        mrNoisy.amp(setVolume.value(), 0.01);   // amp([vol], [slewTime], [tFromNow])
        // console.log(setVolume.value());
    });

    toggleOnOff = createButton('play');
    toggleOnOff.position(10, 10);
    toggleOnOff.mousePressed(() => {
        if (mrNoisy.started) {
            mrNoisy.stop();
            toggleOnOff.html('play');   // [fn2]
        } else {
            mrNoisy.start();
            toggleOnOff.html('stop');
        }
    });

    
}

// FOOTNOTES

// [fn1] instructor Dan was keen at this point to focus on DOM elements (and manipulation) instead of relying on p5 canvas and the draw() function or animate to handle events. DOM elements are far less taxing; they don't need to be redrawn 60 times a second or spamming your audio objects with parameters that you're constantly setting in the draw function

// [fn2] as there appeared to be no property in p5 to change innerHTML text of an element, I was resorting to Vanilla JS function >> function changeText(text) { document.querySelector('button').innerHTML = text; }
// ... but turns out there actually is an `.html()` method in p5. It's not easily found in their documentation, buried as a method within the `p5.Element` base class: https://p5js.org/reference/#/p5.Element
    

