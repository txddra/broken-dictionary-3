var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.redirect('/words/get-words');
});

module.exports = router;
