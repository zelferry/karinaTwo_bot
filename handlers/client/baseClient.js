const Discord = require('discord.js');
const Cluster = require('discord-hybrid-sharding');
const { RequestManager } = require("discord-cross-ratelimit");
let clientConfig = require('../../database/client/config.json');

class baseClient extends Discord.Client {
    constructor(opts){
        super({
            shards: Cluster.data.SHARD_LIST,
            shardCount: Cluster.data.TOTAL_SHARDS,
            ...opts
        })
        this.cluster = new Cluster.Client(this);
        this.rest = new RequestManager(this, this.cluster);
    }
    /**
     * @private
     */
    async _binder(binder){
        this.binder = binder
        this.binder.displayTHIS(this);
    }
    connectBOT(){
        this.on("ready", async() => {
            this.binder.displaySpecialTHIS(this);
            this.guilds.cache.forEach(async (g) => {
                if(!g.available){
                    await g.fetch();
                    console.log(`[error] o servidor \`${g.name} (${g.id})\`e um servidor inválido!`);
                }
            });
            let status = clientConfig.status;
            status = status.replace("!!{version}!!", `v${require('../../package.json').version}`);
            
            this.interval.start(async() => {
                this.user.setActivity(`${status} | cluster[${this.cluster.id}]`, {
                    type: "WATCHING"
                })
            }, 780000, "status");
        });
        
        try {
            (async () => await this.binder.connect())();
            //this.binder.connect();
        } catch(err) {
            this.binder.disconect(err);
        }
    }
}
module.exports = baseClient 