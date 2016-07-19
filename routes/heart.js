var express = require('express');
var router = express.Router();

var db = require('../mydb');

router.post('/', function (req, res, next) {
  var sender_id = req.body.sender_id;
  var target_id = req.body.target_id;

  db.newHeart(sender_id, target_id, function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send('success');
    }

  });
});

router.get('/:token', function (req, res, next) {
  var token = req.params.token;
  db.getUser(token, function (err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({'num' : user["user_heart_num"]});
    }
  });
});

module.exports = router;
