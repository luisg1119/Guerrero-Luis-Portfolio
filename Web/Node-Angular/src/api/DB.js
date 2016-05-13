/**
 * Module for handling database connection and pool management
 */
var mysql = require('mysql'); // our mysql module

// create a connection pool to minimize overhead of connection creation
var pool = mysql.createPool({
    connectionLimit: 100, // this can be set to whatever value needed
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b352387dea1d5b',
    password: '89a92322',
    database: 'ad_5448df10d0c23af'
});

module.exports = pool;


