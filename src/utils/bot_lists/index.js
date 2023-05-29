const BasePoster = require("./base.js");

class Poster extends BasePoster {
	constructor(client, opinions = {}) {
		super(opinions, client);
		this.client = client;
		this._binder({
			clientReady: () => this.clientReady(),
			waitForReady: fn => this.waitForReady(fn),
			getStats: () => this.allStatus()
		});
	}
    
	clientReady() {
		return (this.client.clusters.size > 0);
	}
    
	waitForReady(fn) {
		const listener = shard => {
			if (shard.id !== this.client.totalClusters - 1) return;
			this.client.off('clusterCreate', listener);
			shard.once('ready', () => {
				fn();
			});
		};
        
		this.client.on('clusterCreate', listener);
	}
    
	async getStats() {
        return this.client.fetchClientValues('guilds.cache.size').then(results => {
            return {
                serverCount: results.reduce((prev, val) => prev + val, 0),
                shardCount: results.length
            };
        });
    }
    
    async allStatus(){
        let guild = await this.getStats()
        return {
            guilds: guild.serverCount,
            shards: guild.shardCount
        }
    }
}

module.exports = Poster;