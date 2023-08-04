let guildModel = require("../../../models/e6_autopost.js");

class guild_e6 {
	static async new_data({ guild, webhook, e6_tags }){
		const isGuild = await guildModel.findOne({ guild_id: guild.id });
		if(isGuild) return false;
		
		const new_ = new guildModel({
			guild_id: guild.id,
            webhook: {
                url: webhook.url,
                id: webhook.id
            },
            e621_config: {
                tags: e6_tags
            }
		});

		await new_.save().catch(e => console.log(e));
		return new_
	}
    
	static async validate(guild){
        const isGuild = await guildModel.findOne({ guild_id: guild.id });

        if(!isGuild){
            return false
        } else {
            return true
        }
    }

    static async add_post(id, guild){
        const guild_data = await guildModel.findOne({ guild_id: guild });

        guild_data.cache.push(id);

        await guild_data.save().catch(e => console.log(e));

        return guild_data
    }

    static async fetch(guild){
        const guild_data = await guildModel.findOne({ guild_id: guild.id });

        return guild_data
    }

    static async find_all(){
        const guild_data = await guildModel.find();

        return [...guild_data]
    }

    static async delete1(guild){
        await guildModel.deleteMany({ guild_id: guild.id }).catch(e => console.log(e));

        return {}
    }
}

module.exports = guild_e6