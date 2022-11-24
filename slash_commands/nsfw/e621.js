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

        let url = await this.client.private_api.GET(`api/e6?tags=${encodeURI(tags1.join("+"))}`);

        if(url.send === false){
            interaction.editReply({
                content: t("commands:e621.error"),
                ephemeral: true
            })
            return {}
        } else {
            let posts = url.posts;
            
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
                
                let user = await profile.find(interaction.user);
                let blacklist = user.config.e6.blacklist || [];
                
                let __description = t("commands:e621.label.one", { postScore: (score).toString(), postId: (id).toString() });
                let avatar = interaction.user.avatarURL({ dynamic: true, format: 'png', size: 1024 });

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
                                name: `${tags1.join(" ")}`,
                                icon_url: avatar
                            },
                            image: {
                                url: file
                            },
                            footer: {
                                icon_url: 'http://i.imgur.com/RrHrSOi.png',
                                text: `e621 · ${id}`
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