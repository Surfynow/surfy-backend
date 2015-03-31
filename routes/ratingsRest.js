var express = require('express');
var router = express.Router();
var logger = require('bunyan').createLogger({name: "ratingRest.js"});
var SurfySchema = require("../persistence/schema/surfySchema.js");
var Validator = require('jsonschema').Validator;
var validator = new Validator();

var mongoose = require('mongoose');


/**
 *
 * Schema to represent the SurfySchema post object in request
 */
var ratingPostModel = {
    id: "ratingPostModel",
    type: "object",
    properties: {
        url: {"type": "string", "required": true},
        rating: {"type": "number", "required": true}
    }
};

validator.addSchema(ratingPostModel);

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
    SurfySchema.findOne({url: body.url}, function (err, rating) {
        if (err) {
            sendErrorResponse(res, err);
            return;
        }
        if (rating === null) {
            logger.debug("new url seen " + body.url);
            rating = new SurfySchema({
                _id: mongoose.Types.ObjectId(),
                url: body.url,
                rating: 0,
                numOfRaters: 0
            });
        }
        logger.debug("updating rating for " + rating);
        var newCalcuatedRating = (rating.rating * rating.numOfRaters + body.rating) / (rating.numOfRaters + 1);
        rating.numOfRaters = rating.numOfRaters + 1;
        rating.rating = newCalcuatedRating;
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

