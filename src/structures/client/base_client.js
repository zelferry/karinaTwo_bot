let Discord = require('discord.js');
let { ClusterClient, getInfo } = require('discord-hybrid-sharding');
let clientConfig = require(`${process.cwd()}/src/config/config.js`).client

class baseClient extends Discord.Client {
    constructor(opts){
        super({
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
            ...opts
        });
        
        this.cluster = new ClusterClient(this);
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
            this.guilds.cache.forEach(async (g) => {
                if(!g.available){
                    await g.fetch();
                    console.log(`[error] o servidor \`${g.name} (${g.id})\`e um servidor inválido!`);
                }
            });
            
            let status = clientConfig.status;
            status = status.replace("!!{version}!!", `v${require('../../../package.json').version}`);
            
            this.interval.start(async() => {
                this.user.setActivity(`${status} | cluster[${this.cluster.id}]`, {
                    type: Discord.ActivityType.Watching
                })
            }, 5600, "status");
        });
        
        try {
            (async () => await this.binder.connect())();
        } catch(err) {
            this.binder.disconect(err);
        }
    }
}

module.exports = baseClient 