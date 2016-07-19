var express = require('express');
var router = express.Router();
var path = require('path');

var db = require('../mydb');

router.get('/auth/:token', function (req, res) {
  var token = req.params.token;
  db.insertNewUser(token, function (err) {
    if (err) {
      console.log('에러 발생: ' + err);
      res.status(500).json({ result: false });
    }
    else {
      res.send();
    }
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
