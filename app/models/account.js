'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Account(obj){
  this.name        = obj.name;
  this.photo       = obj.photo;
  this.accountType = obj.accountType;
  this.color       = obj.color;
  this.dateCreated = new Date(obj.dateCreated);
  this.pin         = parseInt(obj.pin);
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


//private function
function changePrototype(obj) {
  var accounts = _.create(Account.prototype, obj);
  return accounts;
}

module.exports = Account;
