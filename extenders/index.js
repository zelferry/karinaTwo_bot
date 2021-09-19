module.exports = (client_) => {
    require("./message/Message.js")(client_);
    require("./message/ChannelText.js")(client_);

    require("./voice/VoiceChannel.js")(client_);
   // require("./Guild/guild.js")(client)
} 