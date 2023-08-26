let mathRandom = number => ~~(Math.random() * number);

class Roleplay {
    constructor(data){
        this.data = data
        this.defaut_footer = "."
    }
    
    hug(){
        let data = require(`${this.defaut_footer}/sfw/hug.js`);
        let number = mathRandom(data.length);

        return data[number]
    }
    
    kiss(){
        let data = require(`${this.defaut_footer}/sfw/kiss.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    dance(){
        let data = require(`${this.defaut_footer}/sfw/dance.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    slap(){
        let data = require(`${this.defaut_footer}/sfw/slap.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    attack(){
        let data = require(`${this.defaut_footer}/sfw/attack.js`);
        let number = mathRandom(data.length);

        return data[number]
    }
}

module.exports = Roleplay