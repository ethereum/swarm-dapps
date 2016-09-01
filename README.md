# Swarm Đapp Examples

In this repository, you find the source code for distributed applications (so-called đapps),
the primary purpose of which is to demonstrate the use of Swarm's API and the most useful
patterns of developing such applications.

## album
A photo album dapp with a set of public-domain photographs that lets users upload their own photos. The code is based on [fgallery](https://www.thregr.org/~wavexx/software/fgallery/) version 1.7. All chenges in the gallery are accompanied by a change in the root hash of the album. Sharing or registering the root hash corresponds to sharing and/or publishing a particular state of the photo album. This is an example of non-interactive content dissemination, with no feedback from the audience.

## filemanager
This is a GUI explorer for file collections hosted on swarm. An example of a tool for working on file collections other than itself. The root hash of the explorer remains the same (or changes with upgrades); the root hash of the explored collection is appended as a fragment to the URI. Of course, it can be used to explore itself.

## bzzhandler.html
This html installs http protocol handlers for bzz, bzzi and bzzr protocols.
