let comando = require("../../frameworks/commando/command.js");
let { e6 } = require("../../database/client/blacklisted.json");
let { profile } = require('../../mongoDB/ini.js').user;


let Discord = require("discord.js"); 

let mathRandom = number => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "e621",
            description: "[ 😈nsfw ] look for something on e621.net",
            category: "nsfw",
            nsfw: true,
            commandOptions: [
                {
                    type: 3,
                    name: "tags",
                    description: "single ag or space-separated tags",
                    required: true
                }
            ]
        })
        //this.blacklist = e6.blacklist;
        
        this.getOne = function(haystack, arr){
            return arr.find(v => haystack.includes(v));
        };
        this.findOne = function(haystack, arr){
            return arr.some(v => haystack.includes(v));
        }
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let tags1 = interaction.options.getString('tags').trim().split(/ +/g);
        //interaction.deferReply()

        if (tags1 && !Array.isArray(tags1)) tags1 = tags1.split(' ');

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
                    content: t("commands:e621.no_post")
                });
                return {}
            } else {
                let number = mathRandom(posts.length);
                let post = posts[number];
                
                let id = post.id;
                let file = post.file.url;
                let score = post.score.total;
                let tags = post.tags.general.concat(post.tags.species, post.tags.character, post.tags.copyright, post.tags.artist, post.tags.invalid, post.tags.lore, post.tags.meta);
                let original_description = post.description || t("commands:e621.no_description")
                if(original_description.length > 150) {
                    original_description = original_description.substring(0, 149) + '...';
                }
                
                let user = await profile.find(interaction.user);
                let blacklist = user.config.e6.blacklist || [];
                
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
                            color: '#C0C0C0',
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
                            timestamp: new Date(post.created_at),
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
                usage: "<tag_unica ou tags separadas com espaço>",
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
                usage: "<single_tag or space-separated tags>",
                subCommands: []
            }
        }
    }
} 
module.exports = Command