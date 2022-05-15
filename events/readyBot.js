let util = require('../utils/main.js');
const clientConfig = require('../database/client/config.json');
const { GiveawaysManager } = require('discord-giveaways');

let plugins = require("../plugins/index.js") 

exports.type = "ready";
exports.start = async(client,clusterID,ipc,a) => {
    /*et logsjdj = await client.getContainer("api/e6?tags=meesh")
    console.log(logsjdj)*/
    let commands__ = new util.commands(client, clientConfig);
    //commands__.loadingSlashCommands(clientConfig.guildId);
    let slashready = client.commands_utils
    slashready.slashCmd()
    commands__.loadingCommands();
    /*
    const GiveawayManagerWithShardSupport = class extends GiveawaysManager {
        async refreshStorage() {
            return client.cluster.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
        }
    };*/
    
const _giveaway = new plugins.giveaway(client, {
	/*storage: `${clientConfig.footer.root}/database/giveaway/data.json`,*/
	updateCountdownEvery: 10000,
	default: {
		botsCanWin: false,
		embedColor: '#87CEFA',
		embedColorEnd: '#000000',
		reaction: '🎉'
	}
});


client.giveawaysManager = _giveaway;
/*
function status() {
	let clusterID = client.cluster.id;
    let status = clientConfig.status;
    status = status.replace("!!{version}!!", `v${require('../package.json').version}`);
       client.user.setActivity(`${status} | cluster[${clusterID}]`, {
            type: "WATCHING",
            status:"idle"
        });
}
status();
setInterval(status, 5000);*/
//client.user.setStatus('indle').catch(console.error);
    console.log(`${client.user.tag} online!`);
    /*
    client.guilds.cache.map(async (g) => {
        if(!g.available){
            await g.fetch()
            console.log(`[error] o servidor \`${g.name} (${g.id})\`e um servidor inválido!`)
        }
    })*/
    
}