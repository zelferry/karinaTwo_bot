const Canvas = require('canvas');
const Discord = require('discord.js')/*
const canvas = Canvas.createCanvas(384, 128);
const ctx = canvas.getContext('2d');*/
const { createCanvas, loadImage } = require('canvas')

module.exports.run = async (client, message, args) => {
    let membro1 = message.mentions.members.first();
    let membro2 = message.mentions.members.last();
  
  if(!membro1 || !membro2) return message.reply({content:'Lembre-se de mencionar dois usuários para shippar'})
    if(membro1 === membro2) return message.reply({content:'Mencione duas pessoas diferentes'})
  
  const amor = Math.floor(Math.random() * 100);
    const loveIndex = Math.floor(amor / 10);
    let color92;
    if(amor > 90){
        color92 = "🟩" 
    } else if(amor >= 70){
        color92 = "🟨"
    } else if(amor >= 45){
        color92 = "🟫" 
    } else {
        color92 = "🟥" 
    }
  const loveLevel = color92.repeat(loveIndex) + "⬛".repeat(10 - loveIndex);

    let nomeFim1 = membro1.user.username.length;
      let nomeFim2 = membro2.user.username.length;

      let calc1 = nomeFim1 - 3
    let calc2 = nomeFim2 - 3
  
  let nomeship;
    if(amor > 60) {
      nomeship = membro1.user.username.slice(0, 3) + membro2.user.username.slice(0, 3);
    } else if(amor >= 40) {
      nomeship = membro1.user.username.slice(0, calc1) + membro2.user.username.slice(0, calc2)
    } else {
      nomeship = membro1.user.username.slice(calc1, nomeFim1) + membro2.user.username.slice(calc2, nomeFim2)
    } 
  
  let emoticon;
    if(amor > 60) {
      emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429"); //imagem de coração
    } else if(amor >= 40) {
      emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529"); //imagem de sei lá
    } else {
      emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900"); //imagem chorando
    }

  let desc;
    if(amor > 90) {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.user.username+"`` + ``"+membro2.user.username+"`` = ``"+nomeship+"`` \n:heart: Esse é o casal perfeito! :heart:");
    } else if(amor >= 70) {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.user.username+"`` + ``"+membro2.user.username+"`` = ``"+nomeship+"``\n:neutral_face: Esses aqui já tão se pegando e n contaram pra ngm! :neutral_face:");
    } else if(amor >= 45) {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.user.username+"`` + ``"+membro2.user.username+"`` = ``"+nomeship+"``\n:no_mouth: Talvez só precisa o "+membro2.user.username+" querer... :no_mouth:");
    } else {
      desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.user.username+"`` + ``"+membro2.user.username+"`` = ``"+nomeship+"``\n:cry: queria muito dizer que é possivel mas... :cry: ");
    }
  Canvas.registerFont('./assets/fonts/MANROPE_BOLD.ttf', { family: 'Comic Sans' })

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');
    
  const emote = await Canvas.loadImage(emoticon);
    const foto1 = await Canvas.loadImage(membro1.user.displayAvatarURL({format: "png"}))
  const foto2 = await  Canvas.loadImage(membro2.user.displayAvatarURL({format: "png"}));
    let lovecolor;
    if(amor > 90){
        lovecolor = "#8B008B" 
    } else if(amor >= 70){
        lovecolor = "#C71585"
    } else if(amor >= 45){
        lovecolor = "#800000" 
    } else {
        lovecolor = "#000080" 
    }
    
    ctx.fillStyle = lovecolor
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
    ctx.drawImage(emote, 275, 9, 150, 150);
    
    ctx.font = '28px Comic Sans';
	ctx.fillStyle = '#ffffff';
    ctx.fillText(""+amor+"%", canvas.width / 2.2, canvas.height / 1.1);
    
    ctx.drawImage(foto1, 20, 23.4, 191.5, 191.5);
    ctx.drawImage(foto2, 490, 23.4, 191.5, 191.5);
    
    ctx.strokeStyle = '#1C1C1C';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    /*
    ctx.drawImage(emote, 125, 0, 128, 128)
      ctx.drawImage(foto1, -10, 0, 120, 120)
    ctx.drawImage(foto2, 260, 0, 120, 120)
*/
 const amorat = new Discord.MessageAttachment(canvas.toBuffer(), 'chances-image.png')
console.log(amorat)
  
let amorEmbed = new Discord.MessageEmbed().setColor('#ffffff').setDescription(""+desc+"\n\n**"+amor+"%** ["+loveLevel+"]").setImage('attachment://chances-image.png')

  message.reply({embeds:[amorEmbed],files:[amorat]})
  
}
exports.config = {
    test: false
}
exports.help = {
  name: "ship",
  permisoes: "nenhuma",
  aliases: [],
  description: "shipe um usuário com outro!",
  usage: "ship <usuário 1> <usuário 2>"
}