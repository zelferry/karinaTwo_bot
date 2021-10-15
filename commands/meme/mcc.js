const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
	
let [title, contents] = args.join(" ").split("|"); 

        if (!contents) [title, contents] = ["Conquista desbloqueada!", title]; 

        let rnd = Math.floor((Math.random() * 39) + 1); 

        if (args.join(" ").toLowerCase().includes("burn")) rnd = 38;
        if (args.join(" ").toLowerCase().includes("cookie")) rnd = 21; 
        if (args.join(" ").toLowerCase().includes("cake")) rnd = 10; 

        if (!args.join(" ")) {
            return message.reply({content:`❌**|** você precisa escrever a descrição da sua conquista!`}); 
        };

        if (title.length > 24 || contents.length > 22) {
            return message.reply({content:`❌**|** a descrição precisa ter no maximo **22 letras**!`});
        }; 

        //message.channel.startTyping();

        const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;

        message.reply({
            files:[new Discord.MessageAttachment(url, 'mcconquista.png')]
        })
     //   message.channel.stopTyping(true); 
	
}
exports.config = {
    test: false
}
exports.help = {
  name:"mcc",
  permisoes: "nenhuma",
  aliases: ["conquest","mcachievement","achievement","conquista","conquests"],
  description: "crie uma conquista do minecraft!",
  usage: "mcc [título] | <conteúdo>"
}