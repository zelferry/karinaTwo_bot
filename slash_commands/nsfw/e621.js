let comando = require("../../frameworks/commando/command.js");
let defaut_blacklist_ = require("../../database/client/blacklisted.json").e621;
let { profile } = require('../../mongoDB/ini.js').user;


let Discord = require("discord.js"); 

let mathRandom = number => ~~(Math.random() * number);

class Command extends comando {
    command_data = {
        name: "e621",
        description: "(nsfw) look for something on e621.net",
        descriptionLocalizations: {
            "pt-BR": "(nsfw) procure algo na e621.net"
        },
        dmPermission: false,
        nsfw: true,
        options: [
            {
                type: 3,
                required: true,
                name: "tags",
                description: "single tag or space-separated tags",
                descriptionLocalizations: {
                    "pt-BR": "tag única ou tags separadas por espaço"
                }
            },
            {
                type: 5,
                required: false,
                name: "defaut_blacklist",
                description: "when enabled (in \"true\") it will use the default system blacklist",
                descriptionLocalizations: {
                    "pt-BR": "quando habilitado (em \"true\") usará a lista negra padrão do sistema"
                }
            },
            {
                type: 5,
                required: false,
                name: "auto_ignore_webm_swf",
                description: "when enabled (in \"true\") I will ignore posts with videos and swf",
                descriptionLocalizations: {
                    "pt-BR": "quando habilitado (em \"true\") irei ignorar postagens com videos e swf"
                }
            },
            {
                type: 3,
                required: false,
                name: "ignore_irrelevant_posts",
                description: "ignore posts with low votes and leave only those with high votes",
                descriptionLocalizations: {
                    "pt-BR": "ignore posts com votos baixos e deixe apenas aqueles com votos altos"
                },
                choices: [
                    {
                        name: "20 votes or more",
                        nameLocalizations: {
                            "pt-BR": "20 votos ou mais"
                        },
                        value: "score:>20"
                    },
                    {
                        name: "50 votes or more",
                        nameLocalizations: {
                            "pt-BR": "50 votos ou mais"
                        },
                        value: "score:>50"
                    },
                    {
                        name: "100 votes or more",
                        nameLocalizations: {
                            "pt-BR": "100 votos ou mais"
                        },
                        value: "score:>100"
                    },
                    {
                        name: "200 votes or more",
                        nameLocalizations: {
                            "pt-BR": "200 votos ou mais"
                        },
                        value: "score:>200"
                    },
                    {
                        name: "500 votes or more",
                        nameLocalizations: {
                            "pt-BR": "500 votos ou mais"
                        },
                        value: "score:>500"
                    },
                    {
                        name: "1000 votes or more",
                        nameLocalizations: {
                            "pt-BR": "1000 votos ou mais"
                        },
                        value: "score:>1000"
                    }
                ]
            },
            {
                type: 3,
                required: false,
                name: "rating",
                description: "filter posts by their censorship level (by default and random)",
                descriptionLocalizations: {
                    "pt-BR": "filtrar postagens por seu nível de censura (por padrão e aleatório)"
                },
                choices: [
                    {
                        name: "safe (sfw)",
                        nameLocalizations: {
                            "pt-BR": "seguro (sfw)"
                        },
                        value: "rating:safe"
                    },
                    {
                        name: "questionable (not so sfw)",
                        nameLocalizations: {
                            "pt-BR": "questionável (não tão sfw)"
                        },
                        value: "rating:questionable"
                    },
                    {
                        name: "explicit (nsfw)",
                        nameLocalizations: {
                            "pt-BR": "explícito (nsfw)"
                        },
                        value: "rating:explicit"
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "e621",
            category: "nsfw",
            nsfw: true
        })
        
        this.getOne = function(haystack, arr){
            return arr.find(v => haystack.includes(v));
        };
        this.findOne = function(haystack, arr){
            //some
            return arr.some(v => haystack.includes(v))//.join(', ').toString();
        }
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        
        let tags1 = interaction.options.getString('tags').trim().split(/ +/g);
        let defaut_blacklist = interaction.options.getBoolean("defaut_blacklist") ?? false;
        if (tags1 && !Array.isArray(tags1)) tags1 = tags1.split(' ');
        if(interaction.options.getString('rating')) tags1.push(interaction.options.getString('rating'));
        if(interaction.options.getString('ignore_irrelevant_posts')) tags1.push(interaction.options.getString('ignore_irrelevant_posts'));
        if(interaction.options.getBoolean('auto_ignore_webm_swf')){
            tags1.push("-webm");
            tags1.push("-flash");
        }

        let url = await this.client.private_api.POST(`api/e621/posts`, { tags: tags1 });
        if(url.ok === false){
            interaction.editReply({
                content: t("commands:e621.error"),
                ephemeral: true
            })
            return {}
        } else {
            let posts = url.data.posts;
            
            if(!posts.length){
                interaction.editReply({
                    content: t("commands:e621.no_post", { tags: (tags1.join(" ")).toString() })
                });
                return {}
            } else {
                let number = mathRandom(posts.length);
                let post = posts[number];
                
                let id = post.id;
                let file = post.file.url;
                let score = post.score.total;
                let tags = post.tags.general.concat(post.tags.species, post.tags.character, post.tags.copyright, post.tags.artist, post.tags.invalid, post.tags.lore, post.tags.meta);
                let original_description = post.description || t("commands:e621.no_description");
                if(original_description.length > 1000) {
                    original_description = original_description.substring(0, 997) + '...';
                }
                
                let user = await profile.find(interaction.user);
                let blacklist = defaut_blacklist ? defaut_blacklist_ : (user.config.e6.blacklist || []);
                
                let __description = t("commands:e621.label.one", { postScore: (score).toString(), postId: (id).toString() });
                
                if(tags){
                    if(this.findOne(blacklist, tags)){
                        file = "https://static1.e621.net/data/a8/5e/a85ef1bf5f272c44cbcdd4405b5b94b6";
                        __description = t("commands:e621.label.two", { tags: (this.getOne(blacklist, tags)).toString(), postId: (id).toString() });
                    }
                };

                if(file){
                    if(file.endsWith('.webm') || file.endsWith('.swf')){
                        __description = t("commands:e621.label.three", { postScore: (score).toString(), postId: (id).toString() });
                    }
                };

                if(file == null){
                    __description = t("commands:e621.label.four", { postScore: (score).toString(), postId: (id).toString() });
                }
                
                interaction.editReply({
                    embeds: [
                        {
                            color: 12632256,
                            description: __description,
                            author: {
                                name: post.tags.artist.join(' '),
                                icon_url: "http://i.imgur.com/RrHrSOi.png"
                            },
                            image: {
                                url: file
                            },
                            fields: [
                                {
                                    name: t("commands:e621.original_description"),
                                    value: original_description
                                }
                            ],
                            timestamp: new Date(post.created_at).toISOString(),
                            footer: {
                                text: `ID: ${id}\n`
                            }
                        }
                    ]
                });
                return {}
            }
        }
    }

    /*async autocompleteRun(interaction, t){
        let tags1 = interaction.options.getString('tags');
        let chunks = tags1.split(' ');
        let search = chunks.pop();
        
        let url = await this.client.private_api.POST(`api/e621/autocomplete`, { tags: tags1 });

        if(url.ok === false){
            interaction.respond([]);
        } else {
            interaction.respond(url.data);
        }
    }*/
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "e621",
                description: "ver imagens na e621.net",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<tag_unica ou tags separadas com espaço> [opções]",
                subCommands: []
            },
            en: {
                name: "e621",
                description: "view images on e621.net",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<single_tag or space-separated tags> [options]",
                subCommands: []
            }
        }
    }
}

module.exports = Command