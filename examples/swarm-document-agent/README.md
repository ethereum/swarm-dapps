# Swarm-document-agent

## Documentation

### Outline ###

In order to merge the libraries into one big project and keep their build environments and resulting javascript packages seperate, the build/development environments for each library are also separated.

Here's an overview of the project as a whole and a quick summary of the two modules and how they relate to one another.

*Reader*
* Application captures ``/#filename.md`` routes in the URL and navigates to the file. It knows a preconfigured URL-prefix to get the correct path.
* Different 'fragments' or files can link to one another.
* App does error handling for illegal characters, filters out HTML documents (this caused an issue whereby the page itself was loaded and rendered the doctype to the page) also handles error when file cannot be found.

*Editor*
* User clicks "edit" in markdown reader when a fragment is active. The page then moves to edit.html#*fragment*.
* The editor captures the fragment string, asks the swarm for the markdown file.
* For CKEDITOR to read it, it needs to be converted to HTML. Which it does. At that point it pops it onto the page in the CKEDITOR text field, and you can edit it as you want.
* At the end, user can click submit and it will post a converted markdown file to the swarm. Once done, it receives back a string that represents the location of the new markdown file in the swarm and the application navigates to that location.

**For additional documentation, please see the respective folders of the modules!**

<br />

### Files ####
* Source files in ``/src/agent_modules/``
* Built, ready to go optimised files for production in ``/dist/``
* While the src folders of the modules also contain the HTML files, use the HTML files in this root folder here as the ones in the src are only for testing the individual modules.

<br />

### Runtime requirements ###

<br />

None beyond a webserver.

<br />

### How do I run this? ###
Get the Javascript, HMTL, JSON configuration, and CSS files from their respective folders.
Run the HTML through a web server.

index.html and edit.html in ``/dist/`` are configured to look for the libraries, extra styles and such in ``/dist/agent_modules/*libraryname*``

<br />

### Building ####
* The very first time run ``npm run install-all`` in this folder to get dependencies installed
* Simply run ``npm run build`` in this folder  to run the build process of both submodules and copy the necessary files over to ``/agent_modules/dist/*libraryname*``. It will be compiled to ``/agent_modules/dist/*libraryname*``. Which is where the html also looks for the libraries. For building just the reader, run ``npm run build-reader``. For just the editor: ``npm run build-editor``.
* You could also still compile from the sub modules if you want to, see their respective documentation. Note that the compiled will NOT be copied to ``/dist/agent_modules/*libraryname*`` if compiling from inside each sub project.
