var mongoose = require('mongoose');
var logger = require('bunyan').createLogger({name: "connection.js"});
var mongourl = process.env.SURFY_MONGO_URL || 'mongodb://localhost/surfy';
mongoose.connect(mongourl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    logger.info("Successfully connected to mongodb")
});

module.exports = db;
