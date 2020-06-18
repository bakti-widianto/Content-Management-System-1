'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const DataDate = require("../models/DataDate");
const { expect } = require('chai');
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {
   DataDate.collection.drop();

   beforeEach(function (done) {
      let dataDate = new DataDate({
         letter: '2017-12-31',
         frequency: 1.2
      });

      dataDate.save(function (err) {
         if (err) console.log(err);
         else {
            done();
         }
      })
   })

   afterEach(function (done) {
      DataDate.collection.drop();
      done();
   })

   // test list daftar datadate
   it('Menampilkan daftar datadate didapatkan dengan metode GET', function (done) {
      chai.request(server)
         .get('/api/datadate/')
         .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('letter');
            res.body[0].should.have.property('frequency');
            res.body[0].should.be.a('object');
            done();
         })
   })

   // test add datadate
   it('seharusnya data date berhasil di tambahkan dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/datadate/')
         .send({
            'letter': '2015-11-30',
            'frequency': 1.1
         })
         .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.message.should.equal('data have been added');
            res.body.success.should.equal(true);
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('letter');
            res.body.data.should.have.property('frequency');
            done();
         })
   })

   // test datadate edit
   it('Melakukan pengeditan datadate dengan metode PUT', function (done) {
      chai.request(server)
         .get('/api/datadate/')
         .end(function (err, res) {
            const id = res.body[0]._id;
            chai.request(server)
               .put(`/api/datadate/${id}`)
               .send({
                  letter: '2016-11-30',
                  frequency: 1.1
               })
               .end(function (err, response) {
                  response.should.have.status(201);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.data.should.have.property('_id');
                  response.body.data.should.have.property('letter');
                  response.body.data.should.have.property('frequency');
                  response.body.message.should.equal('data have been updated');
                  response.body.success.should.equal(true);
                  response.body.data.letter.should.equal('2016-11-30');
                  response.body.data.frequency.should.equal(1.1);
                  done()
               })
         })
   })


   // // test delete datadate
   it('testing delete data date dengan metode DELETE', function (done) {
      chai.request(server)
         .post('/api/datadate/')
         .send({
            'letter': '2015-11-30',
            'frequency': 1.1
         })
         .end(function (err, res) {
            const id = res.body.data._id
            chai.request(server)
               .delete(`/api/datadate/${id}`)
               .end(function (err, response) {
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.success.should.equal(true);
                  response.body.message.should.equal("data have been deleted");
                  response.body.data.letter.should.equal("2015-11-30");
                  response.body.data.frequency.should.equal(1.1);
                  done()
               })
         })
   })

   // testing find Data-Date menggunakan metode GET
   it('testing FIND data date dengan metode GET', function (done) {
      chai.request(server)
         .post('/api/datadate/')
         .send({
            'letter': '2015-11-30',
            'frequency': 1.1
         })
         .end(function (err, res) {
            const id = res.body.data._id
            chai.request(server)
               .get(`/api/datadate/${id}`)
               .end(function (err, response) {
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.data.should.have.property('_id');
                  response.body.data.should.have.property('letter');
                  response.body.data.should.have.property('frequency');
                  response.body.success.should.equal(true);
                  response.body.message.should.equal("data found");
                  response.body.data._id.should.equal(`${id}`);
                  response.body.data.letter.should.equal("2015-11-30");
                  response.body.data.frequency.should.equal(1.1);
                  done()
               })
         })
   })

   // testing browse
   it('testing BROWSE data date dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/datadate/')
         .send({
            'letter': '2001-01-01',
            'frequency': 1.1
         })
         .end(function (err, res1) {
            chai.request(server)
               .post('/api/datadate/')
               .send({
                  'letter': '2001-02-02',
                  'frequency': 1.1
               })
               .end(function (err, res2) {
                  chai.request(server)
                     .get('/api/datadate')
                     .end(function (err, res3) {
                        chai.request(server)
                           .post(`/api/datadate/search`)
                           .send({ 'frequency': 1.1 })
                           .end(function (err, res4) {
                              res4.should.have.status(200);
                              res4.should.be.json;
                              res4.body.should.be.a('array');
                              res4.body.length.should.equal(2);
                              chai.request(server)
                                 .post(`/api/datadate/search`)
                                 .send({ 'letter': '2001-02-02' })
                                 .end(function (err, res5) {
                                    res5.should.have.status(200);
                                    res5.should.be.json;
                                    res5.body.should.be.a('array');
                                    res5.body.length.should.equal(1);
                                    chai.request(server)
                                       .post(`/api/datadate/search`)
                                       .send({ 'frequency': '1.2' })
                                       .end(function (err, res6) {
                                          res6.should.have.status(200);
                                          res6.should.be.json;
                                          res6.body.should.be.a('array');
                                          res6.body.length.should.equal(1);
                                          res6.body[0].should.have.property('_id');
                                          res6.body[0].should.have.property('letter');
                                          res6.body[0].should.have.property('frequency');
                                          done()
                                       })
                                 })
                           })
                     })
               })
         })
   })




});
