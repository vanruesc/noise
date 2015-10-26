var assert = require("assert"),
	Noise = require("../build/noise");

describe("Noise", function() {

	describe("Sanity checks", function() {

		it("is a constructor function", function() {

			assert.equal(typeof Noise, "function");

		});

		it("can be used to create objects", function() {

			var noise = new Noise();
			assert.equal(typeof noise, "object");

		});

	});

	describe("Functionality", function() {

		var noise;

		before(function() {

			noise = new Noise(1, 1);

		});

		it("should generate image data without errors", function() {

			var data = noise.generate();

			assert(data !== null);
			assert(data.length === 4);

		});

	});

});
