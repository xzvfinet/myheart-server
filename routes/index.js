var express = require('express');
var router = express.Router();
var path = require('path');

var db = require('../mydb');

// database
var pg = require('pg');
var dbUrl = require(path.join(__dirname, '../', 'config.js'));

router.post('/auth', function (req, res) {
  var token = req.param('login_token');
  
  console.log("requested token: " + token);
  res.send('merong');
});


// DEBUG
/* GET home page. */
router.get('/login', function (req, res, next) {
  res.send('login get test success!!');
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
