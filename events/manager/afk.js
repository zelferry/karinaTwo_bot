let Event = require("../../frameworks/event/event.js");
let Discord = require("discord.js");
let { afk, translations } = require("../../mongoDB/ini.js").user
let i18next = require('i18next');

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "messageCreate"
        })
    }
    
    async run(message){
        if (!message.guild || message.author.bot) return;
        
        let user_translation = await translations.get_lang(message.author);
        let locale = global.t = i18next.getFixedT(user_translation || 'pt-BR');
        
        let mentioned = message.mentions.members.first();

        if(mentioned){
            let stats = await afk.find(mentioned, false);
            if(stats.error !== "404"){
                if(stats.afk.ready){
                    message.channel.send({
                        embeds: [{
                            description: t("events:afk", { mentioned: (mentioned.id).toString(), afk_reason: stats.afk.reason })
                        }]
                    })
                }
            }
        }

        let userAFK = await afk.find(message.author, false);
        if(userAFK.error !== "404"){
            if(userAFK.afk.ready){
                await afk.deleteAFK(message.author);
            }
        }
    }
}

module.exports = event