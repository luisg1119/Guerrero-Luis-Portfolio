/**
  Users.js

  Rest api endpoint for communicating with the users db
*/
// Require necessary components
var router = require('express').Router();
var db = require('./DB');

// Create URL Endpoint for user collection (all users)
router.get('/api/v1/users', function(request, response, next) {
    // get a connection from the connection pool
    db.getConnection(function(err, connection) {
        if(err) { return next(err); }
        // our sql query for all users
        connection.query('SELECT * FROM tbl_resource', function(error, results, fields) { // get all users
            if (error) { return next(error); }
            connection.release(); // release our connection back to the pool
            response.json(results); // return query results as json
        });
    });
});

// Create URL Endpoint for GET request for a single user
router.get('/api/v1/users/:id', function(request, response, next) {
    // get a connection from the connection pool
    db.getConnection(function(err, connection) {
        if(err) {return next(err); }
        // our sql query for a single user
        connection.query('SELECT * FROM tbl_resource WHERE str_email = ?', [request.params.id], function(error, results, fields) {
            if (error) { return next(error); }
            connection.release(); // release our connection back to the pool
            response.json(results); // return query results as json
        });
    });
}); // router.get

// update a user entry
//**NOTE** Will not create if the user doesnt exist. For that, use post
router.put('/api/v1/users/:guid', function(request, response, next) {
    db.getConnection(function(err, connection) {
        if(err) { return next(err); }

        connection.query('UPDATE tbl_resource SET ? WHERE str_guid = ?', [request.body.user, request.params.guid], function(error, results, fields) {
            if (error) { return next(error); }
            connection.release();
            response.json(results);
        });
    });
}); // router.put

// delete a user entry
router.delete('/api/v1/users/:guid', function(request, response, next) {
    // get a connection from the connection pool
    db.getConnection(function(err, connection) {
        if(err) {return next(err); }
        // our sql query for a single user
        connection.query('DELETE FROM tbl_resource WHERE str_guid = ?', [request.params.guid], function(error, results, fields) {
            if (error) { return next(error); }
            connection.release(); // release our connection back to the pool
            response.json(results); // return query results as json
        });
    });
}); // router.delete

// creates a new user entry
router.post('/api/v1/users', function(request, response, next){
    // get a connection from the connection pool
    db.getConnection(function(err, connection) {
        if(err) { return  next(err); }
        // our insert statement
        connection.query('INSERT INTO tbl_resource SET ?', [request.body.user], function(error, results, fields) {
            if (error) { return next(error); }
            connection.query('SELECT * FROM tbl_resource WHERE str_email = ?', request.body.user.str_email, function(err , results, fields) {
                connection.release(); // release our connection back to the pool
                response.json(results); // return the results as json
            });
        });
    });
});

// Allows access from main server (app.js)
module.exports = router;
