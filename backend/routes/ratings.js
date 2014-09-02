/**
Module to handle ratings request for urls
*/
var express = require('express');
var router = express.Router();


router.get('/:link', function(req, res) {
  console.log(req.params)
  res.send(req.params.link + " is 5 star");
});

module.exports = router;
