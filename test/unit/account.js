/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var Account  = require('../../app/models/account');
var dbConnect = require('../../app/lib/mongodb');
var cp        = require('child_process');
var db        = 'bankr-test';
var Mongo     = require('mongodb');

describe('Account', function(){
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
    it('should create a new account', function(){
      var obj = {name:'Juanita Irvin',  photo:'http://google.com', accountType: 'savings', color:'lightblue',
                 dateCreated:'2012-04-15', pin:'3456', initDeposit:'1000', balance:'500'};
      var a = new Account(obj);
      
      expect(a).to.be.okay;
      expect(a).to.be.instanceof(Account);
      expect(a.accountType).to.equal('savings');
      expect(a.balance).to.equal(500.00);
      expect(a.initDeposit).to.equal(1000.00);
      expect(a.color).to.equal('lightblue');
      expect(a.pin).to.equal(3456);
      expect(a.photo).to.equal('http://google.com');
      expect(a.dateCreated).to.be.instanceof(Date);
    });
  });
  
  describe('#create', function(){
    it('should create a new account and save it to the database', function(done){
      var obj = {name:'Juanita Irvin',  photo:'http://google.com', accountType: 'savings', color:'lightblue',
                 dateCreated:'2012-04-15', pin:'3456', initDeposit:'1000', balance:'500'};
      var account = new Account(obj);

      account.create(function(result){
        expect(result).to.be.instanceof(Account);
        expect(result._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an account', function(done){
      var accountId = '53e5659ee1eb2778810b9d4a';
      Account.findById(accountId, function(account){
        expect(account).to.be.instanceof(Account);
        done();
      });
    });
  });
  
  
});


