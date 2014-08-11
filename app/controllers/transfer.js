'use strict';

var _ = require('lodash');

var Transfer = require('../models/transfer');
var Account = require('../models/account');

exports.init = function(req,res){
  Account.findAll(function(accounts){
    var fromAccount = _.find(accounts, function(account){
      return account._id.toString() === req.params.id;
    });
    var otherAccounts = accounts.filter(function(account){
      return account._id.toString() !== req.params.id;
    });
    res.render('transfer/init', {fromAccount:fromAccount, otherAccounts:otherAccounts});
  });
};

exports.create = function(req,res){
  var id1 = req.body.fromAccountId;
  var id2 = req.body.toAccountId;
  var amount = req.body.amount;
  Account.transfer(id1, id2, amount, function(transfer){
    res.redirect('/accounts');
  });
};
