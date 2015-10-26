# Noise
[![Build status](https://travis-ci.org/vanruesc/noise.svg?branch=master)](https://travis-ci.org/vanruesc/noise) 
[![Windows build status](https://ci.appveyor.com/api/projects/status/1vnesrjt9xcvs9y2?svg=true)](https://ci.appveyor.com/project/vanruesc/noise) 
[![GitHub version](https://badge.fury.io/gh/vanruesc%2Fnoise.svg)](http://badge.fury.io/gh/vanruesc%2Fnoise) 
[![npm version](https://badge.fury.io/js/%40zayesh%2Fnoise.svg)](http://badge.fury.io/js/%40zayesh%2Fnoise) 
[![Dependencies](https://david-dm.org/vanruesc/noise.svg?branch=master)](https://david-dm.org/vanruesc/noise)

A 2D noise texture generator that implements bilinear smoothing and turbulence.


## Installation

This module can be installed from [npm](https://www.npmjs.com).

```sh
$ npm install @zayesh/noise
``` 


## Usage

```javascript
import Noise from "@zayesh/noise";

var noise = new Noise(800, 600);
var data = noise.generate();
```

```sh
# CLI when used in an npm script.
noise -w 1920 -h 1080 -p 0 -o myTexture

# The generated file will be stored in the output folder.
```

```sh
  Optional arguments:
    -w      Width, Number.
    -h      Height, Number.
    -p      Pattern, Number (0, 1, 2).
    -a      Turbulence power, Number.
    -b      Turbulence size, Number.
    -c      Repetition x, Number.
    -d      Repetition y, Number.
    -n, -o  Name of the output file, String.
```


## Examples

![Clouds](http://vanruesc.github.io/noise/output/clouds.jpg)
![Marble](http://vanruesc.github.io/noise/output/marble.jpg)
![Wood](http://vanruesc.github.io/noise/output/wood.jpg)


## Documentation

[API](http://vanruesc.github.io/noise/docs)


## License

Copyright (c) 2015 Raoul van Rüschen  
Licensed under the Zlib license.
