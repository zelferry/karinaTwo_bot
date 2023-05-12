let baseClient = require("./baseClient.js");

let commandsSructure = require("../../frameworks/commando/client.js")
let Discord = require('discord.js');
let databaseStructure = require("./structures/database.js");
let intervalStructure = require("./structures/interval.js");
let apiStructure = require("../../dist/libs/images_server/index.js");

let utils_ = require('../../utils/main.js');
let events = require("../../frameworks/event/client.js");
let dbconnect = require("../../mongoDB/connect.js");

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
        //client.images = new imagesStructure(client);
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
            Discord.PermissionsBitField.Flags.Administrator,
            Discord.PermissionsBitField.Flags.BanMembers,
            Discord.PermissionsBitField.Flags.KickMembers,
            Discord.PermissionsBitField.Flags.ManageChannels,
            Discord.PermissionsBitField.Flags.AddReactions,
            Discord.PermissionsBitField.Flags.ViewChannel,
            Discord.PermissionsBitField.Flags.SendMessages,
            Discord.PermissionsBitField.Flags.ManageMessages,
            Discord.PermissionsBitField.Flags.AttachFiles,
            Discord.PermissionsBitField.Flags.ReadMessageHistory,
            Discord.PermissionsBitField.Flags.ManageWebhooks,
            Discord.PermissionsBitField.Flags.UseExternalEmojis,
            Discord.PermissionsBitField.Flags.EmbedLinks
        ];
        client.dist = require("../../dist/main.js");
        client.contents = require("../../database/client/content.json");
        client.interval = intervalStructure;
        client.private_api = new apiStructure(client);
    }
    async loadLocates(){
        let path = `${process.cwd()}/locates`
        try {
            await i18next.use(Backend).init({
                ns: ["commands", "events", "permissions", "components"],
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
        dbconnect("client");
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