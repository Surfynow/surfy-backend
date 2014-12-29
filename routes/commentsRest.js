/**
 Module to handle comments request for urls
 */
var express = require('express');
var router = express.Router();
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var restUtils = require("../util/restUtils");
var Comment = require("../persistence/schema/commentSchema.js");
var logger = require('bunyan').createLogger({name: "ratingUtils.js"});
var mongoose = require('mongoose');

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
        comment: {"type": "string", required: true}
    }
};

validator.addSchema(commentPostModel);

router.post('/', function (req, res) {
    var comment = req.body;
    var validationErrors = validator.validate(comment, commentPostModel).errors;
    if (validationErrors.length > 0) {
        restUtils.sendErrorResponse(res, validationErrors);
        return;
    }
    Comment.findOne({url: comment.url}, function (err, commentObj) {
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
            commentObj = new Comment({
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

router.get('/:url', function (req, res) {
    var comments = Comment.findOne({url: req.params.url}, function (err, comments) {
        if (err) {
            sendErrorResponse(res, err);
            return;
        }
        res.send(comments);
    });

});

module.exports = router;
