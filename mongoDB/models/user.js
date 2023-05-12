let mongoose = require("mongoose");

let profileSchema = mongoose.Schema({
    UserId: String,
    userCreationTimestamp: Date,
    coins: { type: Number, default: 0 },
    usertext: { type: String, default: "discord is the best platform, and did you know that you can change these text using **/user aboutme**?! owo" },
    vipUser: { type: Boolean, default: false },
    topggVotes: { type: Number, default: 0 },
    reps: { type: Number, default: 0 },
    afk: {
        reason: { type: String, default: "fora no momento" },
        ready: { type: Boolean, default: false }
    },
    banned: {
        reason: { type: String, default: "não especificado" },
        ready: { type: Boolean, default: false }
    },
    config: {
        email: String,
        vip: {
            active: { type: Boolean, default: false },
            expires_in: Date,
            activated_in: Date
        },
        cooldow: {
            daily: { type: String, default: "0000" },
            reps: { type: String, default: "0000" }
        },
        lang: { type: String, default: "pt-BR" },
        lang_simple: { type: String, default: "pt" },
        background: {
            setted: { type: String, default: "default" },
            collection: { type: Array, default: ["default"] }
        },
        e6: {
            blacklist: []
        }
    }
});

module.exports = mongoose.model("user", profileSchema);