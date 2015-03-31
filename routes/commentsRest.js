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

//TODO Remove from here
var request = require('superagent');
/**
 * {
 *      url: "http:google.com",
 *      author: "John",
 *      comment: "This is a good article"
 * }
 */
var commentPostModel = {
    id: "commentPostModel",
    type: "object",
    properties: {
        url: {"type": "string", required: true},
        author: {"type": "string", required: false},
        comment: {"type": "string", required: true},
        token:  {"type": "string", required: false}
    }
};

validator.addSchema(commentPostModel);

router.post('/', function (req, res) {
    var comment = req.body;
    var validationErrors = validator.validate(comment, commentPostModel).errors;

    //todo move from here
//    request.get("https://graph.facebook.com/v2.3/oauth/access_token").accept('application/json')
//        .query({
//            "client_id": "589345354543549",
//            "redirect_uri": "https://bpdkbpfeglhbhjgiilnglmccihbhhhad.chromiumapp.org/testSurfy",
//            "client_secret": "b31da96ecc03c7009852c246532fb90e",
//            "code": comment.token
//        }).end(function(err, res){
//            console.log(res.body)
//        });

    request.post("https://www.googleapis.com/oauth2/v3/token").accept('application/json')
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
            "code": comment.token,
//            "grant_type": "authorization_code",
            "client_id": "359268642661-pgl0nrhc6jjoau5v22anrm9d2btbc6d1.apps.googleusercontent.com",
            "client_secret": "foCTZFRkSjikWoU-Qe7RHYfK",
            "redirect_uri": "https://bpdkbpfeglhbhjgiilnglmccihbhhhad.chromiumapp.org/testSurfy"
        }).end(function (err, res) {
            console.log(res);
            console.log(res.body);
        });


    if (validationErrors.length > 0) {
        restUtils.sendErrorResponse(res, validationErrors);
        return;
    }
    SurfySchema.findOne({url: comment.url}, function (err, commentObj) {
        if (err) {
            sendErrorResponse(res, err);
            return;
        }
        logger.debug("adding comment for url" + comment.url);
        var commentPost = {
            comment: comment.comment,
            author: comment.author
        };

        if (commentObj === null) {
            logger.debug("new url seen for comments" + comment.url);
            commentObj = new SurfySchema({
                _id: mongoose.Types.ObjectId(),
                url: comment.url,
                comments: [commentPost]
            });
        } else {
            commentObj.comments.push(comment)
        }
        commentObj.save(function (err, document) {
            if (err) {
                sendErrorResponse(res, err);
                return;
            }
            res.json(document)
        });
    });
});

module.exports = router;
