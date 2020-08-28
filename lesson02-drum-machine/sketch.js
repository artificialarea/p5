/* eslint-disable indent */

let hh, clap, bass; // INSTRUMENT SOUND. Sound Source Container. Like MrNoisy earlier, will serve as a container that holds a sound source, which we will be able to call methods on to get it to do things like play, etc.
let hPat, cPat, bPat; // INSTRUMENT PATTERN/SEQUENCE. It will be an array of boolean numbers that we can manipulate to make beats.
let hPhrase, cPhrase, bPhrase; // INSTRUMENT PHRASE. Defines how the instrument pattern (hPat, etc.) is interpreted.
let drums; // PART. We will attach the phrase to the part —— via addPhrase() —— which will serve as our transport to drive the phrase. A p5.Part plays back one or more p5.Phrases.

/* ////////////////
NOTE: Works fine in Firefox, but audio doesn't play in Chrome or Safari, apparently due to: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio 

I thought touchStarted() function to deal with Web Audio API audio context would resolve this, but apparently not. Hmmmm =/ 
//////////////// */

function preload() { } // [f1]

function setup() {
    createCanvas(400, 400);

    // syntax: loadSound(path, [successCallback], [errorCallback], [whileLoading])
    hh = loadSound('./assets/hh_sample.mp3', () => { }); // [f1]
    clap = loadSound('./assets/clap_sample.mp3', () => { });
    bass = loadSound('./assets/bass_sample.mp3', () => { });

    hPat = [1, 1, 1, 1];
    cPat = [0, 0, 0, 0];
    bPat = [1, 0, 0, 0];

    // syntax: new p5.Phrase(name, callback, sequence)
    hPhrase = new p5.Phrase('hh', (time) => {
        // syntax: play([startTime], [rate], [amp], [cueStart], [duration])
        hh.play(time)
        console.log(time);
    }, hPat);
    cPhrase = new p5.Phrase('clap', () => {clap.play()}, cPat);
    bPhrase = new p5.Phrase('bass', () => {bass.play()}, bPat);

    drums = new p5.Part();

    drums.addPhrase(hPhrase);
    drums.addPhrase(cPhrase);
    drums.addPhrase(bPhrase);

    drums.setBPM('60')

}

function keyPressed() {
    if (key === " ") {  // [spacebar]
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


//  To address (Chrome) browser autoplay policy
function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}



// FOOTNOTES /////////////////////////////////

// [f1] preload() function -vs- callback function
// Note that there is a predefined p5 preload() function that can be used to asychronously call elements and -- one those promises have been fullfilled -- will subsequently invoke the setup() and draw() functions. Outside of preload, we can employ a callback function as the second parameter in particular methods when making asychnronous calls... as I did for loadSound() method in setup().