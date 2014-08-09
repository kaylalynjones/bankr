/*jshint expr:true*/
/*global describe, it, before, beforeEach */

'use strict';

var Mongo = require('mongodb');
var expect = require('chai').expect;
var Transfer = require('../../app/models/transfer');
var dbConnect = require('../../app/lib/mongodb');
var cp = require('child_process');
var db = 'bankr-test';

describe('Transfer', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
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
      toAccountId: Mongo.ObjectId().toString(),
      fromAccountId: Mongo.ObjectId().toString(),
      date: '2014-8-8',
      amount: '100.00',
      fee: '25.00'
    };

    var t = new Transfer(obj);
    expect(t).to.be.instanceof(Transfer);
    expect(t.toAccountId).to.be.instanceof(Mongo.ObjectId);
    expect(t.fromAccountId).to.be.instanceof(Mongo.ObjectId);
    expect(t.)
  });
});
