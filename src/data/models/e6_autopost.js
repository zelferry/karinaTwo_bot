const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
	guild_id: String,
	webhook: {
		url: String,
		id: String
	},
	e621_config: {
		tags: []
	},
	cache: []
});

module.exports = mongoose.model("e6_autopost", guildSchema);