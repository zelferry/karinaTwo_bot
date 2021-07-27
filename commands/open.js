const Discord = require("discord.js");
const db = require("megadb");

let MoneyDB = new db.crearDB("Economy");
let ChestDB = new db.crearDB("Chests");
let PrefixDB = new db.crearDB("Prefix");

exports.run = async (client, message, args) => {
  
  const f = ":x:";

    if (!PrefixDB.tiene(`${message.guild.id}`))
    PrefixDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      prefix: "f/"
    });

    let prefixoAtual = await PrefixDB.obtener(`${message.guild.id}.prefix`);

  const box = args[0]
  if(!box) return message.channel.send(`${f} | Você precisa fornecer a box que deseja abrir! Exemplo: \`` + prefixoAtual + 'open C|R|L`')

  const rewardC = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10", 
  "11"
  ]

  const rewardR = [
  "200",
  "300",
  "400",
  "400",
  "500"
  ]

  const rewardL = [
  "3500",
  "3600",
  "3700",  
  "3800",
  "3900",
  "4000",
  "4100",
  "4200",
  "4300",
  "4400",
  "4500",
  "4600",
  "4700",
  "4800",
  "4900",
  "5000",
  "5500",
  "6000",
  "6300",
  "6500",
  "70000",
  "7500000"
  ]

  const commonR = rewardC[Math.floor((Math.random() * rewardC.length))]
  const rareR = rewardR[Math.floor((Math.random() * rewardR.length))]
  const legendaryR = rewardL[Math.floor((Math.random() * rewardL.length))]

 if(!MoneyDB.tiene(`${message.author.id}`))
      MoneyDB.establecer(`${message.author.id}`, { coins: 0 })

  if(!ChestDB.tiene(`${message.author.id}`))
      ChestDB.establecer(`${message.author.id}`, {
      common: 0,
      rare: 0,
      legendary: 0,
      diverr:0
    })

  const ruby = await MoneyDB.obtener(`${message.author.id}.coins`);
  const com = await ChestDB.obtener(`${message.author.id}.common`);
  const rar = await ChestDB.obtener(`${message.author.id}.rare`);
  const leg = await ChestDB.obtener(`${message.author.id}.legendary`);
  const div = await ChestDB.obtener(`${message.author.id}.diverr`);

  if (box === 'C') {

  if(com <= 0) return message.channel.send(`${f} | Você não tem **Common Box** suficientes!`)
    
    const embed = new Discord.MessageEmbed()
      .setTitle(`**Common Box Aberta!**`)
      .setDescription(`Você obteve: **${commonR} panther-coins**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')
    message.channel.send(embed);

    ChestDB.restar(`${message.author.id}.common`, 1);
    MoneyDB.sumar(`${message.author.id}.coins`, commonR);
  }

  if (box === 'R') {

  if(rar <= 0) return message.channel.send(`${f} | Você não tem **Rare Box** suficientes!`)
    
    const embed = new Discord.MessageEmbed()
      .setTitle(`**Rare Box Aberta!**`)
      .setDescription(`Você obteve: **${rareR} panther-coins**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')
      .setColor("#be41f4")
    message.channel.send(embed);

    ChestDB.restar(`${message.author.id}.rare`, 1);
    MoneyDB.sumar(`${message.author.id}.coins`, rareR);

  }

  if (box === 'L') {

  if(leg <= 0) return message.channel.send(`${f} | Você não tem **Legendary Box** suficientes!`)
    
    const embed = new Discord.MessageEmbed()
      .setTitle("**Legendary Box Aberta!**")
      .setDescription(`Você obteve: **$${legendaryR} panther-coins**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')
      .setColor("#be41f4")

    message.channel.send(embed)

    ChestDB.restar(`${message.author.id}.legendary`, 1);
    MoneyDB.sumar(`${message.author.id}.coins`, legendaryR);

  }
  if(box === "D"){
    message.channel.send("em breve...")
    /*let valores = [
      {
        "item":"você ganhou {count} de baus {box_type}!",
        "countbox":{
          "C":{
            "name":"comums",
            "val":[1,2,3,4,5,6,7,8,9,10,11,21,31,41,51,61,71,81,91,101],
            "exe":function(n){}
          },
          "R":{
            "name":"raros",
            "val":[1,2,3,4,5,6,7,8,9,10,11,21,31,41,51,61,71,81,91,101]
          },
          "L":{
            "name":"legendários",
            "val":[1,2,3,4,5,6,7,8,9,10,11,21,31,41,51,61,71,81,91,101]
          }
        }
      },
      {}
    ]*/
  }

}
exports.help = {
  name:"open",
  permisoes: "nenhuma",
  aliases: ["abrir"],
  description: "abra um bau do meu sistema de economia!",
  usage: "open <C,R,L>"
}