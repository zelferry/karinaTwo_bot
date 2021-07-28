const Base = require('discord.js-cluster').Base;
const Config_ = require('../database/client/config.json');
let {events} = require("../handlers/index.js")

let util = require('../utils/main.js');


module.exports = class extends Base{
    constructor(bot) {
        super(bot);
        
let commands__ = new util.commands(this.bot, Config_, "");


//client.user.setStatus('online').catch(console.error);

	commands__.loadingSlashCommands();
commands__.loadingCommands();

new events(`${Config_.footer.root}/events`,this.bot,"null","null")

    }

    launch() {
    	let client = this.bot
    
    	if(this.clusterID){
function status() {
	let shardID =this.clusterID
	client.user.setActivity(
		`f/help | guilds: ${client.guilds.cache.size} | V${
			require('../package.json').version
		} | shard[${shardID}]`,
		{ type: 'WATCHING' }
	);
}
status();
setInterval(status, 5000);

client.user.setStatus('online')
    	} else {
client.user.setActivity(
		`f/help | V${
			require('../package.json').version
		}`,
		{ type: 'WATCHING' }
	);
    	}
    }

}