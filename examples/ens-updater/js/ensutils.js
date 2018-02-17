function namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for (var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}

function getContent(name, onResult) {
    var node = namehash(name);
    var resolverAddress = null;
    ens.resolver(node, function (error, result) {
        resolverAddress = result;
        if (resolverAddress === '0x0000000000000000000000000000000000000000') {
            if (onResult) {
                onResult(null, "0x0000000000000000000000000000000000000000000000000000000000000000");
            }
        }

        resolverContract.at(resolverAddress).content(node, function (error, result) {
            if (onResult) {
                onResult(error, result);
            }
        });
    });
}

function getResolverContract(name, onResult) {
    var node = namehash(name);
    var resolverAddress = null;
    ens.resolver(node, function (error, result) {
        if (error) {
            console.error('getResolverContract error: ' + error);
            if (onResult) {
                onResult(error, null);
            }

            return;
        }

        console.log('getResolverContract result: ' + result);
        resolverAddress = result;
        if (resolverAddress === '0x0000000000000000000000000000000000000000') {
            if (onResult) {
                onResult(true, resolverAddress);
            }
        } else {
            var contract = resolverContract.at(resolverAddress);
            if (onResult) {
                onResult(error, contract);
            }
        }
    });
}

function getAddr(name, onComplete) {
    var node = namehash(name);
    ens.resolver(node, function (error, result) {
        if (error) {
            console.error('getAddr resolver error: ' + error);
        }

        console.log('getAddr resolver result: ' + result);
        if (result === '0x0000000000000000000000000000000000000000') {
            if (onComplete) {
                onComplete(null, result);
            }
        }

        resolverContract.at(result).addr(node, function (error, result) {
            if (error) {
                console.error('getAddr resolverContract error: ' + error);
            }

            console.log('getAddr resolverContract result: ' + result);
            if (onComplete) {
                onComplete(error, result);
            }
        });
    });
}

function initEns(registryAddress) {
    // address from registryAddresses
    ens = ensContract.at(registryAddress);

    /*getAddr('resolver.eth', function (error, result) {
     if (error) {
     console.error('public resolver error: ' + error);
     }

     console.log('public resolver result: ' + result);
     publicResolver = resolverContract.at(result);
     });

     ens.owner(namehash('addr.reverse'), function (error, result) {
     reverseRegistrar = reverseRegistrarContract.at(result);
     });*/
}

/*function initRootDomain(rootDomain) {
 // test, eth
 ens.owner(namehash(rootDomain), function (error, result) {
 if (error) {
 console.error('auctionRegistrarContract error: ' + error);
 alert('Root domain "' + rootDomain + '" not found for current network. More information in logs.');

 return;
 }

 console.log('".' + rootDomain + '" auctionRegistrarContract result: ' + result);
 ethRegistrar = auctionRegistrarContract.at(result);
 });
 }*/

var registryAddresses = {
    // Mainnet
    "1": "0x314159265dd8dbb310642f98f50c066173c1259b",
    // Ropsten
    "3": "0x112234455c3a32fd11230c42e7bccd4a84e02010",
    // Rinkeby
    "4": "0xe7410170f87102DF0055eB195163A03B7F2Bff4A"
};

var networkName = {
    '1': 'mainnet',
    '3': 'ropsten',
    '4': 'rinkeby'
};

var ens = null;
var ensContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "resolver",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "label",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "setSubnodeOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "ttl",
                "type": "uint64"
            }
        ],
        "name": "setTTL",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "ttl",
        "outputs": [
            {
                "name": "",
                "type": "uint64"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "resolver",
                "type": "address"
            }
        ],
        "name": "setResolver",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "label",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "NewOwner",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "resolver",
                "type": "address"
            }
        ],
        "name": "NewResolver",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "ttl",
                "type": "uint64"
            }
        ],
        "name": "NewTTL",
        "type": "event"
    }
]);

var auctionRegistrarContract = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "releaseDeed",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "getAllowedTime",
        "outputs": [
            {
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "unhashedName",
                "type": "string"
            }
        ],
        "name": "invalidateName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "hash",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            },
            {
                "name": "salt",
                "type": "bytes32"
            }
        ],
        "name": "shaBid",
        "outputs": [
            {
                "name": "sealedBid",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "bidder",
                "type": "address"
            },
            {
                "name": "seal",
                "type": "bytes32"
            }
        ],
        "name": "cancelBid",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "entries",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "ens",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_salt",
                "type": "bytes32"
            }
        ],
        "name": "unsealBid",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "transferRegistrars",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "sealedBids",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "state",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            },
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            },
            {
                "name": "_timestamp",
                "type": "uint256"
            }
        ],
        "name": "isAllowed",
        "outputs": [
            {
                "name": "allowed",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "finalizeAuction",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "registryStarted",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "launchLength",
        "outputs": [
            {
                "name": "",
                "type": "uint32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "sealedBid",
                "type": "bytes32"
            }
        ],
        "name": "newBid",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "labels",
                "type": "bytes32[]"
            }
        ],
        "name": "eraseNode",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hashes",
                "type": "bytes32[]"
            }
        ],
        "name": "startAuctions",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "hash",
                "type": "bytes32"
            },
            {
                "name": "deed",
                "type": "address"
            },
            {
                "name": "registrationDate",
                "type": "uint256"
            }
        ],
        "name": "acceptRegistrarTransfer",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "startAuction",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "rootNode",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "hashes",
                "type": "bytes32[]"
            },
            {
                "name": "sealedBid",
                "type": "bytes32"
            }
        ],
        "name": "startAuctionsAndBid",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_ens",
                "type": "address"
            },
            {
                "name": "_rootNode",
                "type": "bytes32"
            },
            {
                "name": "_startDate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "registrationDate",
                "type": "uint256"
            }
        ],
        "name": "AuctionStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "bidder",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "deposit",
                "type": "uint256"
            }
        ],
        "name": "NewBid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "status",
                "type": "uint8"
            }
        ],
        "name": "BidRevealed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "registrationDate",
                "type": "uint256"
            }
        ],
        "name": "HashRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "HashReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "hash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "registrationDate",
                "type": "uint256"
            }
        ],
        "name": "HashInvalidated",
        "type": "event"
    }
]);
//var ethRegistrar = null;

var deedContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [],
        "name": "creationDate",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "destroyDeed",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "registrar",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "refundRatio",
                "type": "uint256"
            }
        ],
        "name": "closeDeed",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newRegistrar",
                "type": "address"
            }
        ],
        "name": "setRegistrar",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newValue",
                "type": "uint256"
            }
        ],
        "name": "setBalance",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "inputs": [],
        "type": "constructor"
    },
    {
        "payable": true,
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnerChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "DeedClosed",
        "type": "event"
    }
]);

var fifsRegistrarContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [],
        "name": "ens",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "expiryTimes",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "subnode",
                "type": "bytes32"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "register",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "rootNode",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "ensAddr",
                "type": "address"
            },
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "type": "constructor"
    }
]);

var resolverContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "interfaceID",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "contentTypes",
                "type": "uint256"
            }
        ],
        "name": "ABI",
        "outputs": [
            {
                "name": "contentType",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "x",
                "type": "bytes32"
            },
            {
                "name": "y",
                "type": "bytes32"
            }
        ],
        "name": "setPubkey",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "content",
        "outputs": [
            {
                "name": "ret",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "addr",
        "outputs": [
            {
                "name": "ret",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "contentType",
                "type": "uint256"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "setABI",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "name",
        "outputs": [
            {
                "name": "ret",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "name",
                "type": "string"
            }
        ],
        "name": "setName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "hash",
                "type": "bytes32"
            }
        ],
        "name": "setContent",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            }
        ],
        "name": "pubkey",
        "outputs": [
            {
                "name": "x",
                "type": "bytes32"
            },
            {
                "name": "y",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "node",
                "type": "bytes32"
            },
            {
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "setAddr",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "ensAddr",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "a",
                "type": "address"
            }
        ],
        "name": "AddrChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "hash",
                "type": "bytes32"
            }
        ],
        "name": "ContentChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            }
        ],
        "name": "NameChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "contentType",
                "type": "uint256"
            }
        ],
        "name": "ABIChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "node",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "x",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "y",
                "type": "bytes32"
            }
        ],
        "name": "PubkeyChanged",
        "type": "event"
    }
]);

//var publicResolver = null;
/*var reverseRegistrarContract = web3.eth.contract([
 {
 "constant": false,
 "inputs": [
 {
 "name": "owner",
 "type": "address"
 },
 {
 "name": "resolver",
 "type": "address"
 }
 ],
 "name": "claimWithResolver",
 "outputs": [
 {
 "name": "node",
 "type": "bytes32"
 }
 ],
 "payable": false,
 "type": "function"
 },
 {
 "constant": false,
 "inputs": [
 {
 "name": "owner",
 "type": "address"
 }
 ],
 "name": "claim",
 "outputs": [
 {
 "name": "node",
 "type": "bytes32"
 }
 ],
 "payable": false,
 "type": "function"
 },
 {
 "constant": true,
 "inputs": [],
 "name": "ens",
 "outputs": [
 {
 "name": "",
 "type": "address"
 }
 ],
 "payable": false,
 "type": "function"
 },
 {
 "constant": true,
 "inputs": [],
 "name": "defaultResolver",
 "outputs": [
 {
 "name": "",
 "type": "address"
 }
 ],
 "payable": false,
 "type": "function"
 },
 {
 "constant": true,
 "inputs": [
 {
 "name": "addr",
 "type": "address"
 }
 ],
 "name": "node",
 "outputs": [
 {
 "name": "ret",
 "type": "bytes32"
 }
 ],
 "payable": false,
 "type": "function"
 },
 {
 "constant": false,
 "inputs": [
 {
 "name": "name",
 "type": "string"
 }
 ],
 "name": "setName",
 "outputs": [
 {
 "name": "node",
 "type": "bytes32"
 }
 ],
 "payable": false,
 "type": "function"
 },
 {
 "inputs": [
 {
 "name": "ensAddr",
 "type": "address"
 },
 {
 "name": "resolverAddr",
 "type": "address"
 }
 ],
 "payable": false,
 "type": "constructor"
 }
 ]);
 var reverseRegistrar = null;*/

function regDomain(domain, rootDomain, resolverAddress) {
// mainnet - getAddr('resolver.eth'), ropsten - 0x4c641fb9bad9b60ef180c31f56051ce826d21a9a, rinkeby - 0xb14fdee4391732ea9d2267054ead2084684c0ad8
    var publicResolverAddress = '0xb14fdee4391732ea9d2267054ead2084684c0ad8';
    if (resolverAddress) {
        publicResolverAddress = resolverAddress;
    }

    ens.owner(namehash(rootDomain), function (error, result) {
        console.log('ens owner');
        console.log(error);
        console.log(result);

        if (result) {
            var testRegistrar = fifsRegistrarContract.at(result);
            testRegistrar.register(web3.sha3(domain), web3.eth.accounts[0], function (error, result) {
                console.log('testRegistrar.register');
                console.log(error);
                console.log(result);

                if (result) {
                    ens.setResolver(namehash(domain + '.' + rootDomain), publicResolverAddress, function (error, result) {
                        console.log('ens.setResolver');
                        console.log(error);
                        console.log(result);
                    });
                }
            });
        }
    });
}