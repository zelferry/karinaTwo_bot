let Discord = require('discord.js');
let clientConfig = require('./database/client/config.json');
let client_bot = require("./handlers/index.js")

let client = new client_bot.client({bot:clientConfig.client});
let events = new client_bot.events(`${clientConfig.footer.root}/events`,client,"a","b")

events.loadEVENTS()
client.connect(process.env.TOKEN);