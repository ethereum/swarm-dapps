#!/usr/bin/env node

var path = require('path');
var liveServer = require("live-server");

var args = process.argv;
if ('node' === path.basename(args[0])) {
    args = args.slice(1);
}

var dir = path.resolve(args[1]);


var params = {
    port: 8888, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: dir, // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    proxy: [
        [ '/bzz:', 'http://localhost:32200/bzz:' ],
        [ '/bzzr:', 'http://localhost:32200/bzzr:' ],
        [ '/bzzi:', 'http://localhost:32200/bzzi:' ],
    ],
    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

liveServer.start(params);