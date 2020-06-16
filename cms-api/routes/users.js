var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/Users')

/* GET users listing. */
router.get('/list', function (req, res) {
  Users.find()
    .then(result => {
      res.json({
        result
      })
    })
    .catch(err => {
      res.json({
        err
      })
    })
})


router.post('/register', function (req, res, next) {

  let { email, password, retypepassword } = req.body;
  let response = {
    status: false,
    message: "",
    data: {},
    token: ""
  }

  if (password == retypepassword) {
    // if (registeredEmail) {
    //   response.message = 'Email already exist';
    //   return res.json(response);
    // } else {

    bcrypt.hash(password, saltRounds).then(hash => {
      var token = jwt.sign({ email: email }, 'iniRahasiaYa');
      let user = new Users({
        email: email,
        password: hash,
        token: token
      })
      user.save().then(data => {
        response.status = true;
        response.message = "register success";
        response.data.email = email;
        response.token = token;
        res.json(response);
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      res.json({
        error: err
      })
    })
  }
  //  else {
  //   response.message = "password doesn't match";
  //   res.json(response);
  // }
});

module.exports = router;
