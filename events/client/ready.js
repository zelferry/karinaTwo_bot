let Event = require("../../frameworks/event/event.js");

let util = require('../../utils/main.js');
let { GiveawaysManager } = require('discord-giveaways');
let i18next = require('i18next');
let plugins = require("../../plugins/index.js");
let { vip, translations } = require("../../mongoDB/ini.js").user;

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "ready"/*,
            once: true*/
        })
    }
    
    async run(){
        let client = this.client;
        let users_data = await vip.find_all();

        //obrigado chatGPT
        async function checkExpiration(){
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

        async function daily_panther_coins(){
            for (let i = 0; i < users_data.length; i++){
                let user_data = users_data[i];

                await vip.daily_panther_coins(user_data.UserId);
                //console.log("lol")
            }
        }

        setInterval(async() => {
            await checkExpiration();
            await daily_panther_coins();
        }, 24 * 60 * 60 * 1000);
        console.log(`${this.client.user.tag} online!!`);
    }
}

module.exports = event

/*
function checkExpiration() {
  // get the current date
  const today = new Date();

  // calculate the difference between today and subscription expiration date
  const diff = subscriptionExpiration.getTime() - today.getTime();

  // calculate the difference in days
  const diffDays = diff / (1000 * 3600 * 24);

  // if difference is 7 or less, alert the user
  if (diffDays <= 7) {
    alert('Your subscription is expiring soon! Please renew your subscription.')
  }
}

// set an interval to check for expiration every day
setInterval(checkExpiration, 24 * 60 * 60 * 1000); */