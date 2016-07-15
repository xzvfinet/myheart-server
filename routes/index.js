var express = require('express');
var router = express.Router();
var path = require('path');

var db = require('../mydb');

router.get('/auth/:token', function (req, res) {
  var token = req.params.token;
  db.insertNewUser(token, function (success, err) {
    res.send(success);
  });
});

// DEBUG
/* GET home page. */
router.get('/auth', function (req, res, next) {
  res.send('login get test success!!');
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
