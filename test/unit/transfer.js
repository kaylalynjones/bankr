/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var Transfer  = require('../../app/models/transfer');
var dbConnect = require('../../app/lib/mongodb');
var cp        = require('child_process');
var db        = 'bankr-test';
var Mongo     = require('mongodb');

describe('Transfer', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new transfer', function(){
      var obj = {
        amount:'50',
        toAccountId: Mongo.ObjectId().toString(),
        fromAccountId: Mongo.ObjectId().toString(),
        date: '2014-8-8', fee: '25'
      };
      var t = new Transfer(obj);

      expect(t).to.be.okay;
      expect(t).to.be.instanceof(Transfer);
      expect(t.amount).to.equal(50.00);
      /*expect(t.toAccountId).to.be.instanceof(Mongo.ObjectID);*/
      expect(t.fee).to.equal(25);
    });
  });
});
