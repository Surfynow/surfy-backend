/**
Module to handle comments request for urls
*/
var express = require('express');
var router = express.Router();


router.get('/:link', function(req, res) {
  var comments = {
  		link: req.params.link,
		comments:   		
  		[
    
  			{
		  		author: "Rizwan",
  				comment: "This page is awesome"
		  	},
		  	{
  				author: "Sharif",
		  		comment: "This page sucks"
		  	},
		  	{
  				author: "Mikhael",
		  		comment: "Who cares, i am just hungry"
		  	}
	  ]
  }
  res.send(comments);
});

module.exports = router;
