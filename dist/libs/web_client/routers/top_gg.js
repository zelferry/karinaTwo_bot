let express = require('express');
let app = express.Router();
let Discord = require("discord.js");
let topgg_api = require('@top-gg/sdk');

let { topgg } = require("../../../../mongoDB/ini.js").user;
let util = require("../../../../utils/main.js")

let wb = new topgg_api.Webhook(process.env.toggpas);
let usersfetch = new util.fetch();
let KariWebhooks = new util.webhooks();


app.get("/", function(req,res){
    res.send("acesso negado para usuários normais");
});

app.post('/', wb.listener(async (vote) => {
    let user_vote_id = vote.user;

    topgg.ready(user_vote_id, async(err, user_db, user_model) => {
        if(err){
            console.log(err)
            return {}
        } else {
            let data = await usersfetch.user(user_vote_id);

            if(!data.sucess){
                console.log(`o usuário ${user_vote_id} não existe`)
                return {}
            } else {
                let user_discord = data.resove();
                
                if(!user_db){
                    let new_user_db = new usermodel({
                        UserId: user_discord.id
                    });
                    await new_user_db.save().catch(e => console.log(e));
                    KariWebhooks.topgg(`as informações NECESSÁRIAS do usuario **${userRESY.username}** não foram encrontrados\nmas ja criei os dados :3`);
                    return {}
                } else {
                    let nw = user_db.topggVotes + 1;
                    user_db.save().catch((err) => console.log(err));

                    let embed_2 = new Discord.MessageEmbed().setColor("#FF7F50").setAuthor({name:`${user_discord.tag}`, iconURL:`${user_discord.avatar}`}).setDescription(`**${user_discord.username}** votou em mim na [top.gg](https://a.com)!`).setFooter(`ID do autor: ${user_vote_id}`).addFields({name: 'total de votos', value: '**' + user_discord.username + '** votou em mim ' + nw + ' vezes'}).setTimestamp();
                    KariWebhooks.topgg(embed_2);
                    return {}
                }
            }
        }
    })
}))

module.exports = app