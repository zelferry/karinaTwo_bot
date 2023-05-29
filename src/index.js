process.env.TZ = "America/Sao_Paulo";
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const { GatewayIntentBits, Options } = require('discord.js');
const client_bot = require("./structures/client/client.js")
const Cluster = require("discord-hybrid-sharding");
const extend = require("./utils/extend.js");

const client = (global.client = new client_bot({
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

extend();
//require("./dist/anti_crash.js").client(client);
client.connectBOT(process.env.TOKEN);