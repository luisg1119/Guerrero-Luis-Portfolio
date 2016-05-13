
/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
//var expJwt = require("express-jwt");
//var key = require('./api/Secret');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// basic security for our api. May need to do role specific access later
// important that this is before we include the urls
//app.use("/api/v1", expJwt({secret: key}));

app.use(bodyParser.json({limit: '5mb'}));
// app.use(require('./api/LDAP'));
// app.use(require('./api/Users'));
// app.use(require('./api/SystemRoles'));
// app.use(require('./api/Bluepages'));
// app.use(require('./api/UserSystemRoles'));
app.use(require('./api/Login'));


// serve the files out of ./layouts as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

// print a message when the server starts listening
console.log('server starting on ' + appEnv.url);
});
