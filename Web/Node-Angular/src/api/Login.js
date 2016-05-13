/**
 * Login.js
 *
 * Login endpoint for verifying users with the application db
 */

// Require necessary components
var router = require("express").Router();
var db = require('./DB');
// var jwt = require("jsonwebtoken");
// var key = require('./Secret');

// login post
router.post("/api/login", function(request, response, next) {
    // get a connection from the connection pool
    db.getConnection(function (err, connection) {
        if (err) {
            return next(err);
        }
        // our sql query for a single user
        connection.query('SELECT * FROM tbl_resource WHERE str_email = ?', [request.body.email], function (error, results, fields) {
            if (error) {
                return next(error);
            }
            else if(results.length === 0){
                response.status(404)
                    .send('Not found');

            }
            else if(request.body.password !== results[0].str_password){
                connection.release();
                loginError = true;
                response.json({error:loginError});
            }
            else{
                var user = {};
                user.name = results[0].str_name;
                user.email = results[0].str_email;
                user.avatar = results[0].str_img;//avatarUrl + user.email;

            // get the roles for that user, we want to store them in the token
            // connection.query(
            //     'SELECT * FROM tbl_system_role WHERE int_role_id IN (' +
            //     'SELECT int_role_id FROM tbl_resource_system_role WHERE str_resource_guid = ?)',
            //     [results[0].str_guid],
            //     function (error, results, fields) {
            //         user.roles = results;
                    connection.release(); // release our connection back to the pool

            //         // get a signed token for auth
            //         //var token = jwt.sign(user, key, {expiresIn: 60 * 60 * 8});
                     response.json({/*token: token, */ user: results[0]}); // return the token as json
            //     }
            // );
            }
        });
    });
});
module.exports = router;