let fetch = require('node-fetch');

class memes {
    constructor(thisx){
        this.data = thisx
        this.config = thisx.config

        this.make_url = function(lang){
            let url_final
            if(lang == "pt-BR"){
                url_final = `${this.config.api.external.memes}/MemesBR`
            } else if(lang == "en-US"){
                url_final = `${this.config.api.external.memes}`
            }
            return url_final
        }
    }

    async find_meme(lang){
        let url = this.make_url(lang);
        let res = await fetch(url);
        let ret = await res.json();

        return ret
    }
}

module.exports = memes