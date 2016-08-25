

//
// Auth routes
//

// includes
var jwt = require('jsonwebtoken');

module.exports = function(router, User) {

    // -------- DEV ---------- //
    // TODO REMOVE THIS!
    // create an admin user
    User.findOne({
      username: 'admin'
    }, function(err, user){

      if(!user) {
        var admin = new User({
          name: 'Admin User',
          username: 'admin',
          email: 'admin@test.com',
          password: 'password'
        });
        admin.save();
      }
    });
    // ------------------------ //

    // 
    // Obtain a token for a user
    //
    // expects body to contain
    // username and password params
    // 
    router.post('/token', function(req, res) {

      // find the user
      // by username
      User.findOne({
        username: req.body.username
      }, function(err, user) {

        if (err) {
            return res.status(500).json(err);
        }

        if (!user) {

          return res.status(403).json({ message: 'Authentication failed. User not found.' });

        } else if (user) {

          // check if password matches
          // TODO encrypt this puppy
          if (user.password !== req.body.password) {

            return res.status(403).json({ message: 'Authentication failed. Wrong password.' });

          } else {

            // if user is found and password 
            // is right create a token
            var token = jwt.sign(user, process.env.JWT_AUTH_SECRET);

            // return the information including token as JSON
            res.json({
              success: true,
              token: token
            });
          }   

        }

      });
    });

    //
    // authenticate anything with
    // a pre-existing jwt token
    //
    // expects body to contain a token param
    //
    router.post('/auth', function(req, res) {

        // verify a jwt token
        jwt.verify(req.body.token, process.env.JWT_AUTH_SECRET, function(err, decoded) {      
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token.' });    
            } else {
                // remove sensitive info
                delete decoded.password;
                res.json(decoded);
            }
        });

    });

};