const Discord = require("discord.js");

let {profile} = require("../mongoDB/ini.js").user 

var config = require('../config.js');
var ownerID = config.ownerID;
exports.run = async (client, message, args) => {
  
let user = message.author
let value = await profile.find(user);

const testdosei = value.usertext
const ruby = value.coins
const vip = value.vipUser 

const daily = value.daily

const topggvotes = value.topggVotes
const bans = value.banned


let color = "be41f4";
let flags = []

if (vip == true) color = "ffe23d"
if (vip == true) flags.push("💠usuario vip!")

if(topggvotes > 10) flags.push("🔝apoiador!")

if(ruby > 7000) flags.push("💵MUCHO MONEY")
if(ownerID.includes(message.author.id)) flags.push("👨‍💻 karina dev!")
//if(bans) color = "FF4500"

const embed = {
  "title": ""+message.author.username+" profile:",
  "color": "#"+color+"",
  "fields": [
    {
      "name": "Panther-coins:",
      "value": "**"+ruby+"**"
    },
    {
      "name":" bagdes",
      "value":""+flags.map(x => "[**"+x+"**]").length <= 0 ? "não  tem :(":flags.map((x,y)=> "`"+(y+1)+"` "+x+"").join("\n")+""
    },
    {
      "name":"texto do usuário:",
      "value":"`"+testdosei+"`"
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