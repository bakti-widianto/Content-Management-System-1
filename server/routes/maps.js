var express = require('express');
var router = express.Router();
const Maps = require('../models/Maps');
// const { response } = require('express');

// ================ ADD ================
router.post('/', function (req, res) {
   let response = {
      success: false,
      message: "",
      data: {}
   }
   const { title, lat, long } = req.body;
   let maps = new Maps({
      title: title,
      lat: lat,
      long: long
   })
   maps.save()
      .then(data => {
         response.success = true;
         response.message = "data have been added";
         response.data._id = data._id;
         response.data.title = data.title;
         response.data.lat = data.lat;
         response.data.long = data.long;
         res.status(201).json(response);
      })
      .catch(err => {
         res.status(500).json(response);
      })
})

// ================ READ ================
router.get('/', function (req, res) {
   let response = {
      message: "maps data can't be found",
      data: {}
   }
   Maps.find()
      .then(data => {
         response = data.map(item => {
            return {
               '_id': item._id,
               'title': item.title,
               'lat': item.lat,
               'long': item.long
            }
         })
         res.status(200).json(response);
      })
      .catch(err => {
         res.status(500).json(response);
      })
})

// ================ EDIT ================
router.put('/:id', function (req, res) {
   let response = {
      success: false,
      message: "",
      data: {}
   }
   const { title, lat, long } = req.body;
   Maps.findByIdAndUpdate({ _id: req.params.id },
      { title: title, lat: lat, long: long },
      { new: true })
      .then(data => {
         response.success = true;
         response.message = "data have been updated";
         response.data._id = data._id;
         response.data.title = data.title;
         response.data.lat = data.lat;
         response.data.long = data.long;
         res.status(201).json(response);
      })
      .catch(err => {
         res.status(500).json(response);
      })
})

// ================ DELETE ================
router.delete('/:id', function (req, res) {
   let response = {
      success: false,
      message: "",
      data: {}
   }
   Maps.findOneAndRemove({ _id: req.params.id })
      .then(data => {
         response.success = true;
         response.message = "data have been deleted";
         response.data._id = data._id;
         response.data.title = data.title;
         response.data.lat = data.lat;
         response.data.long = data.long;
         res.status(201).json(response)
      })
      .catch(err => res.status(500).json(response))
})

// ================ FIND ================
router.get('/:id', function (req, res) {
   let response = {
      success: false,
      message: "data not found",
      data: {}
   }
   Maps.findOne({ _id: req.params.id })
      .then(data => {
         response.success = true;
         response.message = "data found";
         response.data._id = data._id;
         response.data.title = data.title;
         response.data.lat = data.lat;
         response.data.long = data.long;
         res.status(200).json(response)
      })
      .catch(err => res.status(500).json(response))
})

// ================ BROWSE ================
router.post('/search', function (req, res) {
   let response = [];
   let reg = new RegExp(req.body.title, 'i');
   let filter = {};

   if (req.body.title) {
      filter.title = { $regex: reg };
   } 

   Maps.find(filter)
      .then(data => {
         response = data.map(item => {
            return {
               _id: item._id,
               title: item.title,
               lat: item.lat,
               long: item.long
            }
         })
         res.status(200).json(response);
      })
      .catch(err => res.status(500).json(response))
})

module.exports = router;