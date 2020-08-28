/* eslint-disable indent */

let hh;         // HIHAT SOUND. Sound Source Container. Like MrNoisy earlier, will serve as a container that holds a sound source, which we will be able to call methods on to get it to do things like play, etc.
let hPat;       // HIHAT PATTERN/SEQUENCE. It will be an array of boolean numbers that we can manipulate to make beats.
let hPhrase;    // HIHAT PHRASE. Defines how the hihat pattern (hPat) is interpreted.
let drums;      // PART. parts and phrases work together. We will attach the phrase to the part —— via addPhrase() -- which will serve as our transport to drive the phrase. A p5.Part plays back one or more p5.Phrases.

/* ////////////////
NOTE: Works fine in Firefox, but audio doesn't play in Chrome or Safari, apparently due to: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio 

I thought touchStarted() function to deal with Web Audio API audio context would resolve this, but apparently not. Hmmmm =/ 
//////////////// */

function preload() {}  // [f1]

function setup() {
    createCanvas(400, 400);

    // syntax: loadSound(path, [successCallback], [errorCallback], [whileLoading])
    hh = loadSound('./assets/hh_sample.mp3', () => {drums.loop()});    // [f1]

    hPat = [1, 0, 1, 0];

    // syntax: new p5.Phrase(name, callback, sequence)
    hPhrase = new p5.Phrase('hh', (time) => {
        hh.play(time);
        console.log(time);
    }, hPat );

    drums = new p5.Part();

    drums.addPhrase(hPhrase);

}

function draw() {}


//  To address (Chrome) browser autoplay policy
function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}



// FOOTNOTES /////////////////////////////////

// [f1] preload() function -vs- callback function
// Note that there is a predefined p5 preload() function that can be used to asychronously call elements and -- one those promises have been fullfilled -- will subsequently invoke the setup() and draw() functions. Outside of preload, we can employ a callback function as the second parameter in particular methods when making asychnronous calls... as I did for loadSound() method in setup().