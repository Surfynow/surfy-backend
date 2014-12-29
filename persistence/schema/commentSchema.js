var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = mongoose.Schema({
    _id: Schema.ObjectId,
    url: String,
    comments: [
        {
            comment: String,
            author: String,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
