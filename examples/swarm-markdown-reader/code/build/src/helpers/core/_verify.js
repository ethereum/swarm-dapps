/*******************************
 * [_verify.js]
 * Helper function for verification
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { URL }
	 * Verify the fragment URL
	*/
	const url = function (fragmentURL) {
		let urlVerification = {
			validity : false,
			error : 'You should never be seeing this error, please inform us'
		};

		// Verify the number of dots in the URL
/*		const numberOfDotsInFragmentURL = (fragmentURL.match(/\./g) || []).length;

		if (numberOfDotsInFragmentURL < 1) {
			urlVerification.error = 'No dot found in your file request URL. \n\n (Valid example: book1.md, your request: ' + fragmentURL +')';
			return urlVerification;
		} else if (numberOfDotsInFragmentURL > 1) {
			urlVerification.error = 'Multiple dots found in your file request URL. \n\n (Valid example: book1.md, your request: ' + fragmentURL +')';
			return urlVerification;
		}*/

		// Verify a file extention of "md" has been given
/*		if (fragmentURL.indexOf('.md') == -1) {
			urlVerification.error = 'You gave an incorrect file extention. \n\n (Valid example: book1.md, your request: ' + fragmentURL +')';
			return urlVerification;
		}

		if ((fragmentURL.charAt(fragmentURL.indexOf('.md') + 3) != '')){
			urlVerification.error = 'You gave an incorrect file extention. \n\n (Valid example: book1.md, your request: ' + fragmentURL +')';
			return urlVerification;
		}
*/
		// Test for illegal characters
/*		if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":,<>\?]/g.test(fragmentURL)) {
			urlVerification.error = 'Illegal characters in your file request URL. \n\n (Valid example: book1.md, your request: ' + fragmentURL +')';
			return urlVerification;
		}*/

		// All cleared, return result
		urlVerification.validity = true;

		return urlVerification;
	}

		/**
		 * { contentType }
		 * Verify contentType
		*/
		const contentType = function (requestContentType) {
			let contentTypeVerification = {
				validity : false,
				error : 'You should never be seeing this error, please inform us'
			};

			// Test for HTML content types
			if (requestContentType.indexOf('text/html') != -1) {
				contentTypeVerification.error = 'Oops, you tried to load an HTML document';
				return contentTypeVerification;
			}

			// All cleared, return result
			contentTypeVerification.validity = true;
			return contentTypeVerification;
		}

	return {
		url : url,
		contentType : contentType
	};
 })();


/**
* Export
*/
 module.exports = index;
