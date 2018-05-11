import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import EncryptCommand from './encryptcommand';

/**
 * The Submit engine engine feature.
 *
 * It registers the `Submit` command
 *
 * @extends module:core/plugin~Plugin
 */
export default class EncryptEngine extends Plugin {
	init() {
		const editor = this.editor;
		editor.commands.set( 'ToggleEncrypt', new EncryptCommand( editor ) );
	}
}
