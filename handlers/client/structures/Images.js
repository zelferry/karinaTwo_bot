const regexImgUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg|jfif|webp|bmp)/gi
const regexGifUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:gif)/gi
const regexVidUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:mp4|webm|m4a|mov)/gi

class Images {
    constructor(client){
        this.client = client;
    }
    displayURL(message, args, valueId = 0){
        const mention = message.attachments.size > 0 || message.mentions.users.first() || this.client.users.cache.get(args[valueId]) || message.author;
        
        return ((message.attachments.size > 0 && message.attachments.array()[valueId].url) || mention.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
    }
    isImage(url){
        return regexImgUrl.exec(url) != null;
    }
    isGif(url) {
        return regexGifUrl.exec(url) != null;
    }
    isVideo(url) {
        return regexVidUrl.exec(url) != null;
    }
}

module.exports = Images