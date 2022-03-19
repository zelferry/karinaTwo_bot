let mongoose = require("mongoose");

let profileSchema = mongoose.Schema({
    UserId: Number,
    coins: { type: Number, default: 0 },
    daily: { type: String, default: "0000" },
    usertext: { type: String, default:"karina e minha amiga :)\ne você sabia que você pode mudar esse texto usando o **f/usertext**?!" },
    vipUser: { type: Boolean, default: false },
    topggVotes: { type: Number, default: 0 },
    randon: {
        qi: { type: Number, default: 0 },
        idiot: { type: Number, default: 0 }
    },
    afk: {
        reason: { type: String, default: "fora no momento"},
        ready: { type: Boolean, default: false }
    },
    banned: {
        reason: { type: String, default: "não especificado" },
        ready: { type: Boolean, default: false }
    },
    config: {
        /*user: {
            username: String,
            tag: String,
            discriminator: String,
            banner: String,
            avatar: String,
        },*/
        e6: {
            blacklist: []
        }
    }
})

module.exports = mongoose.model("user", profileSchema);