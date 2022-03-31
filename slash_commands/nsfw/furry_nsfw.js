let comando = require("../../frameworks/commando/command.js");

let data_1 = require("../../database/images/nsfw/furry/nsfw.json");
let data_2 = require("../../database/images/nsfw/furry/gay.json");
let data_3 = require("../../database/images/nsfw/furry/gynomorph.json");

let Discord = require("discord.js");

let mathRandom = (number) => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "furry_nsfw",
            description: "comandos de furries(versão nsfw)",
            category: "nsfw",
            nsfw: true,
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "nsfw",
                    description: "nsfw straight"
                },
                {
                    name: "gay",
                    description: "nsfw gay"
                },
                {
                    name: "gynomorph",
                    description: "gynomorph"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "nsfw",
                    description: "[ 😈nsfw ] nsfw straight"
                },
                {
                    type: 1,
                    name: "gay",
                    description: "[ 😈nsfw ] nsfw gay"
                },
                {
                    type: 1,
                    name: "gynomorph",
                    description: "[ 😈nsfw ] nsfw gynomorph"
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "nsfw"){
            let number1 = mathRandom(data_1.length);
            let data1 = data_1[number1];
            
            let embed_1 = new Discord.MessageEmbed().setImage(data1).setColor("#7B68EE").setFooter({ text:`${number1 + 1} / ${data_1.length}` });

            interaction.editReply({
                embeds: [embed_1]
            });
            return {}
        } else if(subCOMMAND === "gay"){
            let number2 = mathRandom(data_2.length);
            let data2 = data_2[number2];

            let embed_2 = new Discord.MessageEmbed().setImage(data2).setColor("#7B68EE").setFooter({ text:`${number2 + 1} / ${data_2.length}` });

            interaction.editReply({
                embeds: [embed_2]
            })
            return {}
        } else if(subCOMMAND === "gynomorph"){
            let number3 = mathRandom(data_3.length);
            let data3 = data_3[number3];

            let embed_3 = new Discord.MessageEmbed().setImage(data3).setColor("#7B68EE").setFooter({ text:`${number3 + 1} / ${data_3.length}` });

            interaction.editReply({
                embeds: [embed_3]
            });
            return {}
        }
    }
} 
module.exports = Command 