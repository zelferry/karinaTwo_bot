const Discord = require('discord.js');

module.exports.run = async (client, message, args) =>{
 // const sayMessage = args.join(' ');
 const mchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]); 

        if (mchannel) {
        	if(!args.slice(1).length){
        		message.channel.send("❌ |inválido, insira algo apos a mersão do canal de texto!")
        	} else {
            argsresult = args.slice(1).join(' '); 
            message.delete().catch(O_o => { });
            mchannel.send(`${argsresult}\n\n - Mensagem Enviada por ${message.author}.`);
        	}
        } else {
        	if(!args.length){
        		message.channel.send("❌ |inválido, insira algo apos o comando!")
        	} else {
            argsresult = args.join(' '); 
            message.delete().catch(O_o => { });
            message.channel.send(`${argsresult}\n\n - Mensagem Enviada por ${message.author}.`);
        	}
        };
  
  /*
 if (sayMessage.length > 500) return message.channel.send("texto muito grande\ntente de novo com um texro em ate 500 carateres");
  message.delete().catch(O_o => {});
  if (!args[0]) return message.channel.send("insira um texto na frente do COMANDO!");
  message.channel.send(`${sayMessage} \n \n - mensagem enviada por ${message.author}☕`);*/
};
exports.help = {
  name:"say",
  permisoes: "nenhuma",
  aliases: ["falar","diser"],
  description: "fassa eu falar algo!",
  usage: "say [canal_de_texto] <texto>"
}