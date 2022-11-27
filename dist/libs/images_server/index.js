let { Collection } = require('discord.js');
let fetch = require('node-fetch');
let fs = require('fs');
let toml = require('toml'); 

let nekos = require("./routes/nekos.js");
let yiff = require("./routes/yiff.js");
let roleplay = require("./routes/roleplay.js");
let memes = require("./routes/memes.js")

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
    get roleplay(){
        return (new roleplay(this))
    }
    get meme(){
        return (new memes(this))
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