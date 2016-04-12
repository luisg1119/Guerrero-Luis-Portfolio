/**
 * LDAP.js
 *
 * One of two api endpoints for authenticating users. This endpoint verifies your
 * email and password with bluepages
 */
var router = require('express').Router(); // used to create the endpoint url
var ldap = require('ldapjs'); // used to communicate with the ldap server
var req = require('request'); // used to send a get request to bluepages

// our only endpoint - posts user credentials
router.post('/api/ldap', function(request, response, next) {
    // construct our bluepages url
    var url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/' +
        '(mail=' + request.body.email + ').list,printable/byjson';
    // use the request module to send our get request
    req(url, function (err, resp, body) {
        if (err) { return next(err) } // propogate error
        var results = JSON.parse(body);
        if (results.search.entry.length === 0) {
            response.status(404).end(); // check to make sure something was found
            return; // break out
        }
        var dn = results.search.entry[0].dn; // get the dn value from the bluepages json
        // create our client to the bluepages ldap server
        var client = ldap.createClient({
            url: 'ldaps://bluepages.ibm.com:636'
        });

        // our options for the sign-in attempt
        var opts = {
            filter: '(mail=' + request.body.email + ')', // filter by email
            scope: 'sub', // explore the subtree
            timeLimit: 500 // set time limit
        };

        // all we need to do is try to bind the user. If this works, then the email and password are valid
        client.bind(dn, request.body.password, function (err) {
            client.unbind(function (err) { // unbind the service -- we want to do this even if there was an error just in case
                if (err) { return next(err) }
            });
            if (err) { return next(err) } // there was an error connecting, could also be invalid password
            response.status(200).end(); // we didn't return an error, so return a 200 response
        });
    });
});

module.exports = router;
