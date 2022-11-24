let Event = require("../../frameworks/event/event.js");
let { configs } = require("../../mongoDB/ini.js").guild
let i18next = require('i18next');
let { translations } = require("../../mongoDB/ini.js").user;


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
        
        let config__ = await configs.getConfig(message.guild,true);
        
        if(config__.error !== "404"){
            if(config__.antiraid){
                this.client.antiSpam.message(message)
            } else {
                return;
            };
        };
    }
}

module.exports = event