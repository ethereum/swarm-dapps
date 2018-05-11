import Command from '@ckeditor/ckeditor5-core/src/command/command';

export default class EncryptCommand extends Command {
	_doExecute() {

		// Set variables
		//const editor = this.editor;
		//const post = editor.getData();

		window.swarmagent.editor.store.encrypted = !window.swarmagent.editor.store.encrypted;
	}
}
