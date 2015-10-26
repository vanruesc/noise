#! /usr/bin/env node

var fs = require("fs");
var jpeg = require("jpeg-js");
var argv = require("minimist")(process.argv.slice(2));
var Noise = require("../build/noise");

var noise = new Noise(argv.w, argv.h);

var name = argv.n ? argv.n : argv.o ? argv.o : "noise";
var data = noise.generate(argv.p, argv.a, argv.b, argv.c, argv.d);

var image = {
	data: data,
	width: noise.width,
	height: noise.height
};

if(data !== null) {

	// Encode the data and save the image.
	fs.writeFileSync("output/" + name + ".jpg", jpeg.encode(image, 90).data);
	console.log("Noise texture generated");

}
