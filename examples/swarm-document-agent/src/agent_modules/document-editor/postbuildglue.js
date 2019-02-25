/*******************************
 * [_postbuildglue.js]
 * Copy our required files to the dist folder of the main project
 ******************************/

console.log('/document-editor/postbuildglue.js starting....')

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


	fs.createReadStream('./build/bundle.js').pipe(fs.createWriteStream('./../../../dist/agent_modules/document-editor/documenteditor.js'));
	fs.createReadStream('./build/bundle.nomin.js').pipe(fs.createWriteStream('./../../../dist/agent_modules/document-editor/documenteditor.nomin.js'));
	fs.createReadStream('./build/style.css').pipe(fs.createWriteStream('./../../../dist/agent_modules/document-editor/editorstyle.css'));

console.log('/document-editor/postbuildglue.js done!')
