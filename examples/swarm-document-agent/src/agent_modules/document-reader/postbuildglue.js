/*******************************
 * [_postbuildglue.js]
 * Copy our required files to the dist folder of the main project
 ******************************/

console.log('/document-reader/postbuildglue.js starting....')

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

	// Copy additional files to the dist folder
	ncp.limit = 16;


	fs.createReadStream('./build/bundle.js').pipe(fs.createWriteStream('./../../../dist/agent_modules/document-reader/documentreader.js'));
	fs.createReadStream('./build/bundle.nomin.js').pipe(fs.createWriteStream('./../../../dist/agent_modules/document-reader/documentreader.nomin.js'));
	fs.createReadStream('./build/style.css').pipe(fs.createWriteStream('./../../../dist/agent_modules/document-reader/readerstyle.css'));

console.log('/document-reader/postbuildglue.js done!')
