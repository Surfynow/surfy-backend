/**
Module to handle ratings request for urls
*/
var express = require('express');
var router = express.Router();


router.get('/:link', function(req, res) {
  var randomRating = Math.ceil( Math.random() * 10 ) % 5 + 1;
  console.log("returning rating of " + randomRating);
  res.json({rating: randomRating});
});

module.exports = router;
