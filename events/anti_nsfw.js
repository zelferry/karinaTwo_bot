let Discord = require("discord.js");
let fetch = require('node-fetch');
let { website } = require("../database/client/content.json").links

let { configs } = require("../mongoDB/ini.js").guild

let ops88 = { method: 'GET', headers: { 'User-Agent': 'crosdid/1.0' } };

let checkStatus = response => {
    if(response.ok){
        return response
    } else {
        return {
            error: true,
            rest: response
        }
    }
}
/*
async function isnsfw(url) {
    let r = false;

    if (!result.ok) result = { error: true }
    
    let predictions = await result.json();
    
    predictions.map((pr) => {
        pr.probability = Math.round(pr.probability * 100);
        
        if(pr.className == "Hentai" && pr.probability > 35) r = true
        if(pr.className == "Porn" && pr.probability > 35) r = true
        if(pr.className == "Sexy" && pr.probability > 35) r = true
    });
    
    return {
        response: !result.error ? true : false,
        nsfw: r ?? false
    }
}


exports.start = async(client,clusterID,ipc,message) => {
    if (!message.guild){
        return;
    } else {
        let config__ = await configs.getConfig(message.guild, true);
        if(config__.error !== "404"){
            if(config__.antiNsfw){
                if(!message.attachments || message.author.bot == true || message.channel.nsfw == true) return;
                message.attachments.map(async(attachment) => {
                    if(await isnsfw(attachment.url).nsfw == true){
                        if(message){
                            message.delete();
                            message.channel.send({embeds: [new Discord.MessageEmbed().setTitle("sem nsfw").setDescription(`${message.author} não envie **nsfw** foda de canais nsfw`).setColor("DARK_RED")]})
                        }
                    }
                })
            } else {
                return;
            }
        }
    }
}*/
exports.type = "messageCreate";
exports.start = async(client,clusterID,ipc,message) => {
    if(!message.guild){
        return;
    } else if(!message.attachments || message.author.bot == true || message.channel.nsfw == true){
        return;
    } else {
        let config__ = await configs.getConfig(message.guild, true);
        if(config__.error !== "404" && config__.antiNsfw == true){
            try {
                message.attachments.map(async(attachment) => {
                    if(!client.images.isImage(attachment.url)){
                        return;
                    } else {
                        let model = await fetch(`${website}/ia/anti_nsfw?tags=${attachment.url}`, ops88);
                        let predictions = await model.json();
                        for (let i = 0; i < predictions.length; i++){
                            let c = predictions[i]
                            c.probability = Math.round(c.probability * 100);
                            
                            if (c.className == "Porn" || c.className == "Hentai" || c.className == "Sexy"){
                                if (c.probability >  35) {
                                    message.delete();
                                    message.channel.send({embeds: [new Discord.MessageEmbed().setTitle("sem nsfw").setDescription(`${message.author} não envie **nsfw** fora de canais nsfw`).setColor("DARK_RED")]})
                                }
                            }
                        }
                    }
                })
            } catch (err) {
                message.channel.send({
                    content: "aconteceu um erro estranho d+ no módulo anti-nsfw :/"
                });
                console.error(err)
            }
        }
    }
}