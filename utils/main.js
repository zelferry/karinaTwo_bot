
module.exports = {
	commands: require("../utils/commands/cmds.js"),
	ping: require("../utils/host/ping.js"),
	webhooks: require("../utils/webhooks/index.js"),
	//db: require("../utils/db/index.js"), 
	//bans: require("../utils/db/types/banneds/ini.js"),
	fetch: require("../utils/discord/userFETCH.js"),
    //actvies: require("../utils/discord/actvies.js"),
    permissions: {
        maked: require("../utils/commands/permission.cmds.js"),
        check: require("../utils/commands/permission.check.js")
    },
    makeCommandsCategory: require("../utils/discord/makecommand.js"),
    message:{
        noNsfw: require("../utils/message/noNsfw.js")
    }
}