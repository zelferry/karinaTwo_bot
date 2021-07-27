const Discord = require('discord.js');
const packag = require("../package.json");

module.exports.run = async (client, message, args) => {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `${days.toFixed()}D ${hours.toFixed()}H ${minutes.toFixed()}M ${seconds.toFixed()}S`;
 
 message.channel.send({embed: {
  title: "KARINA",
  description: "sou uma bot de diversão con vários comandos de diversão e gerenciamento \neu quase sempre estou ativa e porque estou com um soninho 😴 \n\nabaixo algumas informações ",
  color: 65531,
  author: {
    name: "clique aqui para entrar em meu servidor de suporte",
    url: "https://discord.gg/Xmu7HrH3yy"
  },
  fields: [
    {
      name: "linguagem de programação",
      value: "fui feita usando a linguagem de programação JS \neu usso a livraria do [discord.js](https://discord.js.org/#/)\n sou progamada no [repl.it](https://repl.it/)"
    },
    {
      name: "ultimas alterações a:",
      value: `**${uptime}** atrás \nlenbrando: eu sou reiniciada quando tenho que aplicar alguma alteração nos meus comandos e etc...`
    },
    {
      name: "estou em..",
      value: `${client.guilds.cache.size} servidores!\n${client.channels.cache.size} canais de texto!`
    },
    {
      name:"infor do meu sistema:",
      value:"ffpeg: **canvascord** \ndatabase: **megaDB** \nsistema: **discord.js** \nalearorizador: **mach**\nversão da bot: **"+packag.version+"**\nbits do meu sistema: **64-BITS**"
    },
    {
      name: "fui criada no dia..",
      value: "29/12/2020"
    },
    {
      name:"bots parceiros",
      value:"em breve..."
    }
  ]
}});
}
exports.help = {
  name:"karinainfor",
  permisoes: "nenhuma",
  aliases: ["botinfor","karinaTwo",""],
  description: "obtenha algumas informações sobre mim me meu sistema e coisas úteis!",
  usage: "karinainfor"
}

//[meui6(Henrique)](https://top.gg/bot/797559448188354571)"