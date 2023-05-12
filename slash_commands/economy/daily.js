let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 
let timeout = 86400000

class Command extends comando {
    command_data = {
        name: "daily",
        description: "(economy) get your daily Panther-coins!",
        descriptionLocalizations: {
            "pt-BR": "(economia) obtenha seus Panther-coins diários!"
        },
        dmPermission: false,
        nsfw: false,
        options: []
    }
    
    constructor(...args) {
        super(...args, {
            name: "daily",
            category: "economy"
        })
    }
    async interactionRun(interaction, t){
        let value = await economydb.fech(interaction.user);

        let pescaresult = Math.floor(Math.random() * 49) + 1;

        if(value.config.cooldow.daily !== null && timeout - (Date.now() - value.config.cooldow.daily) > 0){
            var time = this.client.dist.modules.parse_ms(timeout - (Date.now() - value.config.cooldow.daily));
            
            await interaction.deferReply({ ephemeral: true }).catch(() => {});
            interaction.followUp({
                content: t("commands:daily.no_time", {
                    hours: (time.hours).toString(),
                    minutes: (time.minutes).toString(),
                    seconds: (time.seconds).toString()}),
                ephemeral: true
            });
            return {}
        } else {
            let answer = 10
            
            try {
                if(value.config.vip.active == true) {
                    answer = pescaresult * pescaresult * (Math.floor(Math.random() * 10) + 1) * 2
                } else {
                    answer = pescaresult * pescaresult + (Math.floor(Math.random() * 10) + 1)
                }
            } catch (err) {
                await interaction.deferReply({ ephemeral: true }).catch(() => {});
                return interaction.followUp({
                    embeds: [
                        {
                            fields: [
                                {
                                    name: t("commands:daily.error"),
                                    value: "```js\n"+ err +"\n```"
                                }
                            ]
                        }
                    ]
                })
            }
            let perf = new Discord.EmbedBuilder().setColor("be41f4").setThumbnail(interaction.user.displayAvatarURL({ extension: 'jpg' })).setDescription(t("commands:daily.success", { result: answer.toString() })).setTimestamp();

            await interaction.deferReply({ ephemeral: false }).catch(() => {});
            interaction.editReply({
                embeds: [perf]
            });
            await economydb.addmoney(interaction.user, answer, true);
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "daily",
                description: "obtenha seus panther-coins diários!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                subCommands: []
            },
            en: {
                name: "daily",
                description: "get your daily panther-coins!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 
