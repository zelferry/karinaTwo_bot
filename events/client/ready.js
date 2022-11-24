let Event = require("../../frameworks/event/event.js");

let util = require('../../utils/main.js');
let { GiveawaysManager } = require('discord-giveaways');
let plugins = require("../../plugins/index.js")

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "ready",
            once: true
        })
    }
    
    async run(){
        let _giveaway = new plugins.giveaway(this.client, {
            updateCountdownEvery: 10000,
            default: {
                botsCanWin: false,
                embedColor: '#87CEFA',
                embedColorEnd: '#000000',
                reaction: '🎉'
            }
        });
        this.client.giveawaysManager = _giveaway;
        
        console.log(`${this.client.user.tag} online!!`);
    }
}

module.exports = event