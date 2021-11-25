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

module.exports = {
	name: 'fleur',
	description: '《😹 diversão》fleur vai te dar a resposta para sua pergunta',
	commandOptions: [{
        type: 3,
        name: "question",
        description: "qual a pergunta?",
        required: true
    }],
	global: true,
	async execute(interaction,client) {
        const args1 = interaction.options.getString('question')//split(" ");
        if(!args1){
            await interaction.reply({
                content: "🚫**|** insira uma pergunta valida!"
            })
        } else {
            await interaction.reply({
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
};