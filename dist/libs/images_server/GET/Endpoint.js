let __nekos = require("./structures/nekos.js")

class endpoit {
    constructor() {}
    get nekos() {
        return new __nekos()
    }
}

module.exports = endpoit