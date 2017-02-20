/*******************************
 * [_prebuildglue.js]
 * Some extra glue for the build process BEFORE the /markdown-editor/build/ process is called
 ******************************/

console.log('markdown-editor/dev/prebuildglue.js starting....')

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

	ncp('./src/helpers/', './../build/src/helpers/', function (err) {
		if (err) {
			return console.error(err);
		}
	});

	fs.createReadStream('./src/markdowneditor.js').pipe(fs.createWriteStream('./../build/src/markdowneditor.js'));

console.log('markdown-editor/dev/prebuildglue.js done!')
