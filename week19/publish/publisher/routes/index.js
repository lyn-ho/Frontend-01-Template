const fs = require('fs')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.writeFileSync('../../server/publish/1.html', 'Hello World!')
  // res.render('index', { title: 'Express' });
});

module.exports = router;
