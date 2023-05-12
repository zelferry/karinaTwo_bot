let Discord = require("discord.js");

exports.run = async (client, message, args) => {
    try {
        let argumentos = args.join(" ");
        if(!args.join(' ')) return message.reply({
            content:'Burro pa krl'
        });
        let código = eval(argumentos);
        
        if (typeof código !== 'string') código = require('util').inspect(código, { depth: 0 });
        
        let embed = new Discord.EmbedBuilder().setColor("#ff2050").addFields({ name: "entrada", value: `\`\`\`js\n${argumentos}\`\`\``}, { name: "saida", value: `\`\`\`js\n${(código.toString().split("").length >= 1069 ? "muitos caracteres!" : código) == client.token ? "NÃO POSSO MOSTRAR MEU TOKEN!" : (código.toString().split("").length >= 1069 ? "muitos caracteres!" : código)}\n\`\`\`` })

        message.channel.send({ embeds: [embed] })
    } catch(e) {
        message.channel.send({content:`\`\`\`js\n${e}\n\`\`\``})
    }
}

exports.help = {
  name:"eval",
  permisoes: "ser um dos meus criadores",
  aliases: ["js-execute","execute"],
  description: "fazer com que eu execute arquivos em JS(somente meus criadores tem acesso)",
  usage: "eval <código>"
}