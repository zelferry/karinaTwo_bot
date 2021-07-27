var fortunes = [
    "Sim",
    "Não",
    "Talvez",
    "Eu não sei, tente de novo",
    "Quem sabe?",
    "Isso é um mistério",
    "Não posso te contar",
    "Meu informante disse que não",
    "Provavelmente",
    "Me pergunte mais tarde!",
    "Claro que não!",
    "Não conte comigo para isso",
    "Dúvido muito",
    "CLARO QUE NÃO, ISSO SERIA LOUCURA HAHA!! :D"
  ];
  
  exports.run = async (client, message, args) => {
  
    if(!args[0]){
      return message.channel.send(":x: | Por favor insira uma pergunta!")
    }
    if (args[0]) {
    	
    	
let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find(x => x.name === "kariWebhook");

    if(!webhook) {
        webhook = await message.channel.createWebhook(`kariWebhook`, {
            avatar: client.user.displayAvatarURL({dynamic: true})
        });
    }

    await webhook.edit({
        name: "FLEUR",
        avatar: "https://cdn.discordapp.com/attachments/854883006787747853/865644234593009694/JPEG_20210715_020637.jpg"
    })

let resultado = fortunes[Math.floor(Math.random() * fortunes.length)]
    webhook.send(`<@${message.author.id}>, ${resultado}`).catch( m => {});

    await webhook.edit({
        name: `kariWebhook`,
        avatar: client.user.displayAvatarURL({dynamic:true})
    })
    
    } else {
    	message.channel.send(":x: " + "| Não foi possível ler sua pergunta! :(")
    	
    }
  };
  
  
exports.help = {
  name: "fleur",
  permisoes: "nenhuma",
  aliases: ["vidente","8ball"," vident"],
  description: "**fleur** vai te dar a resposta para sua **pergunta** :)",
  usage: "fleur <pergunta>"
}