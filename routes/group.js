var express = require('express');
var router = express.Router();

var db = require('../mydb');

router.get('/:group_id', function (req, res) {
  var group_id = Number(req.params.group_id);
  db.isExistGroup(group_id, function (group) {
    if (group) {
      res.send(group);
    }
    else {
      res.status(500).json({
        result: false
      });
    }
  });
  // console.log("requested group_id: " + group_id);
});

router.post('/:group_id', function(req, res){
    var group_id = Number(req.params.group_id);
    var group_name = req.body["name"];
    db.newGroup(group_id, group_name);

});

module.exports = router;