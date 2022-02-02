//nsfw" : 1 ,
let comando = require("../../frameworks/commando/command.js");

var data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]

//var yiff = require("yiff_api")

var Discord = require("discord.js")
//var yiff_ = new yiff.yiff()


class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "yiff",
            description: "[ 😈 nsfw ] yiff booru",
            nsfw: true,
            category: "nsfw",
            usage: "<gay | straight | lesbian | synormorph | bulge | andromorph>",
            commandOptions: [
                {
			type: 3,
            name: "type_image",
            description: "qual sera o tipo? 7-7",
            required: true,
            choices:[
            	{
            		name:"gay",
            		value:"gay"
            	},
            	{
            		name:"straight",
            		value:"straight"
            	},
            	{
            		name:"lesbian",
            		value:"lesbian"
            	},
            	{
            		name:"synormorph",
            		value:"synormorph"
            	},
            	{
            		name:"bulge",
            		value:"bulge"
            	},
            	{
            		name:"andromorph",
            		value:"andromorph"
            	}
            ]
		}
            ]
        })
    }
    async interactionRun(interaction){
        let data = interaction.options.getString('type_image');
        let json = await this.client.dist.modules.yiff[`${data}`]();
        
        let embed = new Discord.MessageEmbed().setImage(json.yiffMediaURL).setColor("#7B68EE").setDescription(`artista(s): ${json.artists.length > 0 ? json.artists.map((c) => `\`${c}\``).join(", ") : "não tem"}`);
        interaction.reply({ embeds: [embed] })
    }
} 
module.exports = Command 
