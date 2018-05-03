/*******************************
 * [_prebuildglue.js]
 * Some extra glue for the build process BEFORE the /code/build/ process is called
 ******************************/

console.log('/dev/prebuildglue.js starting....')

/**
* { Dependencies }
*/

	/*eslint no-console:0 */
	'use strict';

	const ncp = require('ncp').ncp;
	const fs = require('fs');

/**
* { FileSyncing }
*/

	// Copy required source files to build folder
	ncp.limit = 16;

	ncp('./src/helpers/', './../build/src/helpers', function (err) {
		if (err) {
			return console.error(err);
		}
	});

	fs.createReadStream('./src/markdownreader.js').pipe(fs.createWriteStream('./../build/src/markdownreader.js'));

console.log('/dev/prebuildglue.js done!')
