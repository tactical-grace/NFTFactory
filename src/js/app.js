App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('ExampleToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ExampleTokenArtifact = data;
      App.contracts.ExampleToken = TruffleContract(ExampleTokenArtifact);

      // Set the provider for our contract.
      App.contracts.ExampleToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    $.getJSON('NFTFactory.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var NFTFactoryArtifact = data;
      App.contracts.NFTFactory = TruffleContract(NFTFactoryArtifact);

      // Set the provider for our contract.
      App.contracts.NFTFactory.setProvider(App.web3Provider);

      App.contracts.NFTFactory.deployed().then(function(NFTFactoryInstance) {
        console.log(NFTFactoryInstance);
        App.contracts.ExampleToken.deployed().then(function(tokenInstance) {
          tokenInstance.setNFTFactory(NFTFactoryInstance.address);
          return tokenInstance
        }).then(function(tokenInstance) {
          return tokenInstance.getNFT();
        }).then(function(NFTInstance) {
          $('#NFTFactory').text(JSON.stringify(NFTInstance));
        });
      });
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var exampleTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ExampleToken.deployed().then(function(instance) {
        exampleTokenInstance = instance;

        return exampleTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    console.log('Getting balances...');

    var exampleTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ExampleToken.deployed().then(function(instance) {
        exampleTokenInstance = instance;

        return exampleTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#TTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
