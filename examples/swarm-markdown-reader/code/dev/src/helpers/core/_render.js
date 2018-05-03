/*******************************
 * [_render.js]
 * Helper function for rendering
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Add }
	 * Support helpers for adding content
	*/
	const add = {

		// Function to change page title to level 1 heading
		renderDocumentTitle : function (renderer, initialTitle) {

			// Set initial title to construct a check so that not each heading overwrites the document title
			let documentTitle = initialTitle;

			renderer.heading = function(text, level) {
				if (level === 1 && documentTitle == 'unnamed') {
					documentTitle = text;
					document.title = text;
				}

				return '<h' + level + '>' + text + '</h' + level + '>\n';
			};
		}
	};

	/**
	 * { Remove }
	 * Support helpers for removing content
	*/
	const remove = {
		// Clear previous content
		clearContent : function () {
			document.getElementById('app__markdownContent').innerHTML = '';
			document.getElementById('app__error').innerHTML = '';

			document.getElementById('app__error').className = 'errorText';
		}
	};

	return {
		add : add,
		remove : remove
	};
 })();


 /**
  * Export
  */
 module.exports = index;
