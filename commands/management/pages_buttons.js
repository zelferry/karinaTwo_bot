const Discord = require("discord.js");
let {configs} = require("../../mongoDB/ini.js").guild 

exports.run = async (client, message, args) => {
  
  const f = "🚫";
  let on = `✔️ ativado`;
  let off = `⚠️ desativado`;

if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply({content: "Somente adms"})

  let stats = await configs.getConfig(message.guild,true)

  if(stats.error) await configs.newGuild(message.guild)
  
  if(!stats.pagesBUTONS)on = off
  
  const embed = new Discord.MessageEmbed()
    .setDescription("**Configurações Atualizadas**")
    .addField("Status:", on).setColor("#e0000f")
    
  const embed1 = new Discord.MessageEmbed()
    .setDescription("**Configurações Atuais**")
    .addField("Status:", on).setColor("#e0000f")

  const command = args[0]

  if(command === 'info') return message.reply({embeds:[embed1]});

  if(!command) return message.reply({content:`${f}**|** você não forneceu o subcomando do módulo.`})
  
if(command === "ativar") {
  
  if(stats.pagesBUTONS) return message.reply({content:`${f}**|** O módulo já está ligado.`})
 
    configs.setConfig({pagesBUTONS:true},message.guild).then((x) => message.reply({content:"✔️**|** o modulo foi ativado!\ncertos comandos terão botões para seus membros ou ate você navegar nas imagens sem precisar executar o mesmo comando o tempo todo!"}));
  
}
  
if(command === "desativar") {
  
  if(!stats.pagesBUTONS) return message.reply({content:`${f}**|** O módulo já está desligado.`});
    configs.setConfig({pagesBUTONS:false},message.guild).then((x) => message.reply({content:"⚠️|o módulo foi desativado\ncertos comandos ficaram sem botões"}));
    
  }

  if (command === 'help') {
    const embedHelp = new Discord.MessageEmbed()
    .setDescription("**PAGES BUTTONS Ajuda**")
    .addField("Comandos:",
              "• **info** -> Mostra as configurações do sistema de páginas por botões\n" +
              "• **ativar/desativar** -> Ativa/Desativa o módulo dos botões em certos comandos")

      message.reply({embeds:[embedHelp]})
  }
};
exports.config = {
    test: false
}
exports.help = {
  name:"pagesbuttons",
  permisoes: "administrador",
  aliases: ["buttons-pages","paginasporbotoes"],
  description: "ativar e/ou desativar o sistema de páginas por botões",
  usage: "pagesbuttons <ativar,desativar>"
}