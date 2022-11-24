let comando = require("../../frameworks/commando/command.js");
let subCOMMAND_opition1_1 = require("../../database/slash_commands/sub_commands/invert.text.json");
let subCOMMAND_opition1_2 = require("../../database/slash_commands/sub_commands/invert.image.json");

let Discord = require("discord.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "invert",
            description: "reverse everything inside out, wait... what?",
            category: "fun",
            commandOptions: [
                {
                    type: 1,
                    name: "text",
                    description: "[ 😂fun ] invert a text!",
                    options: [...subCOMMAND_opition1_1]
                }/*,
                {
                    type: 1,
                    name: "image",
                    description: "[ 😂fun + 📷photoshop ] inverter aa cores de uma imagem!",
                    options: [...subCOMMAND_opition1_2]
                }*/
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "text"){
            let str = interaction.options.getString('text');
            
            interaction.editReply({
                content: `🔄**|** ${(str.split('').reverse().join('')).toString()}`
            })
            return {}
        }/* else if(subCOMMAND === "image"){
            let user = interaction.options.getUser('user') || interaction.user;
            let avatar = user.avatarURL({
                dynamic: true,
                format: "png",
                size: 1024
            }); 

            let image = await canvacord.Canvas.invert(avatar);
            let attachment = new Discord.MessageAttachment(image, "invert.png");

            interaction.editReply({
                files: [attachment]
            })
            return {}
        }*/
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "invert",
                description: "inverter tudo do avesso, pera... que?",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "text",
                        description: "inverter um texto!"
                    }
                ]
            },
            en: {
                name: "invert",
                description: "reverse everything inside out, wait... what?",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "text",
                        description: "invert a text!"
                    }
                ]
            }
        }
    }
} 

module.exports = Command 