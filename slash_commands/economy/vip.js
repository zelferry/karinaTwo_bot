let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "vip",
            description: "[ 💸economia ] compre vip!",
            category: "economy"
        })
    }
    async interactionRun(interaction){
        let user = interaction.user;
        let value = await economydb.fech(user);

        if(value.coins <= 2500){
            return interaction.reply({
                content: "🚫**|** você não tem *panther-coins* o suficiente!\n💸**|** e necessário ter ***2.500*** panther-coins ou mais para comprar o *vip user*",
                ephemeral: true
            })
        } else if(value.vipUser == true){
            return interaction.reply({
                content: "🚫**|** você ja e um usuário vip!",
                ephemeral: true
            })
        } else {
            const embed = new Discord.MessageEmbed().setTitle("**Vip User Comprado**").setDescription(`você comprou: **vip user** por **2.500 Panther-coins**`).setColor("#be41f4");
            
            interaction.reply({
                embeds: [embed]
            });
            
            await economydb.setVip(user);
            await economydb.removemoney(user, 2500);

            return {}
        }
    }
} 
module.exports = Command 
