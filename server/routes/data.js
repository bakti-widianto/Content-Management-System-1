var express = require('express');
var router = express.Router();
const Data = require('../models/Data')


/* POST add data. */
router.post('/', (req, res, next) => {
  let response = {
    success: false,
    message: '',
    data: {}
  }
  const data = new Data({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  data.save().then(data => {
    response.success = true;
    response.message = 'data have been added';
    response.data._id = data._id;
    response.data.letter = data.letter;
    response.data.frequency = data.frequency;
    res.status(201).json(response)
  }).catch(err => {
    response.message = err;
    res.status(401).json(response)
  })
})

/* POST search data */
router.post('/search', (req, res, next) => {
  let response = [];
  Data.find(req.body).then(data => {
    response = data.map(item => {
      return {
        _id: item._id,
        letter: item.letter,
        frequency: item.frequency
      }
    })
    res.status(200).json(response);
  }).catch(err => {
    res.status(401).json(err);
  })
})

/* PUT edit data */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { letter, frequency } = req.body;
  let response = {
    success: false,
    message: '',
    data: {}
  }
  Data.findOne({ _id: id }).then(data => {
    if (!data) {
      response.message = 'data not found'
      res.status(404).json(response);
    }
    data.letter = letter;
    data.frequency = frequency;
    data.save().then(update => {
      response.success = true;
      response.message = 'data have been updated';
      response.data._id = update._id;
      response.data.letter = update.letter;
      response.data.frequency = update.frequency;
      res.status(201).json(response)
    }).catch(err => {
      response.message = err;
      res.status(404).json(response);
    })
  }).catch(err => console.error(err));
})

/* GET Find data */
router.get('/:id', function (req, res) {
  let response = {
    success: false,
    message: "data not found",
    data: {}
  }
  Data.findOne({ _id: req.params.id })
    .then(data => {
      response.success = true;
      response.message = "data found";
      response.data._id = data._id;
      response.data.letter = data.letter;
      response.data.frequency = data.frequency;
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(response))
})


/* GET read data */
router.get('/', (req, res, next) => {
  let response = []
  Data.find()
    .then((data) => {
      data.forEach(item => {
        response.push({
          _id: item._id,
          letter: item.letter,
          frequency: item.frequency
        })
      })
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err));
})


/* GET delete data */
router.delete('/:id', function (req, res) {
  let response = {
    success: false,
    message: "",
    data: {}
  }
  Data.findOneAndRemove({ _id: req.params.id })
    .then(data => {
      response.success = true;
      response.message = "data have been deleted";
      response.data._id = data._id;
      response.data.letter = data.letter;
      response.data.frequency = data.frequency;
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(response))
})



module.exports = router;