const Discord = require('discord.js');
const Cluster = require('discord-hybrid-sharding');
const usev13 = false;

class baseClient extends Discord.Client {
    constructor(opts){
        super({
            shards: Cluster.data.SHARD_LIST,
            shardCount: Cluster.data.TOTAL_SHARDS,
            ...opts
        })
        this.cluster = new Cluster.Client(this, usev13); 
    }
    /**
     * @private
     */
    async _binder(binder){
        this.binder = binder
        this.binder.displayTHIS(this);
    }
    connectBOT(){
        this.on("ready", () => {
            this.binder.displaySpecialTHIS(this);
        });
        
        try {
            this.binder.connect();
        } catch(err) {
            this.binder.disconect(err);
        }
    }
}
module.exports = baseClient 