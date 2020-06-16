'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const User = require("../models/Users");
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
            //terakhir edit
         })
   })


});
