let parse_ms = require("./libs/parse_ms/index.js");
let devs_treat = require("./libs/treat_devs/index.js");
let webclient = require("./libs/web_client/index.js");
let cat_faces = require("./libs/smileys/cat_faces.js")

let code = require("./extends/code.js");

module.exports = {
    modules: {
        parse_ms: parse_ms,
        smileys: {
            cat: cat_faces
        },
        devs_treat: devs_treat,
        webclient: webclient
    },
    extends: function(){
        code();
    }
}