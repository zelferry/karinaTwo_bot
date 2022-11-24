let mongoose = require("mongoose");

let profileSchema = mongoose.Schema({
    UserId: Number,
    userCreationTimestamp: Date,
    coins: { type: Number, default: 0 },
    daily: { type: String, default: "0000" },
    usertext: { type: String, default: "karinaTwo and my friend, and did you know that you can change this text using **/user aboutme**?" },
    vipUser: { type: Boolean, default: false },
    topggVotes: { type: Number, default: 0 },
    afk: {
        reason: { type: String, default: "fora no momento"},
        ready: { type: Boolean, default: false }
    },
    banned: {
        reason: { type: String, default: "não especificado" },
        ready: { type: Boolean, default: false }
    },
    config: {
        lang: { type: String, default: "pt-BR" },
        lang_simple: { type: String, default: "pt" },
        background: {
            setted: {
                type: String,
                default: "default"
            },
            collection: {
                type: Array,
                default: ["default"]
            }
        },
        e6: {
            blacklist: []
        }
    }
})

module.exports = mongoose.model("user", profileSchema);