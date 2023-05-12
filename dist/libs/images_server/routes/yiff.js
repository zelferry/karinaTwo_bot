let defaut_blacklist = require(`${process.cwd()}/database/client/blacklisted.json`).e621;

let mathRandom = (number) => ~~(Math.random() * number);
let types = {
    straight: "male/female",
    gay: "male/male",
    lesbian: "female/female",
    synormorph: "gynomorph",
    andromorph: "andromorph",
    bulge: "bulge"
}

class yiff {
    #data
	constructor(data) {
        this.#data = data;
        this.black_list = [`-animated`, `-webm`, `-flash`, `-humanoid`, `-sonic_the_hedgehog_(series)`, `-league_of_legends`, `score:>500`]
        
        Object.keys(types).forEach(async(endpoint) => {
            this[endpoint] = async function(){
                let url = await this.#data.POST(`api/e621/posts`, {
                    tags: [
                        types[endpoint],
                        ...this.black_list,
                        ...defaut_blacklist.map((x) => `-${x}`)
                    ]
                });

                let post_number = mathRandom((url.data.posts).length);
                let post = url.data.posts[post_number]

                let data
                if(!url.ok){
                    data = {
                        ok: false,
                        post: {}
                    }
                } else {
                    data = {
                        ok: true,
                        post: {
                            author: post.tags.artist.map((x) => `\`${x}\``).join(' '),
                            url: post.file.url
                        }
                    }
                }
                
                return data
            }
        })
    }
}

module.exports = yiff;