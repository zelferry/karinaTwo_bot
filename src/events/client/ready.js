const Event = require("../../structures/events/event.js");
const { vip, translations } = require("../../data/ini.js").user;

const i18next = require('i18next');


class event extends Event {
    constructor(...args){
        super(...args, {
            name: "ready"
        })
    }
    
    async run(){
        let client = this.client;

        //obrigado chatGPT
        async function checkExpiration(users_data){
            for (let i = 0; i < users_data.length; i++){
                let user_data = users_data[i];

                let today = new Date();
                let expiration_date = new Date(user_data.config.vip.expires_in);

                let diff = expiration_date.getTime() - today.getTime();
                let diffDays = diff / (1000 * 3600 * 24);
                
                if (diffDays <= 0){
                    let member = await client.users.fetch(user_data.UserId, true);
                    
                    if(member){
                        let user_translation = await translations.get_lang(member);
                        let locale = i18next.getFixedT(user_translation || 'pt-BR');
                        
                        member.send({
                            content: locale("events:vip_user.expirate")
                        });
                        
                        await vip.delete_vip(member);
                    }
                }
            }
        }

        async function daily_panther_coins(users_data){
            for (let i = 0; i < users_data.length; i++){
                let user_data = users_data[i];

                await vip.daily_panther_coins(user_data.UserId);
            }
        }

        setInterval(async() => {
            let get_users_data = await vip.find_all();

            await checkExpiration(get_users_data);
            await daily_panther_coins(get_users_data);
        }, 24 * 60 * 60 * 1000);

        console.log(`${this.client.user.tag} online!`);
    }
}

module.exports = event