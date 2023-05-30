let { developers } = require("../config/config.js").client;

module.exports = (t) => {
    let data = devs[t].map((x) => {
        let links = x.links.map((x) => `[${x.name}](${x.link})`).join(", ")
        return {
            name: `${x.name}`,
            value: `${x.description}\n\n> discord tag: \`${x.tag}\`\n> links: ${links}`
        }
    }) 
    return data
}