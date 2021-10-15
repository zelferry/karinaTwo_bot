
const Discord = require("discord.js")
var config = require('../../config.js');
var ownerID = config.ownerID;/*
const dbfunc = require("../KariModules/ban.js")
const dblow = dbfunc.dblow
*/
let {bansUsers} = require("../../mongoDB/ini.js").user 


exports.run = async (client, message, args) => {
  
if (ownerID.includes(message.author.id)) {
let member = message.mentions.users.first() || await client.users.fetch(args[0],true);

if (!member) return message.reply({content:'você precisa mencionar um usuário!'});
  
let bansSeek = await bansUsers.seekAndValidateBan(member)

if(!bansSeek) return message.channel.send({content:"DATABASE ERROR: o usuário não existe!"})

if(bansSeek.ready) {
await bansUsers.removeBan(member)
		message.channel.send({content:`o usuário <@${member.id}> foi desbanido de usar meus comandos!`})
		return
	} else {
		message.channel.send({content:`DATABASE ERROR: o usuário não foi banido!`})
 }
} else {
 	message.reply({content:":x:|apenas pessoas ESPECIAIS podem usar esse comando :3"})
    }
}
exports.config = {
    test: false
}
exports.help = {
  name:"userurban",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "desbanir um usuário de usar meus comandos",
  usage: "userurban <usuario>"
}