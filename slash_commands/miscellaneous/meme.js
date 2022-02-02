let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let mathRandom = (number) => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "meme",
            description: "memes, memes, memes e mais memes...",
            category: "miscellaneous",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "generate",
                    description: "gerar um meme aleatório!"
                },
                {
                    name: "knuckles",
                    description: "\"meme?\""
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "generate",
                    description: "[ 🤪miscelânea ] gerar um meme aleatório!"
                },
                {
                    type: 1,
                    name: "knuckles",
                    description: "[ 🤪miscelânea ] \"meme?\""
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "generate"){
            let data1 = require("../../database/images/sfw/memes.json").all
            let number1 = mathRandom(data1.length);
            let output1 = data1[number1]

            let embed = new Discord.MessageEmbed().setImage(output1).setColor("#7B68EE").setFooter(`${number1+1} / ${data1.length}`);
            
            interaction.reply({
                embeds: [embed]
            });
            return {}
        } else if(subCOMMAND === "knuckles"){
            let data = this.client.contents.knuckles[Math.floor(Math.random() * this.client.contents.knuckles.length)];

            interaction.reply({
                embeds:[
                    {
                        title: "sera que o Knuckles aprovou seu meme?",
                        color: 1639005,
                        image: {
                            url: data
                        }
                    }
                ]
            });
            return {}
        }
    }
} 
module.exports = Command 
//let data = this.client.contents.minecraft.crepeer[Math.floor(Math.random() * this.client.contents.minecraft.crepeer.length)];