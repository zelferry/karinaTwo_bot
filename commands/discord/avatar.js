const Discord = require("discord.js"); 
const botID = process.env.BOT_ID;

exports.run = async (client, message, args) => {
    let input = message.mentions.users.first() || message.author
    if(args.length > 0 && !message.mentions.users.first()) {
        let inp = await client.users.fetch(args[0])
        if(!inp){
            input = message.mentions.users.first() || message.author
        } else {
            input = inp 
        }
    } else {
        input = message.mentions.users.first() || message.author
    }

    
    console.log(input)
    let user = await client.users.fetch(input.id);
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
    let avatardrscri = `[clique aqui](${avatar}) para baixar-la!`;
    
    if(user.id === client.user.id) {
        avatardrscri = "meu avatar foi desenhado pelo **M&M**\n\n conhesa o trabalho dele no:\n[Twitter!](https://twitter.com/Miguel94244829)"
    }
    
    let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel('ver na web');
    
    let embed = new Discord.MessageEmbed().setColor(`#4cd8b2`).setTitle(`Avatar de ${user.username}`).setDescription(avatardrscri).setImage(avatar);
    
    message.reply({
        embeds:[embed],
        components:[new Discord.MessageActionRow().addComponents(button_)]
    }); 
    
};
exports.config = {
    test: false
}
exports.help = {
  name:"avatar",
  permisoes: "nenhuma",
  aliases: ["icon"],
  description: "sabe aquele avatar lindo que você viu? veja ela em em seu eatado FULL!",
  usage: "avatar [usuário]"
}