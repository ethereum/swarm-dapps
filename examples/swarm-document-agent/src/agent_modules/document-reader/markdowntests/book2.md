# Swarm Alpha Tester Tutorial

## Introduction

With the public alpha release of Swarm, the content-addressed 
distributed storage subsystem of Ethereum, the public is encouraged to 
test it, play with it, develop applications for it and provide 
developers with feedback, thus helping further development. As a first 
approximation, one can think about Swarm as a giant distributed web 
server and content distribution network for static content. In this 
step-by-step tutorial, we are going to set up a Swarm node on the test 
network, upload and modify content. For more detailed information, 
please refer to the [official Swarm 
documentation](https://swarm-guide.readthedocs.io/).

This tutorial assumes a Unix-like system setup on the commandline.
Its steps have been tested on Ubuntu 14.04 LTS, but should work without
change on any other Linux-based system and with only minor changes elsewhere.

## Starting up your Ethereum node.

The public alpha test of Swarm is conducted with the Ropsten test block 
chain. Thus, you should first join the Ropsten test network with your 
```geth``` client. Please see [the appropriate installation instructions 
for your system](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum).

Start your ```geth``` client in light mode on the Ropsten network:
```
$ geth --light --testnet
```

After about 30 seconds, your node will be syncrhonized with the rest of 
the network. Next, you should open a javascript console from a different
terminal window:
```
$ geth attach ~/.ethereum/testnet/geth.ipc
Welcome to the Geth JavaScript console!

instance: Geth/v1.5.5-unstable/linux/go1.7.3
 modules: admin:1.0 debug:1.0 eth:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

>
```

Finally, you create an account:
```
> personal.newAccount()
```

Please save tha account address that you get as an output from this command.

## Starting up your Swarm node

With your Ethereum node up and running, you are ready to install and 
launch ```swarm```, the Swarm binary. Installation is system dependent 
and is more or less identical to the way you installed ```geth``` above. 
In the particular case of Ubuntu, you can do this, if you installed 
```geth``` from the PPA repository:
```
$ sudo apt-get install swarm
```

Finally, you launch ```swarm``` in daemon mode like this (from a third terminal window):
```
$ swarm --ethapi ~/.ethereum/testnet/geth.ipc --datadir ~/.ethereum/testnet --bzznetworkid 3 --bzzaccount "0x..."
```
where ```"0x..."``` stands for your account's Ethereum address saved above.

## Uploading Content to Swarm

First, we are going to upload a single file. In this example, I am going to
use the [Ethereum logo](https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg),
but you can use any other file, which you do not mind being shared with the
rest of the world. Suppose, the file is on our computer's filesystem under
```/tmp/Ethereum_logo_2014.svg```. The following is going to upload it:

```
$ swarm up /tmp/Ethereum_logo_2014.svg
b18eb0a930ec5ff852879935153a6d5799ae47df2f5572c8b27d0625d5a33010
```

The immediate result is that you are going to be able to access your file
though the http gateway to swarm, under the following URL (please use
the hash code corresponsing to your file):
[http://localhost:8500/bzz:/b18eb0a930ec5ff852879935153a6d5799ae47df2f5572c8b27d0625d5a33010/](http://localhost:8500/bzz:/b18eb0a930ec5ff852879935153a6d5799ae47df2f5572c8b27d0625d5a33010/)

In the absence of a ```--manifest=false``` argument in addition to the filename and sub-command ```up```
a manifest file including the metadata has also been uploaded in addition to the binary content of our file.
You can see the manifest file's content by accessing it though the raw http API:
[http://localhost:8500/bzzr:/b18eb0a930ec5ff852879935153a6d5799ae47df2f5572c8b27d0625d5a33010/](http://localhost:8500/bzzr:/b18eb0a930ec5ff852879935153a6d5799ae47df2f5572c8b27d0625d5a33010/)

```
{"entries":[{"hash":"97e3fdaa0ba1dc2ece04848c5e524e7da88f736d258046da55ddeed0cda03ef9","contentType":"image/svg+xml"}]}
```

Similarly, we can upload entire directories to Swarm. In this case,
I am going to use the [photo album example dapp](https://github.com/ethereum/swarm-dapps/tree/master/examples/album).
It is assumed that the path to the directory in your local filesystem is
```/tmp/swarm-dapps/examples/album/``` :
```
$ swarm --recursive --defaultpath /tmp/swarm-dapps/examples/album/index.html up /tmp/swarm-dapps/examples/album/
65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85
```

As you can see, we assign ```index.html``` to be the the index file,
as is usually the case for web applications. Thus, the photo album
can be accessed under
[http://localhost:8500/bzz:/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85/](http://localhost:8500/bzz:/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85/)

You can also access individual files in the directory just like you would on
a web server:
[http://localhost:8500/bzz:/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85/imgs/bekas2.jpg](http://localhost:8500/bzz:/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85/imgs/bekas2.jpg)

Moreover, we can use the Swarm explorer dapp, to browse the files in our
upload. The Swarm explorer is just another web application uploaded to
Swarm, under the hash ```a23ae18da4ac24fed0ecfd0c07ab79c07ab0f88e7d409db928d1e359f0d29c07```.
In order to browse the album's files in Swarm explorer, open this URL:
[http://localhost:8500/bzz:/a23ae18da4ac24fed0ecfd0c07ab79c07ab0f88e7d409db928d1e359f0d29c07/#/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85](http://localhost:8500/bzz:/a23ae18da4ac24fed0ecfd0c07ab79c07ab0f88e7d409db928d1e359f0d29c07/#/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85)

If you understand what we just did here, as an exercise, you can try to
browse Swarm explorer's files with itself.

## Understanding Swarm Hashes

The hash codes returned from uploading content are a function of the content
itself. Thus, if you upload the same content again, you are going to get
the same hash code. If you change anything in the content, be it the renaming,
changing or deleting of a file (or adding a new one), the hash code will
change. Furthermore, Swarm nodes do verify the correspondence of downloaded
content to Swarm hashes and thus guarantee the integrity of downloads.

*Swarm hashes protect the integrity of entire directories, including
file content, file names and metadata. Even partial downloads enjoy
content integrity guarantees.*

This is why Swarm is called *content addressed storage*.

The photo album example above is actually a distributed swarm 
application itself. You can add and remove photos and you can also 
rearrange their ordering by clicking on icons in the top left corner. 
You can create entire photo albums consisting exclusively of your 
photos. Please note that with each change, the hash code of your photo 
album changes.

## Naming Swarm Sites

Swarm sites can be registered on the Ethereum blockchain by registering
their corresponding hash into ENS, the [Ethereum Name Service](https://github.com/ethereum/ens/wiki).
This allows for a particular name to refer to content that is changing
over time, as the owner of the name changes the registered hash. However,
the consensus mechanism of Ethereum gaurantees that after the necessary
number of confirmations typically taking about a minute, all users
referring to the same name will access the same content.

For example, currently the name ```explorer.test``` refers to Swarm explorer.
Thus, the following link will also let you browse the files of the demo album:
[http://localhost:8500/bzz:/explorer.test/#/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85]
(http://localhost:8500/bzz:/explorer.test/#/65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85)

Moreover, the following would also work:
[http://localhost:8500/bzz:/explorer.test/#/explorer.test]
(http://localhost:8500/bzz:/explorer.test/#/explorer.test)

In order to register your own names, you will need some Ropsten Ethers.
You can either ask for them or mine them yourself.
[ENS Documentation](https://github.com/ethereum/ens/wiki) will walk you though
the name registration process. For interacting with ENS, you would
need to download [ensutils.js](https://raw.githubusercontent.com/ethereum/ens/master/ensutils.js)
to your local filesystem and load it in ```geth```'s javascript console.

In particular, in order to register the demo album under ```album.test```,
the following commands need to be entered in ```geth```'s javascript console:
```
> loadScript('/path/to/ensutils.js')
> personal.unlockAccount(eth.account[0])
> testRegistrar.register(web3.sha3('album'), eth.accounts[0], {from:eth.accounts[0]})
> ens.setResolver(namehash('album.test'), publicResolver.address, {from:eth.accounts[0]})
> publicResolver.setAddr(namehash('album.test'), eth.accounts[0], {from: eth.accounts[0]})
> publicResolver.setContent(namehash('album.test'),"0x65f70a2641af52b3b7452ea07d9bb134f2d8d7e9323ce85d6c3f1640894fec85",{from:eth.accounts[0]})
```

You can register any name you want in a similar manner. If the above succeeds,
the following will, obviously, also work:
[http://localhost:8500/bzz:/explorer.test/#/album.test]
(http://localhost:8500/bzz:/explorer.test/#/album.test)