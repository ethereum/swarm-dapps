var EthereumENS = require('ethereum-ens');
//var namehash = require('eth-ens-namehash');
var Web3 = require('web3');
var $ = require('jquery');
window.$ = $;
require('bootstrap');

var networkName = {
    '1': 'mainnet',
    '3': 'ropsten',
    '4': 'rinkeby'
};
var currentNetworkTitle = null;
var ens = null;

$(document).ready(function () {
    init();
    receiveInputData();
});

function init() {
    if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(web3.currentProvider);
        console.log('current provider');
        console.log(web3.currentProvider);
    } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    ens = new EthereumENS(window.web3.currentProvider);
    web3.version.getNetwork(function (error, result) {
        if (error) {
            console.error(error);

            return;
        }

        var networkId = result;
        console.log('Network id: ' + networkId);
        currentNetworkTitle = networkName[networkId];

        web3.eth.getAccounts(function (error, result) {
            if (error) {
                console.error(error);
            }

            console.log(result);
            if (result.length === 0) {
                alert('Please, select main Ethereum account, unlock MetaMask and reload this page.');
            } else {
                web3.eth.defaultAccount = result[0];
            }
        });

    });

    $('#saveDomainHash').on('click', function () {
        saveDomainHash();
    });
}

function receiveInputData() {
    var hash = window.location.hash.substring(1);
    var ensDomain = null;
    var swarmHash = null;
    if (hash) {
        hash = hash.split('/');
        if (hash.length === 2) {
            ensDomain = hash[0];
            swarmHash = hash[1];

            if (!isCorrectDomain(ensDomain) || !isCorrectSwarmHash(swarmHash)) {
                alert('Invalid domain or hash received');

                return;
            }

            $('#ensDomain').val(ensDomain);
            $('#swarmHash').val(swarmHash);
        }
    }
}

function isCorrectDomain(domain) {
    var minDomainLength = 3;

    return domain && domain.length >= minDomainLength;
}

function isCorrectSwarmHash(hash) {
    var hashLength = 64;

    return hash && hash.length === hashLength;
}

function saveDomainHash() {
    var ensDomain = $('#ensDomain').val();
    var swarmHash = $('#swarmHash').val();

    if (!isCorrectDomain(ensDomain) || !isCorrectSwarmHash(swarmHash)) {
        alert('Incorrect domain or hash');

        return;
    }

    var resultSwarmHash = '0x' + swarmHash;

    var resolver = ens.resolver(ensDomain);
    resolver.instancePromise.then(function () {
        return resolver.setContent(resultSwarmHash, {from: web3.eth.defaultAccount}).then(function (result) {
            // user complete transaction
            var subdomain = '';
            if (currentNetworkTitle && currentNetworkTitle !== 'mainnet') {
                subdomain = currentNetworkTitle + '.';
            }

            var shortResult = result.substring(0, 50) + '...';
            alert('Transaction complete. View transaction on Etherscan: <a href="https://' + subdomain + 'etherscan.io/tx/' + result + '" target="_blank">' + shortResult + '</a>');
        }).catch(function (r) {
            alert('Transaction rejected');
        });
    }).catch(function (e) {
        alert('Name not found or resolver not set');
    });
}

function alert(message) {
    $('#messageBody').html(message);
    $('#messageModal').modal('show');
}