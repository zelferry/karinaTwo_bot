const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

class ButtonPages {

  constructor(message,client) {
    
    this.message = message;
    this.client = client
    
  }
 async buttonPages(database){
  	var {message,client} = this
  	
  	var randNumerViaDatabase = Math.floor(Math.random() * database.length)
  	var arr = database
  	var numberViaDatabase = randNumerViaDatabase
  	var embed_ = new Discord.MessageEmbed().setImage(database[randNumerViaDatabase]).setColor("#7B68EE").setFooter(`${randNumerViaDatabase+1} / ${arr.length}`)
  	
  	let buttonPrevious = new MessageButton().setID("previous").setEmoji(`⬅️`).setStyle(`grey`)//.setDisabled();
  	let buttonStop = new MessageButton().setID("stop").setEmoji(`❌`).setStyle(`red`);
  	let buttonNext = new MessageButton().setID("next").setEmoji(`➡️`).setStyle(`grey`);
  	let buttonRandon = new MessageButton().setID("random").setEmoji(`🔄`).setStyle(`grey`);
  	
  	let removed = false

if(numberViaDatabase <= 0) buttonPrevious.setDisabled()
       
if(numberViaDatabase <= arr.length-1)buttonNext.setDisabled(false)
//numberViaDatabase++
if(numberViaDatabase >= arr.length-1) buttonNext.setDisabled()
        
if(numberViaDatabase > 0) buttonPrevious.setDisabled(false)
  	
 
  	let row = new MessageActionRow().addComponents(buttonPrevious, buttonNext,buttonRandon,buttonStop);
  	let msg = await message.channel.send({embed:embed_, components: [row]});
  	
  	const filter = (buttons) => buttons.clicker.id === message.author.id
  	const collector = msg.createButtonCollector(filter, { time: 1000*60 });


collector.on('collect',async r => {
 
    r.reply.defer()

      if(r.id === "next"){
       // numberViaDatabase = 
        numberViaDatabase++
        if(numberViaDatabase >= arr.length-1) r.message.components[0].components[1].setDisabled()
        
       if(numberViaDatabase > 0) r.message.components[0].components[0].setDisabled(false)
        
        let result = arr[numberViaDatabase]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${numberViaDatabase+1} / ${arr.length}`)
      
        
        msg.edit({embed:embed,components: r.message.components})
        
      }
      if(r.id === 'previous'){
        //numberViaDatabase = 
        numberViaDatabase--
        if(numberViaDatabase <= 0) r.message.components[0].components[0].setDisabled()
       
       if(numberViaDatabase <= arr.length-1)r.message.components[0].components[1].setDisabled(false)
       
        let result = arr[numberViaDatabase]
        const embed = new Discord.MessageEmbed().setImage(result).setColor("#7B68EE").setFooter(`${numberViaDatabase+1} / ${arr.length}`)
      
        msg.edit({embed:embed,components: r.message.components})
    
      }
      if(r.id=== "random"){
      	randNumerViaDatabase = Math.floor(Math.random() * database.length)
      	arr = database
      	numberViaDatabase = randNumerViaDatabase



if(numberViaDatabase <= 0) r.message.components[0].components[0].setDisabled()
       
if(numberViaDatabase <= arr.length-1)r.message.components[0].components[1].setDisabled(false)
//numberViaDatabase++
if(numberViaDatabase >= arr.length-1) r.message.components[0].components[1].setDisabled()
        
if(numberViaDatabase > 0) r.message.components[0].components[0].setDisabled(false)

const embed = new Discord.MessageEmbed().setImage(arr[randNumerViaDatabase]).setColor("#7B68EE").setFooter(`${numberViaDatabase+1} / ${arr.length}`)
        msg.edit({embed:embed,components: r.message.components})
      }
      if(r.id === "stop"){
        let embed = new Discord.MessageEmbed().setColor("RED").setDescription('as páginas foram fechadas!').setTimestamp(Date.now());
        
msg.components[0].components[0].setDisabled();
  	msg.components[0].components[1].setDisabled();
  	msg.components[0].components[2].setDisabled();
  	msg.components[0].components[3].setDisabled();
  	removed = true 
  	msg.edit(embed,{components: msg.components})      //  message.channel.send(embed)
      }
  });

  collector.on('end', ()=>{
  	if(msg){
  		if(removed == false){
  	const embed = new Discord.MessageEmbed().setImage(arr[numberViaDatabase]).setColor("RED")

  	msg.components[0].components[0].setDisabled();
  	msg.components[0].components[1].setDisabled();
  	msg.components[0].components[2].setDisabled();
  	msg.components[0].components[3].setDisabled();
  	
  	msg.edit(embed,{components: msg.components})
  		} else {
  		//	console.log("cu")
  		}
  	} else {
  		console.log("1")
  	}
  })
  }
}
module.exports = ButtonPages