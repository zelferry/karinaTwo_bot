let comando = require("../../frameworks/commando/command.js");
let { e6 } = require("../../database/client/blacklisted.json");

let Discord = require("discord.js"); 

let mathRandom = number => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "e621",
            description: "[ 😈nsfw ] busque algo na e621.net",
            category: "nsfw",
            nsfw: true,
            usage: "<tag única ou tags separadas com espaço>",
            commandOptions: [
                {
                    type: 3,
                    name: "tags",
                    description: "tag única ou tags separadas com espaço",
                    required: true
                }
            ]
        })
        this.blacklist = e6.blacklist;
        
        this.getOne = function(haystack, arr){
            return arr.find(v => haystack.includes(v));
        };
        this.findOne = function(haystack, arr){
            return arr.some(v => haystack.includes(v));
        }
    }
    async interactionRun(interaction){
        let tags1 = interaction.options.getString('tags').trim().split(/ +/g);
        //interaction.deferReply()

        if (tags1 && !Array.isArray(tags1)) tags1 = tags1.split(' ');

        let url = await this.client.getContainer(`api/e6?tags=${encodeURI(tags1.join("+"))}`);

        if(url.send === false){
            interaction.editReply({
                content: "😭**|** aconteceu um pequeno erro ao recuperar as informações do site!",
                ephemeral: true
            })
            return {}
        } else {
            let posts = url.posts;
            
            if(!posts.length){
                interaction.editReply({
                    content: `🚫**|** nenhum resultado para \`${tags1.join(" ")}\`\n📛**|** tente mais tarde`
                });
                return {}
            } else {
                let number = mathRandom(posts.length);
                let post = posts[number];
                
                let id = post.id;
                let file = post.file.url;
                let score = post.score.total;
                let tags = post.tags.general.concat(post.tags.species, post.tags.character, post.tags.copyright, post.tags.artist, post.tags.invalid, post.tags.lore, post.tags.meta);
                
                let __description = `> **votos**: ${score} | **origem**: [original aqui](https://e621.net/post/show/${id})`;
                let avatar = interaction.user.avatarURL({ dynamic: true, format: 'png', size: 1024 });

                if(tags){
                    if(this.findOne(this.blacklist, tags)){
                        file = "https://static1.e621.net/data/a8/5e/a85ef1bf5f272c44cbcdd4405b5b94b6";
                        __description = `tag(s) na blacklist!\ntag: \`${this.getOne(this.blacklist, tags)}\` | [**Link**](https://e621.net/posts/${id})`
                    }
                };

                if(file){
                    if(file.endsWith('.webm') || file.endsWith('.swf')){
                        __description = `> **votos:** ${score} | **[Link](https://e621.net/post/show/${id})**\n> *arquivos em (webm/swf/mp3/mp4) não são compatíveis com embeds.*`;
                    }
                };

                if(file == null){
                    __description = `> **votos**:${score} | **[link](https://e621.net/posts/show/${id})*\n\n> **erro 500**\nvocê so pode ver a imagem com uma conta [logada](https://e621.net/users/new) na **e621**`;
                }
                //console.log(tags1.join(" "))
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
} 
module.exports = Command 