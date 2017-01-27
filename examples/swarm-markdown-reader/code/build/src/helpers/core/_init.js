/*******************************
 * [_init.js]
 * Helper function to run on init
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Conf }
	 * Some initial configuration
	 * Look for a JSON configuration file
	*/
	const conf = function (callback) {
		const configurationFilePath = './readerConfiguration.json';

		let readerConfigurationObject = {
			baseURL : 'unknown'
		};

		/*eslint-disable */
		const xhr = new XMLHttpRequest();
		/*eslint-enable */

		xhr.onreadystatechange = function() {

			if (xhr.readyState === 4) {

				/**
				  * Update readerConfigurationObject if we found the json file
				  */
				if (xhr.status == '404') {
					// Run the application with default values
					callback();
				} else {
					// Found the configuration file, so update our configuration variables
					const grabbedConfiguration = JSON.parse(xhr.responseText);

					if (grabbedConfiguration.configuration.baseURL) {
						readerConfigurationObject.baseURL = grabbedConfiguration.configuration.baseURL;
					}

					callback(readerConfigurationObject);
				}
			}
		};

		// Send request
		xhr.open('GET', configurationFilePath, true);
		xhr.send();
	}

	return {
		conf : conf,
	};
 })();


 /**
* Export
*/
 module.exports = index;
