# Web Audio API 101

practice...

## Browser Noise Tutorial: Web Audio API with p5.js + tone.js

src: [YouTube Playlist](https://www.youtube.com/watch?v=mmluIbsmvoY&list=PLLgJJsrdwhPywJe2TmMzYNKHdIZ3PASbr)

<br />

### p5.js
Uses **[p5.js](https://p5js.org/)** javascript library. Further info below.

p5.js is an interpretation of [Processing](https://processing.org/) for the web: "... for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! p5.js is free and open-source because we believe software, and the tools to learn it, should be accessible to everyone." Created by [Lauren Lee McCarthy](https://lauren-mccarthy.com/Info). Very cool community. Perhaps I'll be able to contribute to the open source someday ( ._.)

Ref:
* https://github.com/processing/p5.js
* https://github.com/processing/p5.js/wiki/p5.js-overview
* https://github.com/processing/p5.js/tree/main/contributor_docs
* https://p5js.org/reference/#/libraries/p5.sound
* https://github.com/processing/p5.js-sound

* https://p5js.org/learn/
    * https://github.com/processing/p5.js/wiki/p5.js,-node.js,-socket.io


<br />

### Tone.js

* https://tonejs.github.io/
* https://tonejs.github.io/docs
* https://github.com/Tonejs/Tone.js



<br />

# Personal Notes...

### Overview
src: https://github.com/processing/p5.js/wiki/p5.js-overview
There are two main functions you will use in your program. The `setup()` block runs once, and is typically used for initialization, or for creating a program that does not need a loop running code repeatedly. The `draw()` block runs repeatedly, and is used for animation.










<br />

<br />

_via https://p5js.org/download/_

# Welcome to p5.js

You have downloaded the complete p5.js library ZIP file, yay!

# Contents of the p5 folder

* p5.js file
* p5.min.js file
* addons folder
  * p5.sound.js
  * p5.sound.min.js
* empty-example folder
  * index.html
  * p5.js
  * p5.sound.js
  * sketch.js

## p5.js

This file stores the complete p5.js library. It is easy to read by humans, so feel free to open it and explore its contents. It also has a friendly error system, which helps new programmers with common user errors.

## p5.min.js

This file is a minified version of the p5.js file. It is a lighter version, with the same functionalities, but smaller file size. This minified version is harder to read for humans, and does not include the friendly error system.

## addons folder

The addons folder includes additional p5.js related libraries, in both original versions and minified versions.

### p5.sound.js, p5.sound.min.js

p5.sound extends p5.js with Web Audio functionality including audio input, playback, analysis, and synthesis.

## empty-example folder

This is an empty example of a website. The folder includes the file for the website, index.html, the p5.js library, other related p5.js libraries, and a template starting point for your p5.js sketch, called sketch.js.

### index.html

index.html is a template for an HTML file. This index.html first imports the libraries included in the folder (p5.js, p5.sound.js) then loads and executes the file sketch.js which is where you can write your own code.

### sketch.js

The sketch.js is a template for the p5.js sketch, with the functions setup() and draw() that you can complete.

## README.txt

This README file formatted with Markdown :)

# What's next?

If you need more information to help get you started, please refer to our website:  
https://p5js.org/get-started/ and https://p5js.org/learn/

An online reference to the p5.js library is available here:  
https://p5js.org/reference/

In order to run your website (including the empty-example), you need to enable a local server, please see this tutorial in our wiki:  
https://github.com/processing/p5.js/wiki/Local-server

p5.js is a community and p5.js is built by contributions. If you want to learn more about us, visit:  
https://p5js.org/community/

# License

The p5.js library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, version 2.1.
