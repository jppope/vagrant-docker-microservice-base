
// 
// Setup our router
// and include all routes
//
module.exports = function(express){

    var router = express.Router();
    
    // model
    var Model = require('./model');

    // include routes
    require('./routes')(router, Model);

    return router;
};