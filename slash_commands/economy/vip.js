let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "vip",
            deferReply: true,
            description: "[ 💸economy ] buy vip!",
            category: "economy"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.user;
        let value = await economydb.fech(user);

        if(value.coins <= 2500){
            return interaction.followUp({
                content: t("commands:buy.vip.error.insufficient")
            })
        } else if(value.vipUser == true){
            return interaction.followUp({
                content: t("commands:buy.vip.error.vip_activated")
            })
        } else {
            const embed = new Discord.MessageEmbed().setTitle(t("commands:buy.vip.success.title")).setDescription(t("commands:buy.vip.success.description")).setColor("#fd9058");
            
            await interaction.editReply({ embeds: [embed] });
            
            await economydb.setVip(user);
            await economydb.removemoney(user, 2500);

            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "vip",
                description: "compre vip!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                subCommands: []
            },
            en: {
                name: "vip",
                description: "buy vip!",
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
