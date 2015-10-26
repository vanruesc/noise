/**
 * Recursively adds a banner to the specified files.
 */

var prependFile = require("prepend-file");
var pkg = require("./package");

var pkgName = pkg.name.replace(/^@.+\//, "");
var date = (new Date()).toDateString();

var banner = "/**\n * " + pkgName + " v" + pkg.version + " build " + date.slice(4) + "\n" +
	" * " + pkg.homepage + "\n" +
	" * Copyright " + date.slice(-4) + " " + pkg.author.name + ", " + pkg.license + "\n */\n";

function prepend(files) {

	prependFile(files.pop(), banner, function(error) {

		if(error !== null) {

			console.error(error);

		} else if(files.length > 0) {

			prepend(files);

		}

	});

}

prepend([
	"build/" + pkgName + ".js",
	"build/" + pkgName + ".min.js"
]);
