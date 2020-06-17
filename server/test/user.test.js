'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const User = require("../models/Users");
const { expect } = require('chai');
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {

   beforeEach(function (done) {
      let user = new User({
         email: "dumadoniagara@gmail.com",
         password: "leb4hGant3nG",
         token: ""
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
            'email': 'saptodoang@gmail.com',
            'password': 'sapt0GanTenG50'
         })
         .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.should.have.property('token');
            expect(res.body.token).to.exist;
            res.body.message.should.equal('register success');
            res.body.data.email.should.equal('saptodoang@gmail.com');
            done();
         })
   })

   // test login user
   it('seharusnya berhasil login dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/users/login')
         .send({
            'email': "dumadoniagara@gmail.com",
            'password': "leb4hGant3nG"
         })
         .end(function (err, res) {
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
         })
   })

   // test check token



});
