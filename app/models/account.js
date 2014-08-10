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
    var account = changePrototype(result);
    cb(account);
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
  this.balance += deposit;
  var t = {
    date: new Date(),
    accountId: this._id.toString(),
    fee: 0,
    type: this.type,
    amount: this.deposit
  };
  Transaction.create(t, cb);
};

Account.prototype.withdraw = function(withdrawl, cb){
  if(this.balance >= withdrawl){
    this.balance -= withdrawl;
    var a = {
      date: new Date(),
      accountId: this._id.toString(),
      fee: 0,
      type: this.type,
      amount: this.withdrawl
    };
    Transaction.create(a, cb);
  } else {
    this.balance -= withdrawl + 50;
   var b = {
      date: new Date(),
      accountId: this._id.toString(),
      fee: 50,
      type: this.type,
      amount: this.withdrawl
    };
    Transaction.create(b, cb);
  }
};

//private function
function changePrototype(obj) {
  var accounts = _.create(Account.prototype, obj);
  return accounts;
}

module.exports = Account;
