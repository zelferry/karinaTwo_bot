let Discord = require("discord.js");

let axios = require('axios');
let tf = require('@tensorflow/tfjs-node');
let nsfw = require('nsfwjs');

let { configs } = require("../mongoDB/ini.js").guild 

async function isnsfw(url) {
    let r = false;
  const pic = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const model = await nsfw.load()
  const image = await tf.node.decodeImage(pic.data,3)
  const predictions = await model.classify(image)
  image.dispose()
  predictions.map((pr) => {
    pr.probability = Math.round(pr.probability * 100)
    console.log(pr.className, pr.probability)
    if(pr.className == "Hentai" && pr.probability > 35) r = true
    if(pr.className == "Porn" && pr.probability > 35) r = true
    if(pr.className == "Sexy" && pr.probability > 35) r = true
  })
  return r
}

exports.type = "messageCreate";
exports.start = async(client,clusterID,ipc,message) => {
    if (!message.guild){
        return;
    } else {
        let config__ = await configs.getConfig(message.guild, true);
        if(config__.error !== "404"){
            if(config__.antiNsfw){
                message.attachments.map(async(attachment) => {
                    if(await isnsfw(attachment.url) == true){ console.log("pegou") }
                })
            } else {
                return;
            }
        }
    }
}