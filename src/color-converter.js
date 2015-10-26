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

export function hslToRgb(h, s, l) {

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
