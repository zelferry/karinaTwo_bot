let guildModel = require("../../../models/guild.js");

class guildPREFIX {
	static async newGuild(guild){
		const isGuild = await guildModel.findOne({ guildId: guild.id });
		if(isGuild) return false;
		
		let new_ = new guildModel({
			guildId: guild.id
		})
		await new_.save().catch(e => console.log(e));
		return new_
	}

	static async findPrefix(guild, message,type){
		const isGuild = await guildModel.findOne({ guildId: guild.id });
		
		if(!isGuild){
			let newGuild = new guildModel({
				guildId: guild.id,
			})
			
			await newGuild.save().catch(e => console.log(e));
			
			
			return type ? (message.content.startsWith(newGuild.prefix) ? newGuild.prefix : 'f/') : newGuild.prefix
		}
		return type ? (message.content.startsWith(isGuild.prefix) ? isGuild.prefix : 'f/') : isGuild.prefix
	}

	static async setPrefix(guild,prefix_){
		const isGuild = await guildModel.findOne({ guildId: guild.id });
		
		if(!isGuild){
			let newGuild = new guildModel({
				guildId: guild.id,
				prefix: prefix_
			})
			await newGuild.save().catch(e => console.log(e));
			
			return newGuild
		}
		
		isGuild.prefix = prefix_
		await isGuild.save().catch(e => console.log(e));

		return isGuild
	}

	static async find(guild){}
}
module.exports = guildPREFIX