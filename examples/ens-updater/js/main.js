var web3js = null;
$(document).ready(function () {
    init();
    receiveInputData();
});

function init() {
    $('#saveDomainHash').on('click', function () {
        saveDomainHash();
    });

    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
    } else {
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    //web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //web3js = new Web3();
    //console.log(web3.currentProvider);
    //web3js.setProvider(web3.currentProvider);
    console.log(web3js);
    /*console.log(Web3);
     console.log(window.web3);*/
    web3js.eth.getBalance('0xFb08943D0a9F69A1c998C54046c7C5A851405782', function (err, data) {
        console.log(err);
        alert(err);
        console.log(data);
        alert(data);
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
                alert('Passed incorrect domain or hash');

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
    // todo send transaction to blockchain
}