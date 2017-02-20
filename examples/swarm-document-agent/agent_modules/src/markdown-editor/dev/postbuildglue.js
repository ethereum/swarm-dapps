/*******************************
 * [_postbuildglue.js]
 * Some extra glue for the build process AFTER the /markdown-editor/build/ process is done.
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
	//fs.createReadStream('./src/index_prodindex.html').pipe(fs.createWriteStream('./../build/dist/index.html'));
	fs.createReadStream('./appConfiguration.json').pipe(fs.createWriteStream('./../build/dist/appConfiguration.json'));


	ncp('./dependencies/', './../build/dist/dependencies', function (err) {
		if (err) {
			return console.error(err);
		}
	});

console.log('/dev/postbuildglue.js done!')
