const { Collection } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const toml = require('toml'); 

const nekos = require("./routes/nekos.js");
const yiff = require("./routes/yiff.js");
const memes = require("./routes/memes.js");
const rp_sfw = require("./routes/roleplay/rp_sfw.js");
const rp_nsfw = require("./routes/roleplay/rp_nsfw.js")

class Api {
    constructor(client){
        this.client = client;
        this.config = toml.parse(fs.readFileSync('./src/config/api.toml', function (err){}));
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
            headers: { 'Content-Type': 'application/json' }
        });

        return result.json() ?? { send: false }
    }
}

module.exports = Api