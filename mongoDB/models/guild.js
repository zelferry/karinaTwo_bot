const mongoose = require("mongoose");


const guildSchema = mongoose.Schema({
	guildId: Number,
	prefix: {
		type: String,
		default: "f/"
	},
	configs:{
		antiraid:{
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