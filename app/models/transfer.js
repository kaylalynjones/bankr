'use strict';

function Transfer(obj){
  this.amount = parseInt(obj.amount);
  this.date   = new Date(obj.date);
  this.toAccountId = obj.toAccountId;
  this.fromAccountId = obj.fromAccountId;
  this.fee = parseInt(obj.fee);
}

Object.defineProperty(Transfer, 'collection',{
  get: function(){
    return global.mongodb.collection('transfer');
  }
});

module.exports = Transfer;
