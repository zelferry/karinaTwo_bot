const Discord = require("discord.js");
//const { MessageButton, MessageActionRow } = require('discord-buttons');
let {configs} = require("../../../mongoDB/ini.js").guild 


class ButtonPages {
  constructor(message,client) {
    let self = this 
    this.message = message;
   // this.__buttons = false 
    this.client = client;
/*
      async function aaa(){
          let cmd = await configs.getConfig(message.guild,true)
        
          
        console.log(cmd)
        
            if(cmd.pagesBUTONS){
                self.__buttons = true 
            } else {
                self.__buttons = false
            }
        
          
      }
      aaa()*/
    //this.c = {}
  }
 async buttonPages(database){
     var {message,client} = this
     let __configs = await configs.getConfig(message.guild,true)
     
	if(__configs.pagesBUTONS == true){
  	var randNumerViaDatabase = Math.floor(Math.random() * database.length)
  	var arr = database
  	var numberViaDatabase = randNumerViaDatabase
  	var embed_ = new Discord.MessageEmbed().setImage(database[randNumerViaDatabase]).setColor("#7B68EE").setFooter(`${randNumerViaDatabase+1} / ${arr.length}`)
  	
  	let buttonPrevious = new Discord.MessageButton().setCustomId("previous").setEmoji(`⬅️`).setStyle(`SECONDARY`)//.setDisabled();
  	let buttonNext = new Discord.MessageButton().setCustomId("next").setEmoji(`➡️`).setStyle(`SECONDARY`);
  	let buttonRandon = new Discord.MessageButton().setCustomId("random").setEmoji(`🔄`).setStyle(`SECONDARY`);
        let buttonStop = new Discord.MessageButton().setCustomId("stop").setEmoji(`❌`).setStyle(`SECONDARY`);
        
        if(numberViaDatabase <= 0) buttonPrevious.setDisabled(true);
        if(numberViaDatabase <= (arr.length-1))buttonNext.setDisabled(false);
        if(numberViaDatabase >= (arr.length-1)) buttonNext.setDisabled(true);
        if(numberViaDatabase > 0) buttonPrevious.setDisabled(false);
  	
 
  	let row = new Discord.MessageActionRow().addComponents(buttonPrevious, buttonNext,buttonRandon,buttonStop);
  	let msg = await message.channel.send({
        embeds: [embed_],
        components: [row]
    });
  	
  	const filter_ = (interaction) => {
        return (interaction.customId === 'stop' || interaction.customId === 'random' || interaction.customId === 'next' || interaction.customId === 'previous') && interaction.user.id === message.author.id 
    };
        
  	const collector = msg.createMessageComponentCollector({
        filter: filter_,
        componentType: 'BUTTON',
        idle: 1000*60
    });


collector.on('collect',async r => {
    r.deferUpdate()
	//r.reply.defer()
    
      if(r.customId === "next"){
       // numberViaDatabase = 
        numberViaDatabase++
        if(numberViaDatabase >= (arr.length-1)) r.message.components[0].components[1].setDisabled(true)
        
       if(numberViaDatabase > 0) r.message.components[0].components[0].setDisabled(false)
        
        let result = arr[numberViaDatabase]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${numberViaDatabase+1} / ${arr.length}`)
      
        
        msg.edit({
            embeds: [embed],
            components: r.message.components
        })
        
      }
      if(r.customId === 'previous'){
        //numberViaDatabase = 
        numberViaDatabase--
        if(numberViaDatabase <= 0) r.message.components[0].components[0].setDisabled()
       
       if(numberViaDatabase <= (arr.length-1)) r.message.components[0].components[1].setDisabled(false)
       
        let result = arr[numberViaDatabase]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${numberViaDatabase+1} / ${arr.length}`)
      
        msg.edit({
            embeds: [embed],
            components: r.message.components
        })
    
      }
      if(r.customId === "random"){
      	randNumerViaDatabase = Math.floor(Math.random() * database.length)
      	arr = database
      	numberViaDatabase = randNumerViaDatabase
          
            if(numberViaDatabase <= 0) r.message.components[0].components[0].setDisabled(true);
          if(numberViaDatabase <= (arr.length-1)) r.message.components[0].components[1].setDisabled(false);
          if(numberViaDatabase >= (arr.length-1)) r.message.components[0].components[1].setDisabled(true);
          if(numberViaDatabase > 0) r.message.components[0].components[0].setDisabled(false);
          const embed = new Discord.MessageEmbed().setImage(arr[randNumerViaDatabase]).setColor("#7B68EE").setFooter(`${numberViaDatabase+1} / ${arr.length}`);
          
        msg.edit({
            embeds: [embed],
            components: r.message.components
        })
      }
      if(r.customId === "stop"){
        collector.stop(200)
      }
  });
  

  collector.on('end', (colle,p) =>{
  	if(msg){

  	//	console.log(p)
  			const embed = new Discord.MessageEmbed().setImage(arr[numberViaDatabase])//.setColor("RED");

  		if(p ===  200){
  			embed.setColor("#FFF0F5")
  			msg.edit({
                embeds: [embed],
                components: []
            })
  		} else {
  		//	console.log("cu")
  		/*msg.components[0].components[0].setDisabled();
  		msg.components[0].components[1].setDisabled();
  		msg.components[0].components[2].setDisabled();
  		msg.components[0].components[3].setDisabled();*/
  		
  		embed.setColor("RED")
  		embed.setFooter("desativado por inatividade")
  		
  		msg.edit({
            embeds: [embed],
            components: []
        })
  		}
  	} else {
  		console.log("1")
  	}
  })
 } else {
        var randNumerViaDatabase = Math.floor(Math.random() * database.length);
        var arr = database;
        var numberViaDatabase = randNumerViaDatabase;
        var embed_ = new Discord.MessageEmbed().setImage(database[randNumerViaDatabase]).setColor("#7B68EE").setFooter(`${randNumerViaDatabase+1} / ${arr.length}`);
        message.channel.send({
            embeds: [embed_]
        })
 }
  }
}
module.exports = ButtonPages