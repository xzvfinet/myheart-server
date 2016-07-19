router.post('/:token', function (req, res, next) {
  var sender_id = req.params.sender_id;
  var target_id = req.params.target_id;

  db.increaseUserHeart(token, function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send('success');
    }

  });
});
