let comando = require("../../frameworks/commando/command.js");

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

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "fleur",
            description: "[ 😂diversão ] fleufurr tem a resposta para sua pergunta!",
            category: "fun",
            usage: "<pergunta>",
            commandOptions: [
                {
                    type: 3,
                    name: "question",
                    description: "qual a pergunta?",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        const args1 = interaction.options.getString('question');

        if(!args1){
            await interaction.followUp({
                content: "🚫**|** insira uma pergunta valida!"
            })
            return {}
        } else {
            await interaction.editReply({
                embeds:[
                    {
                        title: "fleur",
                        description: `${fortunes[Math.floor(Math.random() * fortunes.length)]}`,
                        thumbnail:{
                            url: "https://cdn.discordapp.com/attachments/854883006787747853/865644234593009694/JPEG_20210715_020637.jpg"
                        }
                    }
                ]
            })
        }
    }
}
module.exports = Command