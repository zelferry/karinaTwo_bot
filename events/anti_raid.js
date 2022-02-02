let Discord = require("discord.js");
let {configs} = require("../mongoDB/ini.js").guild 


exports.type = "messageCreate";
exports.start = async(client,clusterID,ipc,message) => {
	if (!message.guild) return;
    
	let config__ = await configs.getConfig(message.guild,true);
	
	if(config__.error !== "404"){
		if(config__.antiraid){
            client.antiSpam.message(message)
		} else {
            return;
        };
	};
}