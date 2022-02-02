let comando = require("../../frameworks/commando/command.js");
let datacoices = require("../../database/slash_commands/sub_commands/nekos.js")
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "nekos",
            description: "comandos NEKOS!",
            category: "nsfw",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "sfw",
                    description: "imagens do website nekos.life"
                },
                {
                    name: "nsfw",
                    description: "imagens do website nekos.life (versão nsfw)"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "sfw",
                    description: "[ 🖨imagem ] imagens do website nekos.life",
                    options: datacoices.sfw
                },
                {
                    type: 1,
                    name: "nsfw",
                    description: "[ 😈nsfw ] imagens do website nekos.life (versão nsfw)",
                    options: datacoices.nsfw
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();
        
        if(subCOMMAND === "sfw"){
            let data1 = interaction.options.getString('image')
            let url1 = await this.client.getContainer(`api/nekos/sfw/${data1}`);

            if(url1.send === false){
                interaction.reply({
                    content: "😭**|** desculpe, mas parece que a RERIMBOCADAPARAFUZETA do servidor estourou :c",
                    ephemeral: true
                })
                return {}
            } else {
                let embed_1 = new Discord.MessageEmbed().setImage(url1.url).setColor("#FA8072");
                interaction.reply({
                    embeds: [embed_1]
                })
                return {}
            }
        } else if(subCOMMAND === "nsfw"){
            if (!interaction.channel.nsfw) return this.client.extra.utils.message.noNsfw(this.client, interaction)
            //this.nsfw = true;

            let data2 = interaction.options.getString('image');
            let url2 = await this.client.getContainer(`api/nekos/nsfw/${data2}`)

            if(url2.send === false){
               interaction.reply({
                    content: "😭**|** desculpe, mas parece que a RERIMBOCADAPARAFUZETA do servidor estourou :c",
                    ephemeral: true
                })
                return {}
            } else {
                let embed_2 = new Discord.MessageEmbed().setImage(url2.url).setColor("#FA8072");
                interaction.reply({
                    embeds: [embed_2]
                })
                return {}
            }
            //this.nsfw = false;
        }
    }
} 
module.exports = Command 