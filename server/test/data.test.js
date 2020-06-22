'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Data = require("../models/Data");
const { expect } = require('chai');
const should = chai.should();
chai.use(chaiHTTP);

describe('data', function () {
   Data.collection.drop();

   beforeEach(function (done) {
      let data = new Data({
         'letter': 'A',
         'frequency': 1.1
      });

      data.save(function (err) {
         if (err) console.log(err);
         else {
            done();
         }
      })
   })

   afterEach(function (done) {
      Data.collection.drop();
      done();
   })

   // test list daftar data
   it('Menampilkan list DATA didapatkan dengan metode GET', function (done) {
      chai.request(server)
         .get('/api/data/')
         .end(function (err, res) {
            console.log('dari list DATA: ', res.body)
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
   it('seharusnya add DATA berhasil di tambahkan dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/data/')
         .send({
            'letter': 'B',
            'frequency': 1.2
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

   // // test datadate edit
   it('Melakukan pengeditan DATA dengan metode PUT', function (done) {
      chai.request(server)
         .get('/api/data/')
         .end(function (err, res) {
            const id = res.body[0]._id;
            chai.request(server)
               .put(`/api/data/${id}`)
               .send({
                  letter: 'C',
                  frequency: 1.3
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
                  response.body.data.letter.should.equal('C');
                  response.body.data.frequency.should.equal(1.3);
                  done()
               })
         })
   })


   // test delete datadate
   it('testing DELETE DATA dengan metode DELETE', function (done) {
      chai.request(server)
         .post('/api/data/')
         .send({
            'letter': 'C',
            'frequency': 1.3
         })
         .end(function (err, res) {
            const id = res.body.data._id
            chai.request(server)
               .delete(`/api/data/${id}`)
               .end(function (err, response) {
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.success.should.equal(true);
                  response.body.message.should.equal("data have been deleted");
                  response.body.data.letter.should.be.a("string");
                  response.body.data.frequency.should.be.a("number");
                  response.body.data.letter.should.equal("C");
                  response.body.data.frequency.should.equal(1.3);
                  done()
               })
         })
   })

   // // testing find Data-Date menggunakan metode GET
   it('testing FIND DATA dengan metode GET', function (done) {
      chai.request(server)
         .post('/api/data/')
         .send({
            'letter': 'C',
            'frequency': 1.3
         })
         .end(function (err, res) {
            const id = res.body.data._id
            chai.request(server)
               .get(`/api/data/${id}`)
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
                  response.body.data.letter.should.equal("C");
                  response.body.data.frequency.should.equal(1.3);
                  done()
               })
         })
   })

   // // testing browse
   it('testing BROWSE DATA path /api/data/<id> dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/data/')
         .send({
            'letter': 'B',
            'frequency': 1.2
         })
         .end(function (err, res1) {
            chai.request(server)
               .post('/api/data/')
               .send({
                  'letter': 'C',
                  'frequency': 1.3
               })
               .end(function (err, res2) {
                  chai.request(server)
                     .post(`/api/data/search`)
                     .send({ 'frequency': 1.3 }) //browse with frequency
                     .end(function (err, res3) {
                        res3.should.have.status(200);
                        res3.should.be.json;
                        res3.body.should.be.a('array');
                        res3.body.length.should.equal(1);
                        res3.body[0].should.have.property('_id');
                        res3.body[0].should.have.property('letter');
                        res3.body[0].letter.should.equal('C');
                        res3.body[0].frequency.should.equal(1.3);
                        chai.request(server)
                           .post(`/api/data/search`)
                           .send({ 'letter': 'B' }) //browse with letter
                           .end(function (err, res4) {
                              res4.should.have.status(200);
                              res4.should.be.json;
                              res4.body.should.be.a('array');
                              res4.body.length.should.equal(1);
                              res4.body[0].should.have.property('_id');
                              res4.body[0].should.have.property('letter');
                              res4.body[0].should.have.property('frequency');
                              res4.body[0].letter.should.equal('B');
                              res4.body[0].frequency.should.equal(1.2);
                              chai.request(server)
                                 .post(`/api/data/search`)
                                 .send({ 'frequency': '1.1', 'letter': 'A' })
                                 .end(function (err, res5) {
                                    res5.should.have.status(200);
                                    res5.should.be.json;
                                    res5.body.should.be.a('array');
                                    res5.body.length.should.equal(1);
                                    res5.body[0].should.have.property('_id');
                                    res5.body[0].should.have.property('letter');
                                    res5.body[0].should.have.property('frequency');
                                    res5.body[0].letter.should.equal('A');
                                    res5.body[0].frequency.should.equal(1.1);
                                    done()
                                 })
                           })
                     })
               })
         })
   })

});
