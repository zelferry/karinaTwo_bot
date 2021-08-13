const Discord = require("discord.js");

exports.run = async (client, message, args) => {
/*
    if (!PrefixDB.tiene(`${message.guild.id}`))
    PrefixDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      prefix: "f/"
    });

    let prefixoAtual = await PrefixDB.obtener(`${message.guild.id}.prefix`)

  const item = args[0]
  if(!item) return message.channel.send(`Você precisa fornecer o item que deseja comprar! Exemplo: \`` + prefixoAtual + 'buy C|R|L`')

 if(!MoneyDB.tiene(`${message.author.id}`))
      MoneyDB.establecer(`${message.author.id}  `, {
                            coins    : 0   
                          })

  if(!ChestDB.tiene(`${message.author.id}`))
      ChestDB.establecer(`${message.author.id}`, {
common: 0,
rare: 0,
legendary: 0,
diverr:0
})


  const ruby = await MoneyDB.obtener(`${message.author.id}.coins`);
  const com  = await ChestDB.obtener(`${message.author.id}.common`);
  const rar  = await ChestDB.obtener(`${message.author.id}.rare`);
  const leg  = await ChestDB.obtener(`${message.author.id}.legendary`);
  const div = await ChestDB.obtener(`${message.author.id}.diverr`);


  if (item === 'C') {

  if(ruby <= 299) return message.channel.send(`Você não tem **panther-coins** suficientes!`)

    const embed = new Discord.MessageEmbed()
      .setTitle("**Box Comprada**")
      .setDescription(`Você comprou: **x1** por ** 300 panther-coins**`)
      .setColor("#be41f4")
    let compra = await message.channel.send(embed);

    compra.react("💲");
    ChestDB.sumar(`${message.author.id}.common`, 1);
    MoneyDB.restar(`${message.author.id}.coins`, 300);
  }

  if (item === 'R') {

  if(ruby <= 699) return message.channel.send(`Você não tem **panther-coins** suficientes!`)

    const embed = new Discord.MessageEmbed()
      .setTitle("**Box Comprada**")
      .setDescription(`Você comprou: **x1** por **700 panther-coins**`)
      .setColor("#be41f4")
   message.channel.send(embed);

    ChestDB.sumar(`${message.author.id}.rare`, 1);
    MoneyDB.restar(`${message.author.id}.coins`, 700);

  }

    if (item === 'L') {
      

const db = require("megadb");
let VipDB = new db.crearDB("Vip");

  if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

const vip = await VipDB.obtener(`${message.author.id}.vip`);

if(vip == 'No') return message.channel.send(`:x: |apenas para usuários **vips** :v`);
  
  if(ruby <= 7999) return message.channel.send(` Você não tem **panther-coins** suficientes!`)

    const embed = new Discord.MessageEmbed()
      .setTitle("**Box Comprada**")
      .setDescription(`Você comprou: **x1** por **8000 panther-coins**`)
      .setColor("#be41f4")
      message.channel.send(embed);

    ChestDB.sumar(`${message.author.id}.legendary`, 1);
    MoneyDB.restar(`${message.author.id}.coins`, 8000);

  }
  if(item === 'D'){
    message.channel.send("em breve...")
  }*/
}
exports.help = {
  name:"buy",
  permisoes: "nenhuma",
  aliases: ["comprar-baus","comprar","obter"],
  description: "compre baus em meu sistema de economia!",
  usage: "buy <C,R,L>"
}