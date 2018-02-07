# Swarm Đapp Examples

In this repository, you find the source code for distributed applications (so-called đapps),
the primary purpose of which is to demonstrate the use of Swarm's API and the most useful
patterns of developing such applications.

### examples/album
A photo album dapp with a set of public-domain photographs that lets users upload their own photos. The code is based on [fgallery](https://www.thregr.org/~wavexx/software/fgallery/) version 1.7. All chenges in the gallery are accompanied by a change in the root hash of the album. Sharing or registering the root hash corresponds to sharing and/or publishing a particular state of the photo album. This is an example of non-interactive content dissemination, with no feedback from the audience.

### examples/filemanager
This is a GUI explorer for file collections hosted on swarm. An example of a tool for working on file collections other than itself. The root hash of the explorer remains the same (or changes with upgrades); the root hash of the explored collection is appended as a fragment to the URI. Of course, it can be used to explore itself.

### examples/ens-updater
This is a GUI tool for updating ENS domain with SWARM hash.

### examples/bzzhandler.html

This html installs http protocol handlers for bzz, bzzi and bzzr protocols.

You can either upload each example into Swarm and run it from there or run a 
proxy server (see below)

## Running via proxy server

```shell
npm install live-server
```

Now run `./start-proxy <folder>`. For example, to run the filemanager:

```shell
./start-proxy ./examples/filemanager
```

