var mongoose = require('mongoose');
var logger = require('bunyan').createLogger({name: "connection.js"});;
mongoose.connect('mongodb://localhost/surfy');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    logger.info("Successfully connected to mongodb")
});

module.exports = db;
