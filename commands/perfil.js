const Discord = require("discord.js");
const db = require("megadb");

exports.run = async (client, message, args) => {
  
let MoneyDB = new db.crearDB("Economy");

let VipDB = new db.crearDB("Vip");

let ChestDB = new db.crearDB("Chests");
let textDB = new db.crearDB("userText");

 if (!MoneyDB.tiene(`${message.author.id}`))
    MoneyDB.establecer(`${message.author.id}`, { coins: 0 });

 if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
      vip: 'No'}); 

if(!ChestDB.tiene(`${message.author.id}`))
      ChestDB.establecer(`${message.author.id}`, {
common: 0,
rare: 0,
legendary: 0,
diverr:0
}); 


if (!textDB.tiene(`${message.author.id}`))
    textDB.establecer(`${message.author.id}`, {
      texto: "\"kari e minha amiga :3, sabia que você pode mudar esse texto usando o **f/usertext**?(requer vip user\""
    });

const testdosei = await textDB.obtener(`${message.author.id}.texto`);
const ruby = await MoneyDB.obtener(`${message.author.id}.coins`);
const vip = await VipDB.obtener(`${message.author.id}.vip`); 
const com = await ChestDB.obtener(`${message.author.id}.common`);
const rar = await ChestDB.obtener(`${message.author.id}.rare`);
const leg = await ChestDB.obtener(`${message.author.id}.legendary`);
const div = await ChestDB.obtener(`${message.author.id}.diverr`);

const on = "não"; 
const off = "sim";

let color = "be41f4";
let emojivip = "";
if (vip == "Yes") color = "ffe23d"
if (vip == "Yes") emojivip = "<:vip_karina_emoji:827053585665097768>"
const embed = {
  "title": ""+emojivip+""+message.author.username+" profile:",
  "color": "#"+color+"",
  "fields": [
    {
      "name": "Panther-coins:",
      "value": "**"+ruby+"**"
    },
    {
      "name": "usuário Vip?",
      "value": ""+vip === 'No' ? on : off+""
    }, 
    {
      "name":"baus",
      "value":"comuns: **"+com+"** \nraros: **"+rar+"** \nlegendarios: **"+leg+"**"
    },
    {
      "name":"texto do usuário:",
      "value":""+testdosei+""
    }
  ]
};
message.channel.send({ embed });
}
exports.help = {
  name:"perfil",
  permisoes: "nenhuma",
  aliases: ["profile","infor-user"],
  description: "seu perfil!",
  usage: "perfil"
}