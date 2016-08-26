
//
// Model API routes
//

module.exports = function(router, Model) {

    // get
    router.get('/model', function(req, res) {

        Model.find({}, function(err, models){
            if(err) {
                return res.status(500).json(err);
            }

            res.json(models);
        });

    });

    // get
    router.get('/model/:id', function(req, res) {

        Model.findOne({ _id : req.params.id }, function(err, model){
            if(err) {
                return res.status(500).json(err);
            }

            res.json(model);
        });

    });

    // create
    router.post('/model', function(req, res) {

        var model = new Model(req.body);
        model.save(function(err, model){
            if(err) {
                return res.status(500).json(err);
            }

            res.json(model);
        });
        
    });

    // update
    router.put('/model/:id', function(req, res) {

        Model.findOne({ _id : req.params.id }, function (err, model){
            if(err) {
                return res.status(500).send(err);
            }

            for(var key in req.body) {
                model[key] = req.body[key];
            }

            model.save();
            res.json(model);
        });

    });

    // delete
    router.delete('/model/:id', function(req, res) {

        Model.findOne({ _id : req.params.id }, function (err, model){
            if(err) {
                return res.status(500).json(err);
            }

            model.remove();
            res.status(200).end();
        });
        
    });

};