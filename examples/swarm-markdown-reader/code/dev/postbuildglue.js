/*******************************
 * [_postbuildglue.js]
 * Some extra glue for the build process AFTER the /code/build/ process is called
 ******************************/

console.log('/dev/postbuildglue.js starting....')

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

	// Copy additional files to the build folder
	ncp.limit = 16;

	fs.createReadStream('./build/style.css').pipe(fs.createWriteStream('./../build/dist/style.css'));
	fs.createReadStream('./src/index_prodindex.html').pipe(fs.createWriteStream('./../build/dist/index.html'));
	fs.createReadStream('./readerConfiguration.json').pipe(fs.createWriteStream('./../build/dist/readerConfiguration.json'));

	ncp('./repository/', './../build/dist/repository', function (err) {
		if (err) {
			return console.error(err);
		}
	});

console.log('/dev/postbuildglue.js done!')
