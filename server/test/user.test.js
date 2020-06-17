'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const User = require("../models/Users");
const { expect } = require('chai');
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {
   User.collection.drop();

   beforeEach(function (done) {
      let user = new User({
         email: "dumadoniagara@gmail.com",
         password: "leb4hGant3nG",
         token: ''
      });

      user.save(function (err) {
         if (err) console.log(err);
         else {
            done();
         }
      })
   })

   afterEach(function (done) {
      User.collection.drop();
      done();
   })

   // test list daftar user
   it('seharusnya data daftar user didapatkan dengan metode GET', function (done) {
      chai.request(server)
         .get('/api/users/list')
         .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('email');
            res.body[0].should.have.property('password');
            res.body[0].should.have.property('token');
            res.body[0].email.should.equal('dumadoniagara@gmail.com');
            done();
         })
   })


   // test register user
   it('seharusnya data user berhasil di masukan dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/users/register')
         .send({
            'email': 'admin01@gmail.com',
            'password': '010203',
            'retypepassword': '010203'
         })
         .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.should.have.property('token');
            expect(res.body.token).to.exist;
            res.body.message.should.equal('register success');
            res.body.data.email.should.equal('admin01@gmail.com');
            done();
         })
   })

   // test login user
   it('seharusnya berhasil login dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/users/login')
         .send({
            'email': 'dumadoniagara@gmail.com',
            'password': 'leb4hGant3nG'
         })
         .end(function (err, res) {
            // console.log(res.body);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.have.property('data');
            res.body.should.have.property('message');
            res.body.message.should.equal('Login success!');
            expect(res.body.token).to.exist;
            res.body.data.should.be.a('object');
            res.body.data.email.should.equal('dumadoniagara@gmail.com');
            done()
         })
   })

   // test check token
   chai.request(server)
      .post('/api/users/login')
      .send({
         'email': 'dumadoniagara@gmail.com',
         'password': 'leb4hGant3nG'
      })
      .end(function (err, res) {
         // console.log(res.body);
         // const token = res.body.token;
         // chai.request(server)
         //          .post('/api/users/check')
         //          .set('authorization', token)
         //          .end(function (err, response) {
         //             response.should.have.status(200);
         //             ressponse.should.be.json;
         //             ressponse.body.should.be.a('object');
         //             ressponse.body.should.have.property('valid');
         //             ressponse.body.valid.should.equal(true);
         //             done()
         //          });
      })

   // test logout
   // chai.request(server)
   //    .post('/api/user/login')
   //    .send({
   //       'email': "dumadoniagara@gmail.com",
   //       'password': "leb4hGant3nG"
   //    })
   //    .end(function (err, res) {
   //       console.log(res);
   //       const token = res.body.token;
   //       chai.request(server)
   //          .get('/api/user/check')
   //          .set('authorization', token)
   //          .end(function (err, res) {
   //             console.log(res);
   //             res.should.have.status(200);
   //             res.should.be.json;
   //             res.body.should.be.a('object');
   //             res.body.should.have.property('logout');
   //             res.body.valid.should.equal(true);
   //             done()
   //          });
   //    })

});
