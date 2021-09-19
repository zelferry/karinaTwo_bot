let ms = require('ms');

exports.type = "rateLimit";
exports.start = async(client,clusterID,ipc,ratelimit) => {/*
console.error(`Client is being rate limited.\n\n
    Timeout: ${ms(ratelimit.timeout)}-ms
    Limit: ${ratelimit.limit}
    Method: ${ratelimit.method}
    Path: ${ratelimit.path}
    Route: ${ratelimit.route}`);*/
}