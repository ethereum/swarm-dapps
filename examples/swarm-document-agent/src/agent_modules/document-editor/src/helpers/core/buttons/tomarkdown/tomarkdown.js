/*eslint-disable */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToMarkdownEngine from './tomarkdownengine';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import toMarkdownIcon from './markdown.svg';

export default class ToMarkdown extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ToMarkdownEngine ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const command = editor.commands.get( 'ConvertToMarkdown' );
		const keystroke = 'CTRL+ENTER';


		// Add a submit button button to feature components.
		editor.ui.componentFactory.add( 'toMarkdown', ( locale ) => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'ToMarkdown' ),
				icon: toMarkdownIcon,
				keystroke,
				tooltip: true,
				withText : true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute( 'ConvertToMarkdown' ) );

			return view;
		} );

		// Set the Ctrl+I keystroke.
		editor.keystrokes.set( keystroke, 'ConvertToMarkdown' );
	}
}


