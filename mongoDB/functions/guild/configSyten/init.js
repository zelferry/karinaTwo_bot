
let guildModel = require("../../../models/guild.js")

class configs_ {
	static async newGuild(guild){
		const isGuild = await guildModel.findOne({ guildId: guild.id });
		if(isGuild) return false;
		
		let new_ = new guildModel({
			guildId: guild.id
		})
		await new_.save().catch(e => console.log(e));
		return new_
	}
	static async getConfig(guild,type){
		const isGuild = await guildModel.findOne({ guildId: guild.id });
		
		if(type) if(!isGuild) return { error:"404" } 
		return isGuild.configs
	}
	static async setConfig(entrada,guild){
		const isGuild = await guildModel.findOne({ guildId: guild.id });
		if(!isGuild) return false
		
		function configSET() {
			//for (let i in isGuild.configs) {
				for (let i_ in entrada) {
				//	if (i_ == i) {
						isGuild.configs[i_] = entrada[i_];
					
				}
			
			return isGuild.configs
		}
		isGuild.configs = configSET()
		
		await isGuild.save().catch(e => console.log(e));
		
		return isGuild
	}
}
module.exports = configs_
/*
function tea() {
	for (let i in comfog.config) {
		//console.log(i)
		for (let i_ in entrada) {
			if (i_ == i) {
				comfog.config[i] = entrada[i_];
			}
		}
	}
	return comfog;
}*/