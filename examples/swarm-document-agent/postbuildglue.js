/*******************************
 * [_postbuildglue.js]
 * Some extra glue for the build process AFTER the build process is completed
 ******************************/

console.log('/markdown-newsagent/postbuildglue.js starting....')

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

	// Reader
	fs.createReadStream('./agent_modules/src/markdown-reader/build/dist/build.min.js').pipe(fs.createWriteStream('./agent_modules/dist/libs/markdown-reader/markdownreader.min.js'));
	fs.createReadStream('./agent_modules/src/markdown-reader/build/dist/style.css').pipe(fs.createWriteStream('./agent_modules/dist/libs/markdown-reader/style.css'));
	//fs.createReadStream('./agent_modules/src/markdown-reader/build/dist/appConfiguration.json').pipe(fs.createWriteStream('./appConfiguration.json'));

/*	ncp('./agent_modules/src/markdown-reader/build/dist/repository', './repository', function (err) {
		if (err) {
			console.log(1);
			return console.error(err);
		}
	});*/

	// Editor
	fs.createReadStream('./agent_modules/src/markdown-editor/build/dist/build.min.js').pipe(fs.createWriteStream('./agent_modules/dist/libs/markdown-editor/markdowneditor.min.js'));
	fs.createReadStream('./agent_modules/src/markdown-editor/build/dist/style.css').pipe(fs.createWriteStream('./agent_modules/dist/libs/markdown-editor/style.css'));

	ncp('./agent_modules/src/markdown-editor/build/dist/dependencies', './agent_modules/dist/libs/markdown-editor/dependencies', function (err) {
		if (err) {
			console.log(2);
			return console.error(err);
		}
	});


console.log('/markdown-newsagent/postbuildglue.js done!')
