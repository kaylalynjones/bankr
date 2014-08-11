'use strict';

var Transaction = require('../models/transaction');
var Account = require('../models/account');

exports.init = function(req,res){
  Account.findById(req.params.id, function(account){
    res.render('transaction/init', {account:account});
  });
};

exports.create = function(req,res){
  Account.findById(req.params.id, function(account){
    if (req.body.pin === account.pin) {
      console.log('PINS MATCH!!');
      if (req.body.type === 'deposit') {
        console.log('deposit');
        account.deposit(req.body.amount, function(){
          res.redirect('/accounts');
        });
      } else {
        account.withdraw(req.body.amount, function(){
          res.redirect('/accounts');
        });
      }
    } else {
      console.log('PINS dont MATCH!!');
    }
  });
};

