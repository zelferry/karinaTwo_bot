var express = require('express');
let {topgg} = require("../../mongoDB/ini.js").user 
//var low = require('lowdb');
//var fsync = require('lowdb/adapters/FileSync');
var Topgg = require('@top-gg/sdk');
//var { DiscordFetcher } = require('discord-fetcher');
var Discord = require("discord.js");

//var adap = new fsync('database/topgg/votedusers.json');
//var db = low(adap);
var app = express.Router();
const wb = new Topgg.Webhook(process.env.toggpas);
/*
class dblg {
 static newUser(entradaTOP) {
if(db.get('all').find({id: entradaTOP}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
	db.get('all').push({
		id: entradaTOP,
		votes: 0
	}).write()
 }
}*/

let util = require("../../utils/main.js")
let usersfetch = new util.fetch()
let KariWebhooks = new util.webhooks()

app.get("/", function(req,res){
  res.send("acesso negado para usuários normais")
})
app.post('/', wb.listener(async (vote) =>{
    const VoteUserId = vote.user;
    topgg.ready(VoteUserId, async(err, voteObj, modell) => {
        if(err) return console.log(err)
        let {user,sucess} = await usersfetch.user(VoteUserId)
 
  //console.log(user)
  
  let userRESY = {
    id: user.id,
    username: user.name,
    tag: user.tag,
    avatar: user.avatar.url
  };

//var value = await topgg.find(userRESY.id) 
//db.get('all').find({id: userRESY.id}).value()
  
if(!voteObj) {
   // await topgg.newUser(userRESY.id
    let new_ = new usermodel({
			UserId: userRESY.id
		})
		await new_.save().catch(e => console.log(e));
    KariWebhooks.topgg(`as informações NECESSÁRIAS do usuario **${userRESY.username}** não foram encrontrados\nmas ja criei os dados :3`);
    return
} else {
    var nw = voteObj.topggVotes + 1;
    voteObj.topggVotes = nw
        voteObj.save().catch((err) => console.log(err));
   // await topgg.addUPVOTE(userRESY.id,nw)
    
    console.log(userRESY)
    let avatar = userRESY.avatar
        let embed_2 = new Discord.MessageEmbed().setColor("#FF7F50").setAuthor(`${userRESY.tag}`, `${avatar}`).setDescription(`**${userRESY.username}** votou em mim na [top.gg](https://a.com)!`).setFooter(`ID do autor: ${VoteUserId}`).addFields({
		name: 'total de votos',
		value: '**' + userRESY.username + '** votou em mim ' + nw + ' vezes '
	}).setTimestamp();
    KariWebhooks.topgg(embed_2)
}})
}));

module.exports = app;