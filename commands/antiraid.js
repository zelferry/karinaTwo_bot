const Discord = require("discord.js");
const enjoosp = require("../database/emojis/on-off.json");

const db = require("megadb");

let InviteDB = new db.crearDB("anti_raid");

exports.run = async (client, message, args) => {
  
  const f = "🚫";
  const on = `${enjoosp.ligado} ativado`;
  const off = `${enjoosp.desligado} desativado`;

if(!message.member.permissions.has("ADMINISTRATOR"))return message.channel.send("Somente adms")
  
  if (!InviteDB.tiene(`${message.guild.id}`))
    InviteDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      status: "Off"
    });

  let stats = await InviteDB.obtener(`${message.guild.id}.status`);

  const embed = new Discord.MessageEmbed()
    .setDescription("**Configurações Atualizadas**")
    .addField("Status:", `${stats === 'On' ? off : on}`)
    .setColor("#e0000f")
  const embed1 = new Discord.MessageEmbed()
    .setDescription("**Configurações Atuais**")
    .addField("Status:", `${stats === 'On' ? on : off}`)
    .setColor("#e0000f")

  const command = args[0]

  if(command === 'info') return message.channel.send(embed1);

  if(!command) return message.channel.send(`${f} | Você não forneceu o subcomando do módulo.`)
  
if(command === "ativar") {
  
  if(stats === "On") return message.channel.send(`${f} | O módulo já está ligado.`)
  
  if (stats === "Off") {
    InviteDB.set(`${message.guild.id}.status`, "On").then(
      message.channel.send(embed)
    );
  }
}
  
if(command === "desativar") {
  
  if(stats === "Off") return message.channel.send(`${f} | O módulo já está desligado.`)
  
  if (stats === "On") {
    InviteDB.set(`${message.guild.id}.status`, "Off").then(
      message.channel.send(embed)
      );
    }
  }

  if (command === 'help') {
    const embedHelp = new Discord.MessageEmbed()
    .setDescription("**anti-raid Ajuda**")
    .addField("Comandos:",
              "• **info** -> Mostra as configurações do anti-raid\n" +
              "• **ativar/desativar** -> Ativa/Desativa o módulo de proteção contra raids/floods"
             )

      message.channel.send(embedHelp)
  }
};
exports.help = {
  name:"antiraid",
  permisoes: "administrador",
  aliases: ["antispan","contra"],
  description: "ativar e desativar o modulo anti-raid",
  usage: "antiraid <ativar,desativar>"
}