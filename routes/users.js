var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/:token', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:token', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:token', function(req, res, next) {
  
  
});

module.exports = router;
