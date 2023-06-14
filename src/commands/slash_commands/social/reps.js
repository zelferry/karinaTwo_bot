const comando = require("../../../structures/commands/command.js");
const parse_ms = require("../../../utils/parse_ms.js");
const { economydb } = require("../../../data/ini.js").user

const Discord = require("discord.js"); 
const timeout1 = 1800000
const timeout2 = 600000

class Command extends comando {
    command_data = {
        name: "reps",
        description: "(social) give REPS(reputation) to a user",
        description_localizations: {
            "pt-BR": "(social) dar REPS(reputação) para um usuário"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 6,
                required: true,
                name: "user",
                description: "user (@user/id)",
                name_localizations: {
                    "pt-BR": "usuário"
                },
                description_localizations: {
                    "pt-BR": "usuário (@usuário/id)"
                }
            }
        ]
    }

    constructor(...args) {
        super(...args, {
            name: "reps",
            category: "social"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let membro1 = interaction.options.getUser("user");
        let membro2 = interaction.user;

        let value1 = await economydb.fech(membro1);
        let value2 = await economydb.fech(membro2);
        
        if(membro1.id === membro2.id){
            await interaction.deferReply({ ephemeral: true }).catch(() => {});
            interaction.followUp({
                content: t("commands:reps.error.is_you"),
                ephemeral: true
            });
            
            return {}
        } else if(value2.config.cooldow.reps !== null && this.vipuser_cooldow_check(value2)) {
            await interaction.deferReply({ ephemeral: true }).catch(() => {});

            let time = parse_ms(this.vipuser_cooldow_data(value2));

            interaction.followUp({
                content: t("commands:reps.error.no_time", {
                    hours: (time.hours).toString(),
                    minutes: (time.minutes).toString(),
                    seconds: (time.seconds).toString()
                }),
                ephemeral: true
            });

            return {}
        } else {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});

            interaction.editReply({
                content: t("commands:reps.success", {
                    user: membro1.username
                })
            });
            await economydb.add_reps(membro2, membro1);

            return {}
        }
    }

    vipuser_cooldow_check(data){
        switch (data.config.vip.active){
            case true: 
                return timeout2 - (Date.now() - data.config.cooldow.reps) > 0
            case false: 
                return timeout1 - (Date.now() - data.config.cooldow.reps) > 0
        }
    }

    vipuser_cooldow_data(data){
        switch (data.config.vip.active){
            case true: 
                return timeout2 - (Date.now() - data.config.cooldow.reps) 
            case false: 
                return timeout1 - (Date.now() - data.config.cooldow.reps) 
        }
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "reps",
                description: "dar REPS(reputação) para um usuário",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<usuário>",
                subCommands: []
            },
            en: {
                name: "reps",
                description: "give REPS(reputation) to a user",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<usuário>",
                subCommands: []
            }
        }
    }
}

module.exports = Command