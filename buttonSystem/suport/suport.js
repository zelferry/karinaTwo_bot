const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

class ButtonPages {
  constructor(message,client) {
    
    this.message = message;
    this.client = client
    //this.c = {}
    
  }
 async buttonSuport(args, content,_sendTy){
  	var {message,client} = this
	
	let embed = new Discord.MessageEmbed().setColor("#7289DA").setTitle("OPA, espera ai!").setDescription("você deve esta ciente que a mensagem de suporte escrita apos o comando será enviada junto com:\n- seu id e tag do discord\n- id do server(para salvar no registros)\n- o seu suporte escrito apos o comando(obvio)\n\na demora para meu DEV responder pode depender do seu fuso horário e região\n\n> para a sua segurança e a minha segurança também, e necessário uma verificação se você quer enviar ou não(caso haja algum erro de ortografia)").addFields({
		name: 'seu suporte:',
		value: "```md\n"+content+"```"
	}).setTimestamp();
  	

  	let buttonStop = new MessageButton().setID("stop").setEmoji(`🗑`).setStyle(`red`).setLabel("não enviar")
  	let buttonSend = new MessageButton().setID("send_").setEmoji(`📩`).setStyle(`blurple`).setLabel("enviar suporte")
  
  	
  	//let removed = false
 
  	let row = new MessageActionRow().addComponents(buttonSend,buttonStop);
  	let msg = await message.channel.send({embed:embed, components: [row]});
  	
  	const filter = (buttons) => buttons.clicker.id === message.author.id
  	const collector = msg.createButtonCollector(filter, { idle: 1000*60 });


collector.on('collect',async r => {
    r.reply.defer()
    
      if(r.id === "send_"){
        let suport_ = new Discord.MessageEmbed()
    .setColor("#FFFFF1")
    .addField("Autor:", `${message.author} \nid do usuário: **${message.author.id}**\nid do canal: **${message.channel.id}**`)
    .addField("Conteúdo", content)
    .setFooter(`suporte por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
         
        let embed11 = new Discord.MessageEmbed().setColor("#FFFFF1").setDescription(`${message.author} relatorio enviado com suseso no meu servidor de suporte!`)
          _sendTy(suport_)
          msg.edit(embed11,{components: []})
          collector.stop(111)
      }
      if(r.id === "stop"){
        collector.stop(200)
      }
  });
  

  collector.on('end', (colle,p) =>{
  	if(msg){

  	//	console.log(p)
  			const embed_ = new Discord.MessageEmbed().setDescription("ok, envio de suporte cancelado")
      let embed11 = new Discord.MessageEmbed().setColor("#FFFFF1").setTitle("OPA, espera ai!").setDescription("você deve esta ciente que a mensagem de suporte escrita apos o comando será enviada junto com:\n- seu id e tag do discord\n- id do server(para salvar no registros)\n- o seu suporte escrito apos o comando(obvio)\n\na demora para meu DEV responder pode depender do seu fuso horário e região\n\n> para a sua segurança e a minha segurança também, e necessário uma verificação se você quer enviar ou não(caso haja algum erro de ortografia)").addFields({
		name: 'seu suporte:',
		value: "```md\n"+content+"```"
	}).setFooter("desativado por inatividade")
  		if(p ===  200){
  			embed.setColor("#FFF0F5")
  			msg.edit(embed_,{components: []})
  		} else {
        msg.edit(embed11,{components: []})
      }
  	} else {
  		console.log("1")
  	}
  })
  }
}
module.exports = ButtonPages