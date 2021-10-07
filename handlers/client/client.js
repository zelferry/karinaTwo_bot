let baseClient = require("./baseClient.js");
let Discord = require('discord.js');
let imagesStructure = require("./structures/Images.js");
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
        client.discordTogether = new utils_.actvies(client);
        client.extra = {
            utils: utils_,
            makeCommandsCategory: new utils_.makeCommandsCategory(client)
        };
        client.config = clientConfig;
        client.commands2 = new Discord.Collection();
        client.commands = new Discord.Collection();
        client.commands.array = [];
        client.aliases = new Discord.Collection();
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
            kickThreshold: 7,
            banThreshold: 7,
            maxInterval: 5000,
            warnMessage: '{@user}, Por Favor Pare De Spamar/flooda nesse servidor.',
            kickMessage: '😠|**{user_tag}** Foi Kicado do Server por **raid/flood**.',
            banMessage: '🔨| **{user_tag}** Foi BANIDO Por **raid/flood**.',
            muteMessage: '🔇|**{user_tag}** foi silenciado por Spamar/floodar nesse servidor.',
            maxDuplicatesWarning: 6,
            maxDuplicatesKick: 10,
            maxDuplicatesBan: 12,
            maxDuplicatesMute: 8,
            ignoreBots: true,
            verbose: true,
            muteRoleName: 'antiraid_role',
            removeMessages: true,
            ignoredUsers: [],
            ignoredPermissions: ['ADMINISTRATOR'],
            ignoredChannels: client.antiSpamGlobalCofig.ignoredCannels,
            errorMessages: true,
            kickErrorMessage: '🚫| não foi possível expulsar o **{user_tag}** por conta que eu não tenho a permissão **expulsar membros** em meu cargo principal.',
            banErrorMessage: '🚫| não foi possível banir o  **{user_tag}** por conta que eu não tenho a permissão **banir membros** em meu cargo principal.',
            muteErrorMessage: '🚫| não foi possível silenciar **{user_tag}** devido a permissões impróprias ou a função mudo não pôde ser encontrada',
            debug: true
        });

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