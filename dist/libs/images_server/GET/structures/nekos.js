let fetch = require('node-fetch');

class endpoit_nekos {
    constructor(){
        this.object = {
            boobs: "hboobs",
            coffee: "coffee"
        }
        
        let base_url = "https://nekobot.xyz/api/image?type=";
        
        Object.keys(this.object).forEach(async(endpoint) => {
            this[endpoint] = async function(){
                let base = `${base_url}${this.object[endpoint]}`;
                let res = await fetch(base);
                let ret = await res.json()
                
                return {
                    success: ret.success,
                    url: ret.message,
                    data: ret
                }
            }
        });

        this.danbooru = async function(pos){
            if (pos && !Array.isArray(pos)) pos = pos.split(' ');

            let base_url2 = "https://danbooru.donmai.us/posts/random.json?tags=";
            let res = await fetch(`${base_url2}${pos.join('+')}`);
            let ret = await res.json()

            return {
                success: ret.success == false ? false : true,
                url: ret.file_url,
                data: ret
            }
        }

        this.pussy = async function(){
            let res = await fetch("http://api.nekos.fun:8080/api/pussy");
            let ret = await res.json();

            return {
                success: ret.error ? false : true,
                url: ret.image,
                data: ret
            }
        }
    }
}

module.exports = endpoit_nekos