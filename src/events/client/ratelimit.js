let Event = require("../../structures/events/event.js");
let ms = require("ms")

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "rateLimit"
        })
    }
    
    async run(ratelimit){
        console.error(`client com RATELIMIT \n\nTimeout: ${ms(ratelimit.timeout)}-ms\nLimit: ${ratelimit.limit}\nMethod: ${ratelimit.method}\nPath: ${ratelimit.path}\nRoute: ${ratelimit.route}`);
    }
}

module.exports = event