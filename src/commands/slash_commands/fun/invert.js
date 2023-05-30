const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js");

class Command extends comando {
    command_data = {
        name: "invert",
        description: "(fun) reverse everything inside out, wait... what?",
        nameLocalizations: {
            "pt-BR": "inverter"
        },
        descriptionLocalizations: {
            "pt-BR": "(divertido) inverter tudo do avesso, espera... o quê?"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "text",
                description: "(fun) invert a text!",
                nameLocalizations: {
                    "pt-BR": "texto"
                },
                descriptionLocalizations: {
                    "pt-BR": "(divertido) inverter um texto!",
                    options: [
                        {
                            type: 3,
                            name: "text",
                            description: "what will the text be?",
                            nameLocalizations: {
                                "pt-BR": "texto"
                            },
                            descriptionLocalizations: {
                                "pt-BR": "qual será o texto?"
                            },
                            required: true
                        }
                    ]
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "invert",
            category: "fun"
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
        }
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