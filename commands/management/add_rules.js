const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR"))return message.reply({embeds: [{
  title: `SEM PERMISÃO`,
  color: 3447003,
  description: `<@${message.author.id}> você não tem permisão de cetar regras para esse servidor, requer um cargo admistradivo na sua conta`
}]}).then(msg => {
        setTimeout(() => msg.delete(), 5000)
    });

message.channel.send({
   embed: {
    title: "criar regras",
    description: "ola eu irei cricar regras automaticamente apos você reagir em ✅ \nabaixo estara as regras que irei criar ",
    color: 14353143,
    footer: {
      text: "sugiro que delete essa mensagem depois "
    },
    fields: [
      {
        name: "1-gore(pessado)❌ ",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      },
      {
        name: "2-conteudo adulto(+18, +16)❌ ",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      },
      {
        name: "3-sem rasismo",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      },
      {
        name: "4-Evite spam!",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      },
      {
        name: "5-Por favor, não grite. Evite o uso excessivo do CAPS LOCK\n",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      },
      {
        name: "6-Assédio é estritamente proibido",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      },
      {
        name: "7-É proibido ofender qualquer pessoa ou administrador no server",
        value: "⠀⠀⠀⠀⠀⠀⠀⠀"
      }
    ]
  }
}).then(msg => {
  msg.react('✅').then(r => {})
  
  
 const infosFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;

 const infos = msg.createReactionCollector({filter: infosFilter});
 
 infos.on('collect', r2 => {
  msg.delete()
 let embeds_ = [{
    title: "❌ gore(pessado)",
    color: 14353143,
    fields: [
      {
        name: "o que e gore?",
        value: "Gore ou Splatter é um subgênero cinematográfico dos filmes de horror, que é caracterizado pela presença de cenas extremamente violentas, com muito sangue, vísceras e restos mortais de humanos ou animais."
      },
      {
        name: "qual e o tipo de punição ao postar gore(pesado)?",
        value: "somente o adm sabe "
      }
    ]
  },
  {
    title: "❌ conteudo adulto(+18, +16)",
    color: 14353143,
    fields: [
      {
        name: "o que e conteudo adulto(+18, +16)?\n",
        value: "Conteúdo para maiores de 18 anos."
      },
      {
        name: "qual e o tipo de punição ao postar conteudo adulto(+18, +16)??",
        value: "somente o adm sabe "
      }
    ]
  },
  {
    title: "❌ sem racismo",
    color: 14353143,
    fields: [
      {
        name: "o que e racismo?\n",
        value: "O racismo é um tipo de preconceito étnico, uma ideia pré-concebida e pejorativa a respeito de uma etnia ou grupo social. O preconceito normalmente pode não estar ligado exclusivamente à aparência física de uma pessoa ou povo. O preconceito pode estar relacionado ao estilo de vida de uma pessoa (por exemplo, a sua orientação sexual)."
      },
      {
        name: "qual e o tipo de punição ao  rasismo?\n",
        value: "somente o adm sabe "
      }
    ]
  },
  {
    title: "❌ Evite spam!",
    color: 14353143,
    fields: [
      {
        name: "oque e spam?\n",
        value: "Spamming é a prática de envio em massa de spam e spammer é a designação dada ao seu autor. As características principais do spamming são o envio da mensagem para milhares de pessoas ao mesmo tempo e a ausência de autorização do destinatário para utilização do seu endereço eletrônico."
      },
      {
        name: "qual e o tipo de punição?",
        value: "silenciamento,banimento ou exlulsamemto"
      }
    ]
  },
  {
    title: "❌ Por favor, não grite. Evite o uso excessivo do CAPS LOCK",
    color: 14353143,
    fields: [
      {
        name: "oque e CAPS LOCK?\n",
        value: "Caps Lock (também: Shift Lock, às vezes com símbolo: ⇩, em português: trava-maiúsculas, ou até mesmo \"Fixa\") é uma tecla do teclado de um computador que aciona o modo caixa alta do teclado fazendo com que todos os caracteres do tipo letra, digitados após seu acionamento, sejam exibidos em sua forma maiúscula."
      },
      {
        name: "qual e o tipo de punição?",
        value: "somente o adm sabe "
      }
    ]
  },
  {
    title: "❌ Assédio é estritamente proibido",
    color: 14353143,
    fields: [
      {
        name: "oque e Assédio?",
        value: "Assédio consiste numa perseguição insistente e inconveniente que tem como alvo uma pessoa ou grupo específico, afetando a sua paz, dignidade e liberdade. Existem diferentes tipos de assédios, como o moral, sexual, psicológico, virtual, judicial, entre outros."
      },
      {
        name: "qual e o tipo de punição?",
        value: "somente o adm sabe "
      }
    ]
  },
  {
    title: "❌ É proibido ofender qualquer pessoa ou administrador no server",
    color: 14353143,
    fields: [
      {
        name: "oque e ofender?",
        value: "O que é ofender: V.T. Fazer ofensa a alguém através de palavras ou atos. Aborrecer, magoar, injuriar, desgostar, transgredir, pecar, desrespeitar. Significado de ofender."
      },
      {
        name: "qual e o tipo de punição?",
        value: "somente o adm sabe "
      }
    ]
  },
 {
    title: "Informações Adicionais:",
    description: "* A quebra de uma ou várias regras acima citadas poderá implicar em uma punição.\n\n* As regras podem ser alteradas a qualquer momento, é importante estar sempre atento a qualquer atualização.\n\n* Qualquer duvida ou recomendação de uma possivel nova regra, procure um Administrador.\n\n* As regras não se aplicam a equipe administrativa.",
    color: 12912122
  }
]

message.channel.send({ embeds:[embeds_] });
     infos.stop()
})

 })
}
exports.config = {
    test: false
}
exports.help = {
  name:"create-rules",
  permisoes: "administrador",
  aliases: ["regras-add"],
  description: "preguiça de criar regras? usse esse comando!",
  usage: "create-rules"
}