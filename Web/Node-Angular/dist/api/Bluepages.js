/**
  Bluepages.js

  REST endpoint used exclusively as a proxy to get data from bluepages
*/
// Require necessary components
var router = require('express').Router();
var req = require('request');

// get request
router.get('/api/v1/bluepages/email/:email', function(request, response, next) {
  // construct our bluepages url to retrieve user info by email
  var url = 'https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/' +
          '(mail=' + request.params.email + ').list,printable/byjson';
  // use the request module to send our get request
  req(url, function (err, resp, body) {
    if (err) { next(err) }
    response.json(JSON.parse(body));
  });
});

module.exports = router;
