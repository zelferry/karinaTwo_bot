let mathRandom = number => ~~(Math.random() * number);

class Roleplay {
    constructor(data){
        this.data = data
        this.defaut_footer = "."
    }
    
    assfuck(){
        let data = require(`${this.defaut_footer}/nsfw/assfuck.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    cum(){
        let data = require(`${this.defaut_footer}/nsfw/cum.js`);
        let number = mathRandom(data.length);

        return data[number]
    }

    blowjob(){
        let data = require(`${this.defaut_footer}/nsfw/blowjob.js`);
        let number = mathRandom(data.length);

        return data[number]
    }
}

module.exports = Roleplay