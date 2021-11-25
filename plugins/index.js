let autoTopGgPost_ = require("./topgg/postStarts/init.js")

module.exports = {
	autoTopGgPost: function(client,opinions){
		if(!opinions) opinions = {}
		if(!client) throw new Error("client inválido!")
		return new autoTopGgPost_(client,opinions)
	},
    giveaway: require("./commands/giveaway_commands/main.js")
}