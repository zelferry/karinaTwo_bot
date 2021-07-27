const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
 message.channel.send({embed: {
  title: "KARINA",
  description: "sou uma pantera negra que ama frango frito e de animes :3",
  color: 65531,
  footer: {
    text: "reaja em 📚 para me ver :3"
  },
  fields: [
    {
      name: "idade",
      value: "17 anos"
    },
    {
      name: "quando custa minha outfit",
      value: `e mais de 300 reais!`
    },
    {
      name: "gostos",
      value: `asistir animes(principalmente o anime boku no hero) \n asistir o canal da [Roxxie](https://www.youtube.com/channel/UC_6-mJV5mrjxW7iMA6bXJZQ) \n ver os desenhos da [Lady Grape](https://twitter.com/Lady_Grape_) e do [Fleur](https://twitter.com/Fleurfurr)`
    },
    {
      name: "desgostos",
      value: `NINGUEM SABE!!`
    },
    {
      name: "genero",
      value: "feminino"
    },
    {
      name: "orientasão sexual",
      value: "hetera(?)"
    },
    {
      name: "especie",
      value: "pantera negra"
    }
  ]
}}).then(msg => {
  msg.react('📚').then(r => {
  })


 const infosFilter = (reaction, user) => reaction.emoji.name === '📚' && user.id === message.author.id;

 const infos = msg.createReactionCollector(infosFilter);
 
 infos.on('collect', r2 => {
  message.channel.send({
  content: "",
  embed: {
    title: "karina(personagem(estilo amtigo))",
    image: {
      url: "https://cdn.discordapp.com/attachments/753635920879812720/755517666319532112/unknown.png"
    }
  }
}); 
 })
})
message.delete().catch(O_o => {});
console.log(`um usuario agora sabe como e eu`);
}
exports.help = {
  name:"karina-oc",
  permisoes: "nenhuma",
  aliases: [],
  description: "saiba como e eu!",
  usage: "karina-oc"
}