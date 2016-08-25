'use strict';

const PORT = 8080;
const VERSION = 'v1';

// ----------------------------- //

var port = process.env.PORT || PORT;   
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO implement https://github.com/jhurliman/node-rate-limiter

// include routes
var api = require('./'+VERSION)(express);

// init api 
app.use('/'+VERSION, api);

app.listen(PORT);
console.log('API ' +VERSION + ' running on http://localhost:' + PORT);