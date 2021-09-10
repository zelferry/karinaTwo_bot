let Discord = require('discord.js');
let handlers = require('./handlers/index.js');
let token = process.env.TOKEN;
let manager = new handlers.shard('./index.js', {
	mode:"process" ,
	token: token,
	usev13: false,
});
let teste = require("./plugins/index.js")
let ara = teste.autoTopGgPost(manager)
ara.on("posted", (data) => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Status Postado na top.gg!`);
})
let AutoPoster = require('topgg-autoposter');
//let ap = AutoPoster(process.env['TOP_GG_API'], manager);
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

app.use(express.static('./public'));
app.use('/api/v1', require('./webClient/controllers/v1.js'));
app.use('/api/v2', require('./webClient/controllers/v2.js'));
app.use('/topgg', require('./webClient/controllers/topGG.js'));/*
app.use(function(req, res, next){
  res.status(404);
  res.sendFile('' + Config.footer.root + '/webClient/public/404/404.html');
});
*/

if (fs.existsSync(`${Config.footer.root}/webClient/public/`)) {
	app.use('/html.css.js', require('./webClient/controllers/files.js'));

	app.get('/', async (req, res) => {
		res.status(200)
		res.sendFile('' + Config.footer.root + '/webClient/public/home/index.html');
	});
app.get('/ping_1', (req, res) => {
	res.sendStatus(200)
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] ping recebido!`);
});
	app.get('/404', (req, res,next) => {
	//	res.sendFile('' + Config.footer.root + '/webClient/public/404/404.html');

		next()
	});

} else {
	app.get('/', (req, res) => {
		res.sendStatus(200);
	});
}

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}]: ${message._eval} - ${message._result}`);
});

manager.on('clusterCreate', shard => {
	console.log(`[${new Date().toString().split(' ', 5).join(' ')}] cluster[${shard.id}] iniciado!`);
});

app.get('/teapot', (req, res) => {
	res.sendStatus(418);
});

manager.on("debug", (data) =>{
	console.log(data)
});
/*
ap.on('posted', async () => {
	console.log('Status postados na TOP.GG!');
});*/

//erros routeds
process.on('unhandledRejection', error => {
	console.error(error);
});
app.use(function(req, res, next){
	res.status(404);
 // res.sendFile('' + Config.footer.root + '/webClient/public/404/404.html');
    res.format({
    	html: function () {
    		if(fs.existsSync(`${Config.footer.root}/webClient/public/`)){
    			res.sendFile('' + Config.footer.root + '/webClient/public/404/404.html')
    		} else {
    			res.send(`<h1> ${req.url} não existe!</h1>`)
    		}
    	},
    	json: function () {
    		res.json({
                sucess: false,
                status: "404",
                error: `${req.url} não existe`,
                route: req.url
            })
    	},
    	default: function () {
    		res.type('txt').send('Not found')
    	}
    })
    
})

//start system
app.listen(kariModu.normalizaPort(process.env.PORT || '3000'));
manager.start();
send_PING();

mongoose.connect(process.env.MONGOOSE, dbOptions);
setInterval(send_PING, 150000);