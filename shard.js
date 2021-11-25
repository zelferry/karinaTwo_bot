let Discord = require('discord.js');
let handlers = require('./handlers/index.js');
let token = process.env.TOKEN;
let manager = new handlers.shard('./index.js', {
	mode:"process" ,
	token: token,
	usev13: true,
});

let teste = require("./plugins/index.js")
let ara = teste.autoTopGgPost(manager)
ara.on("posted", (data) => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Status Postado na top.gg!`);
})
/*
let {AutoPoster} = require('topgg-autoposter');
let ap = AutoPoster(process.env['TOP_GG_API'], manager);
ap.on("posted", (data) => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Status Postado naooo top.gg!`);
})*/
let express = require('express');
let app = express();
let fs = require('fs');
let Config = require('./database/client/config.json');
let kariModu = require('./KariModules/index.js');
let fetch = require('node-fetch');
let urls = Config.host.links;
let mongoose = require("mongoose");
let dbOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

function send_PING() {
	for (var i = 0; i < urls.length; i++) {
		fetch(urls[i]);
	}
}

app.use('/topgg', require('./webClient/controllers/topGG.js'));

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/ping_1', (req, res) => {
    res.sendStatus(200);
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] ping recebido!`);
});

app.get('/teapot', (req, res) => {
	res.sendStatus(418);
});

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}]: ${message._eval} - ${message._result}`);
});

manager.on('clusterCreate', shard => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${shard.id}] iniciado!`);
});

manager.on("debug", (data) =>{
	console.log(data)
});

//erros routeds
process.on('unhandledRejection', error => {
	console.error(error);
});


//start system
app.listen(kariModu.normalizaPort(process.env.PORT || '3000'));
manager.start();
send_PING();

mongoose.connect(process.env.MONGOOSE, dbOptions);
setInterval(send_PING, 150000);