let Event = require("../../frameworks/event/event.js");
let Discord = require('discord.js');
let ms = require('ms');
let ids = require(`${process.cwd()}/dist/primary_configuration.js`).user().owners;
let support_server = require(`${process.cwd()}/dist/primary_configuration.js`).urls().support
let util = require('../../utils/main.js');
let KariWebhooks = new util.webhooks1();
let prefix_  = "f/"

let i18next = require('i18next');
let { translations } = require("../../mongoDB/ini.js").user;

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "messageCreate"
        })
    }
    
    async run(message){
        if(!message.guild || message.author.bot) return;
        if(message.channel.partial) await message.channel.fetch();
        if(message.partial) await message.fetch(); if(!message.content.toLowerCase().startsWith(prefix_.toLowerCase())) return;

        let user_translation = await translations.get_lang(message.author);
        let locate = global.t = i18next.getFixedT(user_translation || 'pt-BR');
        if(message.content.startsWith(`<@!${this.client.user.id}>`) || message.content.startsWith(`<@${this.client.user.id}>`)) return;
        
        let args = message.content.trim().slice(prefix_.length).split(/ +/g);
        let comando = args.shift().toLowerCase();

        try {
            if(ids.includes(message.author.id)){
                let cmd = client.commands.get(comando.slice(prefix_.lenght)) || client.commands.get(client.aliases.get(comando.slice(prefix_.lenght)));
                
                cmd.run(client, message, args);
            } else {
                let link = this.client.generateInvite({
                    permissions: [...this.client.defautPermissions],
                    scopes: [Discord.OAuth2Scopes.Bot, Discord.OAuth2Scopes.ApplicationsCommands]
                });
                
                message.reply({
                    embeds: [
                        {
                            color: 389301,
                            title: locate("events:prefix.title"),
                            description: locate("events:prefix.description"),
                            fields: [
                                {
                                    name: locate("events:prefix.fields_name"),
                                    value: locate("events:prefix.fields_description", {
                                        bot_url: link,
                                        server_url: support_server
                                    })
                                }
                            ]
                        }
                    ]
                });
                return {}
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = event