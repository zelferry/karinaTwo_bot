var express = require('express');

var apiv2 = express.Router();

apiv2.get('/', function(req, res) {
  res.send({"send":true,"status":"ok","name":"OLA!\nbem vindo a API V2 da karina!!"})
});

module.exports = apiv2;