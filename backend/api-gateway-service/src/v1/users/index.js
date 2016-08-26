
//
// User API routes
//  - routes secured by jwt
//

// include libs
var request = require('request');

// TODO create a custom request lib that
// adds the x-authorized header to all requests?

module.exports = function(router, auth) {

    // 
    // get all users
    //
    router.get('/user', auth.jwt, function(req, res) {
        
        request({
            uri: process.env.USER_SERVICE_ENDPOINT+'/v1/user',
            method : 'GET',
            headers : {
                'content-type' : 'application/json',
                'x-authorized' : req.headers['x-authorized']
            },
            json:true
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(body);
        });

    });

    // 
    // get a specific user
    //
    router.get('/user/:id', auth.jwt, function(req, res) {
        
        request.get({
            uri: process.env.USER_SERVICE_ENDPOINT+'/v1/user/' + req.params.id,
            method : 'GET',
            headers : {
                'content-type' : 'application/json',
                'x-authorized' : req.headers['x-authorized']
            },
            json:true
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(body);
        });

    });

    // 
    // create a user
    //
    router.post('/user', auth.jwt, function(req, res) {
        
        request({
            uri: process.env.USER_SERVICE_ENDPOINT+'/v1/user',
            method: 'POST',
            json: req.body,
            headers : {
                'content-type' : 'application/json',
                'x-authorized' : req.headers['x-authorized']
            }
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(body);
        });

    });

    // 
    // update a user
    //
    router.put('/user/:id', auth.jwt, function(req, res) {
        
        request({
            uri: process.env.USER_SERVICE_ENDPOINT + '/v1/user/' + req.params.id,
            method: 'PUT',
            json: req.body,
            headers : {
                'content-type' : 'application/json',
                'x-authorized' : req.headers['x-authorized']
            }
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(body);
        });

    });

    // 
    // delete a user
    //
    router.delete('/user/:id', auth.jwt, function(req, res) {
        
        request.delete({
            uri: process.env.USER_SERVICE_ENDPOINT + '/v1/user/' + req.params.id,
            method: 'DELETE',
            headers : {
                'content-type' : 'application/json',
                'x-authorized' : req.headers['x-authorized']
            },
            json:true
        }, function(err, response, body){
            if(err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(body);
        });

    });

};