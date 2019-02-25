import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import EncryptEngine from './encryptengine';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import encryptIcon from './encryptIcon.svg';

export default class Encrypt extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ EncryptEngine ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const command = editor.commands.get( 'ToggleEncrypt' );
		//const keystroke = 'CTRL+ENTER';

		// Add a submit button button to feature components.
		editor.ui.componentFactory.add( 'encrypt', ( locale ) => {
			const view = new ButtonView( locale );
			let label = window.swarmagent.editor.store.encrypted ? 'Disable encryption' : 'Enable Encryption';

			let button = {
				label : t( label ),
				icon : encryptIcon,
				//keystroke,
				tooltip : true,
				withText : true
			};

			view.set( button );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( view, 'execute', () => {
				editor.execute( 'ToggleEncrypt' );
				label = window.swarmagent.editor.store.encrypted ? 'Disable encryption' : 'Enable Encryption';
				button.label = label;

				view.set( button );
			} );

			return view;
		} );

		// Set the Ctrl+I keystroke.
		//editor.keystrokes.set( keystroke, 'ToggleEncrypt' );
	}
}
