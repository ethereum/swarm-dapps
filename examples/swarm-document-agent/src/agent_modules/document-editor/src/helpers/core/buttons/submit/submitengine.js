import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SubmitCommand from './submitcommand';

/**
 * The Submit engine engine feature.
 *
 * It registers the `Submit` command
 *
 * @extends module:core/plugin~Plugin
 */
export default class SubmitEngine extends Plugin {
	init() {
		const editor = this.editor;
		editor.commands.set( 'SubmitDocument', new SubmitCommand( editor ) );
	}
}
