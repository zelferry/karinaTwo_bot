let mongoose = require("mongoose");
let profileSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dates: {
        create_at: Date,
        expires_at: Date
    },
    used: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("vip_keys", profileSchema);