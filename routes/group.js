var express = require('express');
var router = express.Router();

var db = require('../mydb');

router.post('/:group_id', function (req, res) {
  var group_id = Number(req.params.group_id);
  var group_name = req.body["name"];
  db.newGroup(group_id, group_name, function (err, group) {
    if (err) {
      console.log('그룹 생성 에러: ' + err);
      res.status(500).json({ result: false });
    } else {
      console.log(group);
      res.send('success id: ' + group.id);
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
      res.send(group);
    }
  });
});

router.get('/:group_id/users', function (req, res) {
  var group_id = Number(req.params.group_id);

  db.getGroupUsers(group_id, function (err, user_list) {
    console.log(user_list);
    res.send(user_list);
  });
});

module.exports = router;