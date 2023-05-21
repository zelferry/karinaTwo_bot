module.exports = {
    modules: {
        parse_ms: require("./libs/parse_ms/index.js"),
        smileys: {
            cat: require("./libs/smileys/cat_faces.js")
        },
        devs_treat: require("./libs/treat_devs/index.js"),
        webclient: require("./libs/web_client/index.js")
    },
    extends: function(){
        require("./extends/code.js")();
    }
}