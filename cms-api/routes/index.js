var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req,res,next){
  const email = 'contoh@gmail.com';
  var token = jwt.sign({ email : email }, 'shhhhh');
  res.json({
     message : 'berhasil',
     token
  })
})

module.exports = router;
