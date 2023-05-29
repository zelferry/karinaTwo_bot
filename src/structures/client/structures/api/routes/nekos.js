let fetch = require('node-fetch');
function auth(user, pass) {
    let buff = new Buffer.from(`${user}:${pass}`);
    let b64 = buff.toString('base64');
    return `Basic ${b64}`;
}

let header = {
    method: "GET",
    headers: {
        "User-Agent": "karinaTwo/4.0.2 (by jonny9075549t2)",
        Authorization: auth("omags", "F9fAk1fX2dnx3iRLAGo8s6oE")
    }
}

let endpoint1 = [
    "tickle",
    "slap",
    "poke",
    "pat",
    "neko",
    "meow",
    "lizard",
    "kiss",
    "hug",
    "foxGirl",
    "feed",
    "cuddle",
    "nekoGif",
    "kemonomimi",
    "holo",
    "smug",
    "baka",
    "woof",
    "wallpaper",
    "goose",
    "gecg",
    "avatar",
    "waifu"
];

let create_endpoints = () => {
    let object2 = {}
    endpoint1.forEach((x) => {
        object2[x] = async function(){}
    });

    return object2
}
//let url1 = await this.client.getContainer(`api/nekos/sfw/${data1}`);
//this.client.private_api
class nekos_ {
    #create_endpoints = (t) => {
        let object2 = {}

        endpoint1.forEach((x) => {
            object2[x] = async function(){
                let data2 = await this.data.GET(`api/nekos/sfw/${x}`);

                return data2 ?? { success: false }
            }
        });
        return object2
    }
    #object = {
        straight: async function(){
            return this.#danbooru([
                "rating:explict",
                "hetero",
                "-video"
            ])
        },
        yaoi: async function(){
            return this.#danbooru([
                "rating:explict",
                "yaoi",
                "-video"
            ])
        },
        boobs: async function() {
            return this.#danbooru([
                "rating:explict",
                "large_breasts",
                "-video"
            ])
        },
        bara: async function(){
            return this.#danbooru([
                "rating:explict",
                "bara",
                "-video"
            ])
        },
        pussy: async function() {
            return this.#danbooru([
                "rating:explict",
                "pussy",
                "-video"
            ])
        },
        futa: async function() {
            return this.#danbooru([
                "rating:explict",
                "futanari",
                "-video"
            ])
        },
        femboy: async function() {
            return this.#danbooru([
                "rating:explict",
                "otoko_no_ko",
                "-video"
            ])
        },
        ...this.#create_endpoints(this)
    }
    #danbooru = async function(pos){
        if (pos && !Array.isArray(pos)) pos = pos.split(' ');

        let res = await fetch(`${this.config.api.external.danbooru}${pos.join('+')}`, header);
        let ret = await res.json();

        return {
            success: ret.success == false ? false : true,
            url: ret.file_url,
            data: ret
        }
    }

    constructor(thisx){
        this.data = thisx
        this.config = thisx.config
        Object.keys(this.#object).forEach(async(endpoint) => {
            this[endpoint] = this.#object[endpoint]
        })
    }
}

module.exports = nekos_