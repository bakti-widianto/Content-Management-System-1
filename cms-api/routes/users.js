var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/Users')

/* GET users listing. */
router.post('/register', function (req, res, next) {
  let { email, password, retypepassword } = req.body;
  let response = {
    status: false,
    message: "",
    data: {},
    token: ""
  }

  if (password == retypepassword) {
    Users.findOne({
      email: email
    }).then(registeredEmail => {
      if (registeredEmail) {
        response.message = 'Email already exist';
        return res.json(response);
      } else {
        bcrypt.hash(password, saltRounds).then(hash => {
          var token = jwt.sign({ email: email }, 'iniRahasiaYa');
          let user = new User({
            email: email,
            password: hash,
            token: token
          })
          user.save().then(result => {
            response.status = true;
            response.message = "register success";
            response.data.email = email;
            response.token = token;
            res.json(response);
          })
        })
      }
    })
  } else {
    response.message = "password doesn't match";
    res.json(response);
  }
});

module.exports = router;
