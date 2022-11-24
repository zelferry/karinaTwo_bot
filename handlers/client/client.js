let baseClient = require("./baseClient.js");
let commandsSructure = require("../../frameworks/commando/client.js")
let Discord = require('discord.js');
let imagesStructure = require("./structures/Images.js");
let webhookStructure_ = require("./structures/Webhooks.js");
let actviesStructure = require("./structures/DiscordActivies.js");
let databaseStructure = require("./structures/database.js");
let intervalStructure = require("./structures/interval.js");
let apiStructure = require("../../dist/libs/images_server/index.js");

let utils_ = require('../../utils/main.js');
let AntiSpam = require('discord-anti-spam');
let events = require("../../frameworks/event/client.js");

let fetch = require('node-fetch');
let i18next = require('i18next');
let Backend = require('i18next-fs-backend');
let fs = require("fs");
let { exec } = require('child_process');


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
        client.getContainer = async function(endpoit){
            let ops88 = { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } };
            let url = `${client.contents.links.api}/${endpoit??"api"}`;
            let result = await fetch(url, ops88);
            return result.json() ?? { send: false }
        };
        //his.commands_utils = new commandsSructure(this, clientConfig);
        this.pre_load = {
            events: new events(this),
            commands: new commandsSructure(this)
        };
        
        client.shard = process.env.CLUSTER_MANAGER ? Discord.ShardClientUtil.singleton(client, process.env.CLUSTER_MANAGER_MODE) : null;
        client.cooldown = new Discord.Collection();
        client.images = new imagesStructure(client);
        client.discordTogether = new actviesStructure(client);
        client.db = new databaseStructure(this);
        client.extra = {
            utils: utils_
        };
        //client.config = clientConfig;
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
            Discord.Permissions.FLAGS.KICK_MEMBERS
            //Discord.Permissions.FLAGS.START_EMBEDDED_ACTIVITIES
        ];
        client.dist = require("../../dist/main.js");
        client.contents = require("../../database/client/content.json");
        client.interval = intervalStructure;
        client.private_api = new apiStructure(client);
    }
    displaySpecialTHIS(client){
        let channels_1 = client.channels.cache.filter(channel => channel.name.includes('spam')).map(x => x.id);
        
        client.antiSpamGlobalCofig = {
            ignoredCannels: [...channels_1]
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
            muteRoleName: 'antiraid role',
            unMuteTime: 18,
            removeMessages: true,
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
        client.webhooks = new webhookStructure_(client);
    }
    async loadLocates(){
        let path = `${process.cwd()}/locates`
        try {
            await i18next.use(Backend).init({
                ns: ["commands", "events", "permissions"],
                defaultNS: "commands",
                preload: fs.readdirSync(path),
                fallbackLng: "pt-BR",
                backend: {
                    loadPath: `${path}/{{lng}}/{{ns}}.json`
                },
                interpolation: {
                    escapeValue: false,
                    useRawValueToEscape: true
                },
                returnEmptyString: false,
                returnObjects: true
            });
            
            return console.info(`[LOCALES] - carregados um total de ${i18next.languages.length} locales!`.green);
        } catch (error) {
            return console.error("[LOCATES] - erro".red, error)
        }
    }
    async connect(){

        //onsole.log(this.pre_load)
        await this.db.load();
        await this.loadLocates();
        await this.pre_load.events.load();
        await this.pre_load.commands.loadSlash();
        await this.pre_load.commands.loadPrefix();
        this.login(process.env.TOKEN).then(setTimeout(() => {
            if (!this.isReady()) exec('kill 1');
        }, 5 * 1000));
    }
    disconect(reason){
        console.info(reason);
        this.destroy();
    }
}
module.exports = clientBot 