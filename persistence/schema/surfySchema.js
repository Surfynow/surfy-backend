var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surfySchema = Schema({
    _id: Schema.ObjectId,
    url: String,
    rating: Number,
    numOfRaters: Number,
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

var surfyModel = mongoose.model('Surfy', surfySchema);
module.exports = surfyModel;