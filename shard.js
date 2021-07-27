let Discord = require('discord.js');
let handlers = require('./handlers/index.js');
let token = process.env.TOKEN;
let manager = new handlers.shard('./index.js', {
	totalShards: 'auto',
	token: token
});

let AutoPoster = require('topgg-autoposter');
let ap = AutoPoster(process.env['TOP_GG_API'], manager);
let express = require('express');
let app = express();
let fs = require('fs');
let Config = require('./database/client/config.json');
let kariModu = require('./KariModules/index.js');
let fetch = require('node-fetch');
let urls = Config.host.links;
function send_PING() {
	for (var i = 0; i < urls.length; i++) {
		fetch(urls[i]);
	}
}

app.use(express.static('./public'));
app.use('/api/v1', require('./webClient/controllers/v1.js'));
app.use('/api/v2', require('./webClient/controllers/v2.js'));
app.use('/topgg', require('./webClient/controllers/topGG.js'));

if (fs.existsSync('' + Config.footer.root + '/webClient/public/home/index.html')) {
	app.use('/html.css.js', require('./webClient/controllers/files.js'));

	app.get('/', async (req, res) => {
		res.sendFile('' + Config.footer.root + '/webClient/public/home/index.html');
	});
} else {
	app.get('/', (req, res) => {
		res.sendStatus(200);
	});
}

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}]: ${message._eval} - ${message._result}`);
});

manager.on('shardCreate', shard => {
	console.log(
		`[${new Date()
			.toString()
			.split(' ', 5)
			.join(' ')}] shard[${shard.id}] iniciado!`
	);
});

app.get('/teapot', (req, res) => {
	res.sendStatus(418);
});

app.get('/ping', (req, res) => {
	res.sendStatus(200);
});

/*manager.on("json_shard", (data) =>{
	console.log(data)
});*/

ap.on('posted', async () => {
	console.log('Status postados na TOP.GG!');
});

//erros routeds
process.on('unhandledRejection', error => {
	console.error(error);
});

app.get('/*', (req, res) => {
	res.status(404);
	if (fs.existsSync('' + Config.footer.root + '/webClient/public/404/404.html')) {
		res.sendFile('' + Config.footer.root + '/webClient/public/404/404.html');
	} else {
		res.send({ status: false, error: 404, message: 'not find route' });
	}
});

//start system
app.listen(kariModu.normalizaPort(process.env.PORT || '3000'));
manager.startBOT(manager.totalShards, 10000);
send_PING();
setInterval(send_PING, 120000);