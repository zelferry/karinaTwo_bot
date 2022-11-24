
module.exports = {
	user:{
		economydb: require("./functions/user/economy/init.js"),
		afk: require("./functions/user/afk/init.js"),
		profile: require("./functions/user/profile/init.js"),
		topgg: require("./functions/user/topGG/init.js"),
        translations: require("./functions/user/translations/init.js"),
        
        bgdb: require("./functions/user/background/init.js"),
		bansUsers: require("./functions/user/bannerds/init.js")
	},
	guild:{
		prefix: require("./functions/guild/prefix/init.js"),
		configs: require("./functions/guild/configSyten/init.js"),
		deleteGuild: async function(guild){
			let guilModel = require("./models/guild.js")
			const guild_ = await guilModel.findOne({ guildId: guild.id });
			
			if (!guild_) return false;
			await guilModel.deleteMany({ guildId: guild.id }).catch(e => console.log(e));
			return guild;
		}
	}
}