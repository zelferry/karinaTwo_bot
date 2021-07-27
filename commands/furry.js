const Discord = require("discord.js")
const muttubus = require("../database/imagens/muttubus.json");

module.exports.run = async (client, message, args) => {
  /*
  await message.delete();
  var rand89 = muttubus[Math.floor(Math.random() * muttubus.length)];

  const embed = await new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .setTitle("UwU")
    .setImage(rand89)
    .setColor("#FF00FF")
    .setTimestamp()
  message.channel.send(embed)
  */
var randGay = Math.floor(Math.random() * muttubus.length)
  
let arr = muttubus
const embed = new Discord.MessageEmbed().setImage(muttubus[randGay])
.setColor("#7B68EE").setFooter(`${randGay} / ${arr.length-1}`)

const embedError2 = new Discord.MessageEmbed().setDescription("👍| cancelado!").setColor("#e0000f")

   
 let yeste = randGay
 let author = message.author;
  let msg;
  
  if(await message.channel.permissionsFor(message.member).has("ADD_REACTIONS")){
  msg = message.channel.send(embed);
  }else{
    message.channel.send(":(")
    msg = message.author.send(embed);
  }
  
  msg.then(async (msg) => {
      msg.react('⬅');
      msg.react("➡")
      msg.react("🔁")
      msg.react("❌")
  })

  msg = await msg
  const filter = (reaction, user) => ['⬅','➡','🔁','❌'].includes(reaction.emoji.name) && user.id === author.id;
  const collector = await msg.createReactionCollector(filter, { time: 1000*60*60 });
  collector.on('collect',async r => {
    let user = r.users.cache.last()
    user.id!=client.user.id&&r.users.remove(user);
      if(r.emoji.name === '➡'){
        yeste = yeste +1
        if(yeste > arr.length- 1){yeste = arr.length-1}
        
        let result = arr[yeste]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${yeste} / ${arr.length-1}`)
      
        
        msg.edit(embed)
        
      }
      if(r.emoji.name === '⬅'){
        yeste = yeste - 1
        if(yeste < 0){yeste = 0}
       
        let result = arr[yeste]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${yeste} / ${arr.length-1}`)
      
        msg.edit(embed)
    
      }
      if(r.emoji.name=== "🔁"){
randGay = Math.floor(Math.random() * muttubus.length)
  
arr = muttubus
yeste = randGay
const embed = new Discord.MessageEmbed().setImage(muttubus[randGay]).setColor("#7B68EE").setFooter(`${randGay} / ${arr.length-1}`)
msg.edit(embed)
      }
      if(r.emoji.name === "❌"){
        msg.edit(embedError2)
      
        msg.reactions.removeAll()
      }
  });

  collector.on('end', ()=>{if(msg){
    msg.reactions.removeAll()
  }});

  
};
exports.help = {
  name:"furry",
  permisoes: "nenhuma",
  aliases: ["peludos"],
  description: "veja imagens furrys UwU",
  usage: "furry"
}