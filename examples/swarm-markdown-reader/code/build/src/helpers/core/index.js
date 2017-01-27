/*******************************
 * [index.js]
 * Index file for the app's helpers
 ******************************/

/**
* { Dependencies }
*/
import initHelpers from './_init';
import renderHelpers from './_render';
import verificationHelpers from './_verify';

/**
* { Function }
*/
const index = (function () {

			/**
			 * { Init }
			 * Support helpers to run on init
			 */
			 const init = {
			 	conf : function (callback){
			 		return initHelpers.conf(callback);
			 	}
			 };

			/**
			* { Render }
			* Support helpers for rendering
			*/
			const render = {
				renderDocumentTitle : function (renderer, initialTitle){
					return renderHelpers.add.renderDocumentTitle(renderer, initialTitle);
				},

				clearContent : function (){
					return renderHelpers.remove.clearContent();
				}
			};

			/**
			* { Verify }
			* Support helpers for verification
			*/
			const verify = {
				url : function (requestURL){
					return verificationHelpers.url(requestURL);
				},

				contentType : function (requestContentType){
					return verificationHelpers.contentType(requestContentType);
				}
			};

			return {
				init : init,
				render : render,
				verify : verify
			};
})();


/**
 * Export
 */
module.exports = index;
