let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let mathRandom = (number) => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "meme",
            description: "memes, memes, memes and memes...",
            category: "fun",
            commandOptions: [
                {
                    type: 1,
                    name: "generate",
                    description: "[ 😂fun ] generate a random meme!"
                },
                {
                    type: 1,
                    name: "knuckles",
                    description: "[ 😂fun ] \"meme?\""
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "generate"){
            let json = await this.client.private_api.meme.find_meme(t.lng);

            let description = `${t("commands:meme.generate.label", { post_title: json.title, post_votes: (json.ups).toString(), post_subreddit: json.subreddit, post_url: json.postLink })}`;
            let file = json.url
            
            if(json.nsfw && !interaction.channel.nsfw){
                description = `${t("commands:meme.generate.label", { post_title: json.title, post_votes: (json.ups).toString(), post_subreddit: json.subreddit, post_url: json.postLink })}\n${t("commands:meme.generate.nsfw")}`;
                file = null 
            } else if(file.endsWith('.webm') || file.endsWith('.mp4')){
                description = `${t("commands:meme.generate.label", { post_title: json.title, post_votes: (json.ups).toString(), post_subreddit: json.subreddit, post_url: json.postLink })}\n${t("commands:meme.generate.no_img")}`;
            }

            let embed = new Discord.MessageEmbed().setImage(file).setColor("#7B68EE").setDescription(description)
            
            interaction.editReply({
                embeds: [embed]
            });
            return {}
        } else if(subCOMMAND === "knuckles"){
            let data = [
                "approved",
                "illegal",
                "paralyzed"
            ];
            let attachment = new Discord.MessageAttachment(`./assets/knuckles/${t.lng}/knuckles_${data[mathRandom(data.length)]}.png`, "knuckles.png");

            interaction.editReply({
                embeds:[
                    {
                        title: t("commands:meme.knuckles"),
                        color: 1639005,
                        image: {
                            url: `attachment://knuckles.png`
                        }
                    }
                ],
                files: [attachment]
            });
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "meme",
                description: "comandos só para memes!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "generate",
                        description: "gerar um meme aleatório"
                    },
                    {
                        name: "knuckles",
                        description: "\"meme?\""
                    }
                ]
            },
            en: {
                name: "meme",
                description: "commands only for memes!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "generate",
                        description: "generate a random meme"
                    },
                    {
                        name: "knuckles",
                        description: "\"meme?\""
                    }
                ]
            }
        }
    }
} 
module.exports = Command 
//let data = this.client.contents.minecraft.crepeer[Math.floor(Math.random() * this.client.contents.minecraft.crepeer.length)];
