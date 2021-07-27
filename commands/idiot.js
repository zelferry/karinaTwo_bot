const Discord = require('discord.js');

const low = require("lowdb")
const fsync = require("lowdb/adapters/FileSync")
const adap = new fsync('database/micaela/idiotas.json')
const db = low(adap)

//db.defaults({'all':[]}).write()

class dblg {
 static newUser(entradaTOP,valor) {
if(db.get('all').find({id: entradaTOP}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
	db.get('all').push({
		id: entradaTOP,
		idiot: valor
	}).write()
 }
}

module.exports.run = async (client, message, args) => {
  
var rand = Math.floor(Math.random() * (100 - 1)) + 1

//let user = message.mentions.users.first() || client.users.cache.get(args[0]);

var value = db.get('all').find({id: message.author.id}).value()

if(value == undefined) {
		dblg.newUser(message.author.id,rand)
  message.channel.send({embed: {color: 3447003,description: `sua idiotice e de **` + (rand) + `**`}});    
  return
}
var reste = value.idiot;


message.channel.send({embed: {
  color: 3447003,
  description: `sua idiotice e de **` + (reste) + `**`
}});

console.log(`comando f/idiot usado`);
}
exports.help = {
  name:"idiot",
  permisoes: "nenhuma",
  aliases: ["idiotamometro"],
  description: "qual e sua idiotice?",
  usage: "idiot"
}