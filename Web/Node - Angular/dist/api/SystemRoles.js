/**
  Roles.js

  Rest api endpoint for communicating with the roles db
*/
// Require necessary components
var router = require('express').Router();
var mysql = require('mysql');
var db = require('./DB');

// gets the collection of roles
router.get('/api/v1/system_roles', function(request, response, next) {
    // get a connection form the connection pool
    db.getConnection(function(err, connection) {
        if(err) {return next(err); }
        // our sql query
        connection.query('SELECT * FROM tbl_system_role', function(error, results, fields) { // get all users
            if (error) { return next(error); }
            connection.release(); // release the connection back to the pool
            response.json(results); // return the results as json
        });
    });
});

// gets an instance of a role
router.get('/api/v1/system_roles/:id', function(request, response, next) {
    // get a connection form the connection pool
    db.getConnection(function(err, connection) {
        if(err) {return next(err); }
        // our sql query
        connection.query('SELECT * FROM tbl_system_role WHERE int_role_id = ?',[request.params.id], function(error, results, fields) { // get all users
            if (error) { return next(error); }
            connection.release(); // release the connection back to the pool
            response.json(results); // return the results as json
        });
    });
});

module.exports = router;
