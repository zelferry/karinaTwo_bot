let BasePoster = require('./base.js');

class DJSSharderPoster extends BasePoster {
	constructor(client, opinions = {}) {
		super(opinions, client);
		this.client = client;
		this._binder({
			clientReady: () => this.clientReady(),
			waitForReady: fn => this.waitForReady(fn),
			getStats: () => this.getStats()
		});
	}
	clientReady() {
		return (
			this.client.clusters.size > 0 /*&& this.client.clusters.every(x => x.ready)*/
		);
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
		const response = await this.client.fetchClientValues('guilds.cache.size');
		return {
			serverCount: response.reduce((a, b) => a + b, 0),
			shardCount: response.length
		};
	}
}

module.exports = DJSSharderPoster;