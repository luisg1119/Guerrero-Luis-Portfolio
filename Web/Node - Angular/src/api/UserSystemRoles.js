/**
 UserRoles.js

 Rest api endpoint for communicating with the many-to-many table that bridges resources and roles
 */
// Require necessary components
var router = require('express').Router();
var db = require('./DB');

// Create URL Endpoint for user-role collection (all roles associated with specified user)
// TODO: if a user passes in a single, not array value, this should handle it as well
router.get('/api/v1/users/:guid/system_roles', function(request, response, next) {
    // get a connection from the connection pool
    db.getConnection(function(err, connection) {
        if(err) { return next(err); }
        // our sql query for all role_ids associated with a user
        // could probably use a join here, but im not familiar with them
        connection.query('SELECT * FROM tbl_system_role WHERE int_role_id IN (' +
            'SELECT int_role_id FROM tbl_resource_system_role WHERE str_resource_guid = ?)',
            [request.params.guid], function(error, results, fields) { // get all users
            if (error) { return next(error); }
            connection.release(); // release our connection back to the pool
            response.json(results); // return query results as json
        });
    });
});

// Create URL Endpoint for creating role and user relationships
router.post('/api/v1/users/:guid/system_roles', function(request, response, next) {
    // get a connection form the connection pool
    db.getConnection(function(err, connection) {
        if(err) {return next(err); }
        // make sure the data is defined before attempting to push
        if (request.body.userRoles === undefined || request.body.userRoles === []) {
            connection.release(); // release our connection back to the pool
            response.status(500).end(); // return internal server error
        }
        var values = []; // will be used for a mass insert
        for (var i = 0; i < request.body.userRoles.length; i++) {
            values.push([request.params.guid, request.body.userRoles[i]]);
        }
        // our sql query
        connection.query('INSERT INTO tbl_resource_system_role (str_resource_guid, int_role_id) VALUES ?',
            [values],
            function(error, results, fields) {
            if (error) { return next(error); }
            connection.release(); // release our connection back to the pool
            response.json(results); // return the results as json
        });
    });
});

// delete all associations of roles with a user
router.delete('/api/v1/users/:guid/system_roles', function(request, response, next) {
    // get a connection from the connection pool
    db.getConnection(function(err, connection) {
        if(err) {return next(err); }
        // our sql query for a single user
        connection.query('DELETE FROM tbl_resource_system_role WHERE str_resource_guid = ?', [request.params.guid], function(error, results, fields) {
            if (error) { return next(error); }
            connection.release(); // release our connection back to the pool
            response.json(results); // return query results as json
        });
    });
}); // router.delete

// Allows access from main server (app.js)
module.exports = router;
