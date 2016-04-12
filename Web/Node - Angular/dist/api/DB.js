/**
 * Module for handling database connection and pool management
 */
var mysql = require('mysql'); // our mysql module

// create a connection pool to minimize overhead of connection creation
var pool = mysql.createPool({
    connectionLimit: 100, // this can be set to whatever value needed
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b07145c23a72c4',
    password: 'c05c69b7',
    database: 'ad_9caedda3cea315b'
});

module.exports = pool;


