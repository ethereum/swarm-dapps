/*******************************
 * [markdowneditor.js]
 * The core markdown-editor js file.
 ******************************/

/**
* { Dependencies }
*/
	// Support functions
	import support from './helpers/core/index.js';

	// Vendor functions
	const toMarkdown = require('to-markdown');
	import marked from './helpers/vendor/marked.js';

/**
* { App }
*/
const index = (function() {

	/**
	* { Init }
	* Init the app
	*/
	const init = (function(requestedPostURL, requestedReadURL) {
		/**
		* { Variables }
		*/
		let postURL, readURL;

			//Set up the markdown render options
			const renderer = new marked.Renderer();

		/**
		 * Grab configuration items
		 * First check to see if we have a configuration file and grab all the variables
		 */
		support.init.conf(function(editorConfigurationObject){

			// If no base readURL was given, look in a fallback directory
			if (!requestedReadURL && editorConfigurationObject.readURL === 'unknown'){
				readURL = '/bzzr:/';
			} else if (requestedReadURL) {
				readURL = requestedReadURL;
			} else if (editorConfigurationObject.readURL !== 'unknown') {
				readURL = editorConfigurationObject.readURL;
			}

			// If no base postURL was given, look in a fallback directory
			if (!requestedPostURL && editorConfigurationObject.postURL === 'unknown'){
				postURL = '/bzzr:/';
			} else if (requestedPostURL) {
				postURL = requestedPostURL;
			} else if (editorConfigurationObject.postURL !== 'unknown') {
				postURL = editorConfigurationObject.postURL;
			}

			//console.log(readURL, postURL);

			/**
			 * { submitPost }
			 * Submit the post
			 */
			const submitPost = (post)=> {
				//console.log('I am posting....');
				//console.log(post);

				// Convert to markdown
				const convertedPost = toMarkdown(post);

				//console.log('Converted post:');
				//console.log(convertedPost);

				// Post to a URL
				support.communicate.post(convertedPost, postURL, (responseText, responseStatus) => {
					// Callback to navigate to URL
						//console.log('responseText:', responseText);
						//console.log('responseStatus:', responseStatus);

					if (responseStatus != 200){
						document.getElementById('markdownEditor').value = 'Oops! We could not post this document. <br /> Error: <br />' + responseText;
						document.title = 'Post error!';
					} else if (responseStatus == 200) {
						const postedURL = 'read.html#' + responseText;

						window.location.href = postedURL;
					}
				});
			};

			/**
			 * { CKEDITOR }
			 * Init the editor on page and set up submit button
			 */
			const editor = window.CKEDITOR.replace('markdownEditor'); // bind editor

			editor.addCommand('postSubmition', { // create named command for post submition
				exec : function() {
					submitPost(window.CKEDITOR.instances.markdownEditor.getData());
				}
			});

			editor.ui.addButton('submitpost', { // add new button and bind our command
				label : 'Submit post',
				command : 'postSubmition',
				toolbar : 'styles'
			});

			/**
			 * { catch a fragmentRequest }
			 * On incoming URL, save the location of the markdown file that you want to edit
			 */
			const fragmentRequest = function() {

				if (window.location.hash) {
					const swarmFragment = window.location.hash.substring(1);

					/**
					 * Grab a document and render it to the container
					 */
					const swarmDocumentPath = readURL + swarmFragment;

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
							// Check content type to filter out HTML documents
							// (mind that a 404 always returns an html document so filter)
							const requestContentType = this.getResponseHeader('content-type'),
								contentTypeVerification = support.verify.contentType(requestContentType),
								validContentType = contentTypeVerification.validity,
								contentValidityError = contentTypeVerification.error;

							if (!validContentType && xhr.status != '404') {
								console.log(contentValidityError);

								document.getElementById('markdownEditor').value = 'Oops! We could not find this document.';
								document.title = 'Document error!';

								return;
							}

							/**
								* Check if a document was grabbed or not, handle errors
								*/
							if (xhr.status == '404') {
								document.getElementById('markdownEditor').value = 'Oops! We could not find this document.';
								document.title = 'Document error!';

							} else {
								// Input the document document
								const content = marked(xhr.responseText, { renderer : renderer });

								document.getElementById('markdownEditor').value = content;
							}
						}
					};

					// Send request
					xhr.open('GET', swarmDocumentPath, true);
					xhr.send();
				} else {
					// No request made
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
