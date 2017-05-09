/**
 * { ToMarkdownCommand }
 * Converts the post into markdown for the viewer
 */
import Command from '@ckeditor/ckeditor5-core/src/command/command';
import toMarkdown from 'to-markdown';
import marked from 'marked';

// Disable editing buttons
function disableCallback( evt, data ) {
	data.isEnabled = false;
	evt.stop();
}

// Command class
export default class ToMarkdownCommand extends Command {

	_doExecute() {

		/**
		 * { Variables & config }
		 */
		// Editor
			//const editor = this.editor;
			const editor = window.swarmagent.editor.engine;
			const post = editor.getData();
			const store = window.swarmagent.editor.store;

		// Marked
		const renderer = new marked.Renderer();
		renderer.heading = function(text, level) {
			return `<h${level}>${text}</h${level}>`;
		};

		marked.setOptions({
			renderer : renderer,
			gfm : true,
			tables : true,
			breaks : true,
			pedantic : false,
			sanitize : false,
			smartLists : true,
			smartypants : false
		});

		marked.Lexer.prototype.lex = function(src) {
			src = src
				.replace(/\r\n|\r/g, '\n')
				.replace(/\t/g, '    ')
				.replace(/\u2424/g, '\n');

			return this.token(src, true);
		};

/*		lexer = new marked.Lexer(options);

		lexer.rules.heading = { exec: function() {} };

		marked.Lexer.prototype.lex = (src) => {
			src = src
				.replace(/\r\n|\r/g, '\n')
				.replace(/\t/g, '    ')
				.replace(/\u2424/g, '\n');

			return this.token(src, true);
		};*/

			//const editorEngine = window.swarmagent.editor.engine;
			//const post = editorEngine.getData();

		/**
		 * { Update the UI }
		 * Disable editing buttons
		 */
		// Do not disable these
		// This is currently not used as CKEDITOR does not allow Markdown conversion properly as it is not a textfield and we need to use this to fix an issue with linebreaks
		const exclusionArray = [
			//'DeleteCommand',
			//'UndoCommand',
			//'RedoCommand',
			//'InputCommand',
			//'EnterCommand',
			//'Submit'
		];

		if (!store.markdownMode.isActive){
			editor.commands.forEach( ( command ) => {
				if (exclusionArray.indexOf(command.constructor.name) == -1 && command != this){
					command.on( 'refreshState', disableCallback );
					command.refreshState();
				}
			} );

			// Update on screen
				//editor.setData(toMarkdown(post));
				const ckeditorContentElement = document.getElementsByClassName('ck-editor__main')[0];
				const markdownFieldElement = document.getElementById('markdownField');

/*				console.log('post');
				console.log(post);
				console.log('toMarkdown(post)');
				console.log(toMarkdown(post));*/

				markdownFieldElement.value = toMarkdown(post, { gfm : true });
				ckeditorContentElement.style.display = 'none';
				markdownFieldElement.style.display = 'block';

				// Send an event so that the text field can capture the input and grow
				/*eslint-disable */
				const event = new Event('input', {
				    'bubbles': true,
				    'cancelable': true
				});

				markdownFieldElement.dispatchEvent(event);
				store.markdownMode.isActive = true;

				/*eslint-enable */

		} else if (store.markdownMode.isActive) {
			editor.commands.forEach( ( command ) => {
				if (exclusionArray.indexOf(command.constructor.name) == -1 && command != this){
					command.off( 'refreshState', disableCallback );
					command.refreshState();
				}
			} );

			const ckeditorContentElement = document.getElementsByClassName('ck-editor__main')[0];
			const markdownFieldElement = document.getElementById('markdownField');
			const editedMarkdown = markdownFieldElement.value;

			ckeditorContentElement.style.display = 'block';
			markdownFieldElement.style.display = 'none';

/*			console.log('editedMarkdown');
			console.log(editedMarkdown);
			console.log('marked(editedMarkdown)');
			console.log(marked(editedMarkdown));*/

			editor.setData(marked(editedMarkdown));
			//editor.setData(marked.parser(lexer.lex(editedMarkdown)), options);

			store.markdownMode.isActive = false;
		}
	}
}
