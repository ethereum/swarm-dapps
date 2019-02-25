/*******************************
 * [_communicate.js]
 * Helper function for communication
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function() {

	/**
	 * { Post }
	 * Post items
	*/
	const post = function(postContent, postURL, callback) {

		/*eslint-disable */
		const xhr = new XMLHttpRequest();
		/*eslint-enable */

		xhr.open('POST', postURL, true);

		//Send the proper header information along with the request
		//xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');

		xhr.onreadystatechange = function() {//Call a function when the state changes.
			if (xhr.readyState == 4) {
				callback(xhr.responseText, xhr.status);
			} else {
				return;
			}
		};

		xhr.send(postContent);

	};

	return {
		post : post,
	};
 })();

 /**
* Export
*/
export default index;
