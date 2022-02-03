let comando = require("../../frameworks/commando/command.js");
let choices1 = require("../../database/slash_commands/choices/fun/jokenpo.json");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "jokenpo",
            description: "[ 😂diversão ] PEDRA, PAPEL E TESOURA!!",
            category: "fun",
            usage: "<pedra | papel | tesoura>",
            commandOptions: [
                {
                    type: 3,
                    name: "value",
                    description: "pedra, papel ou tesoura?",
                    required: true,
                    choices: [...choices1]
                }
            ]
        })
    }
    async interactionRun(interaction){
        let data = interaction.options.getString("value");
        let rng = Math.floor((Math.random() * 100) + 1);
        
        if(data === "pedra"){
            if(rng > 0 && rng <= 34){
                interaction.editReply({
                    content: ":rock:**|** pedra!\n🔹️**|** empatamos!"
                })
                return {}
            } else if(rng > 34 && rng <= 67){
                interaction.editReply({
                    content: ":newspaper:**|** papel!\n🔹️**|** você perdeu!"
                })
                return {}
            } else if(rng > 67 && rng <= 100){
                interaction.editReply({
                    content: "✂️**|** tesoura!\n🔹️**|** eu perdi :c"
                })
                return {}
            }
        } else if(data === "papel") {
            if(rng > 0 && rng <= 34){
                interaction.editReply({
                    content: ":newspaper:**|** papel!\n🔹️**|** empatamos!"
                })
                return {}
            } else if(rng > 34 && rng <= 67){
                interaction.editReply({
                    content: "✂️**|** tesoura!\n🔹️**|** você perdeu!"
                })
                return {}
            } else if(rng > 67 && rng <= 100){
                interaction.editReply({
                    content: ":rock:**|** pedra!\n🔹️**|** eu perdi!"
                })
                return {}
            }
        } else if(data === "tesoura") {
            if(rng > 0 && rng <= 34){
                interaction.editReply({
                    content: "✂️**|** tesoura!\n🔹️**|** empatamos!"
                })
            } else if(rng > 34 && rng <= 67){
                interaction.editReply({
                    content: ":rock:**|** pedra!\n🔹️**|** você perdeu!"
                })
            } else if(rng > 67 && rng <= 100){
                interaction.editReply({
                    content: ":newspaper:**|** papel!\n🔹️**|** eu perdi!"
                })
            }
        }
        //fim
    }
} 
module.exports = Command 