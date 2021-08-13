const Discord = require('discord.js');
var config = require('../config.js')
var ownerID = config.ownerID;

module.exports.run = async (client, message, args) => {

    let {prefix} = require("../mongoDB/ini.js").guild 

    let prefixoAtual = await prefix.findPrefix(message.guild,message,false)
	
    
let diversao = ["coin","emoji","inverter","morse","owo","say","fleur","jokempo"].map((x) => `\`${x}\``)//.join(", ")//9

let sosial = ["afk","atack","dancar","hug","idiot","kiss","kill","perfil","qi","slap","usertext"].map((x) => `\`${x}\``)//.join(", ")//0

let imgs = ["furry","gerarmeme","pitaya","spoiler-image"].map((x) => `\`${x}\``)//.join(", ")//11993343

let admits = ["antiraid","anunciar","ban","banlist","clear","create-rules","gstart","setprefix"].map((x) => `\`${x}\``)//.join(", ")//!

let memes = ["creeper?","dino","meme","mcc"].map((x) => `\`${x}\``)//.join(", ")//&

let photo = ["affect","beautiful","changemymind","fuse","invert","triggered"].map((x) => `\`${x}\``)//.join(", ")//new

let discor = ["avatar","cdinf","convidar","lembrete","ping","relatorio"].map((x) => `\`${x}\``)//.join(", ")//7

let economy = ["buy","daily","furcoins","open","pay","roll","vip","work"].map((x) => `\`${x}\``)//.join(", ")//7

let misela = ["help","karina-oc","karinainfor","wiki","hex"].map((x) => `\`${x}\``)//.join(", ")//^

let nsfw = ["e621","furry-nsfw","furry-gay","gay","nsfw","nekos","yiffy"].map((x) => `\`${x}\``)//.join(", ")//Int8Array

let ower = ["eval","userban","usersbanslist","userurban"].map((x) => `\`${x}\``).join(", ")

let owerFOOTER = "🔧ㆍowner"

if(!ownerID.includes(message.author.id)){
	ower = "\u200B"
	owerFOOTER = "\u200B"
}

const embed = {
  "title": "Minha lista de comandos!",
  "description": "Meu prefixo nesse servidor: `"+prefixoAtual+"` \ncomo usar meus comandos?: \n`"+prefixoAtual+"<command name>`\n \nexenplos:\n`"+prefixoAtual+"kiss @catarina`\n`"+prefixoAtual+"furry-nsfw`\n\n para obter informações de um comando em específico use `"+prefixoAtual+"cdinf <comando>`",
  "color": 11993343,
  "fields": [
    {
      "name": "😹ㆍdiversão ("+diversao.length+")",
      "value": ""+diversao.join(", ")+""
    },
    {
      "name": "🙋ㆍsocial ("+sosial.length+")",
      "value": ""+sosial.join(", ")+""
    },
    {
      "name": "👮ㆍadministração ("+admits.length+")",
      "value": ""+admits.join(", ")+""
    },
    {
      "name": "📷ㆍimagens ("+imgs.length+")",
      "value": ""+imgs.join(", ")+""
    },
    {
      "name": "💩ㆍmemes ("+memes.length+")",
      "value": ""+memes.join(", ")+""
    },
    {
      "name": "💸ㆍeconômica ("+economy.length+")",
      "value": ""+economy.join(", ")+""
    },
    {
      "name": "↪ㆍmicelânea ("+misela.length+")",
      "value": ""+misela.join(", ")+""
    },
    {
      "name": "😈ㆍnsfw ("+nsfw.length+")",
      "value": ""+nsfw.join(", ")+""
    },
    {
      "name":"📱ㆍdiscord ("+discor.length+")",
      "value":""+discor.join(", ")+""
    },
    {
      "name":"🃏ㆍphotoshop ("+photo.length+")",
      "value":""+photo.join(", ")+""
    },
    {
      "name":""+owerFOOTER+"",
      "value":""+ower+""
    }
  ]
};
message.channel.send({ embed });
  
message.delete().catch(O_o => {});
console.log(`um usuario pediu ajuda`);
}
exports.help = {
  name:"help",
  permisoes: "nenhuma",
  aliases: ["ajuda","comandos"],
  description: "lista com todos os comandos",
  usage: "help"
}