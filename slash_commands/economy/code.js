let comando = require("../../frameworks/commando/command.js");
let { vip } = require("../../mongoDB/ini.js").user; 

let Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "code",
        description: "(economy) use a purchased key and redeem your vip user!",
        descriptionLocalizations: {
            "pt-BR": "(economia) use uma chave comprada e resgate seu vip user!"
        },
        nsfw: false,
        options: [
            {
                type: 3,
                required: true,
                name: "key",
                description: "vip user key (if you don't have one, you can buy it at ko-fi.com/karinatwo/shop)",
                descriptionLocalizations: {
                    "pt-BR": "chave de vip user(se você não tiver uma, pode comprá-la em ko-fi.com/karinatwo/shop)"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "code",
            deferReply: true,
            category: "economy"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        
        let _key = interaction.options.getString("key");
        let key_data = await vip.find_key(_key);
        
        if(!key_data.success){
            interaction.editReply({
                content: t("commands:code.error.invalid_key")
            });
            
            return {}
        } else {
            let today = new Date();
            let expiration_date = new Date(key_data.data.dates.expires_at);
            let diff = expiration_date.getTime() - today.getTime();
            let diffDays = diff / (1000 * 3600 * 24);

            if(diffDays <= 0){
                interaction.editReply({
                    content: t("commands:code.error.expired")
                });

                return {}
            } else {
                
                if(key_data.data.type == "vip_30"){
                    interaction.editReply({
                        content: t("commands:code.success", { days: "30" })
                    });
                    
                    vip.set_vip_1(interaction.user);
                    vip.use_key(_key);

                    return {}
                } else if(key_data.data.type == "vip_60"){
                    interaction.editReply({
                        content: t("commands:code.success", { days: "60" })
                    });
                    
                    vip.set_vip_2(interaction.user);
                    vip.use_key(_key);

                    return {}
                } else {
                    interaction.editReply({
                        content: t("commands:code.error.type")
                    });

                    return {}
                }
            }
        }
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "code",
                description: "use uma chave comprada e resgate seu vip user!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economia",
                subCommands: []
            },
            en: {
                name: "code",
                description: "use a purchased key and redeem your vip user!",
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