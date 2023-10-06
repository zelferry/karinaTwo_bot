const mathRandom = number => ~~(Math.random() * number);
const fetch = require("node-fetch");

class Roleplay {
    constructor(data){
        this.data = data
        this.defaut_footer = "."

        this.fur = {
            "kiss": "https://v2.yiff.rest/furry/kiss",
            "hug": "https://v2.yiff.rest/furry/hug"
        }
    }
    
    async hug(fur){
        if (fur) {
            let res = await fetch(this.fur.hug);
            let ret = await res.json();
            let data = ret.images[0].url

            return data
        } else {
            let data = require(`${this.defaut_footer}/sfw/hug.js`);
            let number = mathRandom(data.length);

            return data[number]
        }
    }
    
    async kiss(fur){
        if (fur) {
            let res = await fetch(this.fur.kiss);
            let ret = await res.json();
            let data = ret.images[0].url

            return data
        } else {
            let data = require(`${this.defaut_footer}/sfw/kiss.js`);
            let number = mathRandom(data.length);

            return data[number]
        }
    }

    dance(fur){
        let data = require(`${this.defaut_footer}/sfw/dance.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    slap(fur){
        let data = require(`${this.defaut_footer}/sfw/slap.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    attack(fur){
        let data = require(`${this.defaut_footer}/sfw/attack.js`);
        let number = mathRandom(data.length);

        return data[number]
    }
}

module.exports = Roleplay