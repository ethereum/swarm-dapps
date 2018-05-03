/*******************************
 * [index.js]
 * Index file for the app's helpers
 ******************************/

/**
* { Dependencies }
*/
import initHelpers from './_init';
import communicationHelpers from './_communicate';
import verificationHelpers from './_verify';

/**
* { Function }
*/
const index = (function() {

	/**
	 * { Init }
	 * Support helpers to run on init
	 */
	const init = {
		conf : function(callback){
			return initHelpers.conf(callback);
		}
	};

	/**
	 * { Communication }
	 */
	const communicate = {
		post : (postContent, postURL, callback) => {
			return communicationHelpers.post(postContent, postURL, callback);
		}
	};

	/**
	* { Verify }
	* Support helpers for verification
	*/
	const verify = {
		contentType : function(requestContentType){
			return verificationHelpers.contentType(requestContentType);
		}
	};

	return {
		init : init,
		communicate : communicate,
		verify : verify
	};
})();

/**
 * Export
 */
export default index;
