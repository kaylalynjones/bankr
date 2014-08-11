'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var account = require('../controllers/account');
var transfer = require('../controllers/transfer');
var transaction = require('../controllers/transaction');
var home = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));

  app.get('/', home.index);
  app.get('/accounts/new', account.init);
  app.post('/accounts/new', account.create);
  app.get('/accounts', account.index);
  app.get('/accounts/:id', account.show);

  app.get('/accounts/:id/transaction', transaction.init);
  app.post('/accounts/:id/transaction', transaction.create);

  app.get('/accounts/:id/transfer', transfer.init);
  app.post('/accounts/:id/transfer', transfer.create);

  console.log('Pipeline Configured');
};

