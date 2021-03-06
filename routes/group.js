var express = require('express');
var router = express.Router();

var db = require('../mydb');

router.post('/:group_id', function (req, res) {
  var group_id = Number(req.params.group_id);
  var group_name = req.body["group_name"];
  db.newGroup(group_id, group_name, function (err, group) {
    if (err) {
      console.log('그룹 생성 에러: ' + err);
      res.status(500).json({ result: false });
    } else {
      console.log(group);
      res.send(group);

      for (var i = 0; i < 3; ++i) {
        db.newUser(i, 'token', 'gcm', '테스트' + i, '테스트 유저입니다.', group_id,
          function (err, user) {});
      }
    }
  });
});

router.get('/:group_id', function (req, res) {
  var group_id = Number(req.params.group_id);

  db.getGroup(group_id, function (err, group) {
    if (err) {
      res.status(500).json({ result: false });
    }
    else {
      if (group) {
        res.send(group);
      } else {
        res.status(500).json({ result: false });
      }

    }
  });
});

router.get('/:group_id/users/:except_id', function (req, res) {
  var group_id = Number(req.params.group_id);
  var except_id = req.params.except_id;

  db.getGroupUsers(group_id, except_id,
    function (err, user_list) {
      if (err) {
        console.error(err);
      } else {
        res.send(user_list);
      }
    });
});

module.exports = router;