const mathRandom = number => ~~(Math.random() * number);

class Roleplay {
    constructor(data){
        this.data = data
        this.defaut_footer = "."
    }
    
    async assfuck(fur){
        if (fur) {
            let data_fur = await this.data.client.private_api.POST(`api/e621/posts`, {
                tags: [
                    "anal_penetration",
                    "duo",
                    "score:>790",
                    "-webm",
                    "-animated",
                    "-comic",
                    "-text_message",
                    "-texting_ui",
                    "-disney",
                    "-humanoid",
                    "-flash",
                    "-sonic_the_hedgehog_(series)",
                    "-league_of_legends",
                    ...(require(`${process.cwd()}/src/config/config.js`).client.blacklist.e621).map((x) => `-${x}`)
                ]
            });

            if (data_fur.ok === false) {
                return this.assfuck(false)
            } else {
                let number = mathRandom(data_fur.length);
                let post = data_fur[number];

                return post.file.url
            }
        } else {
            let data = require(`${this.defaut_footer}/nsfw/assfuck.js`);
            let number = mathRandom(data.length);

            return data[number]
        }
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