let { devs } = require("../../../database/client/content.json") 

module.exports = () => {
    let data = devs.map((x) => {
        let links = x.links.map((x) => `[${x.name}](${x.link})`).join(", ")
        return {
            name: `${x.name}`,
            value: `${x.description}\n\n> discord tag: \`${x.tag}\`\n> links: ${links}`
        }
    }) 
    return data
}