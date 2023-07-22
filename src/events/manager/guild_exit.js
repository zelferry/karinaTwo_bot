const Event = require("../../structures/events/event.js");

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "guildDelete"
        })
    }
    
    async run(guild){
        if(!guild) return;
        if(!guild.name) return;
        if (guild.id === '810990219281039391' || guild.id === '803456484369367081') return;
        await require('../../data/ini.js').guild.deleteGuild(guild);
        //client.giveawaysManager.giveaways.filter(g => g.guildID === guild.id).forEach(g => client.giveawaysManager.delete(g.messageID));
    }
}

module.exports = event