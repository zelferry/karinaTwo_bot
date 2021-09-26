
const Discord = require("discord.js")
var config = require('../../config.js');
var ownerID = config.ownerID;/*
const dbfunc = require("../KariModules/ban.js")
const dblow = dbfunc.dblow
*/
let {bansUsers} = require("../../mongoDB/ini.js").user 


exports.run = async (client, message, args) => {
  
if (ownerID.includes(message.author.id)) {
let member = message.mentions.users.first() || client.users.cache.get(args[0]);

if (!member) return message.reply('você precisa mencionar um usuário!');
  
let bansSeek = await bansUsers.seekAndValidateBan(member)

if(!bansSeek) return message.channel.send("DATABASE ERROR: o usuário não existe!")

if(bansSeek.ready) {
await bansUsers.removeBan(member)
		message.channel.send(`o usuário <@${member.id}> foi desbanido de usar meus comandos!`)
		return
	} else {
		message.channel.send(`DATABASE ERROR: o usuário não foi banido!`)
 }
} else {
 	message.reply(":x:|apenas pessoas ESPECIAIS podem usar esse comando :3")
    }
}
exports.help = {
  name:"userurban",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "desbanir um usuário de usar meus comandos",
  usage: "userurban <usuario>"
}