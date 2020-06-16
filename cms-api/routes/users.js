var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/Users');
const { token } = require('morgan');

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
    message: "",
    data: {},
    token: ""
  }
  if (password == retypepassword) {
    Users.findOne({ email })
      .then(registeredEmail => {
        if (registeredEmail) {
          response.message = 'Email already exist';
          return res.json(response);
        } else {
          bcrypt.hash(password, saltRounds)
            .then(hash => {
              var token = jwt.sign({ email: email }, 'iniRahasiaYa');
              let user = new Users({
                email: email,
                password: hash,
                token: token
              })
              user.save().then(data => {
                response.message = "register success";
                response.data.email = email;
                response.token = token;
                res.json(response);
              })
                .catch(err => {
                  console.log(err);
                })
            })
            .catch(err => {
              res.json({
                error: err
              })
            })
        }
      })
      .catch(err => {
        res.json({
          error: true,
          message: "error Users find One"
        })
      })
  } else {
    response.message = "password doesn't match";
    res.json(response);
  }
});

router.post('/login', function (req, res, next) {
  let { email, password } = req.body;
  let response = {
    message: "",
    data: {},
    token: ""
  }
  
  Users.findOne({ email })
    .then(data => {
      bcrypt.compare(password, data.password)
        .then(isPasswordTrue => {
          if (isPasswordTrue) {
            if (data.token) {
              response.token = data.token;
              response.data.email = email;
              response.message = "Login success!"
              res.json(response)
            } else {
            const newToken = jwt.sign({ email: data.email }, 'iniRahasiaYa');
            Users.updateOne({ email: data.email }, { token: newToken })
              .then(() => {
                response.token = newToken;
                response.email = data.email;
                response.message = "login success with new token!"
                res.json(response)
              })
              .catch(err => {
                response.message = "update token failed"
                res.json(response)
              })
            }
          } else {
            response.message = "Authentication failed";
            res.json(response);
          }
        })
        .catch(err => {
          response.message = "Authentication failed";
          res.json(response);
        })
    })
    .catch(err => {
      response.message = "Email doesn't exist"
      res.json(response);
    })
})

module.exports = router;
