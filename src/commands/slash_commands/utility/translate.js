const comando = require("../../../structures/commands/command.js");
const { translations } = require("../../../data/ini.js").user

const Discord = require("discord.js");

class Command extends comando {
    command_data = {
        name: "translate_bot",
        description: "(utilities) translate karinaTwo!",
        name_localizations: {
            "pt-BR": "traduzir_bot"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "pt",
                description: "(utilitários) traduzir a karinaTwo para o português(Brasil)"
            },
            {
                type: 1,
                name: "en",
                description: "(utilities) translate karinaTwo into english"
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "translate_bot",
            category: "utility"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "pt"){
            await translations.set_lang(interaction.user, "pt-BR");
            interaction.editReply({ content: ":flag_br:**|** linguagem alterada para **Português do Brasil**!" });
        } else if(subCOMMAND === "en"){
            await translations.set_lang(interaction.user, "en-US");
            interaction.editReply({ content: ":flag_us:**|** language changed to **English**!" });
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "translate_system",
                description: "traduzir a karinaTwo para outro idioma!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "utilitários",
                usage: "<linguagem>",
                subCommands: []
            },
            en: {
                name: "translate_system",
                description: "translate karinaTwo into another language!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "utilities",
                usage: "<language>",
                subCommands: []
            }
        }
    }
}

module.exports = Command