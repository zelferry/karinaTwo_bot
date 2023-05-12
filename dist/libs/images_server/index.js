let { Collection } = require('discord.js');
let fetch = require('node-fetch');
let fs = require('fs');
let toml = require('toml'); 

let nekos = require("./routes/nekos.js");
let yiff = require("./routes/yiff.js");
let memes = require("./routes/memes.js");
let rp_sfw = require("./routes/roleplay/rp_sfw.js");
let rp_nsfw = require("./routes/roleplay/rp_nsfw.js")

class Api {
    constructor(client){
        this.client = client;
        this.config = toml.parse(fs.readFileSync('./dist/database/config_modules.toml', function (err){}));
        this.cache = new Collection();

        this.base = "https://karina-rest.vercel.app"
    }

    get nekos(){
        return (new nekos(this))
    }
    get yiff(){
        return (new yiff(this))
    }
    get meme(){
        return (new memes(this))
    }
    get roleplay(){
        return {
            sfw: (new rp_sfw(this)),
            nsfw: (new rp_nsfw(this))
        }
    }
    
    async GET(endpoint_mother){
        let ops88 = { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } };
        let result = await fetch(`${this.config.api.base}/${endpoint_mother}`, ops88);

        return result.json() ?? { send: false }
    }
    async POST(endpoint, _body = {}){
        let result = await fetch(`${this.config.api.base}/${endpoint}`, {
            method: 'post',
            body: JSON.stringify(_body),
            headers: {'Content-Type': 'application/json'}
        });

        return result.json() ?? { send: false }
    }
}

module.exports = Api