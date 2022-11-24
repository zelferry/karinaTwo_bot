
module.exports = {
    webhooks1: require("../utils/webhooks/new.index.js"),
	fetch: require("../utils/discord/userFETCH.js"),
    //actvies: require("../utils/discord/actvies.js"),
    permissions: {
        maked: require("../utils/commands/permission.cmds.js"),
        check: require("../utils/commands/permission.check.js")
    },
    message: {
        noNsfw: require("../utils/message/noNsfw.js")
    }
}