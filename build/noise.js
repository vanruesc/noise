/**
 * noise v0.0.1 build Oct 26 2015
 * https://github.com/vanruesc/noise
 * Copyright 2015 Raoul van Rueschen, Zlib
 */
'use strict';

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @method hslToRgb
 * @private
 * @param {Number} h - The hue.
 * @param {Number} s - The saturation.
 * @param {Number} l - The lightness.
 * @return {Array} The RGB representation.
 */

function hslToRgb(h, s, l) {

	var r, g, b, p, q;

	function hue2rgb(p, q, t) {

		var result = p;

		if(t < 0.0) {

			t += 1.0;

		} else if(t > 1.0) {

			t -= 1.0;

		}

		if(t < 1 / 6) {

			result = p + (q - p) * 6.0 * t;

		} else if(t < 0.5) {

			result = q;

		} else if(t < 2 / 3) {

			result = p + (q - p) * (2 / 3 - t) * 6.0;

		}

		return result;

	}

	if(s === 0.0) {

		r = g = b = l; // Achromatic.

	} else {

		q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
		p = 2.0 * l - q;

		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);

	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

}

/**
 * Available noise patterns.
 *
 * @property Pattern
 * @type Object
 * @static
 * @final
 */

var Pattern = Object.freeze({
	CLOUDS: 0,
	MARBLE: 1,
	WOOD: 2
});

/**
 * A Noise Generator.
 *
 * @class Noise
 * @constructor
 * @param {Number} width - The image width.
 * @param {Number} height - The image height.
 */

function Noise(width, height) {

	var x, y;

	/**
	 * The image width.
	 *
	 * @property width
	 * @type Number
	 */

	this.width = (width === undefined) ? 0 : width;

	/**
	 * The image height.
	 *
	 * @property height
	 * @type Number
	 */

	this.height = (height === undefined) ? 0 : height;

	/**
	 * The noise image data.
	 *
	 * @property noise
	 * @type Array
	 * @private
	 * @default null
	 */

	this.noise = [];

	for(x = 0; x < this.width; ++x) {

		this.noise.push(new Float32Array(this.height));

		for(y = 0; y < this.height; ++y) {

			this.noise[x][y] = Math.random();

		}

	}

	/**
	 * The noise image data (RGBA).
	 *
	 * @property imageData
	 * @type Uint8ClampedArray
	 */

	this.imageData = null;

}

/**
 * Smoothes the noise data.
 *
 * @method smooth
 * @private
 * @param {Number} x - X coordinate in noise data.
 * @param {Number} y - Y coordinate in noise data.
 * @return {Number} The smoothed noise value at xy.
 */

Noise.prototype.smooth = function(x, y) {

	// Get fractional part of x and y.
	var fractX = x - (x | 0);
	var fractY = y - (y | 0);

	// Wrap around.
	var x1 = ((x | 0) + this.width) % this.width;
	var y1 = ((y | 0) + this.height) % this.height;

	// Neighbor values.
	var x2 = (x1 + this.width - 1) % this.width;
	var y2 = (y1 + this.height - 1) % this.height;

	// Smooth the noise with bilinear interpolation.
	var value = 0.0;
	value += fractX * fractY * this.noise[x1][y1];
	value += fractX * (1 - fractY) * this.noise[x1][y2];
	value += (1 - fractX) * fractY * this.noise[x2][y1];
	value += (1 - fractX) * (1 - fractY) * this.noise[x2][y2];

	return value;

};

/**
 * Creates turbulences on the noise data.
 *
 * @method turbulence
 * @private
 * @param {Number} x - X coordinate in noise data.
 * @param {Number} y - Y coordinate in noise data.
 * @param {Number} size - Turbulence size.
 * @return {Number} The turbulence noise value for xy.
 */

Noise.prototype.turbulence = function(x, y, size) {

	var value = 0.0, initialSize = size;

	while(size >= 1) {

		value += this.smooth(x / size, y / size) * size;
		size /= 2.0;

	}

	return (value / initialSize);

};

/**
 * Generates noise image data.
 *
 * @method generate
 * @param {Pattern} pattern - The pattern.
 * @param {Number} turbPower - Intensity of the twists. 0 creates a normal sine pattern.
 * @param {Number} turbSize - Initial size of the turbulence.
 * @param {Number} period0 - Repetition of marble lines in x direction. Only relevant for the marble and wood patterns.
 * @param {Number} period1 - Repetition of marble lines in y direction. Only relevant for the marble pattern.
 * @return {Uint8ClampedArray} The generated image data.
 */

Noise.prototype.generate = function(pattern, turbPower, turbSize, period0, period1) {

	var width = this.width;
	var height = this.height;

	var data, x, y, i, w4, lum;
	var value0, value1, dist, sine;
	var color = [0, 0, 0];

	// Defaults.
	if(pattern === undefined) { pattern = Pattern.MARBLE; }
	if(turbPower === undefined) { turbPower = (pattern === Pattern.MARBLE) ? 5.0 : 0.1; }
	if(turbSize === undefined) { turbSize = (pattern === Pattern.CLOUDS) ? 64.0 : 32.0; }
	if(period0 === undefined) { period0 = (pattern === Pattern.MARBLE) ? 5.0 : 12.0; }
	if(period1 === undefined) { period1 = 10.0; }

	//this.imageData = new ImageData(new Uint8ClampedArray(width * height * 4), width, height);
	data = this.imageData = new Uint8ClampedArray(width * height * 4);
	w4 = width * 4;

	for(x = 0; x < width; ++x) {

		for(y = 0; y < height; ++y) {

			switch(pattern) {

				case Pattern.CLOUDS:
					lum = 0.7529 + 0.5 * this.turbulence(x, y, turbSize) / 3.0;
					color = hslToRgb(0.6627, 1.0, lum);
					break;

				case Pattern.MARBLE:
					value0 = x * period0 / height + y * period1 / width + turbPower * 128.0 * this.turbulence(x, y, turbSize) / 256.0;
					sine = (256 * Math.abs(Math.sin(value0 * Math.PI))) | 0;
					color[0] = sine;
					color[1] = sine;
					color[2] = sine;
					break;

				case Pattern.WOOD:
					value0 = (y - height / 2.0) / height;
					value1 = (x - width / 2.0) / width;
					dist = Math.sqrt(value0 * value0 + value1 * value1) + turbPower * 128.0 * this.turbulence(x, y, turbSize) / 256.0;
					sine = (128 * Math.abs(Math.sin(period0 * dist * Math.PI))) | 0;
					color[0] = 80 + sine;
					color[1] = 30 + sine;
					color[2] = 30;
					break;

			}

			i = y * w4 + x * 4;

			data[i] = color[0];
			data[i + 1] = color[1];
			data[i + 2] = color[2];
			data[i + 3] = 255;

		}

	}

/*
	var ctx = document.createElement("canvas").getContext("2d");

	ctx.putImageData(this.data, 0, 0);
	this.texture = new Image();
	this.texture.src = ctx.canvas.toDataURL();

	return this.texture;
*/

	return this.imageData;

};

// Export as a member of Noise.
Noise.Pattern = Pattern;

module.exports = Noise;