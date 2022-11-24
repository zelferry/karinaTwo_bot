let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "morse",
            description: "[ ❓utilities ] translate a text into morse code, and you can also do the opposite!",
            category: "utility",
            usage: "<texto>",
            commandOptions: [
                {
                    type: 3,
                    name: "text",
                    description: "text to be translated from your language to morse code or from morse code to your language",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
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
            title1 = t("commands:morse.morse_text") 
        } else {
            text = text.split("");
            let length = text.length;

            for(let i = 0; i < length; i++){
                text[i] = morse[alpha.indexOf(text[i])];
            }

            text = text.join(" ");
            title1 = t("commands:morse.text_morse") 
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

    command_info(){
        return {
            activated: true,
            pt: {
                name: "morse",
                description: "traduzir um texto para o código morse e virce-versa",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "utilitários",
                usage: "<texto>",
                subCommands: []
            },
            en: {
                name: "morse",
                description: "translate a text into morse code, and you can also do the opposite!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "utilities",
                usage: "<text>",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 