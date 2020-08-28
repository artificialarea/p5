/* eslint-disable indent */

let hh, clap, bass;             // INSTRUMENT SOUND. Sound Source Container. Like MrNoisy earlier, will serve as a container that holds a sound source, which we will be able to call methods on to get it to do things like play, etc.
let hPat, cPat, bPat;           // INSTRUMENT PATTERN/SEQUENCE. It will be an array of boolean numbers that we can manipulate to make beats.
let hPhrase, cPhrase, bPhrase;  // INSTRUMENT PHRASE. Defines how the instrument pattern (hPat, etc.) is interpreted.
let drums;                      // PART. We will attach the phrase to the part —— via addPhrase() —— which will serve as our transport to drive the phrase. A p5.Part plays back one or more p5.Phrases.
let bpmCTRL;
let beatLength;
let instrumentsNum;
let cellWidth;
let cellHeight;
let cnv;  // assign Canvas, enabling us to attach eventListener to DOM element.

function preload() { } // [f1]

function setup() {
    cnv = createCanvas(320, 60);
    cnv.mousePressed(canvasPressed); 

    instrumentsNum = 3;
    beatLength = 16;
    cellWidth = width/beatLength;
    cellHeight = height/instrumentsNum;

    // syntax: loadSound(path, [successCallback], [errorCallback], [whileLoading])
    hh = loadSound('./assets/hh_sample.mp3', () => { }); // [f1]
    clap = loadSound('./assets/clap_sample.mp3', () => { });
    bass = loadSound('./assets/bass_sample.mp3', () => { });

    hPat = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    cPat = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    bPat = [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0];

    // syntax: new p5.Phrase(name, callback, sequence)
    hPhrase = new p5.Phrase('hh', (time) => {
        // syntax: play([startTime], [rate], [amp], [cueStart], [duration])
        hh.play(time)
        // console.log(time);
    }, hPat);
    cPhrase = new p5.Phrase('clap', () => { clap.play() }, cPat);
    bPhrase = new p5.Phrase('bass', () => { bass.play() }, bPat);

    drums = new p5.Part();

    drums.addPhrase(hPhrase);
    drums.addPhrase(cPhrase);
    drums.addPhrase(bPhrase);

    bpmCTRL = createSlider(30, 300, 80, 1);
    bpmCTRL.position(17, 110);
    bpmCTRL.input(() => {
        drums.setBPM(bpmCTRL.value())
        // console.log(`bpm: `, drums.getBPM()); // nope. errors?!?
    });
    drums.setBPM('80');

    drawMatrix();
}

function keyPressed() {
    if (key === " ") {  // key: [spacebar]
        if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
            // toggle on/off
            if (!drums.isPlaying) {
                drums.loop();
            } else {
                drums.stop();
            }
        } else {
            console.log('oops, all drums haven\'t loaded yet... please be patient.');
        }
    }
}

function canvasPressed() {
    let rowClicked = floor(instrumentsNum * mouseY / height);
    let indexClicked = floor(beatLength * mouseX / width);
    if (rowClicked === 0) {
        hPat[indexClicked] = invert( hPat[indexClicked] );
    } else if (rowClicked === 1) {
        cPat[indexClicked] = invert( cPat[indexClicked] );
    } else if (rowClicked === 2) {
        bPat[indexClicked] = invert( bPat[indexClicked] );
    }

    function invert(bitInput) {  // [f2]!!!!!!
        return bitInput ? 0 : 1; 
    }
 
    drawMatrix();
}

function drawMatrix() {
    background(80);
    // GRID 
    stroke('grey');
    strokeWeight(2);
    for (let i = 0; i < beatLength + 1; i++) {
        // syntax: line(startx, starty, endx, endy)
        line(i * cellWidth, 0, i * cellWidth, height);
    }
    for (let i = 0; i < instrumentsNum + 1; i++) {
        line(0, i * cellHeight, width, i * cellHeight); 
    }
    // BEATS 
    noStroke();
    for (let i = 0; i < beatLength; i++) {
        if (hPat[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height * 1/6, 10);
        }
        if (cPat[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height * 3/6, 10);
        }
        if (bPat[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height * 5/6, 10);
        }
    }
}


//  To address (Chrome) browser autoplay policy
function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}



// FOOTNOTES /////////////////////////////////

// [f1] preload() function -vs- callback function
// Note that there is a predefined p5 preload() function that can be used to asychronously call elements and -- one those promises have been fullfilled -- will subsequently invoke the setup() and draw() functions. Outside of preload, we can employ a callback function as the second parameter in particular methods when making asychnronous calls... as I did for loadSound() method in setup().

// [f2] conditional boolean syntax
// Checkout: https://youtu.be/hP01m_gX7Uw?t=569
// very very cool demonstration of various conditional boolean syntax approaches!
// like, 
// return +!bitInput 