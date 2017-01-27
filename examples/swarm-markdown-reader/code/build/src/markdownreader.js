/*******************************
 * [markdownreader.js]
 * The core markdown-reader js file.
 ******************************/

/**
* { Dependencies }
*/
	// Support functions
	import support from './helpers/core/index.js';

	// Vendor functions
	import marked from './helpers/vendor/marked.js';

/**
* { App }
*/
const index = (function() {

	/**
	* { Init }
	* Init the app
	*/
	const init = (function(requestedBaseURL) {

		/**
		* { Variables }
		*/
		let baseURL;

			/**
			 * Grab configuration items
			 * First check to see if we have a configuration file and grab all the variables
			 */
			support.init.conf(function(readerConfigurationObject){

				// If no baseURL was given, look in a fallback directory
				if (!requestedBaseURL && readerConfigurationObject.baseURL === 'unknown'){
					baseURL = '/bzzr:/';
				} else if (requestedBaseURL) {
					baseURL = requestedBaseURL;
				} else if (readerConfigurationObject.baseURL !== 'unknown') {
					baseURL = readerConfigurationObject.baseURL;
				}

			/**
			 * { catch a fragmentRequest }
			 * On change URL, try to render a document
			 */
			const fragmentRequest = function() {

				if (window.location.hash) {
					const swarmFragment = window.location.hash.substring(1);

					/**
					 * Set up the markdown render options
					 */
					const renderer = new marked.Renderer();

					/**
					 * Grab a document and render it to the container
					 */
					const swarmDocumentPath = baseURL + swarmFragment;

					/*eslint-disable */
					const xhr = new XMLHttpRequest();
					/*eslint-enable */

					xhr.onreadystatechange = function() {

						if (xhr.readyState === 4) {

							/**
							 *
							 * Verify URL to check for illegal characters
							 * Verify content type to filter out HTML
							 */

								// Check URL and render error if necessary
								const urlVerification = support.verify.url(swarmFragment),
									validURL = urlVerification.validity,
									urlValidityError = urlVerification.error;

								if (!validURL) {
									// Clear previous content
									support.render.clearContent();

									// Render an error
									document.getElementById('app__error').innerHTML =
									marked('# Oops! \n\n' + urlValidityError);

									document.title = 'Document error!';

									return;
								}

								// Check content type to filter out HTML documents
								// (mind that a 404 always returns an html document so filter)
								const requestContentType = this.getResponseHeader('content-type'),
									contentTypeVerification = support.verify.contentType(requestContentType),
									validContentType = contentTypeVerification.validity;
									//contentValidityError = contentTypeVerification.error;

								if (!validContentType && xhr.status != '404') {
	/*								// Clear previous content
									support.render.clearContent();

									// Render an error
									document.getElementById('app__error').innerHTML =
									marked('# Oops! \n\n' + contentValidityError);

									document.title = 'Document error!'; */

									return;
								}
							/**
							  * Check if a document was grabbed or not, handle errors
							  */
							if (xhr.status == '404') {
								// Clear previous content
								support.render.clearContent();

								// Render an error
								document.getElementById('app__error').innerHTML =
								marked('# Oops! \n\nWe could not find this file.');

								document.title = 'File not found!';
							} else {
								// Clear previous content
								support.render.clearContent();

								// Render document title with an initial title and search for new title
								support.render.renderDocumentTitle(renderer, 'unnamed');

								// Render the document
								document.getElementById('app__markdownContent').innerHTML =
								marked(xhr.responseText, { renderer : renderer });
							}
						}
					};

					// Send request
					xhr.open('GET', swarmDocumentPath, true);
					xhr.send();
				} else {
					// If no request was made to a file, show the error text on the homepage
					document.getElementById('app__error').className = 'errorText';
					return;
				}
			};

			// Set the fragmentChange function to run each time the window on hash event fires
			window.onhashchange = fragmentRequest;

			// Run the function
			fragmentRequest();
			});

	}());

	return {
		init : init
	};
}());

/**
 * Export
 */
module.exports = index;
