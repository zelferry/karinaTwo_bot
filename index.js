process.env.TZ = "America/Sao_Paulo";
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

let { GatewayIntentBits, Options } = require('discord.js');
let client_bot = require("./handlers/index.js")
let Cluster = require("discord-hybrid-sharding");
let dist = require("./dist/main.js");

let client = (global.client = new client_bot.client({
    bot: {
        makeCache: Options.cacheWithLimits({
            ...Options.DefaultMakeCacheSettings,
            ReactionManager: 0,
            PresenceManager: 0,
            GuildStickerManager: 0,
            GuildScheduledEventManager: 0,
            GuildMemberManager: {
                maxSize: 200,
                keepOverLimit: member => member.id === client.user.id,
            },
        }),
        sweepers: {
            ...Options.DefaultSweeperSettings,
            messages: {
                interval: 3600,
                lifetime: 1800,
            }
        },
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.MessageContent
        ], 
        allowedMentions: {
            parse: ["users","roles"],
            repliedUser: false
        },
        partials: ["MESSAGE", "CHANNEL", "REACTION"]
    }
}));

dist.extends();
require("./dist/anti_crash.js").client(client);
client.connectBOT(process.env.TOKEN);