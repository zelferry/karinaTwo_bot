const comando = require("../../../structures/commands/command.js");
const cat = require("../../../utils/cat_faces.js");

class Command extends comando {
    command_data = {
        name: "owo",
        description: "(fun) cat faces!",
        descriptionLocalizations: {
            "pt-BR": "(diversão) owo"
        },
        dmPermission: false,
        nsfw: false,
        options: []
    }
    
    constructor(...args) {
        super(...args, {
            name: "owo",
            category: "fun"
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let output = cat();

        interaction.editReply({
            content: `🐱**|** ${output}`
        })
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "owo",
                description: "cat faces!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                subCommands: []
            },
            en: {
                name: "owo",
                description: "cat faces!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 