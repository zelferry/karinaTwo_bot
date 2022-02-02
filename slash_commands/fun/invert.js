let comando = require("../../frameworks/commando/command.js");
let subCOMMAND_opition1_1 = require("../../database/slash_commands/sub_commands/invert.text.json");
let subCOMMAND_opition1_2 = require("../../database/slash_commands/sub_commands/invert.image.json");

let Discord = require("discord.js"); 
let canvacord = require("canvacord");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "invert",
            description: "inverter tudo do avesso, pera... que?",
            category: "fun",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "text",
                    description: "inverter um texto"
                },
                {
                    nane: "image",
                    description: "inverter as cores de uma imagem(so avatares de usuários)"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "text",
                    description: "[ 😂diversão ] inverter um texto",
                    options: [...subCOMMAND_opition1_1]
                },
                {
                    type: 1,
                    name: "image",
                    description: "[ 😂diversão + 📷photoshop ] inverter aa cores de uma imagem!",
                    options: [...subCOMMAND_opition1_2]
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "text"){
            let str = interaction.options.getString('text');
            
            interaction.reply({
                content: `🔄**|** ${(str.split('').reverse().join('')).toString()}`
            })
            return {}
        } else if(subCOMMAND === "image"){
            let user = interaction.options.getUser('user') || interaction.user;
            let avatar = user.avatarURL({
                dynamic: true,
                format: "png",
                size: 1024
            }); 

            let image = await canvacord.Canvas.invert(avatar);
            let attachment = new Discord.MessageAttachment(image, "invert.png");

            interaction.reply({
                files: [attachment]
            })
            return {}
        }
    }
} 
module.exports = Command 
