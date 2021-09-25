const Discord = require('discord.js');
var config = require('../../config.js')
var ownerID = config.ownerID;

module.exports.run = async (client, message, args) => {

    let {prefix} = require("../../mongoDB/ini.js").guild 

    let prefixoAtual = await prefix.findPrefix(message.guild,message,false);
  let frields = [];
  let commands__ =  client.extra.makeCommandsCategory.makeComandCategoy();
  let commands__2 =  client.extra.makeCommandsCategory.makeNsfwComandCategoy(message);
  let commands__3 =  client.extra.makeCommandsCategory.makeOwnerComandCategoy();

  for(let i in commands__){
    let cmds =  commands__[i]
    frields.push({
      name: `${cmds.label}`,
      value: `${cmds.commands}`
    })
  }
  frields.push({
    name: `${commands__2.label}`,
    value: `${commands__2.commands}`
  })

if(ownerID.includes(message.author.id)){
  frields.push({
    name: `${commands__3.label}`,
    value: `${commands__3.commands}`
  })
}

const embed = {
  "title": "Minha lista de comandos!",
  "description": "Meu prefixo nesse servidor: `"+prefixoAtual+"` \ncomo usar meus comandos?: \n`"+prefixoAtual+"<command name>`\n \nexenplos:\n`"+prefixoAtual+"kiss @catarina`\n`"+prefixoAtual+"furry-nsfw`\n\n para obter informações de um comando em específico use `"+prefixoAtual+"cdinf <comando>`",
  "color": "#7A67EE",
  "fields": frields
  
};
  message.channel.send({ embed });
  
//makeOwnerComandCategoy
}
exports.help = {
  name:"help",
  permisoes: "nenhuma",
  aliases: ["ajuda","comandos"],
  description: "lista com todos os comandos",
  usage: "help"
}