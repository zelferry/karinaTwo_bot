let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let Canvas = require('canvas');
let { createCanvas, loadImage } = require('canvas')

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "ship",
            description: "[ 👤social ] shipe um usuário com outro!",
            category: "social",
            usage: "<usuário 1> <usuário 2>",
            commandOptions: [
                {
                    type: 6,
                    name: "user_1",
                    description: "usuário 1 (@user/id)",
                    required: true
                },
                {
                    type: 6,
                    name: "user_2",
                    description: "usuário 2 (@user/id)",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let membro1 = interaction.options.getUser("user_1");
        let membro2 = interaction.options.getUser("user_2");

        if(membro1.id === membro2.id){
            interaction.followUp({
                content: "🚫**|** mencione duas pessoas diferentes",
                ephemeral: true
            });
            return {}
        } else {
            let amor = Math.floor(Math.random() * 100);
            let loveIndex = Math.floor(amor / 10);
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

            let loveLevel = color92.repeat(loveIndex) + "⬛".repeat(10 - loveIndex);

            let nomeFim1 = membro1.username.length;
            let nomeFim2 = membro2.username.length;

            let calc1 = nomeFim1 - 3
            let calc2 = nomeFim2 - 3
            
            let nomeship;
            if(amor > 60) {
                nomeship = membro1.username.slice(0, 3) + membro2.username.slice(0, 3);
            } else if(amor >= 40) {
                nomeship = membro1.username.slice(0, calc1) + membro2.username.slice(0, calc2)
            } else {
                nomeship = membro1.username.slice(calc1, nomeFim1) + membro2.username.slice(calc2, nomeFim2)
            }

            let emoticon;
            if(amor > 60) {
                emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429");
            } else if(amor >= 40) {
                emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529");
            } else {
                emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900"); 
            }

            let desc;
            if(amor > 60) {
                desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.username+"`` + ``"+membro2.username+"`` = ``"+nomeship+"`` \n:heart: Esse é o casal perfeito! :heart:");
            } else if(amor >= 70) {
                desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.username+"`` + ``"+membro2.username+"`` = ``"+nomeship+"``\n:neutral_face: Esses aqui já tão se pegando e n contaram pra ngm! :neutral_face:");
            } else if(amor >= 45) {
                desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.username+"`` + ``"+membro2.username+"`` = ``"+nomeship+"``\n:no_mouth: Talvez só precisa o "+membro2.username+" querer... :no_mouth:");
            } else {
                desc = (":sparkling_heart: HMMM, vai rolar ou não vai? :sparkling_heart:\n``"+membro1.username+"`` + ``"+membro2.username+"`` = ``"+nomeship+"``\n:cry: queria muito dizer que é possivel mas... :cry: ");
            }

            Canvas.registerFont('./assets/fonts/MANROPE_BOLD.ttf', { family: 'Comic Sans' });

            let canvas = Canvas.createCanvas(700, 250);
            let ctx = canvas.getContext('2d');

            let emote = await Canvas.loadImage(emoticon);
            let foto1 = await Canvas.loadImage(membro1.displayAvatarURL({format: "png"}));
            let foto2 = await  Canvas.loadImage(membro2.displayAvatarURL({format: "png"}));

            let lovecolor;
            if(amor > 90) {
                lovecolor = "#8B008B"
            } else if(amor >= 70) {
                lovecolor = "#C71585" 
            } else if(amor >= 45) {
                lovecolor = "#800000"
            } else {
                lovecolor = "#000080"
            }

            ctx.fillStyle = lovecolor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(emote, 275, 9, 150, 150);
            ctx.font = '28px Comic Sans';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(""+amor+"%", canvas.width / 2.2, canvas.height / 1.1);

            ctx.drawImage(foto1, 20, 23.4, 191.5, 191.5);
            ctx.drawImage(foto2, 490, 23.4, 191.5, 191.5);

            ctx.strokeStyle = '#1C1C1C';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            let amorat = new Discord.MessageAttachment(canvas.toBuffer(), 'chances-image.png');
            let amorEmbed = new Discord.MessageEmbed().setColor('#ffffff').setDescription(""+desc+"\n\n**"+amor+"%** ["+loveLevel+"]").setImage('attachment://chances-image.png');

            interaction.editReply({
                embeds: [amorEmbed],
                files: [amorat]
            })
        }
    }
} 

module.exports = Command 