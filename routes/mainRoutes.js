/**
 Module to handle comments request for urls
 */
var express = require('express');
var router = express.Router();
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var restUtils = require("../util/restUtils");
var logger = require('bunyan').createLogger({name: "ratingUtils.js"});
var mongoose = require('mongoose');
var SurfySchema = require("../persistence/schema/surfySchema.js");



/**
 * Get request for rating of a url
 */
router.get('/:url', function (req, res) {
    var url = req.params.url;
    SurfySchema.findOne({url: url}, function(err, surfyDoc){
        if (err) {
            sendErrorResponse(res, err);
            return;
        }
        if(surfyDoc == null){
            // no rating available yet
            res.json({success: false})
        } else {
            res.json({success: true, surfy: surfyDoc});
        }
    });
});

module.exports = router;
