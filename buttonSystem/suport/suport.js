const Discord = require("discord.js");
//const { MessageButton, MessageActionRow } = require('discord-buttons');

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
		value: "```txt\n"+content+"```"
	}).setTimestamp();
  	

  	let buttonStop = new Discord.MessageButton().setCustomId("stop").setEmoji(`🗑`).setStyle(`DANGER`).setLabel("não enviar");

  	let buttonSend = new Discord.MessageButton().setCustomId("send_").setEmoji(`📩`).setStyle(`PRIMARY`).setLabel("enviar suporte")
  
  	
  	//let removed = false
 
  	let row = new Discord.MessageActionRow().addComponents(buttonSend,buttonStop);
  	let msg = await message.channel.send({embeds: [embed], components: [row]});
  	
  	const filter_ = (interaction) => {
        return (interaction.customId === 'stop' || interaction.customId === 'send_') && interaction.user.id === message.author.id 
    };
     
  	const collector = msg.createMessageComponentCollector({ filter: filter_, componentType: 'BUTTON',  idle: 1000*60 });

collector.on('collect',async r => {
    r.deferUpdate()
  //  r.reply.defer()
    
      if(r.customId === "send_"){
        let suport_ = new Discord.MessageEmbed()
    .setColor("#FFFFF1")
    .addField("Autor:", `${message.author} \nid do usuário: **${message.author.id}**\nid do canal: **${message.channel.id}**`)
    .addField("Conteúdo", content)
    .setFooter(`suporte por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
         
        let embed11 = new Discord.MessageEmbed().setColor("#FFFFF1").setDescription(`${message.author} relatorio enviado com suseso no meu servidor de suporte!`)
          _sendTy(suport_)
          msg.edit({
              embeds: [embed11],
              components: []
          })
          collector.stop(111);
      }
      if(r.customId === "stop"){
        collector.stop(200);
      }
  });
  

  collector.on('end', (colle,p) =>{
  	if(msg){

  	//	console.log(p)
  			const embed_ = new Discord.MessageEmbed().setDescription("ok, envio de suporte cancelado")
      let embed11 = new Discord.MessageEmbed().setColor("#FFFFF1").setTitle("OPA, espera ai!").setDescription("você deve esta ciente que a mensagem de suporte escrita apos o comando será enviada junto com:\n- seu id e tag do discord\n- id do server(para salvar no registros)\n- o seu suporte escrito apos o comando(obvio)\n\na demora para meu DEV responder pode depender do seu fuso horário e região\n\n> para a sua segurança e a minha segurança também, e necessário uma verificação se você quer enviar ou não(caso haja algum erro de ortografia)").addFields({
		name: 'seu suporte:',
		value: "```md\n"+content+"```"
	})
  		if(p ===  200){
  			msg.edit({
                embeds: [embed_],
                components: []
            })
  		} else if(p === 111){
            
        } else {
        embed.setColor("#FFF0F5");
        embed.setFooter("desativado por inatividade");
        msg.edit({
            embeds: [embed],
            components: []
        })
      }
  	} else {
  		console.log("1")
  	}
  })
  }
}
module.exports = ButtonPages