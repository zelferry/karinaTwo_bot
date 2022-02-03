let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "morse",
            description: "[ ❓utilitários ] traduzir um texto para o código morse e virce-versa",
            category: "utility",
            usage: "<texto>",
            commandOptions: [
                {
                    type: 3,
                    name: "text",
                    description: "texto a ser traduzido do seu idiota para o código morse e virce-versa",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        let args = interaction.options.getString("text");
        let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",");
        let text = args.toUpperCase();
        let title1 = "???" 

        while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")){
            text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
        }

        if (text.startsWith(".") || text.startsWith("-")){
            text = text.split(" ");
            let length = text.length;

            for(let i = 0; i < length; i++){
                text[i] = alpha[morse.indexOf(text[i])];
            }
            
            text = text.join("");
            title1 = "morse => TEXTO" 
        } else {
            text = text.split("");
            let length = text.length;

            for(let i = 0; i < length; i++){
                text[i] = morse[alpha.indexOf(text[i])];
            }

            text = text.join(" ");
            title1 = "texto => MORSE" 
        }

        return interaction.editReply({
            embeds: [
                {
                    title: `${title1}`,
                    description: "```"+text+"```",
                    color: 8384739
                }
            ]
        })
    }
} 
module.exports = Command 