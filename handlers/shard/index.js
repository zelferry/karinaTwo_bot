var DISCORD = require('discord.js');

class shardCLIENT extends DISCORD.ShardingManager {
	constructor(file, opts) {
		super(file, opts);
		
		var options = {}
		var _a, _b, _c;
        this.started = false;
        this.options = {
            interval: (_a = options.interval) !== null && _a !== void 0 ? _a : 1800000,
            postOnStart: (_b = options.postOnStart) !== null && _b !== void 0 ? _b : true,
            startPosting: (_c = options.startPosting) !== null && _c !== void 0 ? _c : true
            };
	}
	
async startBOT(ara,ara2) {
        this.binds = {
            clientReady: () => this._Ready(),
            waitForReady: (fn) => this._ForReady(fn),
            getStats: () => this.ShardJson()
        };
        this.spawn(ara, ara2)
        if (this.options.startPosting) {
            if (await this.binds.clientReady())
                this.start();
            else
                this.binds.waitForReady(() => {
                    this.start();
                });
        }
    }
    
    start() {
        this.started = true;
        this._setupInterval();
    }
    
    _setupInterval() {
        if (this.options.postOnStart) {
            setTimeout(() => {
                this.post();
            }, 5000);
        }
        this.interval = setInterval(async () => {
            if (!(await this.binds.clientReady()))
                return;
            this.post();
        }, this.options.interval);
    }
    async post() {
        await this.binds.getStats().then((data) => this.emit('json_shard', data)).catch((err) => console.error(err));
    }
	
	_Ready() {
		return this.shards.size > 0 && this.shards.every(x => x.ready);
	}
	_ForReady(fn) {
		const listener = shard => {
			if (shard.id !== this.totalShards - 1) return;
			this.off('shardCreate', listener);
			shard.once('ready', () => {
				fn();
			});
		};
		this.on('shardCreate', listener);
	}
	async ShardJson() {
			let manager = this;
			const guilds = await manager.fetchClientValues('guilds.cache.size');
			const users = await manager.fetchClientValues('users.cache.size');
			const channels = await manager.fetchClientValues('channels.cache.size');
			const uptime = await manager.fetchClientValues('uptime');
			const ping = await manager.fetchClientValues('ws.ping');

		return {
				ws: {
					ping: `${ping}`,
					uptime: `${uptime}`
				},
				guilds: {
					size: `${guilds}`,
					total: `${guilds.reduce((prev, val) => prev + val, 0)}`
				},
				users: {
					size: `${users}`,
					total: `${users.reduce((prev, val) => prev + val, 0)}`
				},
				channels: {
					size: `${channels}`,
					total: `${channels.reduce((prev, val) => prev + val, 0)}`
				}
			};
		
		
	}
}
module.exports = shardCLIENT;


/*
class BasePoster extends typed_emitter_1.EventEmitter {
    constructor(token, options) {
        var _a, _b, _c;
        super();
        this.options = options;
        this.started = false;
        if (!options)
            options = {};
        this.options = {
            interval: (_a = options.interval) !== null && _a !== void 0 ? _a : 1800000,
            postOnStart: (_b = options.postOnStart) !== null && _b !== void 0 ? _b : true,
            startPosting: (_c = options.startPosting) !== null && _c !== void 0 ? _c : true
            };
        if (this.options.interval < 900000) {
            throw new Error('Posting interval must be above 900000 (15 minutes)');
        }
    }
    async _binder() {
        this.binds = {
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        };
        if (this.options.startPosting) {
            if (await this.binds.clientReady())
                this.start();
            else
                this.binds.waitForReady(() => {
                    this.start();
                });
        }
    }
    
    start() {
        this.started = true;
        this._setupInterval();
    }
    
    _setupInterval() {
        if (this.options.postOnStart) {
            setTimeout(() => {
                this.post();
            }, 5000);
        }
        this.interval = setInterval(async () => {
            if (!(await this.binds.clientReady()))
                return;
            this.post();
        }, this.options.interval);
    }
    async post() {
        await this.binds.getStats().then((data) => this.emit('json_shard', data)).catch((err) => console.error(err));
    }
}
exports.BasePoster = BasePoster;
*/