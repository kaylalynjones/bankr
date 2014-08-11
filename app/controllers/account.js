'use strict';

var Transfer = require('../models/transfer');
var Account = require('../models/account');
var Transaction = require('../models/transaction');
var moment = require('moment');

exports.init = function(req,res){
  res.render('account/init');
};

exports.create = function(req,res){
  var account = new Account(req.body);
  account.create(function(){
    res.redirect('/accounts');
  });
};

exports.index = function(req,res){
  Account.findAll(function(accounts){
    res.render('account/index', {moment:moment, accounts:accounts});
  });
};

exports.show = function(req,res){
  Account.findById(req.params.id, function(account){
    res.render('account/show', {account:account, moment:moment});
  });
};
