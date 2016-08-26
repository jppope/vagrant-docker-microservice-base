
//
// User REST API routes
//

module.exports = function(router, User) {

    // get all
    router.get('/user', function(req, res) {

        // get the user authorized to make this request
        var authorized = req.headers['x-authorized'];

        // validate permissions
        if(authorized.indexOf('admin') == -1) {
            return res.status(403).end();
        }

        User.find({}, function(err, users){
            if(err) {
                return res.status(500).json(err);
            }

            res.json(users);
        });

    });

    // get one
    router.get('/user/:id', function(req, res) {

        // get the user authorized to make this request
        var authorized = req.headers['x-authorized'];

        // validate owener permissions
        if(authorized.indexOf('admin') == -1 && authorized.indexOf(req.params.id) == -1) {
            return res.status(403).end();
        }

        User.findOne({ _id : req.params.id }, function(err, user){
            if(err) {
                return res.status(500).json(err);
            }

            res.json(user);
        });

    });

    // create
    router.post('/user', function(req, res) {

        // get the user authorized to make this request
        var authorized = req.headers['x-authorized'];

        // validate admin permissions
        if(authorized.indexOf('admin') == -1) {
            return res.status(403).end();
        }

        var user = new User(req.body);
        user.save(function(err, user){
            if(err) {
                return res.status(500).json(err);
            }

            res.json(user);
        });
        
    });

    // update
    router.put('/user/:id', function(req, res) {

        // get the user authorized to make this request
        var authorized = req.headers['x-authorized'];

        // validate owner permissions
        if(authorized.indexOf('admin') == -1 && authorized.indexOf(req.params.id) == -1) {
            return res.status(403).end();
        }

        User.findOne({ _id : req.params.id }, function (err, user){
            if(err) {
                return res.status(500).send(err);
            }

            for(var key in req.body) {
                user[key] = req.body[key];
            }

            user.save();

            res.json(user);
        });

    });

    // delete
    router.delete('/user/:id', function(req, res) {

        // get the user authorized to make this request
        var authorized = req.headers['x-authorized'];

        // validate admin permissions
        if(authorized.indexOf('admin') == -1) {
            return res.status(403).end();
        }
        
        User.findOne({ _id : req.params.id }, function (err, user){
            if(err) {
                return res.status(500).json(err);
            }

            user.remove();
            res.status(200).end();
        });
        
    });

};