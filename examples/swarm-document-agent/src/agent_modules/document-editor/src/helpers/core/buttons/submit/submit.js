import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SubmitEngine from './submitengine';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import submitIcon from './submit.svg';

export default class Submit extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ SubmitEngine ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const command = editor.commands.get( 'SubmitDocument' );
		const keystroke = 'CTRL+ENTER';

		// Add a submit button button to feature components.
		editor.ui.componentFactory.add( 'submit', ( locale ) => {
			const view = new ButtonView( locale );

			view.set( {
				label : t( 'Submit' ),
				icon : submitIcon,
				keystroke,
				tooltip : true,
				withText : true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute( 'SubmitDocument' ) );

			return view;
		} );

		// Set the Ctrl+I keystroke.
		editor.keystrokes.set( keystroke, 'SubmitDocument' );
	}
}
