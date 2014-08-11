'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');
var Transfer = require('./transfer');
var Transaction = require('./transaction');

function Account(obj){
  this.name        = obj.name;
  this.photo       = obj.photo;
  this.accountType = obj.accountType;
  this.color       = obj.color;
  this.dateCreated = new Date(obj.dateCreated);
  this.pin         = obj.pin;
  this.initDeposit = parseFloat(obj.initDeposit);
  this.balance     = parseFloat(obj.balance);

}
Object.defineProperty(Account, 'collection',{
  get: function(){
    return global.mongodb.collection('accounts');
  }
});

Account.prototype.create = function(cb){
  var account = this;
  Account.collection.save(this, function(){
    cb(account);
  });
};

Account.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Account.collection.findOne({_id:_id}, function(err, result){
    Transaction.findByAccountId(id, function(transactions){
      Transfer.findByAccountId(id, function(transfers){
        var account = changePrototype(result);
        account.transactions = transactions;
        account.transfers = transfers;
        cb(account);
      });
    });
  });
};

Account.findAll = function(cb){
  Account.collection.find().toArray(function(err, results){
    var accounts = results.map(function(account){
      return changePrototype(account);
    });
    cb(accounts);
  });
};

Account.prototype.validatePin = function(pin){
  return pin === this.pin;
};

Account.prototype.deposit = function(deposit, cb){
  deposit = parseFloat(deposit);
  this.balance += deposit;
  var t = {
    date: new Date(),
    accountId: this._id.toString(),
    fee: 0,
    type: 'deposit',
    amount: deposit
  };
  this.create(function(){
    Transaction.create(t, cb);
  });
};

Account.prototype.withdraw = function(withdrawl, cb){
  withdrawl = parseFloat(withdrawl);
  var fee = 0;
  if(this.balance <= withdrawl){
    fee = 50;
  }
  this.balance -= withdrawl;
  var a = {
    date: new Date(),
    accountId: this._id.toString(),
    fee: fee,
    type: 'withdrawal',
    amount: withdrawl
  };
  this.create(function(){
    Transaction.create(a, cb);
  });
};

Account.transfer = function(id1, id2, amount, cb){
  amount = parseInt(amount);
  Account.findById(id1, function(account1){
    if(account1.balance >= (amount+25)){
      Account.findById(id2, function(account2){

        var transfer = Transfer.create({
          amount: amount,
          date: new Date(),
          toAccountId: id2,
          fromAccountId: id1,
          fee: 25
        }, function(transfer){
          account1.balance -= amount + 25;
          account2.balance += amount;
          account1.create(function(){
            account2.create(function(){
              cb(transfer);
            });
          });
        });
      });
    } else {
      cb(null);
    }
  });
};

//private function
function changePrototype(obj) {
  var accounts = _.create(Account.prototype, obj);
  return accounts;
}

module.exports = Account;
