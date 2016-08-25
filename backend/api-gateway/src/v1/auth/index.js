
//
// Auth routes
//  - returns the auth methods
//    which validate requests
//    using the User Service
//

// includes
var request = require('request');

module.exports = function(router) {

    //
    // Main Authentication middleware methods
    //
    var auth = {

        // verify a request via jwt
        jwt : function(req, res, next) {

            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            // attempt to pass the req 
            // information to the Auth service
            // to verify it is valid
            request({
                uri : process.env.USER_SERVICE_ENDPOINT+'/v1/auth', 
                method : 'POST',
                json : {
                    token : token,
                    path  : req._parsedUrl.path,
                    method : req.method
                }
            }, function(err, response, body){
                if(err) {
                    return res.status(500).json(err);
                }

                // failed
                if(response.statusCode == 403) {
                    return res.status(403).json(body);
                }

                // pass along our authenticated
                // user to our request for 
                // object permission validation
                req.headers['x-authorized'] = body._doc.group+'_'+body._doc._id;

                next();
            });
        }

        // TODO other types of auth?

    };

    //
    // Login obtain a token from the user-service
    //
    router.post('/login', function(req, res) {

        // TODO only do this if we want jwt auth
        // what other types might we have?
        // TODO make this a method
        request({
            uri : process.env.USER_SERVICE_ENDPOINT+'/v1/token', 
            method : 'POST',
            json : { 
                username : req.body.username,
                password : req.body.password
            }
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            // failed
            if(response.statusCode == 403) {
                return res.status(403).json(body);
            }

            res.json(body);
        });
    });

    //
    // Register a user
    //
    router.post('/register', function(req, res) {

        // set group to user
        var user = req.body;
        user.group = 'user';
            
        // create a user
        request({
            uri: process.env.USER_SERVICE_ENDPOINT+'/v1/user',
            method: 'POST',
            json: user,
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            // set a token for this
            // new registed user
            // TODO make this a method
            request({
                uri : process.env.USER_SERVICE_ENDPOINT+'/v1/token', 
                method : 'POST',
                json : { 
                    username : user.username,
                    password : user.password
                }
            }, function(err, response, token){
                if(err) {
                    return res.status(500).json(err);
                }

                // failed
                if(response.statusCode == 403) {
                    return res.status(403).json(body);
                }

                user.token = token;
                res.json(user);
            });

        });

    });

    // TODO should these be here?
    /////////////////////////////

    //
    // Forgot password
    //
    router.post('/reset-password', auth.jwt, function(req, res) {

        // TODO
        
        res.json({ message: 'Reset Password!' });   
    });

    //
    // Forgot username
    //
    router.post('/reset-username', auth.jwt, function(req, res) {

        // TODO

        res.json({ message: 'Reset Username!' });   
    });

    // make auth methods
    // available to scope
    return auth;
};