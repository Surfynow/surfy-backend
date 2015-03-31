var User = require("../persistence/schema/userSchema.js");

function SessionManager() {

    function isUserLoggedIn(code) {
        //is code exchanged with a token ? find email for token

        var
        User.findOne({ code: code }, function(err, res){

        });
    }
}