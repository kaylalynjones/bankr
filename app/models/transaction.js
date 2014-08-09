'use strict';

var Mongo = require('mongodb');

Object.defineProperty(Transfer, 'collection',{
  get: function(){
    return global.mongodb.collection('transactions');
  }

module.exports = Transaction;
