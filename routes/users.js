var express = require('express');
var router = express.Router();

var db = require('../mydb');

router.post('/:token', function (req, res, next) {
  var token = req.params.token;
  var user_name = req.body.user_name;
  var user_group = Number(req.body.user_group);

  db.newUser(token, user_name, user_group,
    function (err, user) {
      if (err) {
        console.log('새로운 유저 생성 에러: ' + err);
        res.status(500).json({ result: false });
      }
      else {
        res.send('success: ' + JSON.stringify(user));
      }
    });
});

router.get('/:token', function (req, res, next) {
  var token = req.params.token;
  db.getUser(token, function (err, user) {
    if (err) {
      res.status(500).json({ result: false });
    }
    else {
      if (user) {
        res.send(user);
      } else {
        res.status(500).json({ result: false });
      }
    }
  });
});

module.exports = router;
