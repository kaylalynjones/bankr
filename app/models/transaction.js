'use strict';

var Mongo = require('mongodb');

function Transaction(obj){
  this.date          = new Date(obj.date);
  this.accountId     = Mongo.ObjectID(obj.accountId);
  this.fee           = parseFloat(obj.fee);
  this.amount        = parseFloat(obj.amount);
  this.type          = obj.type;
}

Object.defineProperty(Transaction, 'collection',{
  get: function(){
    return global.mongodb.collection('transactions');
  }
});

Transaction.create = function(obj, cb){
  var transaction = new Transaction(obj);
  Transaction.collection.save(transaction, function(){
    cb(transaction);
  });
};

Transaction.findByAccountId = function(accountId, cb){
  Transaction.collection.find({
    $query: {
      accountId: Mongo.ObjectID(accountId)
    },
    $orderby:{ date: -1 }
  }).toArray(function(err, result){
    cb(result);
  });
};

module.exports = Transaction;
