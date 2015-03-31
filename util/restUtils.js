var logger = require('bunyan').createLogger({name: "ratingUtils.js"});
var restUtils = require("../util/restUtils");

var restUtils = {
    sendErrorResponse: function (res, err) {
        logger.error("Sending error response");
        res.status(500).send("failed to save because of " + err);
    }
};

module.exports = restUtils;
