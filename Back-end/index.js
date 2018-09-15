var express = require('express');
var Order = require('./mongo');
var pool = require('./pg');

var app = express();

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));