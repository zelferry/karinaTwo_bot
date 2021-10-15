let baseClient = require("./baseClient.js");
let Discord = require('discord.js');

let imagesStructure = require("./structures/Images.js");
let webhookStructure_ = require("./structures/Webhooks.js");
let actviesStructure = require("./structures/DiscordActivies.js");

let utils_ = require('../../utils/main.js');
let clientConfig = require('../../database/client/config.json');
let AntiSpam = require('discord-anti-spam');

class clientBot extends baseClient {
    constructor(opitions){
        super(opitions.bot);
        
        this._binder({
            displayTHIS: (fn) => this.displayTHIS(fn),
            displaySpecialTHIS: (fn) => this.displaySpecialTHIS(fn),
            connect: () => this.connect(),
            disconect: (fn) => this.disconect(fn)
        })
    }
    displayTHIS(client){
        client.shard = process.env.CLUSTER_MANAGER ? Discord.ShardClientUtil.singleton(client, process.env.CLUSTER_MANAGER_MODE) : null;
        client.cooldown = new Discord.Collection();
        client.images = new imagesStructure(client);
        client.discordTogether = new actviesStructure(client);
        client.extra = {
            utils: utils_,
            makeCommandsCategory: new utils_.makeCommandsCategory(client)
        };
        client.config = clientConfig;
        client.commands2 = new Discord.Collection();
        client.commands = new Discord.Collection();
        client.commands.array = [];
        client.aliases = new Discord.Collection();
        client.defautPermissions = [
            Discord.Permissions.FLAGS.ADMINISTRATOR,
            Discord.Permissions.FLAGS.BAN_MEMBERS,
            Discord.Permissions.FLAGS.MANAGE_CHANNELS,
            Discord.Permissions.FLAGS.ADD_REACTIONS,
            Discord.Permissions.FLAGS.VIEW_CHANNEL,
            Discord.Permissions.FLAGS.SEND_MESSAGES,
            Discord.Permissions.FLAGS.MANAGE_MESSAGES,
            Discord.Permissions.FLAGS.ATTACH_FILES,
            Discord.Permissions.FLAGS.READ_MESSAGE_HISTORY,
            Discord.Permissions.FLAGS.MANAGE_WEBHOOKS,
            Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS,
            Discord.Permissions.FLAGS.CHANGE_NICKNAME,
            Discord.Permissions.FLAGS.KICK_MEMBERS,
            Discord.Permissions.FLAGS.START_EMBEDDED_ACTIVITIES
        ] 
    }
    displaySpecialTHIS(client){
        let channels_1 = client.channels.cache.filter(channel => channel.name.includes('spam')).map(x => x.id);
        let channels_2 = client.channels.cache.filter(channel => channel.name.includes('contagem')).map(x => x.id);
        
        client.antiSpamGlobalCofig = {
            ignoredCannels: [...channels_1, ...channels_2]
        };
        client.antiSpam = new AntiSpam({
            warnThreshold: 3,
            muteThreshold: 4,
            kickThreshold: 5,
            banThreshold: 7,
            maxInterval: 2000,
            maxDuplicatesInterval: 2000,
            warnMessage: '{@user}, Por Favor Pare De Spamar/flooda nesse servidor.',
            kickMessage: '😠|**{user_tag}** Foi Kicado do Server por **raid/flood**.',
            banMessage: '🔨| **{user_tag}** Foi BANIDO Por **raid/flood**.',
            muteMessage: '🔇|**{user_tag}** foi silenciado por Spamar/floodar nesse servidor.',
            maxDuplicatesWarn: 7,
            maxDuplicatesKick: 10,
            maxDuplicatesBan: 11,
            maxDuplicatesMute: 9,
            ignoreBots: true,
            verbose: true,
            muteRoleName: 'antiraid_role',
            removeMessages: false,
            ignoredUsers: [],
            ignoredPermissions: ['ADMINISTRATOR'],
            ignoredChannels: client.antiSpamGlobalCofig.ignoredCannels,
            errorMessages: true,
            kickErrorMessage: '🚫| não foi possível expulsar o **{user_tag}** por conta que eu não tenho a permissão **expulsar membros** em meu cargo principal.',
            banErrorMessage: '🚫| não foi possível banir o  **{user_tag}** por conta que eu não tenho a permissão **banir membros** em meu cargo principal.',
            muteErrorMessage: '🚫| não foi possível silenciar **{user_tag}** devido a permissões impróprias ou a função mudo não pôde ser encontrada',
            removeBotMessages: true,
            removeBotMessagesAfter: 5000,
            debug: true
        });
        client.webhooks = new webhookStructure_(client)

    }
    connect(){
        this.login(process.env.TOKEN);
    }
    disconect(reason){
        console.info(reason);
        this.destroy();
    }
}
module.exports = clientBot 