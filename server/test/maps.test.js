'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Maps = require("../models/Maps");
const { expect } = require('chai');
const should = chai.should();
chai.use(chaiHTTP);

describe('maps', function () {
   Maps.collection.drop();

   beforeEach(function (done) {
      let maps = new Maps({
         title: 'Cihampelas Walk',
         lat: -6.8965475,
         long: 107.6103536
      });

      maps.save(function (err) {
         if (err) console.log(err);
         else {
            done();
         }
      })
   })

   afterEach(function (done) {
      Maps.collection.drop();
      done();
   })

   // test list daftar Maps-Date
   it('Menampilkan daftar datadate didapatkan dengan metode GET', function (done) {
      chai.request(server)
         .get('/api/maps/')
         .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('lat');
            res.body[0].should.have.property('long');
            res.body[0].title.should.equal('Cihampelas Walk');
            res.body[0].lat.should.equal(-6.8965475);
            res.body[0].long.should.equal(107.6103536);
            done();
         })
   })

   // test add data maps
   it('seharusnya data MAPS berhasil di tambahkan dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/maps/')
         .send({
            'title': 'Trans Studio Mall',
            'lat': -6.9261257,
            'long': 107.6343728
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
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('lat');
            res.body.data.should.have.property('long');
            done();
         })
   })

   // test data maps edit
   it('Melakukan pengeditan maps dengan metode PUT', function (done) {
      chai.request(server)
         .get('/api/maps/')
         .end(function (err, res) {
            const id = res.body[0]._id;
            chai.request(server)
               .put(`/api/maps/${id}`)
               .send({
                  title: 'Trans Studio Mall',
                  lat: -6.9261257,
                  long: 107.6343728
               })
               .end(function (err, response) {
                  response.should.have.status(201);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.data.should.have.property('_id');
                  response.body.data.should.have.property('title');
                  response.body.data.should.have.property('lat');
                  response.body.message.should.equal('data have been updated');
                  response.body.success.should.equal(true);
                  response.body.data.title.should.equal('Trans Studio Mall');
                  response.body.data.lat.should.equal(-6.9261257);
                  response.body.data.long.should.equal(107.6343728);
                  done()
               })
         })
   })


   // test delete datadate
   it('testing delete maps data dengan metode DELETE', function (done) {
      chai.request(server)
         .post('/api/maps/')
         .send({
            title: 'Trans Studio Mall',
            lat: -6.9261257,
            long: 107.6343728
         })
         .end(function (err, res) {
            const id = res.body.data._id
            chai.request(server)
               .delete(`/api/maps/${id}`)
               .end(function (err, response) {
                  response.should.have.status(201);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.success.should.equal(true);
                  response.body.message.should.equal("data have been deleted");
                  response.body.data.title.should.equal('Trans Studio Mall');
                  response.body.data.lat.should.equal(-6.9261257);
                  response.body.data.long.should.equal(107.6343728);
                  done()
               })
         })
   })

   // testing find maps menggunakan metode GET
   it('testing FIND data date dengan metode GET', function (done) {
      chai.request(server)
         .post('/api/maps/')
         .send({
            title: 'Trans Studio Mall',
            lat: -6.9261257,
            long: 107.6343728
         })
         .end(function (err, res) {
            const id = res.body.data._id
            chai.request(server)
               .get(`/api/maps/${id}`)
               .end(function (err, response) {
                  response.should.have.status(200);
                  response.should.be.json;
                  response.body.should.be.a('object');
                  response.body.should.have.property('success');
                  response.body.should.have.property('message');
                  response.body.should.have.property('data');
                  response.body.data.should.have.property('_id');
                  response.body.data.should.have.property('title');
                  response.body.data.should.have.property('lat');
                  response.body.data.should.have.property('long');
                  response.body.success.should.equal(true);
                  response.body.message.should.equal("data found");
                  response.body.data._id.should.equal(`${id}`);
                  response.body.data.title.should.equal('Trans Studio Mall');
                  response.body.data.lat.should.equal(-6.9261257);
                  response.body.data.long.should.equal(107.6343728);
                  done()
               })
         })
   })

   // testing browse
   it('testing BROWSE data maps path /api/maps/<id> dengan metode POST', function (done) {
      chai.request(server)
         .post('/api/maps/')
         .send({
            'title': 'Trans Studio Mall',
            'lat': -6.9261257,
            'long': 107.6343728
         })
         .end(function (err, res1) {
            chai.request(server)
               .post(`/api/maps/search`)
               .send({ 'lat': -6.9261257 }) //browse with latitude
               .end(function (err, res2) {
                  res2.should.have.status(200);
                  res2.should.be.json;
                  res2.body.should.be.a('array');
                  res2.body.length.should.equal(2);
                  res2.body[0].should.have.property('_id');
                  res2.body[0].should.have.property('title');
                  res2.body[0].should.have.property('lat');
                  res2.body[0].should.have.property('long');
                  res2.body[0].title.should.equal('Trans Studio Mall');
                  res2.body[0].lat.should.equal(-6.9261257);
                  res2.body[0].long.should.equal(107.6343728);
                  chai.request(server)
                     .post(`/api/maps/search`)
                     .send({ 'long': 107.6103536 }) //browse with longitude
                     .end(function (err, res3) {
                        res3.should.have.status(200);
                        res3.should.be.json;
                        res3.body.should.be.a('array');
                        res3.body.length.should.equal(1);
                        res3.body[0].should.have.property('_id');
                        res3.body[0].should.have.property('title');
                        res3.body[0].should.have.property('lat');
                        res3.body[0].should.have.property('long');
                        res3.body[0].title.should.equal('Cihampelas Walk');
                        res3.body[0].lat.should.equal(-6.8965475);
                        res3.body[0].long.should.equal(107.6103536);
                        chai.request(server)
                           .post(`/api/maps/search`)
                           .send({ 'long': 107.6103536, 'lat': -6.8965475 }) //browse with longitude
                           .end(function (err, res3) {
                              res3.should.have.status(200);
                              res3.should.be.json;
                              res3.body.should.be.a('array');
                              res3.body.length.should.equal(1);
                              res3.body[0].should.have.property('_id');
                              res3.body[0].should.have.property('title');
                              res3.body[0].should.have.property('lat');
                              res3.body[0].should.have.property('long');
                              res3.body[0].title.should.equal('Cihampelas Walk');
                              res3.body[0].lat.should.equal(-6.8965475);
                              res3.body[0].long.should.equal(107.6103536);
                              done()
                           })
                     })
               })
         })
   })


});
