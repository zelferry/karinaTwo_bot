let Discord = require("discord.js");
let { vip } = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {
    if(!args.length > 0) {
        return message.reply({
            content: ":x:**|** insira um id!"
        })
    } else {
        let member = await client.users.fetch(args[0], true);

        if(!member){
            return message.reply({
                content: ":x:**|** id inválido"
            })
        } else {
            let data = await vip.find(member);

            if(data.config.vip.active == true){
                return message.reply({
                    content: ":x:**|** usuário ja tem o vip user"
                })
            } else {
                try {
                    await vip.set_vip_1(member).then((x) => {
                        message.reply({
                            content: "👍**|** vip user de 30 dias ativo para **"+member.username+"**\n\ndados para a confirmação:\n```\n"+x+"\n```"
                        })
                    });
                } catch(e) {}
            }
        }
    }
}

exports.config = {
    test: false
}
exports.help = {
  name:"setvip1",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "setar o vip de 30 dias em um usuário",
  usage: "setvip1 <usuario>"
}