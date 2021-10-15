
const Discord = require("discord.js")
var config = require('../../config.js');
var ownerID = config.ownerID;/*
const dbfunc = require("../KariModules/ban.js")
const dblow = dbfunc.dblow
*/
let {bansUsers} = require("../../mongoDB/ini.js").user 


exports.run = async (client, message, args) => {
  
if (ownerID.includes(message.author.id)) {
let member = await client.users.fetch(args[0],true)

if (!member) return message.reply({content:'você precisa mencionar um usuário!'});
  
let bansSeek = await bansUsers.seekAndValidateBan(member)

if(!bansSeek.ready) {
await bansUsers.addban(member,args.slice(1).join(' '))
		message.channel.send({content:`o usuário <@${member.id}> foi banido de usar meus comandos!`})
		return
	} else {
		message.channel.send({content:`DATABASE ERROR: O Membro já tem registro na DataBase.`})
 }
} else {
 	message.reply({content:":x:**|**apenas pessoas ESPECIAIS podem usar esse comando :3"})
    }
}
exports.config = {
    test: false
}
exports.help = {
  name:"userban",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "banir um usuário de usar meus comandos",
  usage: "userban <usuario>"
}