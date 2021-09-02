let util = require('../utils/main.js');
const clientConfig = require('../database/client/config.json');
const { GiveawaysManager } = require('discord-giveaways');


exports.type = "ready";
exports.start = async(client,clusterID,ipc,a) => {
	
const GiveawayManagerWithShardSupport = class extends GiveawaysManager {
	async refreshStorage() {
		return client.cluster.broadcastEval(() =>
			this.giveawaysManager.getAllGiveaways());
	}
};
const _giveaway = new GiveawayManagerWithShardSupport(client, {
	storage: `${clientConfig.footer.root}/database/giveaway/data.json`,
	updateCountdownEvery: 10000,
	default: {
		botsCanWin: false,
		embedColor: '#87CEFA',
		embedColorEnd: '#000000',
		reaction: '🎉'
	}
});


client.giveawaysManager = _giveaway;

let commands__ = new util.commands(client, clientConfig);

function status() {
	let clusterID = client.cluster.id
	
	client.user.setActivity(
		`f/help | guilds: ${client.guilds.cache.size} | V${
			require('../package.json').version
		} | cluster[${clusterID}]`,
		{ type: "WATCHING",status:"idle" }
	);
}
status();
setInterval(status, 5000);

//client.user.setStatus('indle').catch(console.error);

commands__.loadingSlashCommands();
commands__.loadingCommands();

console.log(`${client.user.tag} online!`);
}