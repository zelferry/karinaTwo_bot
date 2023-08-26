const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
	guildId: Number,
	prefix: {
		type: String,
		default: "f/"
	},
	configs:{
		configured: {
			type: Boolean,
			default: false
		},
		base: {
			channels: {
				logs: String,
				welcome: String,
				bye_bye: String
			}
		},
		antiraid: {
			type: Boolean,
			default: false
		},
        pagesBUTONS: {
            type: Boolean,
            default: false
        },
        antiNsfw: {
            type: Boolean,
            default: false
        }
	}
})

module.exports = mongoose.model("guilds", guildSchema);