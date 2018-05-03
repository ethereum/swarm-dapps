/*******************************
 * [documenteditor.js]
 * The core markdown-editor js file.
 ******************************/

/**
* { Dependencies }
*/
	// Support functions
	import support from './helpers/core/index.js';

	// Vendor functions
			//  Markdown
			import toMarkdown from 'to-markdown';
			import marked from 'marked';

	//CKEDITOR
	import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classic';

		import Enter from '@ckeditor/ckeditor5-enter/src/enter';
		import Typing from '@ckeditor/ckeditor5-typing/src/typing';
		import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
		import Undo from '@ckeditor/ckeditor5-undo/src/undo';
		import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
		import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
		import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
		import Image from '@ckeditor/ckeditor5-image/src/image';
		import List from '@ckeditor/ckeditor5-list/src/list';
		import Link from '@ckeditor/ckeditor5-link/src/link';
		import Headings from '@ckeditor/ckeditor5-heading/src/heading';

		// Custom buttons
		import Submit from './helpers/core/buttons/submit/submit';
		import ToMarkdown from './helpers/core/buttons/tomarkdown/tomarkdown';

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
			/*eslint-disable */
			let postURL, readURL, documentEditor;
			/*eslint-enable */

			//Set up the markdown render options
			const renderer = new marked.Renderer();
			renderer.heading = function(text, level) {
				return `<h${level}>${text}</h${level}>`;
			};

			marked.setOptions({
				renderer : renderer,
				gfm : true,
				tables : true,
				breaks : true,
				pedantic : false,
				sanitize : false,
				smartLists : true,
				smartypants : false
			});

		/**
		 * Grab configuration items
		 * First check to see if we have a configuration file and grab all the variables
		 */
		support.init.conf(function(editorConfigurationObject){

			// If no base readURL was given, look in a fallback directory
			if (!requestedReadURL && editorConfigurationObject.readURL === 'unknown'){
				readURL = '/bzz-raw:/';
			} else if (requestedReadURL) {
				readURL = requestedReadURL;
			} else if (editorConfigurationObject.readURL !== 'unknown') {
				readURL = editorConfigurationObject.readURL;
			}

			// If no base postURL was given, look in a fallback directory
			if (!requestedPostURL && editorConfigurationObject.postURL === 'unknown'){
				postURL = '/bzz-raw:/';
			} else if (requestedPostURL) {
				postURL = requestedPostURL;
			} else if (editorConfigurationObject.postURL !== 'unknown') {
				postURL = editorConfigurationObject.postURL;
			}

			// Set up the editor in the window object so we can access it from our buttons
			if (!window.swarmagent){
				window.swarmagent = {};
			}

			// Configure some storage containers
			window.swarmagent.editor = {};
			window.swarmagent.editor.store = {
				markdownMode : {
					isActive : false
				}
			};

			/**
			 * { Markdown Text Area }
			 * Init the editor on page and set up submit button
			 */
			(function() {
				var textContainer, textareaSize, input;
				var autoSize = function() {
					// also can use textContent or innerText
					textareaSize.innerHTML = input.value + '\n';
				};

				textContainer = document.querySelector('.textarea-container');
				textareaSize = textContainer.querySelector('.textarea-size');
				input = textContainer.querySelector('textarea');

				autoSize();
				input.addEventListener('input', autoSize);
			})();

			/**
			 * { CKEDITOR }
			 * Init the editor on page and set up submit button
			 */
			try {
				ClassicEditor.create(document.querySelector('#ckeditor'), {
					heading : {
						options : [
							{ modelElement : 'paragraph', title : 'Paragraph', class : 'ck-heading_paragraph' },
							{ modelElement : 'heading1', viewElement : 'h1', title : 'Heading 1', class : 'ck-heading_heading1' },
							{ modelElement : 'heading2', viewElement : 'h2', title : 'Heading 2', class : 'ck-heading_heading2' },
							{ modelElement : 'heading3', viewElement : 'h3', title : 'Heading 3', class : 'ck-heading_heading3' }
						]
					},
					plugins : [
							//Autoformat,
							//ArticlePreset,
							Enter,
							Headings,
							Typing,
							Paragraph,
							Undo,
							Bold,
							Italic,
							Image,
							Link,
							List,
							Submit,
							ToMarkdown,
							Clipboard
						],
						toolbar : [
							'headings',
							'bold',
							'italic',
							'link',
							'unlink',
							'bulletedList',
							'numberedList',
							'undo',
							'redo',
							'submit',
							'toMarkdown',
						]
				}).then((editor) => {
					// Make it available to the rest of the app
					window.swarmagent.editor.engine = editor;
					documentEditor = editor;

					// Set a welcome text
					documentEditor.setData('<h2>What would you like to share?</h2>');
				})
				.catch((err) => {
					console.error(err.stack);
				});
			} catch (err) {
				showCompatibilityMessage();
			}

			function showCompatibilityMessage() {
				const editorElement = document.querySelector('#ckeditor');
				const message = document.createElement('p');

				message.innerHTML = `
					<h2>That's a shame...</h2>
					<p>We're not proud of this but this early developer preview does not work in your web browser.</p>
					<p>Please consider using <a href="https://www.google.com/chrome/">Google Chrome</a> instead.</p>
					<p>We're terribly sorry.</p>
				`;

				message.classList.add('message');

				editorElement.parentNode.insertBefore(message, editorElement);
			}

			/**
			 * { submitPost }
			 * Post submition method
			 */
			window.swarmagent.editor.submitPost = (post) => {

				const convertedPost = toMarkdown(post, { gfm : true });

				// Post to a URL & navigate
				support.communicate.post(convertedPost, postURL, (responseText, responseStatus) => {
					// Callback to navigate to URL
					if (responseStatus != 200){
						documentEditor.setData(`Oops! We could not post this document. <br /> Error: <br /> ${responseText}`);

						document.title = 'Post error!';
					} else if (responseStatus == 200) {
						const postedURL = 'index.html#' + responseText;

						window.location.href = postedURL;
					}
				});
			};

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
						 * & verify content type to filter out HTML
						 */
							// Check content type to filter out HTML documents
							// (mind that a 404 always returns an html document so filter)
							const requestContentType = this.getResponseHeader('content-type'),
								contentTypeVerification = support.verify.contentType(requestContentType),
								validContentType = contentTypeVerification.validity;
								//contentValidityError = contentTypeVerification.error;

							if (!validContentType && xhr.status != '404') {
								document.title = 'Document error!';
								documentEditor.setData('Oops! We could not find this document.');

								return;
							}

							/**
							* Check if a document was grabbed or not, handle errors
							*/
							if (xhr.status == '404') {
								document.title = 'Document error!';
								documentEditor.setData('Oops! We could not find this document.');

							} else {
								// Input the document document
								const content = marked(xhr.responseText, { renderer : renderer });
								documentEditor.setData(content);
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

			// Set the fragmentChange function to run each time the window on hash event fires, then run
			window.onhashchange = fragmentRequest;
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
export default index;
