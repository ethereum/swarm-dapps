import Command from '@ckeditor/ckeditor5-core/src/command/command';

export default class SubmitCommand extends Command {
	_doExecute() {

		// Set variables
		const editor = this.editor;
		const post = editor.getData();

		// Send the post call
		window.swarmagent.editor.submitPost(post);
	}
}
