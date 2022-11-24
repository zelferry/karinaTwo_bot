class Config {
    /*webhooks*/
    static webhook(){
        return {
            commands: process.env.WEBHOOK_COMMANDS,
            manager: process.env.WEBHOOK_MANAGER,
            support: process.env.WEBHOOK_SUPPORT,
            topgg: process.env.WEBHOOK_TOPGG
        }
    }

    /*client and bot*/
    static client(){
        return {
            id: process.env.CLIENT_ID
        }
    }
    static bot(){
        return {}
    }

    /*top.gg*/
    static topgg(){
        return {
            pass: process.env.TOPGG_PASS,
            token: process.env.TOPGG_TOKEN
        }
    }
    
    /*users*/
    static user(){
        return {
            owners: (process.env.USER_OWNERS).split(','),
            ignored: (process.env.USER_IGNORED).split(',')
        }
    }

    /*guilds*/
    static guild(){
        return {
            test: process.env.GUILD_TEST
        }
    }

    /*adverts*/
    static adverts(){
        return (process.env.ADVERTS).split(',')
    }

    /*urls*/
    static urls(){
        return {
            support: process.env.URLS_SUPPORT,
            pix: process.env.DONATE_PIX
        }
    }
}

module.exports = Config