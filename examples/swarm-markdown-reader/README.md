# Ethereum markdown reader

## Documentation

### Outline ###

Đapp expects swarm hash of the raw markdown file in the fragment part of 
the URL (after #). Linking to other documents can be done with 
fragment-only links.


### Files ####
* Source files in /code/dev/src/
* Built, ready to go files in /code/build/dist/

<br />
Note that the built file *includes* the marked libary already inside, and has this minified within it in the minified version. This means the bundle is stand-alone and optimsed.

<br />
### Development requirements ###
* NodeJS/NPM. These are the foundation for development, but you do not need them to run the application.

<br />
### Runtime requirements ###
<br />
The built file is located in ``/code/dist/dist`` and includes:
- Javascript files (+maps). 1 minified, one non-minified.
- HTML document
- CSS stylesheet

<br />
### How do I run this? ###
Get the Javascript, HMTL, JSON configuration, and CSS file from ``/code/build/dist/``. Run the HTML through a web server.
<br />

**Notes**:
<br />
1. If you want to change the baseURL, you can do so through ``readerConfiguration.json`` in ``/code/build/dist``. This JSON file can also be easily extended in the future if more variables are to be introduced. If the configuration file is not present, the app has a built in fallback to ``/bzzr:/``
2. The index.html file also includes an extra error condition (users browsing to the app location and not a fragment).
3. In case you want to extend this app further in the future as a module of a larger framework, you can use the development set-up to import/require the markdownreader.js file in source and initiate the app as follows:
<br />
``markdownReader.init('./repository/md/')``
<br />
<br />
The argument it takes is the baseURL for the location of the files. If the user does not call this, it has a default fallback included. See "entry.js" in *src* to see how I initiated it (uncomment the markdownReader.init line).

<br />
### In-app Testing ###
* Test suite available in code/dev/repository/md/testsuite.md (+other .md files). I have included tests and warnings for various issues (illegal characters, missing files).

<br />

<br />
### Development HowTo ##
* Check requirements above
* For testing and developing: execute ``npm install`` with NodeJS from within the /code/dev/directory, then ``npm start`` afterwards. Point your browser to localhost:8080.
* To build the application from source: execute ``npm run build`` from within /code/dev/. Find your files in /code/build/dist (/code/dev/build/ also offers a built package but this is less optimised).

<br />
### Notes ###
* The development/build environment used to here is a webpack dev server on top of Node.JS to run the Javascript. Webpack compresses, validates (lints) and optimises the files, among other things. This environment has been set up to make development easy, quick and extendible future updates. The inclusion of webpack means development can rely on individual Javascript 'modules' to keep the structure of the application clear.
* The project brief mentioned styling in the future will be done through CSS sheets. I have used this approach already to colour the error texts in red and have layed out a structure for the stylesheets.
* At a later stage of the project, the inclusion of Bootstrap (if uncommented in style.scss) and font-awesome will make further development a little easier and quicker. These are not currently active to conserve space in the built file, but can be easily engaged by uncommenting the files in the relevant SCSS.
