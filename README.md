# Noise
[![Build status](https://travis-ci.org/vanruesc/noise.svg?branch=master)](https://travis-ci.org/vanruesc/noise) 
[![Windows Build status](https://ci.appveyor.com/api/projects/status/XXXXXXXXXXX?svg=true)](https://ci.appveyor.com/project/vanruesc/noise) 
[![GitHub version](https://badge.fury.io/gh/vanruesc%2Fnoise.svg)](http://badge.fury.io/gh/vanruesc%2Fnoise) 
[![Dependencies](https://david-dm.org/vanruesc/noise.svg?branch=master)](https://david-dm.org/vanruesc/noise)

A 2d noise texture generator that implements bilinear smoothing and turbulence.


## Installation

```javascript
npm install --save-dev @zayesh/noise
``` 


## Usage

```sh
# CLI for jpg images:
node bin/noise -w 1920 -h 1080 -p 0 -o myTexture

# The generated file will be stored in the output folder.
```

```sh
  Optional arguments:
    -w      Width, Number.
    -h      Height, Number.
    -p      Pattern, See the docs for more infos.
    -a      Turbulence power, Number.
    -b      Turbulence size, Number.
    -c      Repetition x, Number.
    -d      Repetition y, Number.
    -n, -o  Name of the output file, String.
```

```javascript
import Noise from "@zayesh/noise";

var noise = new Noise(800, 600);

noise.generate();
```


## Examples

![Clouds](http://vanruesc.github.io/noise/clouds.jpg)
![Marble](http://vanruesc.github.io/noise/marble.jpg)
![Wood](http://vanruesc.github.io/noise/wood.jpg)


## Documentation

[API](http://vanruesc.github.io/noise/docs)


## License

Copyright (c) 2015 Raoul van Rüschen  
Licensed under the Zlib license.
