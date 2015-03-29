var express = require('express');
var router = express.Router();
var logger = require('bunyan').createLogger({name: "ratingRest.js"});
var Rating = require("../persistence/schema/ratingSchema.js");
var Validator = require('jsonschema').Validator;
var validator = new Validator();

var mongoose = require('mongoose');

/**
 *
 * Schema to represent the Rating post object in request
 */
var ratingPostModel = {
    id: "ratingPostModel",
    type: "object",
    properties: {
        url: {"type": "string", "required": true},
        rating: {"type": "string", "required": true}
    }
};

validator.addSchema(ratingPostModel);

/**
 * Get request for rating of a url
 */
router.get('/:url', function (req, res) {
    var url = req.params.url;
    Rating.findOne({url: url}, function (err, rating) {
        if (err) {
            sendErrorResponse(res, err);
            return;
        }
        if (rating == null) {
            // no rating available yet
            res.json({success: false})
        } else {
            res.json({success: true, rating: rating});
        }
    });
});

/**
 *  Endpoint to handle posting a new rating
 */
router.post('/', function (req, res) {
    var body = req.body;
    var validationErrors = validator.validate(body, ratingPostModel).errors;
    if (validationErrors.length > 0) {
        sendErrorResponse(res, validationErrors);
        return;
    }
    Rating.findOne({url: body.url}, function (err, rating) {
        if (err) {
            sendErrorResponse(res, err);
            return;
        }

        if (rating === null) {
            logger.debug("new url seen " + body.url);
            rating = new Rating({
                _id: mongoose.Types.ObjectId(),
                url: body.url,
                rating: 0,
                numOfRaters: 0,
                isHot: false
            });
        }

        logger.debug("updating rating for " + rating);
        var newCalculatedRating = (rating.rating * rating.numOfRaters + parseFloat(body.rating)) / (rating.numOfRaters + 1);
        rating.numOfRaters = rating.numOfRaters + 1;
        rating.rating = newCalculatedRating;
        rating.isHot = rating.numOfRaters > 10 && newCalculatedRating > 4;

        rating.save(function (err, document) {
            if (err) {
                sendErrorResponse(res, err);
                return;
            }
            res.json(document)
        });
    });
});

var sendErrorResponse = function (res, err) {
    logger.error("Sending error response");
    res.status(500).send("failed to save because of " + err);
};
module.exports = router;

