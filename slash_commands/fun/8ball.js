let comando = require("../../frameworks/commando/command.js");

/*var fortunes = [
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
  ];*/

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "fleur",
            description: "[ 😂fun ] fleufurr has the answer to your question!",
            category: "fun",
            usage: "<pergunta>",
            commandOptions: [
                {
                    type: 3,
                    name: "question",
                    description: "what's the question?",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        const args1 = interaction.options.getString('question');

        if(!args1){
            await interaction.followUp({
                content: t("commands:eight_ball.error")
            });
            return {}
        } else {
            await interaction.editReply({
                embeds:[
                    {
                        title: "fleur",
                        description: `${t("commands:eight_ball.asks.label_"+ (Math.floor(Math.random() * 13) + 1)+"")}`,
                        thumbnail:{
                            url: "https://cdn.discordapp.com/attachments/854883006787747853/865644234593009694/JPEG_20210715_020637.jpg"
                        }
                    }
                ]
            })
        }
    }

    command_info(){
        return {
            activated: false,
            pt: {
                name: "fleur",
                description: "fleufurr tem a resposta para sua pergunta!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<pergunta>",
                subCommands: []
            },
            en: {
                name: "fleur",
                description: "fleufurr has the answer to your question!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<question>",
                subCommands: []
            }
        }
    }
}
module.exports = Command