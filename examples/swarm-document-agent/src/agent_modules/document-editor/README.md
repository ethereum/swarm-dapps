# Swarm-document-editor

## Documentation

### Outline ###
* User clicks "edit" in document-reader when a fragment is active. The page then moves to edit.html#*fragment*.
* The editor captures the fragment string, asks the swarm for the markdown file.
* For CKEDITOR to read it, it needs to be converted to HTML. Which it does. At that point it pops it onto the page in the CKEDITOR text field, and you can edit it as you want. 
* At the end, user can click submit and it will post a converted markdown file to the swarm. Once done, it receives back a string that represents the location of the new markdown file in the swarm and the application navigates to that location.

<br />

### Files ####
* Source files in /src/
* Built, ready to go files in /dist/

<br />

Note that the built file *includes* the marked libary already inside, and has this minified within it in the minified version. This means the bundle is stand-alone and optimsed.

<br />

### Development requirements ###
* NodeJS/NPM. I used these as the foundation for my own development so I had modern tools and a web server to troubleshoot but you do not need them to run the application.

<br />

### Runtime requirements ###
<br />

None beyond a webserver. The built library is located in ``/build``

<br />

### How do I run this? ###
I suggest building from the project root folder 3 folders back up the directory and getting what you need from the dist folder (./../../../dist). Run it through a web server.

<br />

**Notes**:
<br />
1. If you want to change the URL to fetch data from, or to fetch post to (the address the markdown is posted to), you can do so through ``appConfiguration.json`` in ``/build/dist``. This JSON file can also be easily extended in the future if more variables are to be introduced. If the configuration file is not present, the app has a built in fallback to ``/bzzr:/``
2. In case you want to extend this app further in the future as a module of a larger framework, you can use the development set-up to import/require the markdoweditor.js file in source and initiate the app as follows:

<br />

``documentEditor.init(UrlForPosting, UrlForFetching)``

<br />
<br />

The argument it takes is a URL that represents the location of the files in the Swarm to read them, and a URL to post to. If the user does not call this, it has a default fallback included.

3. The development/build environment used to here is a webpack dev server on top of Node.JS to run the Javascript. Webpack compresses, validates (lints) and optimises the files, among other things. This environment has been set up to make development easy, quick and extendible future updates. The inclusion of webpack means development can rely on individual Javascript 'modules' to keep the structure of the application clear.
4. The project brief mentioned styling in the future will be done through CSS sheets. I have used this approach already to colour the error texts in red and have layed out a structure for the stylesheets.

<br />

### Development HowTo ##
* Check requirements above
* For testing and developing: execute ``npm install`` with NodeJS from within the this directory, then ``npm start`` afterwards. Point your browser to localhost:8080.
* To build the application from source: execute ``npm run build`` from within this folder. Find your files in ``/build/``.

<br />

### Notes ###
