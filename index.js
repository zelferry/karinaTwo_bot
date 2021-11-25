let Discord = require('discord.js');
let clientConfig = require('./database/client/config.json');
let client_bot = require("./handlers/index.js")
let Cluster = require("discord-hybrid-sharding");
let mongoose = require("mongoose");

const dbOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

let { Intents } = Discord 
let client = (global.client = new client_bot.client({
    bot:{
        messageCacheLifetime: 60,
        messageCacheMaxSize: 10,
        restTimeOffset: 0,
        restWsBridgetimeout: 100,
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.GUILD_WEBHOOKS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
        ], 
        allowedMentions: {
            parse: ["users","roles"],
            repliedUser: false
        },
        partials: ["MESSAGE", "CHANNEL", "REACTION"]
    }
}));

const usev13 = true
let events = new client_bot.events(`${clientConfig.footer.root}/events`,client,"a","b")


events.loadEVENTS()
mongoose.connect(process.env.MONGOOSE, dbOptions);
client.connectBOT(process.env.TOKEN);