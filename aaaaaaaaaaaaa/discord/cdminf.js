const Discord = require("discord.js");

let {prefix} = require("../../mongoDB/ini.js").guild 

exports.run = async (client, message, args) => {
  
try {
  
  const props =client.commands.get(args[0])||client.commands.get(client.aliases.get(args[0]));//require(`../commands/${args}.js`);

let prefix_ = await prefix.findPrefix(message.guild,message,false)
	
//const comando = args.shift().toLowerCase();


let propse = client.commands.get(args) || client.commands.find(x => x.help.aliases && x.help.aliases.includes(args));

// const des = `\n **${prefix}${props.help.name}**: \n**Descriçao:** ${props.help.description ? props.help.description : 'Não tem descrição'}, \n**usagem:** !${props.help.usage ? props.help.usage : "Não especificado"}, \n**Permissoes necesarias:** ${props.help.permisoes ? props.help.permisoes : "Não especificado"}.\n\n`;
const aliases = props.help.aliases.map((x)=> '`' + x + '`').join(', ')

console.log(aliases)
const roleColor = message.guild.me.displayHexColor === "#FF1493" ? "##FF1493" : message.guild.me.displayHexColor;
        
   if (args[0]) {
     const comEmbed = new Discord.MessageEmbed().setColor(roleColor).setDescription("<> = obrigatório\n[] = opcional\n\n`texto` = inserir um texto\n`imagem` = anexar uma imagem\n`mumero` = um numero de 1 a 🔁\n`usuário` = ID do usuário ou a mersão dele\n`canal` = canal de texto").addField("nome do comando:",`${props.help.name}`).addField("descrição:", `${props.help.description ? props.help.description : "???"}`).addField("aliases",`${aliases ? aliases : "???"}`).addField("como usar?:",`\`${prefix_}${props.help.usage ? props.help.usage : "???"}\``).addField("permissões necesarias:",`${props.help.permisoes ? props.help.permisoes : "???"}`)
      return message.channel.send(comEmbed)
    }
 } catch (err) {
   console.log(err)
message.channel.send({embed: {
  color: 13893887,
  description: "🚫 o comando `"+ (args) +"` não **existe** ou esta com **erro**."}}).catch();
    
  }
  
}
exports.help = {
  name:"cdinf",
  permisoes: "nenhuma",
  aliases: ["comand-infor","informações-do-comando","ajuda-2"],
  description: "obter informações de um comando em específico",
  usage: "cdinf <comando>"
}