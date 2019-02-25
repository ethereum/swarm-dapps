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
 const index = (function() {

	/**
	 * { contentType }
	 * Verify contentType
	*/
	const contentType = function(requestContentType) {
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
	};

	return {
		contentType : contentType
	};
 })();

/**
* Export
*/
export default index;
