/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * bot.js
 *
 * This is the bot webapp that interacts with the different APIs.
 *
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var env = process.env.NODE_ENV || 'dev';
var config = require('./config.js')[env];

app.use(express.static('web/dist'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/web/dist/index.html');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});