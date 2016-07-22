var express = require('express');
var router = express.Router();

var db = require('../mydb');

router.post('/:user_id', function (req, res, next) {
  var user_id = req.params.user_id;
  var user_token = req.body.user_token;
  var user_gcm_token = req.body.user_gcm_token;
  var user_name = req.body.user_name;
  var user_description = req.body.user_description;
  var user_group = Number(req.body.user_group);

  db.newUser(user_id, user_token, user_gcm_token, user_name, user_description, user_group,
    function (err, user) {
      if (err) {
        console.log('새로운 유저 생성 에러: ' + err);
        res.status(500).json({ result: false });
      }
      else {
        res.send(user);
      }
    });
});

router.get('/:user_id', function (req, res, next) {
  var user_id = req.params.user_id;
  db.getUser(user_id, function (err, user) {
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
