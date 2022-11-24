let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let mathRandom = (number) => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "meme",
            description: "memes, memes, memes and memes...",
            category: "miscellaneous",
            commandOptions: [
                {
                    type: 1,
                    name: "generate",
                    description: "[ 🤪miscellaneous ] generate a random meme!"
                },
                {
                    type: 1,
                    name: "knuckles",
                    description: "[ 🤪miscellaneous ] \"meme?\""
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "generate"){
            let data1 = require("../../database/images/sfw/memes.json").all
            let number1 = mathRandom(data1.length);
            let output1 = data1[number1]

            let embed = new Discord.MessageEmbed().setImage(output1).setColor("#7B68EE").setFooter({ text:`${number1+1} / ${data1.length}` });
            
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
                category: "micelanea",
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
                category: "miscellaneous",
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
