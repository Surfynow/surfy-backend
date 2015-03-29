var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = mongoose.Schema({
    _id: Schema.ObjectId,
    url: String,
    rating: Number,
    numOfRaters: Number,
    isHot: Boolean
});

var Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
