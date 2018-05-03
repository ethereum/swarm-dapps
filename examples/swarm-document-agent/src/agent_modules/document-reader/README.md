# Swarm-document-reader

## Documentation

### Outline ###
* Application captures ``/#filename.md`` routes in the URL and navigates to the file. It knows a preconfigured URL-prefix to get the correct path.
* Different 'fragments' or files can link to one another.
* App does error handling for illegal characters, filters out HTML documents (this caused an issue whereby the page itself was loaded and rendered the doctype to the page) also handles error when file cannot be found.

<br />

### Files ####
* Source files in ``/src/``
* Built, ready to go files in ``/build/``

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

1. If you want to change the baseURL, you can do so through ``appConfiguration.json``. This JSON file can also be easily extended in the future if more variables are to be introduced. If the configuration file is not present, the app has a built in fallback to ``/bzzr:/``

2. The index.html file also includes an extra error condition (users browsing to the app location and not a fragment).

3. In case you want to extend this app further in the future as a module of a larger framework, you can use the development set-up to import/require the documentreader.js file in source and initiate the app as follows:  ``documentReader.init(UrlForFetching)``

4. The argument it takes is the readURL for the location of the files. If the user does not call this, it has a default fallback included. See "entry.js" in *src* to see how I initiated it (uncomment the markdownReader.init line).
5. The development/build environment used to here is a webpack dev server on top of Node.JS to run the Javascript. Webpack compresses, validates (lints) and optimises the files, among other things. This environment has been set up to make development easy, quick and extendible future updates. The inclusion of webpack means development can rely on individual Javascript 'modules' to keep the structure of the application clear.

<br />

### In-app Testing ###
* Test suite available in ``./markdowntests/testsuite.md`` (+other .md files). I have included tests and warnings for various issues (illegal characters, missing files).

<br />

<br />

### Development HowTo ##
* Check requirements above
* For testing and developing: execute ``npm install`` with NodeJS from within this directory, then ``npm start`` afterwards. Point your browser to localhost:8080.
* To build the application from source: execute ``npm run build`` from within this folder. Find your files in ``/build/``.