const baseClient = require("./base_client.js");

const commandsSructure = require("../../structures/commands/client.js");
const Discord = require('discord.js');
const databaseStructure = require("./structures/database.js");
const intervalStructure = require("./structures/interval.js");
const apiStructure = require("./structures/api/index.js");

const events = require("../../structures/events/client.js");
const dbconnect = require("../../data/connect.js");

const fetch = require('node-fetch');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const fs = require("fs");
const { exec } = require('child_process');


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
            const ops88 = { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } };
            const url = `${client.contents.links.api}/${endpoit??"api"}`;
            const result = await fetch(url, ops88);
            return result.json() ?? { send: false }
        };
        
        this.pre_load = {
            events: new events(this),
            commands: new commandsSructure(this)
        };
        
        client.shard = process.env.CLUSTER_MANAGER ? Discord.ShardClientUtil.singleton(client, process.env.CLUSTER_MANAGER_MODE) : null;
        client.cooldown = new Discord.Collection();
        //client.images = new imagesStructure(client);
        client.db = new databaseStructure(this);

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

        client.interval = intervalStructure;
        client.private_api = new apiStructure(client);
        client.ia = require("./structures/ia.js");
    }

    async loadLocates(){
        const path = `${process.cwd()}/src/locates`;

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
            return console.error("[LOCATES] - erro".red, error);
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