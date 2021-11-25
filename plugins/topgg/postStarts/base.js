const EventEmitter = require('events');
const Topgg = require(`@top-gg/sdk`);
const Botlister = require('botlister');
//const lister = new Botlister({ apiToken: process.env.DBL_TOKEN, defaultBotId: process.env.BOT_ID })


class BasePoster extends EventEmitter{
    constructor(options,client) {
        var _a, _b, _c;
        super()
        this.options = options;
        this.started = false;
        if (!options)
            options = {};
        this.options = {
            interval: (_a = options.interval) !== null && _a !== void 0 ? _a : 1800000,
            postOnStart: (_b = options.postOnStart) !== null && _b !== void 0 ? _b : true,
            startPosting: (_c = options.startPosting) !== null && _c !== void 0 ? _c : true,
            sdk: options.sdk
        };
        if (this.options.interval < 900000) {
            throw new Error('Posting interval must be above 900000 (15 minutes)');
        }
        this.api = new Topgg.Api(process.env['TOP_GG_API'])
    }
    async _binder(binds) {
        this.binds = binds
        //this.start()
        
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
    
    stop() {
        this.started = false;
        clearInterval(this.interval);
        this.interval = null;
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
    	let json = await this.binds.getStats()
        //console.log(json)
       try {
       	await this.api.postStats({
            serverCount: json.guilds,
            shardCount: json.shards
        })
       	this.emit('posted', json)
       } catch (e){
          // console.log(e)
       	this.emit("erro",e)
       }
    }
}
module.exports = BasePoster