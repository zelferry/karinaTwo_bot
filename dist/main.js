let yiffmodule = require("./libs/yiff_rest/index.js");
let parse_ms = require("./libs/parse_ms/index.js");
let devs_treat = require("./libs/treat_devs/index.js");
let webclient = require("./libs/web_client/index.js")


module.exports = {
    modules: {
        yiff: new yiffmodule(),
        parse_ms: parse_ms,
        devs_treat: devs_treat,
        webclient: webclient
    }
}