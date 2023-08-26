const Event = require("../../structures/events/event.js");
const Discord = require("discord.js");
const { afk, translations } = require("../../data/ini.js").user
const i18next = require('i18next');

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

        if (message.content.includes(message.mentions.members.size)) {
            for (const [, member] of message.mentions.members) {
                let mentioned1 = await afk.confirm(member);
                let mentioned2 = await afk.find(member);

                if (mentioned1 && mentioned2.afk.ready) message.channel.send({
                    embeds: [{
                        description: t("events:afk", { mentioned: (member.id).toString(), afk_reason: mentioned2.afk.reason })
                    }]
                });
            };
        };
        
        let mentioned1 = await afk.confirm(message.author);
        let mentioned2 = await afk.find(message.author);

        if (mentioned1 && mentioned2.afk.ready) {
            await afk.deleteAFK(message.author);
        }
    }
}

module.exports = event