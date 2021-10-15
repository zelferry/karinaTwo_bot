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
      return message.reply({content:":x: | Por favor insira uma pergunta!"})
    }
    if (args[0]) {
        await client.webhooks.makeWebhookAndSend({
            name: "fleur",
            avatar: "https://cdn.discordapp.com/attachments/854883006787747853/865644234593009694/JPEG_20210715_020637.jpg",
            msg:{
                content: `<@${message.author.id}>, ${fortunes[Math.floor(Math.random() * fortunes.length)]}`
            }
        },message)
    
    } else {
    	message.reply({content:":x:**|** Não foi possível ler sua pergunta! :("})
    	
    }
  };
  
//export.global = {}
exports.config = {
    test: false
}
exports.help = {
  name: "fleur",
  permisoes: "nenhuma",
  aliases: ["vidente","8ball"," vident"],
  description: "**fleur** vai te dar a resposta para sua **pergunta** :)",
  usage: "fleur <pergunta>"
}