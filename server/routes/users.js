var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/Users');
const rahasia = 'iniRahasiaYa';


/* GET users listing. */
router.get('/list', function (req, res) {
  Users.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    })
})

// ================= POST REGISTER ======================
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
          return res.status(500).json(response);
        } else {
          bcrypt.hash(password, saltRounds)
            .then(hash => {
              var token = jwt.sign({ email: email }, rahasia);
              let user = new Users({
                email: email,
                password: hash,
                token: token
              })
              user.save()
                .then(data => {
                  response.message = "register success";
                  response.data.email = email;
                  response.token = token;
                  res.status(201).json(response);
                })
                .catch(err => {
                  console.log(err);
                })
            })
            .catch(err => {
              res.status(500).json({
                error: err
              })
            })
        }
      })
      .catch(err => {
        res.status(500).json({
          error: true,
          message: "error Users find One"
        })
      })
  } else {
    response.message = "password doesn't match";
    res.status(500).json(response);
  }
});

// ================= POST LOGIN ======================
router.post('/login', function (req, res, next) {
  let { email, password } = req.body;
  let response = {
    message: "",
    data: {},
    token: ""
  }
  Users.findOne({ email })
    .then(data => {
      // console.log(data);
      bcrypt.compareSync(password, data.password)
        .then(isPasswordTrue => {
          console.log(isPasswordTrue)
          if (isPasswordTrue) {
            if (data.token) {
              response.token = data.token;
              response.data.email = email;
              response.message = "Login success!"
              res.status(201).json(response)
            } else {
              const newToken = data.getToken();
              Users.updateOne({ email: data.email }, { token: newToken })
                .then(() => {
                  response.token = newToken;
                  response.data.email = data.email;
                  response.message = "Login success!";
                  res.status(201).json(response);
                })
                .catch(err => {
                  response.message = "Update token failed"
                  res.status(200).json(response)
                })
            }
          } else {
            response.message = "Authentication failed";
            res.status(200).json(response);
          }
        })
        .catch(err => {
          response.message = "Authentication failed";
          res.status(500).json(response);
        })
    })
    .catch(err => {
      response.message = "Email doesn't exist"
      res.status(500).json(response);
    })
})

// ================= POST CHECK TOKEN ======================

// router.post('/check', function (req, res, next) {
//   let token = req.headers.authorization;
//   let response = {
//     valid: false
//   };

//   if (typeof token !== undefined) {
//     const decoded = jwt.verify(token, rahasia);
//     Users.find({ email: decoded.email })
//       .then(result => {
//         if (result) {
//           response.valid = true;
//           res.status(200).json(response);
//         } else {
//           res.status(500).json(response);
//         }
//       })
//       .catch(err => {
//         res.status(500).json(response);
//       })
//   }
// })

// ================= DESTROY TOKEN ======================
// router.get('/logout', function (req, res) {
//   let token = req.headers.authorization;
//   // let token = req.body.token;
//   let response = {
//     logout: false
//   }
//   if (token) {
//     const decoded = jwt.verify(token, rahasia);
//     Users.findOneAndUpdate({ email: decoded.email }, { token: undefined })
//       // .exec() // need a fully-fledged promise, use the .exec() function.
//       .then(user => {
//         if (user) {
//           response.logout = true;
//           res.status(200).json(response);
//         }
//         else {
//           res.status(500).json(response);
//         }
//       })
//   } else {
//     res.status(500).json(response);
//   }
// })


// testing jwt-verify to decode token
// router.get('/test', function (req, res) {
//   let token = req.headers.authorization;
//   const decoded = jwt.verify(token, rahasia);
//   res.json({
//     token: token,
//     decoded
//   })
// })


module.exports = router;
