var express = require('express');
var router = express.Router();
const DataDate = require('../models/DataDate');
const { response } = require('express');

// add date-data
router.post('/', function (req, res) {
   let response = {
      success: false,
      message: "",
      data: {}
   }
   const { letter, frequency } = req.body;
   let dataDate = new DataDate({
      letter: letter,
      frequency: frequency
   })
   dataDate.save()
      .then(data => {
         response.success = true;
         response.message = "data have been added";
         response.data._id = data._id;
         response.data.letter = data.letter;
         response.data.frequency = data.frequency;
         res.status(201).json(response);
      })
      .catch(err => {
         response.message = "failed to add data";
         res.status(500).json(response);
      })
})

router.get('/', function (req, res) {
   let response = [];
   DataDate.find()
      .then(data => {
         response = data.map(item => {
            return {
               '_id': item._id,
               'letter': item.letter,
               'frequency': item.frequency
            }
         })
         res.status(200).json(response);
      })
      .catch(err => {
         res.status(500).json(response);
      })
})

router.put('/:id', function (req, res) {
   let response = {
      success: false,
      message: "",
      data: {}
   }
   const { letter, frequency } = req.body;
   DataDate.findByIdAndUpdate(
      { _id: req.params.id },
      { letter: letter, frequency: frequency },
      { new: true })
      .then(data => {
         response.message = "data have been updated";
         response.success = true;
         response.data._id = data._id;
         response.data.letter = data.letter;
         response.data.frequency = data.frequency;
         res.status(201).json(response);
      })
      .catch(err => res.status(500).json(response));
})

router.delete('/:id', function (req, res) {
   let response = {
      success: false,
      message: "",
      data: {}
   }
   DataDate.findOneAndRemove({ _id: req.params.id })
      .then(data => {
         response.success = true;
         response.message = "data have been deleted";
         response.data._id = data._id;
         response.data.letter = data.letter;
         response.data.frequency = data.frequency;
         res.json(response)
      })
      .catch(err => res.json(response))
})


module.exports = router;