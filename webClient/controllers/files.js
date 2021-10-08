var express = require('express');
var app = express.Router();

app.get('/popup', (req, res) => {
	res.sendFile('/home/runner/karinaTwo/webClient/public/500/index.html');
});

app.get('/main.css', (req, res) => {
	res.sendFile('/home/runner/karinaTwo/webClient/public/500/main.css');
});

app.get('/home/main.css', (req, res) => {
	res.sendFile('/home/runner/karinaTwo/webClient/public/home/main.css');
});

module.exports = app;
