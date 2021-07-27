var express = require('express');
var apiv1 = express.Router();

apiv1.get('/', function(req, res) {
  res.send({"error":"???","type":"V1 não pode ser mas executado"});
});

module.exports = apiv1;